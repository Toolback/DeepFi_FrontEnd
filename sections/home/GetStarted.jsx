'use client';

import { motion } from 'framer-motion';

import styles from '../../styles';
import { StartSteps, TitleText, TypingText } from '../../components/home';
import { staggerContainer, fadeIn, planetVariants } from '../../utils/motion';
import { card2AnimatedImage, card2StartingFeatures, card2SubTitle, card2SubTitle2, card2Title } from '../../constants/HomePage_Texts';

const GetStarted = () => (
  <section className={`${styles.paddings} relative z-10`}>
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex lg:flex-row flex-col gap-8`}
    >
      <motion.div
        variants={planetVariants('left')}
        className={`flex-1 ${styles.flexCenter}`}
      >
        <img
          src={card2AnimatedImage}
          alt="get-started"
          className="w-[90%] h-[90%] object-contain"
        />
      </motion.div>
      <motion.div
        variants={fadeIn('left', 'tween', 0.2, 1)}
        className="flex-[0.75] flex justify-center flex-col"
      >
        <TypingText title={card2SubTitle}/>
        <TitleText title={card2Title} />
        <span className="font-extrabold text-white">{card2SubTitle2}</span>
        <div className="mt-[31px] flex flex-col max-w-[370px] gap-[24px]">
          {card2StartingFeatures.map((feature, index) => (
            <StartSteps
              key={feature}
              number={`${index < 10 ? '0' : ''} ${index + 1}`}
              text={feature}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  </section>
);

export default GetStarted;
