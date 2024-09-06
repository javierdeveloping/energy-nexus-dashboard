import { sql } from '@vercel/postgres';
import { MtCO2, MtCO2Ranking, MtCO2Year } from './definitions';

export async function fetchMtCO2Chart() {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data =
      await sql<MtCO2>`SELECT SUM(year_2020) AS year_2020, SUM(year_2021) AS year_2021, SUM(year_2022) AS year_2022 FROM mtco2`;

    console.log(data.rows);
    const transformedData: MtCO2Year[] = Object.entries(data.rows[0]).map(
      ([key, value]) => {
        return {
          year: key.split('_')[1], // Extract the year from the key
          amount: Number(value),
        };
      },
    );

    console.log(transformedData);
    return transformedData;

    // console.log('Data fetch completed after 3 seconds.');
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchRanking() {
  try {
    const data = await sql<MtCO2Ranking>`
      SELECT mtco2.name, mtco2.three_year_production
      FROM mtco2
      ORDER BY mtco2.three_year_production DESC
      LIMIT 5`;

    const topProducers = data.rows;
    console.log({ topProducers });
    return topProducers;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the top producers.');
  }
}

export async function fetchCardEnergyData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const mtco2CountPromise = sql`SELECT COUNT(*) AS total_countries,SUM(three_year_production) AS global_three_year_production FROM mtco2`;

    const data = await Promise.all([mtco2CountPromise]);

    const total_countries = Number(data[0].rows[0].total_countries ?? '0');
    const global_three_year_production = Number(
      data[0].rows[0].global_three_year_production ?? '0',
    );

    return {
      total_countries,
      global_three_year_production,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch energy card data.');
  }
}

export async function fetchFilteredMtCO2Countries(query: string) {
  try {
    console.log('fetchFilteredMtCO2Countries');
    const data = await sql<MtCO2>`
		SELECT
		  mtco2.id,
		  mtco2.name,
		  mtco2.year_2020,
		  mtco2.year_2021,
      mtco2.year_2022,
      mtco2.three_year_production
		FROM mtco2
    WHERE
    mtco2.name ILIKE ${`%${query}%`}
    `;

    const countries = data.rows.map((country) => ({
      ...country,
    }));

    return countries;
  } catch (err) {
    console.log(err);
    console.error('Database Error:', err);
    throw new Error('Failed to fetch mtco2 countries table.');
  }
}
