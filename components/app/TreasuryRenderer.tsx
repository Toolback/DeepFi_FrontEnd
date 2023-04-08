import { useEffect, useState } from "react";
import Loader from "./Loader";

const TreasuryRenderer = (treasury?: any) => {
  const [actualStats, setActualStats] = useState([undefined]);
  useEffect(() => {
    setActualStats(treasury.treasury);
  }, [treasury]);

  return <>
    {/* {actualStats[0] != undefined ? ( */}
    {actualStats[0] === undefined ? (
      <Loader />
    ) : (<>
      <dl className="grid grid-cols-2 gap-5 backdrop-blur-lg drop-shadow-lg rounded-lg  px-4 pt-8 shadow">
        {actualStats?.map((item: any) => (
          <div key={item.name} className="overflow-hidden flex flex-col items-center ">
            {item.src ? <img className="z-30 h-[64px]" src="https://s2.coinmarketcap.com/static/img/coins/64x64/23038.png" /> : <div className="h-[64px]"></div>}
            <dt className="truncate text-sm font-medium text-gray-300">{item.name}</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight">{item.stat}</dd>
          </div>
        ))}
      </dl>
      </>
    )}
  </>
}

export default TreasuryRenderer