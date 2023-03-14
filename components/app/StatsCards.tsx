import { useEffect, useState } from "react";
import Loader from "./Loader";

const StatsCards = (stats?: any) => {


  const [actualStats, setActualStats] = useState([null]);

  useEffect(() => {
    setActualStats(stats.stats);
    renderStats()
  }, [stats]);

  const renderStats = () => {
    return (
      <>
        {actualStats.length < 2 ? (
            <Loader />
        ) : (
          <>
            <dl className="grid grid-cols-2 gap-5 sm:grid-cols-4">

              {actualStats?.map((item: any) => (
                <div key={item.name} className="overflow-hidden flex flex-col items-center rounded-lg border border-white border-opacity-10 bg-white bg-opacity-5 drop-shadow-lg px-4 py-5 shadow sm:p-6">
                  <dt className="truncate text-sm font-medium text-gray-300">{item.name}</dt>
                  <dd className="mt-1 text-3xl font-semibold tracking-tight">{item.stat}</dd>
                </div>
              ))}
            </dl>

          </>

        )
        }
      </>
    )
  }

  return (
    <div>
      {renderStats()}
    </div>
  )
}

export default StatsCards