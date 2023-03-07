import { useState } from "react"

const Admin = ({ data }) => {
    const [vaultId, setVaultId] = useState();
    const [newRewardDuration, setNewRewardDuration] = useState();
    const [newRewardAmount, setNewRewardAmount] = useState();

    return (
        <div className="flex flex-col gap-5 z-50 w-auto h-full">
            <div className="bg-white bg-opacity-10 rounded flex flex-col p-5 gap-5 items-center">
                <h3 className="">Vaults Management</h3>

                <div className="flex gap-5">
                    <div className="bg-primary-black p-5 rounded flex flex-col gap-2 items-center">
                        <h4>Setup Vault Reward</h4>
                        <div>
                            <p>Vault Id :</p>
                            <input className="placeholder-white w-3/4  bg-white bg-opacity-10 rounded	" placeholder="Enter ID (MLP = 1)" onChange={e => setVaultId(e.target.value)} value={vaultId} />
                        </div>
                        <div>
                            <p>New Reward Duration :</p>
                            <input className="placeholder-white w-3/4  bg-white bg-opacity-10 rounded	" placeholder="Enter Duration" onChange={e => setNewRewardDuration(e.target.value)} value={newRewardDuration} />
                        </div>
                        <div>
                            <p>New Reward Amount :</p>
                            <input className="placeholder-white w-3/4  bg-white bg-opacity-10 rounded	" placeholder="Enter Amount" onChange={e => setNewRewardAmount(e.target.value)} value={newRewardAmount} />
                        </div>
                        <button className='hover:bg-purple-900 bg-white bg-opacity-10 rounded px-4 py-2'>Submit</button>
                    </div>

                    <div className="bg-primary-black p-5 rounded flex flex-col gap-2 items-center">
                        <h4>Vault Admins</h4>
                        <div>
                            <p>Vault Id :</p>
                            <input className="placeholder-white w-3/4  bg-white bg-opacity-10 rounded	" placeholder="Enter ID (MLP = 1)" onChange={e => setVaultId(e.target.value)} value={vaultId} />
                        </div>
                        <div>
                            <p>User Address :</p>
                            <input className="placeholder-white w-3/4  bg-white bg-opacity-10 rounded	" placeholder="Enter Duration" onChange={e => setNewRewardDuration(e.target.value)} value={newRewardDuration} />
                        </div>
                        <div>
                            <p>User Status :</p>
                            <input className="placeholder-white w-3/4  bg-white bg-opacity-10 rounded	" placeholder="Enter Amount" onChange={e => setNewRewardAmount(e.target.value)} value={newRewardAmount} />
                        </div>
                        <button className='hover:bg-purple-900 bg-white bg-opacity-10 rounded px-4 py-2'>Set Admin</button>
                        <button className='hover:bg-purple-900 bg-white bg-opacity-10 rounded px-4 py-2'>Remove Admin</button>

                    </div>

                    <div className="bg-primary-black p-5 rounded flex flex-col gap-2 items-center">
                        <h4>Vault Status (Pause)</h4>
                        <div>
                            <p>Vault Id :</p>
                            <input className="placeholder-white w-3/4  bg-white bg-opacity-10 rounded	" placeholder="Enter ID (MLP = 1)" onChange={e => setVaultId(e.target.value)} value={vaultId} />
                        </div>
                        <div>
                            <p>Vault Status :</p>
                            <input className="placeholder-white w-3/4  bg-white bg-opacity-10 rounded	" placeholder="Enter Duration" onChange={e => setNewRewardDuration(e.target.value)} value={newRewardDuration} />
                        </div>

                        <button className='hover:bg-purple-900 bg-white bg-opacity-10 rounded px-4 py-2'>Pause</button>
                        <button className='hover:bg-purple-900 bg-white bg-opacity-10 rounded px-4 py-2'>UnPause</button>

                    </div>
                </div>
            </div>

            <div className="bg-white bg-opacity-10 rounded flex flex-col p-5 gap-5 items-center">
                <h3 className="">Adapters Management</h3>
                <div className="flex gap-5">

                    <div className="bg-primary-black p-5 rounded flex flex-col gap-2 items-center">
                        <h4>Setup Adapter Infos</h4>

                        <div>
                            <p>Adapter Id :</p>
                            <input className="placeholder-white w-3/4  bg-white bg-opacity-10 rounded	" placeholder="Enter ID (MLP = 1)" onChange={e => setVaultId(e.target.value)} value={vaultId} />

                        </div>
                        <div>
                            <p>New Reward Duration :</p>
                            <input className="placeholder-white w-3/4  bg-white bg-opacity-10 rounded	" placeholder="Enter Duration" onChange={e => setNewRewardDuration(e.target.value)} value={newRewardDuration} />
                        </div>
                        <div>
                            <p>New Reward Amount :</p>
                            <input className="placeholder-white w-3/4  bg-white bg-opacity-10 rounded	" placeholder="Enter Amount" onChange={e => setNewRewardAmount(e.target.value)} value={newRewardAmount} />
                        </div>

                        <button className='hover:bg-purple-900 bg-white bg-opacity-10 rounded px-4 py-2'>Submit</button>
                    </div>

                    <div className="bg-primary-black p-5 rounded flex flex-col gap-2 items-center">
                        <h4>Add Adapter Contracts Infos</h4>

                        <div>
                            <p>Adapter Id :</p>
                            <input className="placeholder-white w-3/4  bg-white bg-opacity-10 rounded	" placeholder="Enter ID (MLP = 1)" onChange={e => setVaultId(e.target.value)} value={vaultId} />

                        </div>
                        <div>
                            <p>Contract Name :</p>
                            <input className="placeholder-white w-3/4  bg-white bg-opacity-10 rounded	" placeholder="Enter Duration" onChange={e => setNewRewardDuration(e.target.value)} value={newRewardDuration} />
                        </div>
                        <div>
                            <p>Contract Description :</p>
                            <input className="placeholder-white w-3/4  bg-white bg-opacity-10 rounded	" placeholder="Enter Amount" onChange={e => setNewRewardAmount(e.target.value)} value={newRewardAmount} />
                        </div>
                        <div>
                            <p>Contract Link :</p>
                            <input className="placeholder-white w-3/4  bg-white bg-opacity-10 rounded	" placeholder="Enter Amount" onChange={e => setNewRewardAmount(e.target.value)} value={newRewardAmount} />
                        </div>

                        <button className='hover:bg-purple-900 bg-white bg-opacity-10 rounded px-4 py-2'>Submit</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Admin