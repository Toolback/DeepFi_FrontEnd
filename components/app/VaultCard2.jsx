import { useContext, useEffect, useState } from 'react';
import { AppDataStoreContext } from 'data/StoreAppData';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { slideIn } from 'utils/motion';
import { getProvider } from 'lib/bc/wallet-connect';
import { approveTargetFT, balOfFakeToken, getAdapterId, getAdapterInfos, getDeployedPools, getVaultEndRewardDuration, getVaultName, getVaultRewardDuration, getVaultRewardRate, getVaultRewardToken, getVaultTotalUserEarned, getVaultTVL, getVaultUserClaimable, getVaultUserDeposit, mintFakeToken, vaultClaim, vaultDeposit, vaultWithdraw } from 'lib/bc/smc'
import { BigNumber } from "ethers";
import ContractCard from './ContractInfoRenderer';


import StakeCard from 'components/app/_StakeCard copy';
import StakeNews from 'components/app/_StakeNews copy';


const VaultCard2 = ({ vault, setModaleConnectStatus }) => {
  const { stateAppData, dispatchAppData } = useContext(AppDataStoreContext);

  const [lockData, setLockData] = useState(false);
  const [userAmountInput, setUserAmountInput] = useState(0);
  const [updateData, setUpdateData] = useState(false);
  const [actionPoolState, setActionPoolState] = useState("deposit");


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
      userClaimable: 'N/a',
      userTotalEarned: 'N/a',
      adapterContracts: []
    })


  useEffect(() => {
    const fetchData = async () => {
      setLockData(true);
      
      
      // let testaddress = '0xc3fa3096A0853Ab1199eA504ad2C167a0eB92680'



      // setLoading(true);
      let connected = false;
      if (stateAppData.connected === true)
        connected = true;
      // console.log("Connected Status", connected)
      let adapter_id = await getAdapterId(vault.address);

      // let adapter_data = await getAdapterInfos(adapter_id);


      let rewardToken = await getVaultRewardToken(vault.address);
      let stakeTokenName = "MLP";
      let res =
      {
        vaultAddress: vault.address,
        adapterId: adapter_id,
        // adapterAddress: adapter_data.adapterAddress,
        adapterAddress: "",
        tvl: (await getVaultTVL(vault.address)).toString() + ' ' + stakeTokenName,
        rewardToken: rewardToken.substring(0, 5) + "..." + rewardToken.substring(rewardToken.length - 3),
        rewardFinishAt: (await getVaultEndRewardDuration(vault.address)).toString(),
        rewardDuration: (await getVaultRewardDuration(vault.address)).toString() + "Days",
        rewardRate: (await getVaultRewardRate(vault.address)).toString(),
        userDeposit: connected == true ? (await getVaultUserDeposit(vault.address, stateAppData.userAddress)).toString() + " MLP" : "N/a",
        userClaimable: connected == true ? (await getVaultUserClaimable(vault.address, stateAppData.userAddress)).toString() + " Deepfi" : "N/a",
        userTotalEarned: connected == true ? (await getVaultTotalUserEarned(vault.address, stateAppData.userAddress)).toString() : "N/a",
        userStakingBal: connected == true ? (await balOfFakeToken(stateAppData.userAddress)).toString() + " MLP" : "N/a",
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
            <div className="">Available: {stats.userStakingBal}</div>
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
              {stateAppData.connected === true ?
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
            <div className='pt-4 pb-2'>
              <Link className="text-start" href="https://app.mummy.finance/#/buy_mlp">Buy MLP</Link>
            </div>
            <div className="">To Claim: {stats.userClaimable}</div>
            <div className=" bg-primary-black/70 rounded p-2 flex justify-between">
              <input className="placeholder-white w-3/4  bg-white/0	" placeholder="Enter Amount" onChange={e => setUserAmountInput(e.target.value)} value={userAmountInput} />
              <button className="hover:text-white text-gray-200" onClick={() => setMaxDepositInput()}>MAX</button>
            </div>
            <div className='py-4'>
            </div>
            <div className='flex justify-center gap-2'>
              {stateAppData.connected === true ?
                <button onClick={() => handlePoolClaim()} className='hover:font-semibold transition duration-500 ease transform hover:-translate-y-1 px-4 py-2'>Claim</button>
                :
                <button onClick={() => setModaleConnectStatus(true)} className='hover:font-semibold transition duration-500 ease transform hover:-translate-y-1 px-4 py-2'>Connect Wallet</button>
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


<StakeNews>
      <StakeCard />
      </StakeNews>

        <div className="bg-primary-black/80 sm:flex sm:justify-center py-10 px-2 rounded-tl-[120px]  border border-white/10 backdrop-blur drop-shadow-lg ">
          <div className=''>


            <div className="flex justify-center ">
              <button 
                onClick={() => { setUserAmountInput(0); setActionPoolState("deposit") }} 
                className={actionPoolState == "deposit" ? 'hover:bg-purple-900 border sm:border-white/10 sm:bg-purple-900 px-4 py-2 rounded border-b-white/50 text-gray-300' : 'hover:bg-purple-900 border sm:border-white/10 sm:bg-primary-black px-2  sm:px-4 py-2 rounded text-gray-300'}
              >
                Deposit
              </button>
              <button 
                onClick={() => { setUserAmountInput(0); setActionPoolState("withdraw") }} 
                className={actionPoolState == "withdraw" ? 'hover:bg-purple-900 border sm:border-white/10 sm:bg-purple-900 px-4 py-2 rounded border-b-white/50 text-gray-300' : 'hover:bg-purple-900 border sm:border-white/10 sm:bg-primary-black px-2  sm:px-4 py-2 rounded text-gray-300'}
              >
                Withdraw
              </button>
              <button 
                onClick={() => { setUserAmountInput(0); setActionPoolState("claim") }} 
                className={actionPoolState == "claim" ? 'hover:bg-purple-900 border sm:border-white/10 sm:bg-purple-900 px-4 py-2 rounded border-b-white/50 text-gray-300' : 'hover:bg-purple-900 border sm:border-white/10 sm:bg-primary-black px-2 sm:px-4 py-2 rounded text-gray-300'}
              >
                Claim
              </button>
            </div>
            <div className='mt-5 h-[0.5px] w-full bg-white/30'></div>
            {renderAction()}

            {/* conditionnel if connected */}

            {/* <button>Approve & Deposit</button> */}
          </div>
        </div>



        {/* Render Contracts Attached to Selected Vault */}
        <div className='grid sm:grid-cols-2 gap-4'>
          {stats.adapterContracts.map(contract => {
            console.log("1 CONTRACT RETRIEVED ", contract)
            return (
              <ContractCard contract={contract} />
              )
            })}
        </div>

      </>
    )
  }

  return (
    <>
      {renderVault()}
    </>
  )
}

export default VaultCard2;