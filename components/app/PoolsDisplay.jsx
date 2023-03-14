import Link from 'next/link';
import { AppDataStoreContext } from 'data/StoreAppData';
import { useContext, useEffect, useState } from 'react';

import { approveTargetFT, balOfDeepfi, balOfFakeToken, getAdapterId, getAdapterInfos, getDeployedPools, getVaultEndRewardDuration, getVaultName, getVaultRewardDuration, getVaultRewardRate, getVaultRewardToken, getVaultTotalUserEarned, getVaultTVL, getVaultUserClaimable, getVaultUserDeposit, mintFakeToken, vaultClaim, vaultDeposit, vaultWithdraw } from '../../lib/bc/smc'
import { BigNumber } from "ethers";
import { getProvider } from 'lib/bc/wallet-connect';


const PoolsDisplay = ({ pool, setModaleConnectStatus }) => {
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
    // console.log(" Pool retrieved by compo: ", pool)

    // const [actualStats, setActualStats] = useState([null]);

    // useEffect(() => {
    //   setActualStats(pool);
    //   renderPools()
    // }, [pool]);
    // // console.log("stateAppData",stateAppData)


    useEffect(() => {
        const fetchData = async () => {
            setLockData(true);
            // setLoading(true);
            let connected = false;
            if (stateAppData.userAddress != "" && stateAppData.userAddress != "connect to retrieve")
                connected = true;
            // console.log("Connected Status", connected)
            let adapter_id = await getAdapterId(pool.vaultAddress);

            // let adapter_data = await getAdapterInfos(adapter_id);


            let rewardToken = await getVaultRewardToken(pool.vaultAddress);
            let stakeTokenName = "MLP";
            let res =
            {
                vaultAddress: pool.vaultAddress,
                adapterId: adapter_id,
                // adapterAddress: adapter_data.adapterAddress,
                adapterAddress: "",
                tvl: (await getVaultTVL(pool.vaultAddress)).toString() + ' ' + stakeTokenName,
                rewardToken: rewardToken.substring(0, 5) + "..." + rewardToken.substring(rewardToken.length - 3),
                rewardFinishAt: (await getVaultEndRewardDuration(pool.vaultAddress)).toString(),
                rewardDuration: (await getVaultRewardDuration(pool.vaultAddress)).toString() + "Days",
                rewardRate: (await getVaultRewardRate(pool.vaultAddress)).toString(),
                userDeposit: connected == true ? (await getVaultUserDeposit(pool.vaultAddress, stateAppData.userAddress)).toString() + " MLP" : "N/a",
                userClaimable: connected == true ? (await getVaultUserClaimable(pool.vaultAddress, stateAppData.userAddress)).toString() + " Deepfi" : "N/a",
                userTotalEarned: connected == true ? (await getVaultTotalUserEarned(pool.vaultAddress, stateAppData.userAddress)).toString() : "N/a",
                userStakingBal: connected == true ? (await balOfFakeToken(stateAppData.userAddress)).toString() + " MLP" : "N/a",
                adapterContracts: (await getAdapterInfos(adapter_id)).contracts
            }

            setStats(res);
            // console.log(" Info push: ", res)
            // return ()
        }

        if (lockData == false) {

            fetchData().then((valeur) => {
                // console.log("All Pools Infos", valeur)
                // Promesse tenue
                setLockData(false);
                renderPools()
                // setLoading(false);
            }, (raison) => {
                // Rejet de la promesse
                console.log("ERROR Pools infos fetch", raison)

                setLockData(false);
                // setLoading(false);

            });
        }
    }, [stateAppData.userAddress, pool, updateData])


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
        renderPools()
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
                        <div className=" bg-primary-black bg-opacity-70 rounded p-2 flex justify-between">
                            <input className="placeholder-white w-3/4  bg-white bg-opacity-0	" placeholder="Enter Amount" onChange={e => setUserAmountInput(e.target.value)} value={userAmountInput} />
                            <button onClick={() => setMaxDepositInput()}>MAX</button>
                        </div>
                        <div className='py-4'>
                        </div>
                        <div className='flex justify-center gap-2'>
                            {stateAppData.userAddress != '' && stateAppData.userAddress != 'connect to retrieve' ?
                                <button onClick={() => handlePoolDeposit()} className='hover:bg-purple-900 bg-primary-black bg-opacity-70 rounded px-4 py-2'>Deposit</button>
                                :
                                <button onClick={() => setModaleConnectStatus(true)} className='hover:bg-purple-900 bg-primary-black bg-opacity-70 rounded px-4 py-2'>Connect Wallet</button>
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
                        <div className=" bg-primary-black bg-opacity-70 rounded p-2 flex justify-between">
                            <input className="placeholder-white w-3/4  bg-white bg-opacity-0	" placeholder="Enter Amount" onChange={e => setUserAmountInput(e.target.value)} value={userAmountInput} />
                            <button onClick={() => setMaxDepositInput()}>MAX</button>
                        </div>
                        <div className='py-4'>
                        </div>
                        <div className='flex justify-center gap-2'>
                            {stateAppData.userAddress != '' && stateAppData.userAddress != 'connect to retrieve' ?
                                <button onClick={() => handlePoolWithdraw()} className='hover:bg-purple-900 bg-primary-black bg-opacity-70 rounded px-4 py-2'>Withdraw</button>
                                :
                                <button onClick={() => setModaleConnectStatus(true)} className='hover:bg-purple-900 bg-primary-black bg-opacity-70 rounded px-4 py-2'>Connect Wallet</button>
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
                        <div className=" bg-primary-black bg-opacity-70 rounded p-2 flex justify-between">
                            <input className="placeholder-white w-3/4  bg-white bg-opacity-0	" placeholder="Enter Amount" onChange={e => setUserAmountInput(e.target.value)} value={userAmountInput} />
                            <button onClick={() => setMaxDepositInput()}>MAX</button>
                        </div>
                        <div className='py-4'>
                        </div>
                        <div className='flex justify-center gap-2'>
                            {stateAppData.userAddress != '' && stateAppData.userAddress != 'connect to retrieve' ?
                                <button onClick={() => handlePoolClaim()} className='hover:bg-purple-900 bg-primary-black bg-opacity-70 rounded px-4 py-2'>Claim</button>
                                :
                                <button onClick={() => setModaleConnectStatus(true)} className='hover:bg-purple-900 bg-primary-black bg-opacity-70 rounded px-4 py-2'>Connect Wallet</button>
                            }

                        </div>
                    </>
                )
            //   default:
            //     return null
        }


    }

    const renderPools = () => {
        // console.log("POOOL Retrieved", pool)
        return (
            <div className="sm:flex sm:flex-col">

                {/* pool display */}
                <div className="pt-4 grid sm:grid-cols-2 gap-4">

                    {/* deposit / withdraw */}
                    <div className='sm:col-span-1'>

                        <div className=" py-6 px-2  sm:flex sm:justify-center border border-white border-opacity-10 drop-shadow-lg bg-black bg-opacity-10 rounded ">
                            <div className=''>


                                <div className="flex justify-center ">
                                    <button onClick={() => { setUserAmountInput(0); setActionPoolState("deposit") }} className={actionPoolState == "deposit" ? 'hover:bg-purple-900 border border-white border-opacity-10 bg-purple-900 px-4 py-2 rounded text-gray-300' : 'hover:bg-purple-900 border border-white border-opacity-10 bg-primary-black px-4 py-2 rounded text-gray-300'}>Deposit</button>
                                    <button onClick={() => { setUserAmountInput(0); setActionPoolState("withdraw") }} className={actionPoolState == "withdraw" ? 'hover:bg-purple-900 border border-white border-opacity-10 bg-purple-900 px-4 py-2 rounded text-gray-300' : 'hover:bg-purple-900 border border-white border-opacity-10 bg-primary-black px-4 py-2 rounded text-gray-300'}>Withdraw</button>
                                    <button onClick={() => { setUserAmountInput(0); setActionPoolState("claim") }} className={actionPoolState == "claim" ? 'hover:bg-purple-900 border border-white border-opacity-10 bg-purple-900 px-4 py-2 rounded text-gray-300' : 'hover:bg-purple-900 border border-white border-opacity-10 bg-primary-black px-4 py-2 rounded text-gray-300'}>Claim</button>

                                </div>
                                <div className='mt-6 h-[1px] w-full bg-gray-600'></div>
                                {renderAction()}

                                {/* conditionnel if connected */}

                                {/* <button>Approve & Deposit</button> */}
                            </div>
                        </div>
                    </div>

                    {/* global infos cards */}
                    <div className="border border-white border-opacity-10 drop-shadow-lg bg-white/5 p-4 sm:p-6 sm:py-8 rounded flex items-center justify-around">

                        <div className="flex flex-col gap-5">
                            <div className="">
                                <h4 className='text-gray-300'>TVL</h4>
                                <p className='text-lg font-bold tracking-tight text-white'>{stats.tvl}</p>
                            </div>
                            <div className="">
                                <h4 className='text-gray-300'>Reward</h4>
                                <p className='text-lg font-bold tracking-tight text-white'>{stats.rewardAmount} {stats.rewardToken}</p>
                            </div>
                            <div className="">
                                <h4 className='text-gray-300'>Duration</h4>
                                <p className='text-lg font-bold tracking-tight text-white'>{stats.rewardDuration}</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-5">
                            <div className="">
                                <h4 className='text-gray-300'>Your Deposit</h4>
                                <p className='text-lg font-bold tracking-tight text-white'>{stats.userDeposit}</p>
                            </div>
                            <div className="">
                                <h4 className='text-gray-300'>To Claim</h4>
                                <p className='text-lg font-bold tracking-tight text-white'>{stats.userClaimable}</p>
                            </div>
                        </div>
                    </div>

                    {/* personal infos cards */}
                    {/* <div className="border border-white border-opacity-10 drop-shadow-lg bg-white bg-opacity-5 p-4 sm:p-6 sm:py-8 rounded flex justify-between">
                        <div className="">
                            <h4 className='text-gray-300'>Your Deposit</h4>
                            <p>{stats.userDeposit}</p>
                        </div>
                        <div className="">
                            <h4 className='text-gray-300'>To Claim</h4>
                            <p>{stats.userClaimable}</p>
                        </div>
                    </div> */}






                    {/* Contracts card */}
                    {stats.adapterContracts.map(item => {
                        return (
                            <dl key={item.name} className="border border-white border-opacity-20 drop-shadow-lg rounded p-2">
                                <div className="pb-2 flex justify-between">
                                    <h3 className="font-extrabold">{item.name}</h3>
                                    <Link href={item.link}>
                                        <button className="text-blue-400">Contract</button>
                                    </Link>
                                </div>
                                <p>{item.description}</p>
                            </dl>

                        )
                    })}

                    {/* <div className="border border-white border-opacity-20 rounded p-2">
                        <div className="pb-2 flex justify-between">
                            <h3 className="font-extrabold">MLP</h3>
                            <button className="text-blue-400">Contract</button>
                        </div>
                        <p>Lorem Ipsum </p>
                    </div> */}
                </div>
            </div>

        )
    }


    return (
        <div className="w-full pb-10">
            {renderPools()}
        </div>
    )
}



export default PoolsDisplay;