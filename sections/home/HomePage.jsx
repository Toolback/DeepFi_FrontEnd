'use client';

import { motion } from 'framer-motion';

import styles from '../../styles';
import { slideIn, staggerContainer, textVariant } from '../../utils/motion';
import { headingP1, headingP2, subheading01 } from '../../constants/HomePage_Texts';

const HomePage = () => (
  <section className={`${styles.yPaddings} sm:pl-16 pl-6 `}>
    {/* <img
      src="/HomeDeposit.png"
      alt="hero_cover"
      // className="w-full sm:h-[500px] h-[350px] object-cover rounded-tl-[140px] z-10 relative"
      className="absolute"

    /> */}
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex flex-col`}
    >
      <div className="flex justify-start flex-col relative z-10">
        <motion.h1 variants={textVariant(1.1)} className={styles.heroHeading}>
          {headingP1}
        </motion.h1>
        <motion.div
          variants={textVariant(2.1)}
          className="flex flex-row justify-start "
        >
          {/* <div className={styles.heroDText} /> */}
          <h1 className={styles.heroHeading}>{headingP2}</h1>
        </motion.div>
      </div>

      <motion.div
        variants={slideIn('right', 'tween', 0.2, 1)}
        className=" w-full pt-4 "
      >


        <a href="#explore">
          <div className="text-[#615076] w-full flex justify-start">
            <p>{subheading01}</p>
          </div>
        </a>
      </motion.div>
    </motion.div>
  </section>
);

export default HomePage;