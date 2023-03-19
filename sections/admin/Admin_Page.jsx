import { useState, useEffect } from "react"
import { getProvider } from 'lib/bc/wallet-connect';
import { approveTargetDeepfi, transferDeepfi, setRewardsDuration, notifyRewardAmount, getDeployedPools } from 'lib/bc/smc';
import { AppDataStoreContext } from 'data/StoreAppData';
import { useContext } from 'react';
import { ethers } from 'ethers'
import { addAdapterContractInfo, deleteAdapterContractInfo, getPausedVaultStatus, getVaultName, isAdapterAdmin, isHandlerAdmin, isVaultAdmin, removeAdapterAdmin, removeHandlerAdmin, removeVaultAdmin, setNewAdapterAdmin, setNewHandlerAdmin, setNewVaultAdmin, setPauseVault } from "../../lib/bc/smc";
const Admin_Page = ({ data }) => {
    const { stateAppData, dispatchAppData } = useContext(AppDataStoreContext);

    const [vaultAddress, setVaultAddress] = useState();
    const [newRewardDuration, setNewRewardDuration] = useState();
    const [newRewardAmount, setNewRewardAmount] = useState();
    const [userAdminAddress, setUserAdminAddress] = useState();
    const [userVaultAdminStatus, setUserVaultAdminStatus] = useState('N/a');
    const [vaultPausedStatus, setVaultPausedStatus] = useState('N/a');

    const [userHandlerAdminStatus, setUserHandlerAdminStatus] = useState('N/a');


    const [adapterId, setAdapterId] = useState();
    const [userAdapterAdminStatus, setUserAdapterAdminStatus] = useState('N/a');

    const [adapterContractName, setAdapterContractName] = useState();
    const [adapterContractDescription, setAdapterContractDescription] = useState();
    const [adapterContractLink, setAdapterContractLink] = useState();
    const [adapterContractIndex, setAdapterContractIndex] = useState();

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
            await deployedPools.forEach(async (i_address) => {
                // const res = await getVaultName(i_address);
                // console.log("Vault Name : ", vaultName);
                buttons.push({
                        vaultId: i,
                        vaultAddress: i_address,
                        vaultName: "MLP", // for now only one pool define later
                        // vaultName :  res,
                    })
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

        // approve staking token transfer to vault 
        await approveTargetDeepfi(vaultAddress, ethers.utils.parseUnits(newRewardAmount, 18), signer);
        // transfer reward to vault
        await transferDeepfi(vaultAddress, ethers.utils.parseUnits(newRewardAmount, 18), signer);
        // set reward duration
        await setRewardsDuration(vaultAddress, newRewardDuration, signer);

        // notify reward amount
        await notifyRewardAmount(vaultAddress, ethers.utils.parseUnits(newRewardAmount, 18), signer);

    }

    const handleCheckUserAdminStatus = async (flag) => {
        if (flag === 0) {
            const res = await isVaultAdmin(vaultAddress, userAdminAddress);
            if (res === true)
                setUserVaultAdminStatus("Yes");
            else
                setUserVaultAdminStatus("Nop");
        }
        else if (flag === 1) {
            const res = await isHandlerAdmin(userAdminAddress);
            if (res === true)
                setUserHandlerAdminStatus("Yes");
            else
                setUserHandlerAdminStatus("Nop");
        }
        else if (flag === 2) {
            const res = await isAdapterAdmin(userAdminAddress);
            if (res === true)
                setUserAdapterAdminStatus("Yes");
            else
                setUserAdapterAdminStatus("Nop");
        }

    }

    const handleSetAdmin = async (flag1, flag2) => {
        const provider = await getProvider()
        const signer = provider.getSigner(stateAppData.userAddress);
        if (flag1 === 0) {
            if (flag2 === 1)
                await setNewVaultAdmin(vaultAddress, userAdminAddress, signer);
            else
                await removeVaultAdmin(vaultAddress, userAdminAddress, signer);
        }
        else if (flag1 === 1) {
            if (flag2 === 1)
                await setNewHandlerAdmin(userAdminAddress, signer);
            else
                await removeHandlerAdmin(userAdminAddress, signer);
        }
        else if (flag1 === 2) {
            if (flag2 === 1)
                await setNewAdapterAdmin(userAdminAddress, signer);
            else
                await removeAdapterAdmin(userAdminAddress, signer);
        }
    }

    const handleCheckVaultPausedStatus = async () => {
        const res = await getPausedVaultStatus(vaultAddress);
        if (res === true)
            setVaultPausedStatus("Vault in Pause");
        else
            setVaultPausedStatus("Vault in Action");
    }

    const handleSetVaultPause = async (flag) => {
        const provider = await getProvider()
        const signer = provider.getSigner(stateAppData.userAddress);
        if (flag === 1)
            await setPauseVault(vaultAddress, 1, signer);
        else
            await setPauseVault(vaultAddress, 0, signer);     
    }

    const handleAddNewContractInfo = async () => {
        const provider = await getProvider()
        const signer = provider.getSigner(stateAppData.userAddress);
        await addAdapterContractInfo(adapterId, adapterContractName, adapterContractDescription, adapterContractLink, signer)  
    }

    const handleRemoveContractInfo = async () => {
        const provider = await getProvider()
        const signer = provider.getSigner(stateAppData.userAddress);
        await deleteAdapterContractInfo(adapterId, adapterContractIndex, signer);
    }

    const renderDeployedVaults = () => {
        // console.log("Deployed POOls ", deployedPools)
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
            <div className="bg-purple-500/10 back rounded flex flex-col p-5 gap-5 items-center">
                <h3 className="">Deployed Vaults</h3>

                <div className="flex gap-5">
                    {renderDeployedVaults()}



                </div>
            </div>

            {/* Vault  */}

            <div className="bg-purple-500/10 back rounded flex flex-col p-5 gap-5 items-center">
                <h3 className="">Vaults Management</h3>

                <div className="flex  gap-5">
                    <div className="bg-primary-black p-5 rounded flex flex-col gap-2 items-center">
                        <h4>Setup Vault Reward</h4>
                        <div className="flex flex-col gap-2 justify-end">
                            <div>
                                <p>Vault Address :</p>
                                <input className="placeholder-white w-3/4 placeholder-opacity-75  bg-purple-500/10 back rounded	" placeholder="Enter Address" onChange={e => setVaultAddress(e.target.value)} value={vaultAddress} />
                            </div>
                            <div>
                                <p>New Reward Duration (seconds) :</p>
                                <input className="placeholder-white w-3/4 placeholder-opacity-75  bg-purple-500/10 back rounded	" placeholder="1 day = 86400 secs" onChange={e => setNewRewardDuration(e.target.value)} value={newRewardDuration} />
                            </div>
                            <div>
                                <p>New Reward Amount :</p>
                                <input className="placeholder-white w-3/4 placeholder-opacity-75  bg-purple-500/10 back rounded	" placeholder="Enter Amount" onChange={e => setNewRewardAmount(e.target.value)} value={newRewardAmount} />
                            </div>
                        </div>
                        <button onClick={() => handleSubmitVaultReward()} className=' hover:bg-purple-900 bg-purple-500/10 back rounded px-4 py-2'>Submit</button>
                        <p>(Multiple Transactions)</p>
                    </div>

                    <div className="bg-primary-black p-5 rounded flex flex-col gap-2 items-center">
                        <h4>Vault Admins</h4>

                        <div className="flex flex-col gap-2 justify-end">
                            <div>
                                <p>Vault Address :</p>
                                <input className="placeholder-white w-3/4 placeholder-opacity-75  bg-purple-500/10 back rounded	" placeholder="Enter Address" onChange={e => setVaultAddress(e.target.value)} value={vaultAddress} />
                            </div>
                            <div>
                                <p>User Address :</p>
                                <input className="placeholder-white w-3/4 placeholder-opacity-75  bg-purple-500/10 back rounded	" placeholder="Enter Address" onChange={e => setUserAdminAddress(e.target.value)} value={userAdminAddress} />
                            </div>
                            <div>
                                <div className="flex justify-between">
                                    <p>User Status :</p>
                                    <button onClick={() => handleCheckUserAdminStatus(0)}>O</button>
                                </div>
                                <p>{userVaultAdminStatus}</p>
                                {/* <input className="placeholder-white w-3/4 placeholder-opacity-75  bg-purple-500/10 back rounded	" placeholder="User Status" onChange={e => setNewRewardAmount(e.target.value)} value={newRewardAmount} /> */}
                            </div>
                        </div>

                        <button onClick={() => handleSetAdmin(0, 1)} className='hover:bg-purple-900 bg-purple-500/10 back rounded px-4 py-2'>Set Admin</button>
                        <button onClick={() => handleSetAdmin(0, 0)} className='hover:bg-purple-900 bg-purple-500/10 back rounded px-4 py-2'>Remove Admin</button>

                    </div>

                    <div className="bg-primary-black p-5 rounded flex flex-col gap-2 items-center">
                        <h4>Vault Status (Pause)</h4>

                        <div className="flex flex-col gap-2 justify-end">
                            <div>
                                <p>Vault Address :</p>
                                <input className="placeholder-white w-3/4 placeholder-opacity-75  bg-purple-500/10 back rounded	" placeholder="Enter Address" onChange={e => setVaultAddress(e.target.value)} value={vaultAddress} />
                            </div>
                            <div>
                                <div className="flex justify-between">
                                    <p>Vault Status :</p>
                                    <button onClick={() => handleCheckVaultPausedStatus()}>O</button>
                                </div>
                                <p>{vaultPausedStatus}</p>
                                {/* <input className="placeholder-white w-3/4 placeholder-opacity-75  bg-purple-500/10 back rounded	" placeholder="Enter Duration" onChange={e => setNewRewardDuration(e.target.value)} value={newRewardDuration} /> */}
                            </div>
                        </div>

                        <button onClick={() => handleSetVaultPause(1)} className='hover:bg-purple-900 bg-purple-500/10 back rounded px-4 py-2'>Pause</button>
                        <button onClick={() => handleSetVaultPause(0)} className='hover:bg-purple-900 bg-purple-500/10 back rounded px-4 py-2'>UnPause</button>

                    </div>
                </div>
            </div>

            {/* Liquidity Handler */}

            <div className="bg-purple-500/10 back rounded flex flex-col p-5 gap-5 items-center">
                <h3 className="">Liquidity Handler Management</h3>
                <div className="flex gap-5">

                    <div className="bg-primary-black p-5 rounded flex flex-col gap-2 items-center">
                        <h4>Handler Admins</h4>

                        <div className="flex flex-col gap-2 justify-end">

                            <div>
                                <p>User Address :</p>
                                <input className="placeholder-white w-3/4 placeholder-opacity-75  bg-purple-500/10 back rounded	" placeholder="Enter Address" onChange={e => setUserAdminAddress(e.target.value)} value={userAdminAddress} />
                            </div>
                            <div>
                                <div className="flex justify-between">
                                    <p>User Status :</p>
                                    <button onClick={() => handleCheckUserAdminStatus(1)}>O</button>
                                </div>
                                <p>{userHandlerAdminStatus}</p>
                                {/* <input className="placeholder-white w-3/4 placeholder-opacity-75  bg-purple-500/10 back rounded	" placeholder="User Status" onChange={e => setNewRewardAmount(e.target.value)} value={newRewardAmount} /> */}
                            </div>
                        </div>

                        <button onClick={() => handleSetAdmin(1, 1)} className='hover:bg-purple-900 bg-purple-500/10 back rounded px-4 py-2'>Set Admin</button>
                        <button onClick={() => handleSetAdmin(1, 0)} className='hover:bg-purple-900 bg-purple-500/10 back rounded px-4 py-2'>Remove Admin</button>

                    </div>


                    <div className="bg-primary-black p-5 rounded flex flex-col gap-2 items-center">
                        <h4>Add Adapter Contracts Infos</h4>

                        <div className="flex flex-col gap-2 justify-end">
                            <div>
                                <p>Adapter Id :</p>
                                <input className="placeholder-white w-3/4 placeholder-opacity-75  bg-purple-500/10 back rounded	" placeholder="Enter ID (MLP = 1)" onChange={e => setAdapterId(e.target.value)} value={adapterId} />

                            </div>
                            <div>
                                <p>Contract Name :</p>
                                <input className="placeholder-white w-3/4 placeholder-opacity-75  bg-purple-500/10 back rounded	" placeholder="Ex : MLP" onChange={e => setAdapterContractName(e.target.value)} value={adapterContractName} />
                            </div>
                            <div>
                                <p>Contract Description :</p>
                                <input className="placeholder-white w-3/4 placeholder-opacity-75  bg-purple-500/10 back rounded	" placeholder="Ex : Mummy token etc" onChange={e => setAdapterContractDescription(e.target.value)} value={adapterContractDescription} />
                            </div>
                            <div>
                                <p>Contract Link :</p>
                                <input className="placeholder-white w-3/4 placeholder-opacity-75  bg-purple-500/10 back rounded	" placeholder="Fantom scan link" onChange={e => setAdapterContractLink(e.target.value)} value={adapterContractLink} />
                            </div>
                        </div>

                        <button onClick={() => handleAddNewContractInfo()} className='hover:bg-purple-900 bg-purple-500/10 back rounded px-4 py-2'>Submit</button>
                    </div>


                    <div className="bg-primary-black p-5 rounded flex flex-col gap-2 items-center">
                        <h4>Remove Adapters Contracts Infos</h4>

                        <div className="flex flex-col gap-2 justify-end">
                            <div>
                                <p>Adapter Id :</p>
                                <input className="placeholder-white w-3/4 placeholder-opacity-75  bg-purple-500/10 back rounded	" placeholder="Enter ID (MLP = 1)" onChange={e => setAdapterId(e.target.value)} value={adapterId} />

                            </div>
                            <div>
                                <p>Contract Index (start at 0) : </p>
                                <input className="placeholder-white w-3/4 placeholder-opacity-75  bg-purple-500/10 back rounded	" placeholder="Enter Index" onChange={e => setAdapterContractIndex(e.target.value)} value={adapterContractIndex} />
                            </div>

                        </div>

                        <button onClick={() => handleRemoveContractInfo()} className='hover:bg-purple-900 bg-purple-500/10 back rounded px-4 py-2'>Submit</button>
                    </div>

                    {/* <div className="bg-primary-black p-5 rounded flex flex-col gap-2 items-center">
                        <h4>Add Adapter Contracts Infos</h4>

                        <div className="flex flex-col gap-2 justify-end">
                            <div>
                                <p>Adapter Id :</p>
                                <input className="placeholder-white w-3/4 placeholder-opacity-75  bg-purple-500/10 back rounded	" placeholder="Enter ID (MLP = 1)" onChange={e => setAdapterId(e.target.value)} value={adapterId} />

                            </div>
                            <div>
                                <p>Contract Name :</p>
                                <input className="placeholder-white w-3/4 placeholder-opacity-75  bg-purple-500/10 back rounded	" placeholder="Enter Duration" onChange={e => setNewRewardDuration(e.target.value)} value={newRewardDuration} />
                            </div>
                            <div>
                                <p>Contract Description :</p>
                                <input className="placeholder-white w-3/4 placeholder-opacity-75  bg-purple-500/10 back rounded	" placeholder="Enter Amount" onChange={e => setNewRewardAmount(e.target.value)} value={newRewardAmount} />
                            </div>
                            <div>
                                <p>Contract Link :</p>
                                <input className="placeholder-white w-3/4 placeholder-opacity-75  bg-purple-500/10 back rounded	" placeholder="Enter Amount" onChange={e => setNewRewardAmount(e.target.value)} value={newRewardAmount} />
                            </div>
                        </div>

                        <button className='hover:bg-purple-900 bg-purple-500/10 back rounded px-4 py-2'>Submit</button>
                    </div> */}
                </div>
            </div>


            {/* Adapters  */}

            <div className="bg-purple-500/10 back rounded flex flex-col p-5 gap-5 items-center">
                <h3 className="">MLP Adapter Management</h3>
                <div className="flex gap-5">

                    <div className="bg-primary-black p-5 rounded flex flex-col gap-2 items-center">
                        <h4>Adapter Admins</h4>

                        <div className="flex flex-col gap-2 justify-end">
                            <div>
                                <p>Adapter Id :</p>
                                <input className="placeholder-white w-3/4 placeholder-opacity-75  bg-purple-500/10 back rounded	" placeholder="Enter ID (MLP = 1)" onChange={e => setAdapterId(e.target.value)} value={adapterId} />

                            </div>
                            <div>
                                <p>User Address :</p>
                                <input className="placeholder-white w-3/4 placeholder-opacity-75  bg-purple-500/10 back rounded	" placeholder="Enter Address" onChange={e => setUserAdminAddress(e.target.value)} value={userAdminAddress} />
                            </div>
                            <div>
                                <div className="flex justify-between">
                                    <p>User Status :</p>
                                    <button onClick={() => handleCheckUserAdminStatus(2)}>O</button>
                                </div>
                                <p>{userAdapterAdminStatus}</p>
                                {/* <input className="placeholder-white w-3/4 placeholder-opacity-75  bg-purple-500/10 back rounded	" placeholder="User Status" onChange={e => setNewRewardAmount(e.target.value)} value={newRewardAmount} /> */}
                            </div>
                        </div>

                        <button onClick={() => handleSetAdmin(2, 1)} className='hover:bg-purple-900 bg-purple-500/10 back rounded px-4 py-2'>Set Admin</button>
                        <button onClick={() => handleSetAdmin(2, 0)} className='hover:bg-purple-900 bg-purple-500/10 back rounded px-4 py-2'>Remove Admin</button>

                    </div>


                </div>
            </div>



        </div>
    )
}

export default Admin_Page