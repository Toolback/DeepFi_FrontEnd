import { motion } from 'framer-motion';
import { navVariants } from 'utils/motion';
import { useEffect, useState } from 'react';

import styles from 'styles';
import Link from 'next/link';
import { AppDataStoreContext } from 'data/StoreAppData';
import { useContext } from 'react';
import { AppRouteStoreContext } from 'data/StoreAppRouter';
import { AppTitle } from '../../../constants/AppPage_Text';

import { Web3Button } from '@web3modal/react'
import { useAccount, useContract, useSigner } from 'wagmi'

import { fetchSigner } from '@wagmi/core'
import { getProvider } from '@wagmi/core'

import { isHandlerAdmin } from 'lib/bc/smc';




const LayoutTop = ({ destination }) => {
    const { stateAppData, dispatchAppData } = useContext(AppDataStoreContext);
    const { dispatchAppRoute } = useContext(AppRouteStoreContext);
    const { address, isConnected } = useAccount()


    useEffect(() => {
        const RetrieveUserInfos = async () => {
            let signer = await fetchSigner();
            console.log("SIGNER RETRIEVED =", signer, address);
            let prov = getProvider();
            let userStatus = await isHandlerAdmin(address, prov) ? "admin" : "member";
            await dispatchAppData({ ...stateAppData, type: 'setAppData', connected: true, userStatus, userAddress: address, provider: signer })
            return signer
        }
        if (isConnected) {
            RetrieveUserInfos().then((e) => {
                console.log("Successfully Connected ! <3", e);
            })

        }

    }, [address])
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
                                {AppTitle}
                            </h2>
                        </Link>
                    </button>

                    <div>
                        <Web3Button />
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
                </div>

                <div className='hidden md:flex px-2 z-50 justify-between items-center text-white text-bold '>
                    <button type="button">
                        <Link href="/">
                            <h2 className=" font-extrabold text-[24px] leading-[30.24px] ">
                                {AppTitle}
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
                        <Web3Button />
                    </div>
                </div>
            </motion.nav>
        </>
    )
}

export default LayoutTop