import { motion } from 'framer-motion';
import { navVariants } from '../../utils/motion';
import { useState } from 'react';

import styles from '../../styles';
import Link from 'next/link';


const LayoutTop = ({ destination, modaleConnectStatus, setModaleConnectStatus, modaleMenuStatus, setModaleMenuStatus }) => {

    return (
        <motion.nav
            variants={navVariants}
            initial="hidden"
            whileInView="show"
            className={`py-8 relative`}
        >
            <div className="absolute w-[50%] inset-0 gradient-01" />
            <div className='flex pb-8 md:hidden justify-end items-center'>
                <button className='hover:font-extrabold text-white' onClick={() => setModaleConnectStatus(!modaleConnectStatus)}>
                    Connect
                </button>
                {/* <button onClick={() => setModaleMenuStatus(!modaleMenuStatus)}>
                    <img src="/menu.svg" alt="menu" className="w-[24px] h-[24px] object-contain" />

                </button> */}
            </div>

            {/* <div
                // className={`${styles.innerWidth} mx-auto flex justify-between gap-8`}
                className='mx-auto flex justify-between items-center gap-8'> */}
                <div className='hidden md:flex px-2 justify-between items-center text-white text-bold '>
                    {/* <ConnectButton /> */}
                    <Link href="/">
                        <button type="button">
                            <h2 className=" font-extrabold text-[24px] leading-[30.24px] ">
                                Deposit.Finance
                            </h2>
                        </button>
                    </Link>
                    <button className='hover:font-extrabold  text-[20px]' onClick={() => setModaleConnectStatus(!modaleConnectStatus)}>
                        
                        Connect
                    </button>

                    
                </div>
            {/* </div> */}
        </motion.nav>
    )
}

export default LayoutTop