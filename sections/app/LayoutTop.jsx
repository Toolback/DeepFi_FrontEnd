import { motion } from 'framer-motion';
import { navVariants } from '../../utils/motion';

import styles from '../../styles';
import Link from 'next/link';

import { ConnectButton } from '@rainbow-me/rainbowkit';

const LayoutTop = () => {
    return (
        <motion.nav
            variants={navVariants}
            initial="hidden"
            whileInView="show"
            className={`py-8 relative`}
        >
            <div className="absolute w-[50%] inset-0 gradient-01" />
            <div
                // className={`${styles.innerWidth} mx-auto flex justify-between gap-8`}
                className={`mx-auto flex justify-end gap-8`}

            >
                {/* <img
            src="/search.svg"
            alt="search"
            className="w-[24px] h-[24px] object-contain"
          /> */}

                {/* <img
            src="/menu.svg"
            alt="menu"
            className="w-[24px] h-[24px] object-contain"
          /> */}
                <ConnectButton />
            </div>
        </motion.nav>
    )
}

export default LayoutTop