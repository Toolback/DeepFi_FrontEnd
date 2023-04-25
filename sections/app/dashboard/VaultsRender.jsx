import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, textVariant } from 'utils/motion';
import VaultCard from '@components/app/VaultCard';

const VaultsRender = ({vaultInfo}) => {
  const [selectedPool, setSelectedPool] = useState(0);
  const [poolsButtons, setPoolsButtons] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false)

  const soonVault = {
    vaultId: 0,
    address: 'N/a',
    vaultButtonName: "Soon !",
  }
  useEffect(() => {
    setSelectedPool(0)
    setPoolsButtons(vaultInfo)
    // console.log("2 - VaultsRender - Pools Buttons Infos retrieved => ", stateAppData.vaults)
    // console.log("2a - VaultsRender - Pools Buttons Selected => ", selectedPool)

    setDataLoaded(true)
  }, [])

  return (
    <div className="w-full pb-10">
      <section className=''>
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
            <p className="mt-2 text-lg text-center leading-6 text-indigo-200">
              All Available Vaults
            </p>
          </motion.div>

          {/* Render Switch Buttons Between Vaults */}
          {dataLoaded && <>
            <motion.div variants={textVariant(1.5)} className="flex justify-center pt-4 gap-2 ">
              {poolsButtons.map((vault) => {
                return <button onClick={() => setSelectedPool(vault.vaultId)} key={vault.vaultId} className={selectedPool == vault.vaultId ? 'hover:bg-purple-900/50 border border-white border-opacity-10 bg-purple-900/50 px-4 py-2 rounded-lg text-gray-300' : 'hover:bg-purple-900/50 border border-white border-opacity-10 bg-primary-black/10 px-4 py-2 rounded-lg text-gray-300'}>
                  {vault.vaultButtonName}
                </button>
              })}
              {/* Temporary 'Soon' Vault */}
              <button className={'hover:bg-white hover:bg-opacity-30 border border-white border-opacity-10 bg-primary-black/10 px-4 py-2 rounded-lg text-gray-300'}>
                {soonVault.vaultButtonName}
              </button>
            </motion.div>
            {/* => Render Current Selected Vault && Attached Contracts Infos <= */}
            <VaultCard vaultInfo={poolsButtons[selectedPool]} />
          </>}
        </motion.div>
      </section>
    </div>
  )
}

export default VaultsRender;