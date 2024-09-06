import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
  GlobeAsiaAustraliaIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData, fetchCardEnergyData, fetchFilteredMtCO2Countries } from '@/app/lib/data';

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
  global: GlobeAsiaAustraliaIcon,
  countries: UserGroupIcon,
};

export  async function CardEnergyWrapper() {
  const {total_countries,global_three_year_production}= await fetchCardEnergyData();

  return (
    <>
      <Card title="Global MtCO2 in 3 years" value={global_three_year_production} type="global" />
      <Card title="Sample size (Studied countries)" value={total_countries} type="countries" />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type:  'global' | 'countries';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
