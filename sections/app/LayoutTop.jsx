import { motion } from 'framer-motion';
import { navVariants } from '../../utils/motion';
import { useState } from 'react';

import styles from '../../styles';
import Link from 'next/link';
import { AppDataStoreContext } from 'data/StoreAppData';
import { useContext } from 'react';

const LayoutTop = ({ destination, modaleConnectStatus, setModaleConnectStatus, modaleMenuStatus, setModaleMenuStatus }) => {
    const { stateAppData, dispatchAppData } = useContext(AppDataStoreContext);

    return (
        <>
            <div className="absolute z-1 w-[50%] h-[70%] inset-0 gradient-01" />

            <motion.nav
                variants={navVariants}
                initial="hidden"
                whileInView="show"
                className={`py-8 relative`}
            >
                <div className='flex pb-8 text-white md:hidden justify-between items-center'>
                <button type="button">
                        <Link href="/">
                            <h2 className=" font-extrabold text-[24px] leading-[30.24px] ">
                                Deposit.Finance
                            </h2>
                        </Link>
                    </button>

                    {stateAppData.userAddress != "" && stateAppData.userAddress != "connect to retrieve" ?
                        <p>{(stateAppData.userAddress).substring(0,5)}...{(stateAppData.userAddress).substring(stateAppData.userAddress.length - 3)}</p>
                        :
                        <button className='hover:font-extrabold text-white' onClick={() => setModaleConnectStatus(!modaleConnectStatus)}>
                        Connect
                    </button>
                    }
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
                    {stateAppData.userAddress != "" && stateAppData.userAddress != "connect to retrieve" ?
                        <p>{(stateAppData.userAddress).substring(0,5)}...{(stateAppData.userAddress).substring(stateAppData.userAddress.length - 3)}</p>
                        :
                        <button className='hover:font-extrabold  text-[20px]' onClick={() => setModaleConnectStatus(!modaleConnectStatus)}>
                            Connect
                        </button>
                    }



                </div>
                {/* </div> */}
            </motion.nav>
        </>
    )
}

export default LayoutTop