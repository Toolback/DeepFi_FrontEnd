import { AppDataStoreContext } from 'data/StoreAppData';
import { useContext, useEffect, useState } from 'react';
import { getVaultsData } from 'lib/fetch/getVaultsData.tsx'
import VaultHero from './VaultHero'
import VaultsRender from './VaultsRender'
import VaultMetrics from "./VaultMetrics";
import Loader from "components/app/Loader";

const App_Page = () => {
  const { stateAppData, dispatchAppData } = useContext(AppDataStoreContext);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [poolsButtons, setPoolsButtons] = useState([]);

  useEffect(() => {
      getVaultsData(stateAppData.provider)
      .then((vaults) => {
        // console.log("1 - App_Data - Initial All Vaults Data => ", vaults)
        dispatchAppData({ ...stateAppData, type: 'setAppData', vaults })
        setPoolsButtons(vaults)
        setDataLoaded(true)
      })
      //catch for error / setTimeOut 
  }, [])

  return (
    <div className="overflow-hidden">
      {/* <div className="absolute w-[20%] h-[30%]  gradient-01" /> */}
      <VaultHero />
      <div className=" hidden sm:flex gradient-06 " />
      <div className=" hidden sm:flex gradient-07 " />
      {dataLoaded  ?
      <>
        <VaultsRender vaultInfo={poolsButtons} />
        {/* <VaultMetrics  />  */}
      </> : <>
      <div className='text-center pb-4'>Loading Recent Data ...</div>
      <Loader/>
      </>
      } 
    </div>)

}
// // Fetch data at build time
// export async function getStaticProps() {  
//   const deployedPools = (await getVaultsData(stateAppData.provider)) || [];
//   // console.log("DATA FETCHED ", deployedPools)
//   return {
//     props: { deployedPools },
//     // The amount of time in seconds before revalidating the data
//     revalidate: 10
//   };
// }

export default App_Page