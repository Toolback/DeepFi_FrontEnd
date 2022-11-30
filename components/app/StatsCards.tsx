import { useEffect, useState } from "react";
import Loader from "./Loader";

const StatsCards = (stats?:any ) => {
  
  const basicStats = [
      { name: 'Total Deposit', stat: 'N/a' },
      { name: 'Total Claimable', stat: 'N/a' },
      { name: 'Total Earned', stat: 'N/a' },
      { name: 'Total IbTokens', stat: 'N/a' }
    ]
    const [actualStats, setActualStats] = useState(basicStats);

    useEffect(() => {

    }, []);

  // console.log("returned Stats here => ", stats);
  return (
    <div>
    <h3 className="text-xl font-semibold text-white">My Summary</h3>
    <dl className="grid grid-cols-1 gap-5 sm:grid-cols-4">
    {/* {stats ? (
      <> */}
      {basicStats.map((item:any) => (
        <div key={item.name} className="overflow-hidden rounded-lg bg-white bg-opacity-10 px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-300">{item.name}</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight">{item.stat}</dd>
        </div>
      ))}
      {/* </>
    ) : (
      <Loader />
    )
    } */}
    </dl>
  </div>
  )
}

export default StatsCards