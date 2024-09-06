import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import { FormattedMtCO2Table } from '@/app/lib/definitions';
import Link from 'next/link';
import GlobalAtlasProjectReference from '../globalAtlasLink';

export default async function CountriesTable({
  countries,
}: {
  countries: FormattedMtCO2Table[];
}) {
  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} text-xl md:text-2xl mb-3`}>
        MtCO2 production by countries 
      </h1>
      <GlobalAtlasProjectReference/>
      <Search placeholder="Search countries..." />
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {countries?.map((country) => (
                  <div
                    key={country.id}
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <div className="flex items-center gap-3">
                            <p>{country.name}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between border-b py-5">
                      <div className="flex w-1/3 flex-col">
                        <p className="text-xs">2020</p>
                        <p className="font-medium">{country.year_2020}</p>
                      </div>
                      <div className="flex w-1/3 flex-col">
                        <p className="text-xs">2021</p>
                        <p className="font-medium">{country.year_2021}</p>
                      </div>
                      <div className="flex w-1/3 flex-col">
                        <p className="text-xs">2022</p>
                        <p className="font-medium">{country.year_2022}</p>
                      </div>
               
                    </div>
                    <div className="pt-4 text-sm">
                      <p>{country.three_year_production} in 3 years</p>
                    </div>
                  </div>
                ))}
              </div>
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      2020
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      2021
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      2022
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium">
                      3Y production
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {countries.map((country) => (
                    <tr key={country.id} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <div className="flex items-center gap-3">
                          <p>{country.name}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {country.year_2020}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {country.year_2021}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {country.year_2022}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                        {country.three_year_production}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
