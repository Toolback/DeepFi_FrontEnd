import { useEffect, useState } from "react";
import Loader from "./Loader";

const StatsCards = (stats?: any) => {


  const [actualStats, setActualStats] = useState([null]);

  useEffect(() => {
    setActualStats(stats);
    renderStats()
  }, [stats]);

  const renderStats = () => {
    return (
      <>
        {actualStats.length < 2 ? (
            <Loader />
        ) : (
          <>
            <dl className="grid grid-cols-1 gap-5 sm:grid-cols-4">

              {actualStats?.stats?.map((item: any) => (
                <div key={item.name} className="overflow-hidden rounded-lg bg-white bg-opacity-10 px-4 py-5 shadow sm:p-6">
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