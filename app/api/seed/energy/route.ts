
import { db } from '@vercel/postgres';

import { mtco2 } from '../../../lib/energy-data';

const client = await db.connect();

async function seedMtCO2() {
  console.log("seed mtco2")
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS mtco2 (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      year_2020 DECIMAL(10, 2) NOT NULL NOT NULL,
      year_2021 DECIMAL(10, 2) NOT NULL NOT NULL,
      year_2022 DECIMAL(10, 2) NOT NULL NOT NULL,
      three_year_production FLOAT NOT NULL
    );
  `;

  const mtco2list = await Promise.all(
    mtco2.map(async (country) => {
      return client.sql`
        INSERT INTO mtco2 (id, name, year_2020, year_2021,year_2022,three_year_production)
        VALUES (${country.id}, ${country.name}, ${country.year_2020}, ${country.year_2021},${country.year_2022},${country.three_year_production})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return mtco2list;
}

// a Next.js Route Handler, called route.ts, that will be used to seed your database. 
//This creates a server-side endpoint that you can access in the browser to start populating your database.

export async function GET() {
  return Response.json({
    message:
      'Uncomment this file and remove this line. You can delete this file when you are finished.',
  });
  // try {
  //   await client.sql`BEGIN`;
  //   await seedMtCO2();
  //   await client.sql`COMMIT`;

  //   return Response.json({ message: 'Database seeded successfully' });
  // } catch (error) {
  //   await client.sql`ROLLBACK`;
  //   return Response.json({ error }, { status: 500 });
  // }
}
