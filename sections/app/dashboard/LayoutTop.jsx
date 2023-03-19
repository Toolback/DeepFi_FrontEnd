import { motion } from 'framer-motion';
import { navVariants } from 'utils/motion';
import { useState } from 'react';

import styles from 'styles';
import Link from 'next/link';
import { AppDataStoreContext } from 'data/StoreAppData';
import { useContext } from 'react';
import { AppRouteStoreContext } from 'data/StoreAppRouter';

const LayoutTop = ({ destination, modaleConnectStatus, setModaleConnectStatus, modaleMenuStatus, setModaleMenuStatus }) => {
    const { stateAppData } = useContext(AppDataStoreContext);
    const { dispatchAppRoute } = useContext(AppRouteStoreContext);
    return (
        <>
            <div className="absolute w-[35%] h-[60%]  gradient-01" />

            <motion.nav
                variants={navVariants}
                initial="hidden"
                whileInView="show"
                className={`py-8 relative`}
            >
                    {/* <div className="absolute w-[50%] inset-0 gradient-01" /> */}

                <div className='flex pb-8 text-white md:hidden justify-between items-center'>
                    <button type="button">
                        <Link href="/">
                            <h2 className=" font-extrabold text-[24px] leading-[30.24px] ">
                                Deposit.Finance
                            </h2>
                        </Link>
                    </button>

                    <div>

                        {stateAppData.userAddress != "" && stateAppData.userAddress != "connect to retrieve" ?
                            <p>{(stateAppData.userAddress).substring(0, 5)}...{(stateAppData.userAddress).substring(stateAppData.userAddress.length - 3)}</p>
                            :
                            <button className='hover:font-extrabold text-white' onClick={() => setModaleConnectStatus(!modaleConnectStatus)}>
                                Connect
                            </button>
                        }
                        {stateAppData.userStatus === "admin" ?
                        <>
                        {destination === "appPage" ?
                            <button className='hover:font-extrabold  text-[20px]' onClick={() => dispatchAppRoute({ type: 'setAppRoute', dDataAppRoute: 'adminPage' })}>
                                Admin Panel
                            </button>
                            :
                            <button className='hover:font-extrabold  text-[20px]' onClick={() => dispatchAppRoute({ type: 'setAppRoute', dDataAppRoute: 'appPage' })}>
                                User Panel
                            </button>
                        }
                        </> : <></>}
                    </div>
                    {/* <button onClick={() => setModaleMenuStatus(!modaleMenuStatus)}>
                    <img src="/menu.svg" alt="menu" className="w-[24px] h-[24px] object-contain" />
                    
                </button> */}
                </div>

                {/* <div
                // className={`${styles.innerWidth} mx-auto flex justify-between gap-8`}
            className='mx-auto flex justify-between items-center gap-8'> */}
                <div className='hidden md:flex px-2 z-50 justify-between items-center text-white text-bold '>
                    {/* <ConnectButton /> */}
                    <button type="button">
                        <Link href="/">
                            <h2 className=" font-extrabold text-[24px] leading-[30.24px] ">
                                Deposit.Finance
                            </h2>
                        </Link>
                    </button>
                    <div className='flex gap-5'>
                    {stateAppData.userStatus === "admin" ?
                        <>
                        {destination == 'appPage' ?
                            <button className='hover:font-extrabold  text-[20px]' onClick={() => dispatchAppRoute({ type: 'setAppRoute', dDataAppRoute: 'adminPage' })}>
                                Admin Panel
                            </button>
                            :
                            <button className='hover:font-extrabold  text-[20px]' onClick={() => dispatchAppRoute({ type: 'setAppRoute', dDataAppRoute: 'appPage' })}>
                                User Panel
                            </button>
                        }
                                                </> : <></>}

                        {stateAppData.userAddress != "" && stateAppData.userAddress != "connect to retrieve" ?
                            <p>{(stateAppData.userAddress).substring(0, 5)}...{(stateAppData.userAddress).substring(stateAppData.userAddress.length - 3)}</p>
                            :
                            <button className='hover:font-extrabold  text-[20px]' onClick={() => setModaleConnectStatus(!modaleConnectStatus)}>
                                Connect
                            </button>
                        }
                        
                    </div>



                </div>
                {/* </div> */}
            </motion.nav>
        </>
    )
}

export default LayoutTop