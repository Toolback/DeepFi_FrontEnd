import { useState, useEffect } from "react"
import { getProvider } from 'lib/bc/wallet-connect';
import { approveTargetDeepfi, transferDeepfi, setRewardsDuration, notifyRewardAmount, getDeployedPools } from 'lib/bc/smc';
import { AppDataStoreContext } from 'data/StoreAppData';
import { useContext } from 'react';
import { ethers } from 'ethers'
import { getVaultName, isVaultAdmin, setPauseVault } from "../../lib/bc/smc";
const Admin = ({ data }) => {
    const { stateAppData, dispatchAppData } = useContext(AppDataStoreContext);

    const [vaultAddress, setVaultAddress] = useState();
    const [newRewardDuration, setNewRewardDuration] = useState();
    const [newRewardAmount, setNewRewardAmount] = useState();
    const [userVaultAdminAddress, setUserVaultAdminAddress] = useState();
    const [userVaultAdminStatus, setUserVaultAdminStatus] = useState('N/a');


    const [adapterId, setAdapterId] = useState();


    const [deployedPools, setDeployedPools] = useState([
        {
            vaultId: 0,
            vaultAddress: '',
            vaultName: ""
        }])
        ;

    useEffect(() => {
        const fetchData = async () => {
            let i = 0;
            const deployedPools = await getDeployedPools();
            const buttons = []
            await deployedPools.forEach( async (i_address) => {
                // const res = await getVaultName(i_address);
                // console.log("Vault Name : ", vaultName);
                buttons.push(
                    {
                        vaultId: i,
                        vaultAddress: i_address,
                        vaultName: "MLP", // for now only one pool define later
                        // vaultName :  res,
                    }
                    )
                    renderDeployedVaults()
                // console.log(" Info push: ", pool)
                i++;
            })
            setDeployedPools(buttons)
            // return (poolsInfos)
        }


        fetchData().then((valeur) => {
            // console.log("All Pools Infos", valeur)
            // Promesse tenue
            renderDeployedVaults()
            // setLoading(false);
        }, (raison) => {
            // Rejet de la promesse
            console.log("ERROR Pools infos fetch", raison)

            // setLoading(false);

        });
    }, [])

    const handleSubmitVaultReward = async () => {
        const provider = await getProvider()
        const signer = provider.getSigner(stateAppData.userAddress);
        let tx;
        let receipt;
        // approve staking token transfer to vault 
        tx = await approveTargetDeepfi(vaultAddress, ethers.utils.parseUnits(newRewardAmount, 18), signer);
        // transfer reward to vault
        tx = await transferDeepfi(vaultAddress, ethers.utils.parseUnits(newRewardAmount, 18), signer);
        // set reward duration
        tx = await setRewardsDuration(vaultAddress, newRewardDuration, signer);

        // notify reward amount
        tx = await notifyRewardAmount(vaultAddress, ethers.utils.parseUnits(newRewardAmount, 18), signer);

    }

    const handleCheckUserAdminStatus = async (flag) => {
        if (flag != 1) {
            const res = await isVaultAdmin(vaultAddress, userVaultAdminAddress);
            console.log("User Admin ? ", res)
            if (res === true)
                setUserVaultAdminStatus("Yes");
            else 
                setUserVaultAdminStatus("Nop");
        }
        // else
        // {
        //     const res = await isAdapterAdmin(adapterId, address);
        //     return (res);
        // }

    }

    const handleSetVaultPause = async (flag) => {
        const provider = await getProvider()
        const signer = provider.getSigner(stateAppData.userAddress);
        if (flag === 1)
            await setPauseVault(vaultAddress, 1, signer);
        else
            await setPauseVault(vaultAddress, 0, signer);

    }

    const renderDeployedVaults = () => {
        console.log("Deployed POOls ", deployedPools)
        return (
            <>
                {deployedPools.map(item => {
                    return (
                        <div key={item.vaultId} className="bg-primary-black p-5 rounded flex flex-col gap-2 items-center">
                            <h4>{item.vaultName}</h4>
                            <div>
                                <p>Vault Address :</p>
                                <p>{item.vaultAddress}</p>
                            </div>
                        </div>
                    )
                })}
            </>
        )

    }

    return (
        <div className="flex flex-col gap-5 z-50 w-auto h-full">
            <div className="bg-white bg-opacity-10 rounded flex flex-col p-5 gap-5 items-center">
                <h3 className="">Deployed Vaults</h3>

                <div className="flex gap-5">
                    {renderDeployedVaults()}



                </div>
            </div>

            {/* Vault  */}

            <div className="bg-white bg-opacity-10 rounded flex flex-col p-5 gap-5 items-center">
                <h3 className="">Vaults Management</h3>

                <div className="flex  gap-5">
                    <div className="bg-primary-black p-5 rounded flex flex-col gap-2 items-center">
                        <h4>Setup Vault Reward</h4>
                        <div className="flex flex-col gap-2 justify-end">
                            <div>
                                <p>Vault Address :</p>
                                <input className="placeholder-white w-3/4 placeholder-opacity-75  bg-white bg-opacity-10 rounded	" placeholder="Enter Address" onChange={e => setVaultAddress(e.target.value)} value={vaultAddress} />
                            </div>
                            <div>
                                <p>New Reward Duration (seconds) :</p>
                                <input className="placeholder-white w-3/4 placeholder-opacity-75  bg-white bg-opacity-10 rounded	" placeholder="1 day = 86400 secs" onChange={e => setNewRewardDuration(e.target.value)} value={newRewardDuration} />
                            </div>
                            <div>
                                <p>New Reward Amount :</p>
                                <input className="placeholder-white w-3/4 placeholder-opacity-75  bg-white bg-opacity-10 rounded	" placeholder="Enter Amount" onChange={e => setNewRewardAmount(e.target.value)} value={newRewardAmount} />
                            </div>
                        </div>
                        <button onClick={() => handleSubmitVaultReward()} className=' hover:bg-purple-900 bg-white bg-opacity-10 rounded px-4 py-2'>Submit</button>
                        <p>(Multiple Transactions)</p>
                    </div>

                    <div className="bg-primary-black p-5 rounded flex flex-col gap-2 items-center">
                        <h4>Vault Admins</h4>

                        <div className="flex flex-col gap-2 justify-end">
                            <div>
                                <p>Vault Address :</p>
                                <input className="placeholder-white w-3/4 placeholder-opacity-75  bg-white bg-opacity-10 rounded	" placeholder="Enter Address" onChange={e => setVaultAddress(e.target.value)} value={vaultAddress} />
                            </div>
                            <div>
                                <p>User Address :</p>
                                <input className="placeholder-white w-3/4 placeholder-opacity-75  bg-white bg-opacity-10 rounded	" placeholder="Enter Address" onChange={e => setUserVaultAdminAddress(e.target.value)} value={userVaultAdminAddress} />
                            </div>
                            <div>
                                <div className="flex justify-between">
                                    <p>User Status :</p>
                                    <button onClick={() => handleCheckUserAdminStatus(0)}>O</button>
                                </div>
                                <p>{userVaultAdminStatus}</p>
                                {/* <input className="placeholder-white w-3/4 placeholder-opacity-75  bg-white bg-opacity-10 rounded	" placeholder="User Status" onChange={e => setNewRewardAmount(e.target.value)} value={newRewardAmount} /> */}
                            </div>
                        </div>

                        <button className='hover:bg-purple-900 bg-white bg-opacity-10 rounded px-4 py-2'>Set Admin</button>
                        <button className='hover:bg-purple-900 bg-white bg-opacity-10 rounded px-4 py-2'>Remove Admin</button>

                    </div>

                    <div className="bg-primary-black p-5 rounded flex flex-col gap-2 items-center">
                        <h4>Vault Status (Pause)</h4>

                        <div className="flex flex-col gap-2 justify-end">
                            <div>
                                <p>Vault Address :</p>
                                <input className="placeholder-white w-3/4 placeholder-opacity-75  bg-white bg-opacity-10 rounded	" placeholder="Enter Address" onChange={e => setVaultAddress(e.target.value)} value={vaultAddress} />
                            </div>
                            <div>
                                <p>Vault Status :</p>
                                {/* <input className="placeholder-white w-3/4 placeholder-opacity-75  bg-white bg-opacity-10 rounded	" placeholder="Enter Duration" onChange={e => setNewRewardDuration(e.target.value)} value={newRewardDuration} /> */}
                            </div>
                        </div>

                        <button onClick={() => handleSetVaultPause(1)} className='hover:bg-purple-900 bg-white bg-opacity-10 rounded px-4 py-2'>Pause</button>
                        <button onClick={() => handleSetVaultPause(0)} className='hover:bg-purple-900 bg-white bg-opacity-10 rounded px-4 py-2'>UnPause</button>

                    </div>
                </div>
            </div>

            {/* Adapters  */}

            <div className="bg-white bg-opacity-10 rounded flex flex-col p-5 gap-5 items-center">
                <h3 className="">Adapters Management</h3>
                <div className="flex gap-5">

                    <div className="bg-primary-black p-5 rounded flex flex-col gap-2 items-center">
                        <h4>Setup Adapter Infos</h4>

                        <div className="flex flex-col gap-2 justify-end">
                            <div>
                                <p>Adapter Id :</p>
                                <input className="placeholder-white w-3/4 placeholder-opacity-75  bg-white bg-opacity-10 rounded	" placeholder="Enter ID (MLP = 1)" onChange={e => setAdapterId(e.target.value)} value={adapterId} />

                            </div>
                            <div>
                                <p>New Reward Duration :</p>
                                <input className="placeholder-white w-3/4 placeholder-opacity-75  bg-white bg-opacity-10 rounded	" placeholder="Enter Duration" onChange={e => setNewRewardDuration(e.target.value)} value={newRewardDuration} />
                            </div>
                            <div>
                                <p>New Reward Amount :</p>
                                <input className="placeholder-white w-3/4 placeholder-opacity-75  bg-white bg-opacity-10 rounded	" placeholder="Enter Amount" onChange={e => setNewRewardAmount(e.target.value)} value={newRewardAmount} />
                            </div>
                        </div>

                        <button className='hover:bg-purple-900 bg-white bg-opacity-10 rounded px-4 py-2'>Submit</button>
                    </div>

                    <div className="bg-primary-black p-5 rounded flex flex-col gap-2 items-center">
                        <h4>Add Adapter Contracts Infos</h4>

                        <div className="flex flex-col gap-2 justify-end">
                            <div>
                                <p>Adapter Id :</p>
                                <input className="placeholder-white w-3/4 placeholder-opacity-75  bg-white bg-opacity-10 rounded	" placeholder="Enter ID (MLP = 1)" onChange={e => setAdapterId(e.target.value)} value={adapterId} />

                            </div>
                            <div>
                                <p>Contract Name :</p>
                                <input className="placeholder-white w-3/4 placeholder-opacity-75  bg-white bg-opacity-10 rounded	" placeholder="Enter Duration" onChange={e => setNewRewardDuration(e.target.value)} value={newRewardDuration} />
                            </div>
                            <div>
                                <p>Contract Description :</p>
                                <input className="placeholder-white w-3/4 placeholder-opacity-75  bg-white bg-opacity-10 rounded	" placeholder="Enter Amount" onChange={e => setNewRewardAmount(e.target.value)} value={newRewardAmount} />
                            </div>
                            <div>
                                <p>Contract Link :</p>
                                <input className="placeholder-white w-3/4 placeholder-opacity-75  bg-white bg-opacity-10 rounded	" placeholder="Enter Amount" onChange={e => setNewRewardAmount(e.target.value)} value={newRewardAmount} />
                            </div>
                        </div>

                        <button className='hover:bg-purple-900 bg-white bg-opacity-10 rounded px-4 py-2'>Submit</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Admin