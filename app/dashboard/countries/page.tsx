import { fetchFilteredCustomers, fetchFilteredMtCO2Countries } from '@/app/lib/data';
import CountriesTable from '@/app/ui/countries/table';
import CustomersTable from '@/app/ui/customers/table';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Countries',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';

  const countries = await fetchFilteredMtCO2Countries(query);

  return (
    <main>
      <CountriesTable countries={countries} />
    </main>
  );
}
