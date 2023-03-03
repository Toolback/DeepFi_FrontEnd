import Link from 'next/link';

const PoolsDisplay = ({setModaleConnectStatus}) => {
    const availablePools = [
        {
            name: "MLP - Mummy Finance",
            infos: "Actual Reward : Deepfi Tokens",
            ibTokenAddress: "0x0",
            tvl: "0",
            apy: '5%',
            // image:""
        },
        {
            name: "Deposit LP - Equalizer Finance",
            infos: "Actual Reward : Deepfi Tokens",
            ibTokenAddress: "0x0",
            tvl: "0",
            apy: '5%',
            // image:""
        }
    ]
    return (


        <div className="w-full py-10 sm:pt-8">
            <div className="sm:flex sm:flex-col">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-white text-center">Available Pools</h1>
                    <p className="mt-2 text-sm text-gray-300 text-center">
                        A list of all the available pools of the protocol
                    </p>
                </div>


                {/* button to change pools */}
                <div className="flex justify-center pt-2 gap-2">
                    <button className="hover:bg-purple-900 border border-white border-opacity-10 bg-purple-900 px-4 py-2 rounded text-gray-300">
                        MLP
                    </button>
                    <button className="hover:bg-opacity-90 border border-white border-opacity-10 bg-white bg-opacity-10 px-4 py-2 rounded text-gray-300">
                        Soon !
                    </button>

                </div>

                {/* pool display */}
                <div className="pt-4 grid sm:grid-cols-2 gap-4">
                    {/* global infos cards */}
                    <div className="border border-white border-opacity-10 bg-white bg-opacity-10 p-4 sm:p-6 sm:py-8 rounded flex justify-between">
                        <div className="">
                            <h4 className='text-gray-300'>TVL</h4>
                            <p>$XXXk</p>
                        </div>
                        <div className="">
                            <h4 className='text-gray-300'>Reward</h4>
                            <p>$XXXk Deepfi</p>
                        </div>
                        <div className="">
                            <h4 className='text-gray-300'>Duration</h4>
                            <p>30 days</p>
                        </div>
                    </div>
                    {/* personal infos cards */}
                    <div className="border border-white border-opacity-10 bg-white bg-opacity-10 p-4 sm:p-6 sm:py-8 rounded flex justify-between">
                        <div className="">
                            <h4 className='text-gray-300'>Your Deposit</h4>
                            <p>$XXXk</p>
                        </div>
                        <div className="">
                            <h4 className='text-gray-300'>To Claim</h4>
                            <p>$XXXk</p>
                        </div>
                    </div>



                    {/* deposit / withdraw */}
                    <div className='sm:col-span-2'>
                        <div className='sm:flex sm:justify-center '>

                            <div className=" py-6 px-2 sm:w-2/3 sm:flex sm:justify-center border border-white border-opacity-10 bg-white bg-opacity-10 rounded">
                                <div className='sm:w-2/3'>

                                <div className="flex justify-center">
                                    <button className='hover:bg-purple-900 bg-purple-900  rounded-sm px-6 py-2'>Deposit</button>
                                    <button className='hover:bg-purple-900 bg-primary-black bg-opacity-70 rounded-sm px-6 py-2'>Withdraw</button>
                                    <button className='hover:bg-purple-900 bg-primary-black bg-opacity-70 rounded-sm px-6 py-2'>Claim</button>

                                </div>
                                <div className='pt-4'>
                                    <Link className="" href="/">Buy MLP</Link>
                                </div>
                                <div className="pb-4">Available: 0 MLP</div>
                                <div className="bg-primary-black bg-opacity-70 rounded p-2 flex justify-between">
                                    <input className="placeholder-white w-3/4  bg-white bg-opacity-0	" placeholder="Enter Amount" />
                                    <button>MAX</button>
                                </div>
                                <div className='py-4'>
                                </div>
                                <div className='flex justify-center'>
                                    <button onClick={() => setModaleConnectStatus(true)} className='hover:bg-purple-900 bg-primary-black bg-opacity-70 rounded px-4 py-2'>Connect Wallet</button>
                                </div>
                                {/* conditionnel if connected */}

                                {/* <button>Approve & Deposit</button> */}
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Contracts card */}
                    <div className="border border-white border-opacity-20 rounded p-2">
                        <div className="pb-2 flex justify-between">
                            <h3 className="font-extrabold">Strategy</h3>
                            <button className="text-blue-400">Contract</button>
                        </div>
                        <p>Lorem Ipsum </p>
                    </div>

                    <div className="border border-white border-opacity-20 rounded p-2">
                        <div className="pb-2 flex justify-between">
                            <h3 className="font-extrabold">MLP</h3>
                            <button className="text-blue-400">Contract</button>
                        </div>
                        <p>Lorem Ipsum </p>
                    </div>
                </div>
            </div>

        </div>
    )
}



export default PoolsDisplay;