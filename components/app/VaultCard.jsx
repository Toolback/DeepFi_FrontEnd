import { useContext, useEffect, useState } from 'react';
import { AppDataStoreContext } from 'data/StoreAppData';
import { motion } from 'framer-motion';
import { slideIn, staggerContainer, textVariant } from 'utils/motion';
import Link from 'next/link';
import styles from 'styles';
import Loader from "components/app/Loader";
import ContractInfoRenderer from './ContractInfoRenderer';
import CoinCarousel from './CoinCarousel';
import { getUserVaultData } from 'lib/fetch/getUserVaultData';
import {
  ApproveTokenAmount,
  balOfFakeToken,
  getTokenAllowance,
  mintFakeToken,
  vaultClaim,
  vaultDeposit,
  vaultWithdraw
} from 'lib/bc/smc'

const VaultCard = ({ vaultInfo, setModaleConnectStatus }) => {
  const { stateAppData, dispatchAppData } = useContext(AppDataStoreContext);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [lockData, setLockData] = useState(false);
  const [userAmountInput, setUserAmountInput] = useState(0);
  const [updateData, setUpdateData] = useState(false);
  const [actionPoolState, setActionPoolState] = useState("claim");
  const [vault, setVault] = useState(
    {
      address: 'N/a',
      adapterId: 'N/a',
      adapterAddress: "N/a",
      tvl: "N/a",
      rewardFinishAt: 'N/a',
      rewardDuration: 'N/a',
      rewardRate: "N/A",
      userDeposit: 'N/a',
      stakeToken: [],
      rewardsToken: [],
      userAvailableStakingBal: 'N/a',
      adapterContracts: []
    })

  useEffect(() => {
    const fetchData = async () => {
      setLockData(true);
      setDataLoaded(false);
      console.log("3 - VaultCard - Selected Vault Initial Infos retrived => ", vaultInfo)
      setDataLoaded(false);
      if (stateAppData.connected === true) {
        let res = await getUserVaultData(vaultInfo, stateAppData.userAddress, stateAppData.provider)
        console.log("3a - VaultCard Update - Selected Vault Infos Updated UseEffect", res)
        setVault(res);
      }
      else // user is not connected => display initial data (empty balance)
      {
        setVault(vaultInfo);
      }
    }
    
    if (lockData === false) {

      fetchData().then(()=>{
        setLockData(false);
        setDataLoaded(true);
        console.log("3a - VaultCard Update -ENDED")
      })
    }
  }, [stateAppData.userAddress, vaultInfo, updateData])

  
  const handlePoolDeposit = async () => {
    setDataLoaded(false);
    let allowance = await getTokenAllowance(vault.stakeToken.address, stateAppData.provider, stateAppData.userAddress, vault.address);
    if (allowance < userAmountInput) {
      let adjustedAmount = userAmountInput - allowance;
      await ApproveTokenAmount(vault.stakeToken.address, vault.address, adjustedAmount, stateAppData.provider);
    }
    await vaultDeposit(vault.address, userAmountInput, stateAppData.provider)
    setUpdateData(!updateData);
  }

  const handlePoolWithdraw = async () => {
    setDataLoaded(false);
    await vaultWithdraw(vault.address, userAmountInput, stateAppData.provider)
    setUpdateData(!updateData);
  }

  const handlePoolClaim = async () => {
    setDataLoaded(false);
    await vaultClaim(vault.address, stateAppData.provider)
    setUpdateData(!updateData);
  }

  const mintTestToken = async () => {
    await mintFakeToken(stateAppData.userAddress, stateAppData.provider);
    setUpdateData(!updateData);
  }

  const setMaxDepositInput = async () => {
    const maxBal = await balOfFakeToken(stateAppData.userAddress);
    setUserAmountInput(maxBal);
  }

  function renderAction () {
    switch (actionPoolState) {
      case 'deposit':
        return <>
          <div className='pt-4 pb-2 '>
            <Link className="text-start" href="https://app.mummy.finance/#/buy_mlp">Buy MLP</Link>
          </div>
          <div className="">Available: {(vault.stakeToken.balToStake).toString()}</div>
          <div className=" bg-primary-black/70 rounded p-2 flex justify-between">
            <input className="placeholder-white w-3/4  bg-white/0	" placeholder="Enter Amount" onChange={e => setUserAmountInput(e.target.value)} value={userAmountInput} />
            <button className="hover:text-white text-gray-200" onClick={() => setMaxDepositInput()}>MAX</button>
          </div>
          <div className='py-4'>
          </div>
          <div className='flex justify-center gap-2'>
            {stateAppData.connected === true ?
              <button onClick={() => handlePoolDeposit()} className='hover:font-semibold transition duration-500 ease transform hover:-translate-y-1 px-4 py-2'>Deposit</button>
              :
              <button onClick={() => { setModaleConnectStatus(true); setUpdateData(!updateData) }} className='hover:font-semibold transition duration-500 ease transform hover:-translate-y-1 px-4 py-2'>Connect Wallet</button>
            }
          </div>
        </>
      case 'withdraw':
        return <>
          <div className='pt-4 pb-2 '>
            <Link className="text-start" href="https://app.mummy.finance/#/buy_mlp">Buy MLP</Link>
          </div>
          <div className="">Total Staked: {(vault.stakeToken.bal).toString()}</div>
          <div className=" bg-primary-black/70 rounded p-2 flex justify-between">
            <input className="placeholder-white w-3/4  bg-white/0	" placeholder="Enter Amount" onChange={e => setUserAmountInput(e.target.value)} value={userAmountInput} />
            <button className="hover:text-white text-gray-200" onClick={() => setMaxDepositInput()}>MAX</button>
          </div>
          <div className='py-4'>
          </div>
          <div className='flex justify-center gap-2'>
            {stateAppData.connected === true ?
              <button onClick={() => handlePoolWithdraw()} className='hover:font-semibold transition duration-500 ease transform hover:-translate-y-1 px-4 py-2'>Withdraw</button>
              :
              <button onClick={() => { setModaleConnectStatus(true); setUpdateData(!updateData) }} className='hover:font-semibold transition duration-500 ease transform hover:-translate-y-1 px-4 py-2'>Connect Wallet</button>
            }
          </div>
        </>
      case 'claim':
        return <>
          <div className='w-[250px] sm:w-[300px]'>
            <CoinCarousel coins={vault?.rewardsToken} displayNbMobile={1} displayNbDesktop={1} mode={1} />
          </div>
          <div className='flex justify-center gap-2'>
            {stateAppData.connected === true ?
              <button onClick={() => handlePoolClaim()} className='hover:font-bold hover:border-white/60 rounded-xl hover:border font-semibold text-2xl border-b border-white/10 transition duration-500 ease transform hover:-translate-y-1 px-4 py-2'>Claim Reward</button>
              :
              <button onClick={() => { setModaleConnectStatus(true); setUpdateData(!updateData) }} className='hover:font-bold hover:border-white/60 rounded-xl hover:border font-semibold text-2xl border-b border-white/10 transition duration-500 ease transform hover:-translate-y-1 px-4 py-2'>Connect Wallet</button>
            }
          </div>
        </>
      //   default:
      //     return null
    }
  }

  return (
    <>
      {/* <section className='sm:pt-8 sm:pb-20 py-12'> */}
      {/* <motion.div
variants={staggerContainer}
initial="hidden"
whileInView="show"
viewport={{ once: false, amount: 0.50 }}
className={`${styles.innerWidth} mx-auto flex flex-col`}
// className="relative w-full  mt-[30px]"

> */}
      <div className={`${styles.innerWidth} mx-auto flex flex-col`}>
        <motion.div
          variants={slideIn('right', 'tween', 0.2, 1)}
          className="relative w-full  mt-[30px]"
        >
          <div className="absolute w-full min-h-[730px] sm:min-h-[360px] hero-gradient rounded-tl-[120px] z-[0] -top-[10px]" />

          {/* <div className=" w-full h-[30px] hero-gradient rounded-tl-[140px] z-[0] -top-[30px]" /> */}
          <div className="sm:flex sm:flex-col">
            {dataLoaded === false ?
              <>
                <div className=' absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex'>
                  <div
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-purple-900/50 focus:border-rose-200 active:bg-rose-200 transition ease-in-out duration-150 cursor-not-allowed"
                    disabled=""
                    >
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Loading
                  </div>
                </div>
              </>
              : <></>}
              {/* // <Loader/> : <></>}  */}
            {/* pool display */}
            <div className="pt-4 grid sm:grid-cols-2 ">

              {/* deposit / withdraw */}
              <div className='sm:col-span-1'>
                <div className="bg-primary-black/90 sm:min-h-[340px] min-h-[380px] sm:flex sm:justify-center py-10 px-2 rounded-tl-[120px]  border border-white/10 backdrop-blur drop-shadow-lg ">
                  {dataLoaded && <>
                    <div className=''>
                      <div className="flex justify-center ">
                        <button onClick={() => { setUserAmountInput(0); setActionPoolState("claim") }} className={actionPoolState == "claim" ? 'px-4 py-8 sm:py-4 rounded-sm  text-gray-200 text-bold' : 'hover:text-gray-300 transition ease transform hover:-translate-y-1 duration-1500 px-2 sm:px-4 py-2 rounded text-gray-500'}>Claim</button>
                        <button onClick={() => { setUserAmountInput(0); setActionPoolState("deposit") }} className={actionPoolState == "deposit" ? 'px-4 py-8 sm:py-4 rounded-sm  text-gray-200 text-bold' : 'hover:text-gray-300 transition ease transform hover:-translate-y-1 duration-1500 px-2  sm:px-4 py-2 rounded text-gray-500'}>Deposit</button>
                        <button onClick={() => { setUserAmountInput(0); setActionPoolState("withdraw") }} className={actionPoolState == "withdraw" ? 'px-4 py-8 sm:py-4 rounded-sm  text-gray-200 text-bold' : 'hover:text-gray-300 transition ease transform hover:-translate-y-1 duration-1500 px-2  sm:px-4 py-2 rounded text-gray-500'}>Withdraw</button>
                      </div>
                      <div className=' mb-4 h-[0.5px] w-full bg-white/30'></div>
                      {renderAction()}
                    </div>
                  </>}
                </div>
              </div>

              {/* global infos cards */}
              <div className="bg-secondary-black/5 min-h-[330px] sm:min-h-[100px] flex justify-around items-center border border-white/10 backdrop-blur drop-shadow-lg ">

                {dataLoaded ? <>

                  <div className='text-center flex flex-col gap-2'>
                    <div className='w-[120px] sm:w-[170px] md:w-[210px]'>
                      <CoinCarousel coins={vault.rewardsToken} displayNbMobile={1} displayNbDesktop={1} mode={2} />
                    </div>
                    <h4 className='text-md text-gray-300'>Total Earned</h4>

                  </div>

                  <div className='w-[1px] h-3/4 bg-white/30'></div>

                  <div className="grid sm:grid-cols-2 gap-2 sm:gap-4 w-1/3 text-center">
                    <div className="text-center">
                      <p className='text-lg text-center font-bold tracking-tight text-white'>X</p>
                      <h4 className='text-sm text-gray-300'>APR</h4>
                    </div>
                    <div className="text-center">
                      <p className='text-lg font-bold tracking-tight text-white'>{vault.tvl}</p>
                      <h4 className='text-sm text-gray-300'>TVL</h4>
                    </div>
                    <div className="text-center">
                      <p className='text-lg font-bold tracking-tight text-white'>0.1 %</p>
                      <h4 className='text-sm text-gray-300'>Fees on withdraw</h4>
                    </div>
                    <div className="text-center">
                      <p className='text-lg text-center font-bold tracking-tight text-white'>{vault.rewardRate > 0 ? vault.rewardRate : 0}</p>
                      <h4 className='text-sm text-gray-300'>Rewards / second</h4>
                    </div>
                    <div className='hidden sm:block sm:col-span-2 sm:h-[1px] w-full bg-white/30'></div>

                    <div className="text-center sm:col-span-2 pt-4 ">
                      <p className='sm:text-2xl text-lg font-bold tracking-tight text-white'>{Number(vault.stakeToken.bal)}</p>
                      <h4 className='text-sm text-gray-300'>Your Stake</h4>
                    </div>

                  </div>
                </> 
                : <></>}
              </div>
            </div>
            {/* </>} */}
          </div>
          {/* </motion.div> */}

          {/* Render Contracts Attached to Selected Vault */}
          <div className='grid sm:grid-cols-2 gap-4'>
            {vault.adapterContracts?.map((contract, index) => {
              return (
                <ContractInfoRenderer key={index} contract={contract} />
              )
            })}
          </div>
        </motion.div>
      </div>
      {/* </section> */}
    </>
  )
}

export default VaultCard;