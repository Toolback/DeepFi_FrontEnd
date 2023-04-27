'use client';

import { motion } from 'framer-motion';

import styles from '../../styles';
import { slideIn, staggerContainer, textVariant } from '../../utils/motion';
import { headingP1, headingP2 } from '../../constants/HomePage_Texts';
const Hero = () => (
  <section className={`${styles.yPaddings} sm:pl-16 pl-6`}>
            {/* <img
          src="/cover-bc3.jpg"
          alt="hero_cover"
          className="opacity-10 absolute top-0 right-0 left-0  "
        /> */}
    <div className="hidden sm:block absolute  top-0 right-0 left-0 overflow-hidden  opacity-20">
  <img
    src="/cover-bc3.jpg"
    alt="hero_cover"
    className="relative  object-top w-full"
  />
</div>
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex flex-col`}
    >
      
      <div className="flex justify-center items-center flex-col relative z-10">
        <motion.h1 variants={textVariant(1.1)} className={`${styles.heroHeading} sm:pt-10`}>
          {headingP1}
        </motion.h1>
        <motion.div
          variants={textVariant(1.2)}
          className="flex flex-row justify-center items-center"
        >
          {/* <div className={styles.heroDText} /> */}
          <h1 className={styles.heroHeading}>{headingP2}</h1>
        </motion.div>
      </div>

      <motion.div
        variants={slideIn('right', 'tween', 0.2, 1)}
        className="relative w-full md:-mt-[20px] -mt-[12px]"
      >
        <div className="absolute sm:hidden w-full h-[300px] hero-gradient rounded-tl-[140px] z-[0] -top-[30px]" />

        <img
          src="/cover-bc3.jpg"
          alt="hero_cover"
          className="sm:hidden w-full sm:h-[500px] h-[350px] object-cover rounded-tl-[140px] z-10 relative"
        />

        {/* <img
          src="/cover-bc3.jpg"
          alt="hero_cover"
          className="opacity-10"
        /> */}

      </motion.div>
    </motion.div>
  </section>
);

export default Hero;
