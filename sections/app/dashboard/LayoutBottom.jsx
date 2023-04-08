import { motion } from 'framer-motion';
import { navVariants } from 'utils/motion';
import { useState } from 'react';

import styles from 'styles';
import Link from 'next/link';

import { socials } from '../../../constants';

import { footerVariants } from 'utils/motion';
import { footerSocials } from '../../../constants/HomePage_Texts';
const LayoutBottom = ({ destination}) => {
    
    return (
        <motion.footer
        variants={footerVariants}
        initial="hidden"
        whileInView="show"
        className={`${styles.xPaddings} py-8 relative`}
      >
        <div className={`${styles.innerWidth} mx-auto flex flex-col gap-8`}>

          <div className="flex flex-col">
            <div className="mb-[50px] h-[2px] bg-white opacity-10" />
    
            <div className="flex items-center justify-between flex-wrap gap-4">
              <Link href="/">

              <button className="font-extrabold text-[24px] text-white">
                Deposit.Finance
              </button>
              </Link>
              <p className="font-normal text-[14px] text-white opacity-50">
                Copyright © 2021 - 2023 Deposit.Finance All rights reserved.
              </p>
    
              <div className="flex gap-4">
                {footerSocials.map((social) => (
                  <img
                    key={social.name}
                    src={social.url}
                    alt={social.name}
                    className="w-[24px] h-[24px] object-contain cursor-pointer"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.footer>
    )
}

export default LayoutBottom