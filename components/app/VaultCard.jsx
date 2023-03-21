import { useContext, useEffect, useState } from 'react';
import { AppDataStoreContext } from 'data/StoreAppData';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { slideIn, staggerContainer, textVariant } from 'utils/motion';
import styles from 'styles';
import { getProvider } from 'lib/bc/wallet-connect';
import { approveTargetFT, balOfDeepfi, balOfFakeToken, getAdapterId, getAdapterInfos, getDeployedPools, getTokenBalanceOf, getTokenDecimals, getTokenName, getVaultEndRewardDuration, getVaultName, getVaultRewardDuration, getVaultRewardRate, getVaultRewardToken, getVaultStakeToken, getVaultTotalUserEarned, getVaultTVL, getVaultUserClaimable, getVaultUserDeposit, mintFakeToken, vaultClaim, vaultDeposit, vaultWithdraw } from 'lib/bc/smc'
import { BigNumber, ethers } from "ethers";
import ContractInfoRenderer from './ContractInfoRenderer';
import CoinCarousel from './CoinCarousel';

const VaultCard = ({ vault, setModaleConnectStatus }) => {
  const { stateAppData, dispatchAppData } = useContext(AppDataStoreContext);

  const [lockData, setLockData] = useState(false);
  const [userAmountInput, setUserAmountInput] = useState(0);
  const [updateData, setUpdateData] = useState(false);
  const [actionPoolState, setActionPoolState] = useState("claim");


  const [stats, setStats] = useState(
    {
      vaultAddress: 'N/a',
      adapterId: 'N/a',
      adapterAddress: "N/a",
      tvl: "N/a",
      rewardToken: 'N/a',
      rewardFinishAt: 'N/a',
      rewardDuration: 'N/a',
      rewardRate: "N/A",
      userDeposit: 'N/a',
      userClaimable: [],
      userTotalEarned: [],
      userAvailableStakingBal: 'N/a',
      adapterContracts: []
    })

  const toClaimTemp = [
    { name: 'Deepfi', balance: 1000, url: 'https://s2.coinmarketcap.com/static/img/coins/64x64/23038.png' },
    { name: 'FTM', balance: 1000, url: '' },
    { name: 'FTM', balance: 1000, url: '' },

  ]

  const totalEarnedTemp = [
    { name: 'Deepfi', balance: 1000, url: 'https://s2.coinmarketcap.com/static/img/coins/64x64/23038.png' },
    { name: 'FTM', balance: 1000, url: '' },
  ]

  useEffect(() => {
    const fetchData = async () => {
      setLockData(true);
      // setLoading(true);
      let connected = false;
      if (stateAppData.userAddress != "" && stateAppData.userAddress != "connect to retrieve")
        connected = true;

      let adapter_id = await getAdapterId(vault.address);

      let stakeToken = await getVaultStakeToken(vault.address);
      let stakeTokenName = await getTokenName(stakeToken);
      let rewardToken = await getVaultRewardToken(vault.address);
      let rewardTokenName = await getTokenName(rewardToken);
      let res =
      {


        vaultAddress: vault.address,
        adapterId: adapter_id,
        // adapterAddress: adapter_data.adapterAddress,
        adapterAddress: "",
        tvl: (await getVaultTVL(vault.address)).toString(),
        rewardToken: rewardToken.substring(0, 5) + "..." + rewardToken.substring(rewardToken.length - 3),
        rewardFinishAt: (await getVaultEndRewardDuration(vault.address)).toString(),
        rewardDuration: (await getVaultRewardDuration(vault.address)).toString() + "Days",
        rewardRate: (await getVaultRewardRate(vault.address)).toString(),
        userDeposit: connected == true ? (ethers.utils.formatUnits(await getVaultUserDeposit(vault.address, stateAppData.userAddress), await getTokenDecimals(stakeToken))) + ' ' + stakeTokenName : "N/a",
        // userClaimable: connected == true ? await getVaultUserClaimable(vault.address, stateAppData.userAddress) : [], // todo Multiple Reward Tokens
        // userTotalEarned: connected == true ? await getVaultTotalUserEarned(vault.address, stateAppData.userAddress) : [ ], // todo Multiple Reward Tokens
        userClaimable: connected == true ? toClaimTemp : toClaimTemp,//[], // todo Multiple Reward Tokens
        userTotalEarned: connected == true ? totalEarnedTemp : totalEarnedTemp, //[], // todo Multiple Reward Tokens

        userAvailableStakingBal: connected == true ? (ethers.utils.formatUnits(await getTokenBalanceOf(stakeToken, stateAppData.userAddress), await getTokenDecimals(stakeToken))) + ' ' + stakeTokenName : "N/a",
        adapterContracts: (await getAdapterInfos(adapter_id)).contracts
      }

      setStats(res);
      // console.log(" Info push: ", res)
    }

    if (lockData == false) {
      fetchData().then(() => {
        setLockData(false);
        renderVault()
        // setLoading(false);
      }, (raison) => {
        console.log("ERROR Pools infos fetch", raison)
        setLockData(false);
        // setLoading(false);
      });
    }
  }, [stateAppData.userAddress, vault, updateData])


  const handlePoolDeposit = async () => {
    const provider = await getProvider()
    const signer = provider.getSigner(stateAppData.userAddress);
    await approveTargetFT(stats.vaultAddress, userAmountInput, signer);
    await vaultDeposit(stats.vaultAddress, userAmountInput, signer)
    setUpdateData(!updateData);
  }

  const handlePoolWithdraw = async () => {
    const provider = await getProvider()
    const signer = provider.getSigner(stateAppData.userAddress);
    await vaultWithdraw(stats.vaultAddress, userAmountInput, signer)
    setUpdateData(!updateData);
  }

  const handlePoolClaim = async () => {
    const provider = await getProvider()
    const signer = provider.getSigner(stateAppData.userAddress);
    await vaultClaim(stats.vaultAddress, signer)
    setUpdateData(!updateData);
  }


  const mintTestToken = async () => {
    const provider = await getProvider()
    const signer = provider.getSigner(stateAppData.userAddress);
    await mintFakeToken(stateAppData.userAddress, signer);
    setUpdateData(!updateData);
  }

  const setMaxDepositInput = async () => {
    const maxBal = await balOfFakeToken(stateAppData.userAddress);
    setUserAmountInput(maxBal);
    renderVault()
  }


  const renderAction = () => {

    switch (actionPoolState) {
      case 'deposit':
        return (
          <>
            <div className='pt-4 pb-2 '>
              <Link className="text-start" href="https://app.mummy.finance/#/buy_mlp">Buy MLP</Link>
            </div>
            <div className="">Available: {stats.userAvailableStakingBal}</div>
            <div className=" bg-primary-black/70 rounded p-2 flex justify-between">
              <input className="placeholder-white w-3/4  bg-white/0	" placeholder="Enter Amount" onChange={e => setUserAmountInput(e.target.value)} value={userAmountInput} />
              <button className="hover:text-white text-gray-200" onClick={() => setMaxDepositInput()}>MAX</button>
            </div>
            <div className='py-4'>
            </div>
            <div className='flex justify-center gap-2'>
              {stateAppData.userAddress != '' && stateAppData.userAddress != 'connect to retrieve' ?
                <button onClick={() => handlePoolDeposit()} className='hover:font-semibold transition duration-500 ease transform hover:-translate-y-1 px-4 py-2'>Deposit</button>
                :
                <button onClick={() => setModaleConnectStatus(true)} className='hover:font-semibold transition duration-500 ease transform hover:-translate-y-1 px-4 py-2'>Connect Wallet</button>
              }

            </div>
          </>
        )
      case 'withdraw':
        return (
          <>
            <div className='pt-4 pb-2 '>
              <Link className="text-start" href="https://app.mummy.finance/#/buy_mlp">Buy MLP</Link>
            </div>
            <div className="">Total Staked: {stats.userDeposit}</div>
            <div className=" bg-primary-black/70 rounded p-2 flex justify-between">
              <input className="placeholder-white w-3/4  bg-white/0	" placeholder="Enter Amount" onChange={e => setUserAmountInput(e.target.value)} value={userAmountInput} />
              <button className="hover:text-white text-gray-200" onClick={() => setMaxDepositInput()}>MAX</button>
            </div>
            <div className='py-4'>
            </div>
            <div className='flex justify-center gap-2'>
              {stateAppData.userAddress != '' && stateAppData.userAddress != 'connect to retrieve' ?
                <button onClick={() => handlePoolWithdraw()} className='hover:font-semibold transition duration-500 ease transform hover:-translate-y-1 px-4 py-2'>Withdraw</button>
                :
                <button onClick={() => setModaleConnectStatus(true)} className='hover:font-semibold transition duration-500 ease transform hover:-translate-y-1 px-4 py-2'>Connect Wallet</button>
              }

            </div>
          </>
        )
      case 'claim':
        return (
          <>
          <div className='w-[250px] sm:w-[300px]'>

        <CoinCarousel coins={stats.userClaimable} displayNbMobile={2} />
          </div>

            <div className='flex justify-center gap-2'>
              {stateAppData.userAddress != '' && stateAppData.userAddress != 'connect to retrieve' ?
                <button onClick={() => handlePoolClaim()} className='hover:font-bold hover:border-white/60 rounded-xl hover:border font-semibold text-2xl border-b border-white/10 transition duration-500 ease transform hover:-translate-y-1 px-4 py-2'>Claim Reward</button>
                :
                <button onClick={() => setModaleConnectStatus(true)} className='hover:font-bold font-semibold text-2xl transition duration-500 ease transform hover:-translate-y-1 px-4 py-2'>Connect Wallet</button>
              }

            </div>
          </>
        )
      //   default:
      //     return null
    }


  }

  const renderVault = () => {
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

              {/* pool display */}
              <div className="pt-4 grid sm:grid-cols-2 ">

                {/* deposit / withdraw */}
                <div className='sm:col-span-1'>

                  <div className="bg-primary-black/90 sm:min-h-[340px] min-h-[380px] sm:flex sm:justify-center py-10 px-2 rounded-tl-[120px]  border border-white/10 backdrop-blur drop-shadow-lg ">
                    <div className=''>


                      <div className="flex justify-center ">
                        <button onClick={() => { setUserAmountInput(0); setActionPoolState("claim") }} className={actionPoolState == "claim" ? 'px-4 py-8 sm:py-4 rounded-sm  text-gray-200 text-bold' : 'hover:text-gray-300 transition ease transform hover:-translate-y-1 duration-1500 px-2 sm:px-4 py-2 rounded text-gray-500'}>Claim</button>
                        <button onClick={() => { setUserAmountInput(0); setActionPoolState("deposit") }} className={actionPoolState == "deposit" ? 'px-4 py-8 sm:py-4 rounded-sm  text-gray-200 text-bold' : 'hover:text-gray-300 transition ease transform hover:-translate-y-1 duration-1500 px-2  sm:px-4 py-2 rounded text-gray-500'}>Deposit</button>
                        <button onClick={() => { setUserAmountInput(0); setActionPoolState("withdraw") }} className={actionPoolState == "withdraw" ? 'px-4 py-8 sm:py-4 rounded-sm  text-gray-200 text-bold' : 'hover:text-gray-300 transition ease transform hover:-translate-y-1 duration-1500 px-2  sm:px-4 py-2 rounded text-gray-500'}>Withdraw</button>

                      </div>
                      <div className=' mb-4 h-[0.5px] w-full bg-white/30'></div>
                      {renderAction()}

                      {/* conditionnel if connected */}

                      {/* <button>Approve & Deposit</button> */}
                    </div>
                  </div>
                </div>

                {/* global infos cards */}
                <div className="bg-secondary-black/5 min-h-[330px] sm:min-h-[100px] flex justify-around items-center border border-white/10 backdrop-blur drop-shadow-lg ">


                    <div className='text-center flex flex-col gap-4'>
                      <h4 className='text-sm text-gray-300'>Total Earned</h4>
                      <div className='w-[120px] sm:w-[170px] md:w-[210px]'>

                              <CoinCarousel coins={stats.userTotalEarned} displayNbMobile={1} />
                              </div>

                    </div>

                  <div className='w-[1px] h-3/4 bg-white/30'></div>

                  <div className="grid sm:grid-cols-2 gap-2 sm:gap-4 w-1/3 text-center">
                    <div className="text-center">
                      <p className='text-lg font-bold tracking-tight text-white'>{stats.tvl}</p>
                      <h4 className='text-sm text-gray-300'>TVL</h4>
                    </div>
                    <div className="text-center">
                      <p className='text-lg text-center font-bold tracking-tight text-white'>X</p>
                      <h4 className='text-sm text-gray-300'>APR</h4>
                    </div>
                    <div className="text-center">
                      <p className='text-lg font-bold tracking-tight text-white'>0.1 %</p>
                      <h4 className='text-sm text-gray-300'>Fees on withdraw</h4>
                    </div>
                    <div className="text-center">
                      <p className='text-lg text-center font-bold tracking-tight text-white'>X</p>
                      <h4 className='text-sm text-gray-300'>Rewards / second</h4>
                    </div>
                    <div className='hidden sm:block sm:col-span-2 h-[1px] w-full bg-white/30'></div>

                    <div className="text-center sm:col-span-2 pt-4 ">
                      <p className='text-lg font-bold tracking-tight text-white'>{stats.userDeposit}</p>
                      <h4 className='text-sm text-gray-300'>Your Stake</h4>
                    </div>

                  </div>
                </div>

              </div>



            </div>

            {/* </motion.div> */}

            {/* Render Contracts Attached to Selected Vault */}
            <div className='grid sm:grid-cols-2 gap-4'>
              {stats.adapterContracts.map((contract, index) => {
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

  return (
    <>
      {renderVault()}
    </>
  )
}

export default VaultCard;