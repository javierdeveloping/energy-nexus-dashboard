// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type MtCO2Year = {
  year: string;
  amount: number;
};

export type MtCO2 = {
  id: string;
  name: string;
  year_2020: number;
  year_2021: number;
  year_2022: number;
  three_year_production: number;
};

export type FormattedMtCO2Table = {
  id: string;
  name: string;
  year_2020: number;
  year_2021: number;
  year_2022: number;
  three_year_production: number;
};

export type MtCO2Ranking = Pick<MtCO2, 'name' | 'three_year_production'>;
