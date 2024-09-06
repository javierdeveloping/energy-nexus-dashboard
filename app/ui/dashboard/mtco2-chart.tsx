import { fetchMtCO2Chart } from '@/app/lib/data';
import { generateYAxisEnergy } from '@/app/lib/utils';
import { lusitana } from '@/app/ui/fonts';
import { CalendarIcon } from '@heroicons/react/24/outline';

// This component is representational only.
// For data visualization UI, check out:
// https://www.tremor.so/
// https://www.chartjs.org/
// https://airbnb.io/visx/

export default async function MtCO2Chart() {

  const data = await fetchMtCO2Chart();

  const chartHeight = 350;
  const { yAxisLabels, topLabel } = generateYAxisEnergy(data);



  if (!data || data.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Worldwide MtCO2 production by year 
      </h2>
      <div className="rounded-xl bg-gray-50 p-4">
        <div className="sm:grid-cols-5 mt-0 grid grid-cols-4 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
          {/* y-axis */}
          <div
            className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {data.map((entry) => (
            <div key={entry.year} className="flex flex-col items-center gap-2">
              {/* bars */}
              <div
                className="w-full rounded-md bg-emerald-300"
                style={{
                  height: `${(chartHeight / topLabel) * entry.amount}px`,
                }}
              ></div>
              {/* x-axis */}
              <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                {entry.year}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">From 2020 to 2022</h3>
        </div>
      </div>
    </div>
  );
}
