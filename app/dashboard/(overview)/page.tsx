import { CardEnergyWrapper } from '@/app/ui/dashboard/cards';
import MtCO2Chart from '@/app/ui/dashboard/mtco2-chart';
import TopProducers from '@/app/ui/dashboard/top-producers';
import { lusitana } from '@/app/ui/fonts';
import GlobalAtlasProjectReference from '@/app/ui/globalAtlasLink';
import {
  CardsEnergySkeleton,
  MtCO2ChartSkeleton,
  TopProducersSkeleton
} from '@/app/ui/skeletons';
import { Suspense } from 'react';

export default async function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <GlobalAtlasProjectReference/>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsEnergySkeleton />}>
          <CardEnergyWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<MtCO2ChartSkeleton />}>
          <MtCO2Chart />
        </Suspense>
        <Suspense fallback={<TopProducersSkeleton />}>
          <TopProducers />
        </Suspense>
      </div>
    </main>
  );
}
