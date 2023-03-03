'use client';

import { motion } from 'framer-motion';

import styles from '../../styles';
import { navVariants } from '../../utils/motion';

import Link from 'next/link';


const Navbar = () => {

return (
  <motion.nav
    variants={navVariants}
    initial="hidden"
    whileInView="show"
    className={`${styles.xPaddings} py-8 relative`}
  >
    <div className="absolute w-[50%] inset-0 gradient-01" />
    <div
      className={`${styles.innerWidth} mx-auto flex justify-between gap-8`}
    >
      {/* <img
        src="/search.svg"
        alt="search"
        className="w-[24px] h-[24px] object-contain"
      /> */}
      <h2 className="font-extrabold text-[24px] leading-[30.24px] text-white">
        Deposit.Finance
      </h2>
      {/* <img
        src="/menu.svg"
        alt="menu"
        className="w-[24px] h-[24px] object-contain"
      /> */}
      {/* <ConnectButton /> */}
      <Link href="/App">
      <button type="button" className="flex items-center h-fit py-4 px-4 bg-[#25618B] bg-opacity-20 rounded-[32px] gap-[12px]">
          {/* <img
            src="/headset.svg"
            alt="headset"
            className="w-[24px] h-[24px] object-contain"
          /> */}
          <span className="font-normal text-[16px] text-white">
            App
          </span>
        </button>
        </Link>
    </div>
  </motion.nav>
)
    };

export default Navbar;
