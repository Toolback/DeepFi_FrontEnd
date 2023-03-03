import { useEffect, useState } from "react";
import Loader from "./Loader";

const TreasuryCard = (stats?: any) => {


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
            <dl className="grid grid-cols-2 gap-5 sm:grid-cols-4 border border-white border-opacity-10 bg-white bg-opacity-10 rounded-lg  px-4 py-5 shadow">

              {actualStats?.map((item: any) => (
                <div key={item.name} className="overflow-hidden flex flex-col items-center ">
                  {item.src ? <img className="z-30 h-[64px]" src="https://s2.coinmarketcap.com/static/img/coins/64x64/23038.png" /> : <div className="h-[64px]"></div>}
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

export default TreasuryCard