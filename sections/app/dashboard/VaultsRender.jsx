import Link from 'next/link';
import { motion } from 'framer-motion';
import { slideIn, staggerContainer, textVariant } from 'utils/motion';

import { AppDataStoreContext } from 'data/StoreAppData';
import { useContext, useEffect, useState } from 'react';

import { approveTargetFT, balOfDeepfi, balOfFakeToken, getAdapterId, getAdapterInfos, getDeployedPools, getVaultEndRewardDuration, getVaultName, getVaultRewardDuration, getVaultRewardRate, getVaultRewardToken, getVaultTotalUserEarned, getVaultTVL, getVaultUserClaimable, getVaultUserDeposit, mintFakeToken, vaultClaim, vaultDeposit, vaultWithdraw } from 'lib/bc/smc'

import VaultCard from '@components/app/VaultCard';
import VaultCard2 from '@components/app/VaultCard2';


const VaultsRender = ({ setModaleConnectStatus }) => {
  const { stateAppData, dispatchAppData } = useContext(AppDataStoreContext);
  const [lockData, setLockData] = useState(false);
  const [selectedPool, setSelectedPool] = useState(0);
  const [poolsButtons, setPoolsButtons] = useState([{
    vaultId: 0,
    address: '0x3b171c40646F68e66F0e01197cE40562A5441c25',
    vaultButtonName: "MLP",
  }]);
  const soonPool = {
    vaultId: 0,
    address: 'N/a',
    vaultButtonName: "Soon !",
  }

  useEffect(() => {
    const fetchData = async () => {
      setLockData(true);
      // setLoading(true);
      let i = 0;
      const deployedPools = await getDeployedPools();
      const names = []
      for(i = 0; i < deployedPools.length; i++)
      {
        let name = await await getVaultName(deployedPools[i]);
        names.push(name);
      }
      const buttons = []
      await deployedPools.map(async (i_address, index) => {
        buttons.push(
          {
            vaultId: index, // index ?
            address: i_address,
            vaultButtonName: names[index], // for now only one pool define later 
          }
        )
      })
      setPoolsButtons(buttons)
    }

    if (lockData == false) {

      fetchData().then((valeur) => {
        setLockData(false);
        renderVaults()
        // setLoading(false);
      }, (raison) => {
        console.log("ERROR => Pools Buttons infos fetch", raison)
        setLockData(false);
        // setLoading(false);
      });
    }
  }, [stateAppData.userAddress])

  const renderVaults = () => {
    return (
      <>
                <section className='sm:pt-8'>

          <motion.div
    variants={staggerContainer}
    initial="hidden"
    whileInView="show"
    viewport={{ once: false, amount: 0.25 }}
    // className="relative w-full  mt-[30px]"

>
        <motion.div variants={textVariant(1.1)} className="sm:flex-auto px-4 pt-4">

          <h2 className="text-3xl text-center font-bold tracking-tight text-white">
            <span className="block">Earning</span>
          </h2>
          <p className="mt-4 text-lg text-center leading-6 text-indigo-200">
            All Available Vaults
          </p>
        </motion.div>
        {/* Render Switch Between Vaults */}
        <motion.div variants={textVariant(1.5)} className="flex justify-center pt-4 gap-2 ">
          {poolsButtons.map((item) => (
            <button onClick={() => setSelectedPool(item.vaultId)} key={item.vaultId} className={selectedPool == item.vaultId ? 'hover:bg-purple-900/50 border border-white border-opacity-10 bg-purple-900/50 px-4 py-2 rounded-lg text-gray-300' : 'hover:bg-purple-900/50 border border-white border-opacity-10 bg-primary-black/10 px-4 py-2 rounded-lg text-gray-300'}>
              {item.vaultButtonName}
            </button>
          ))}
          <button className={'hover:bg-white hover:bg-opacity-30 border border-white border-opacity-10 bg-primary-black/10 px-4 py-2 rounded-lg text-gray-300'}>
            {soonPool.vaultButtonName}
          </button>
          </motion.div>

        {/* Render Selected Vault  && Attached Contracts*/}
        <VaultCard vault={poolsButtons[selectedPool]} setModaleConnectStatus={setModaleConnectStatus} />
        {/* <VaultCard2 vault={poolsButtons[selectedPool]} setModaleConnectStatus={setModaleConnectStatus} /> */}
        </motion.div>
        </section>

      </>
    )
  }

  return (
    <div className="w-full pb-10">
      {renderVaults()}
    </div>
  )
}

export default VaultsRender;