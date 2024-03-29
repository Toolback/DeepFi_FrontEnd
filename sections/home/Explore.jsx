'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

import styles from '../../styles';
import { exploreNews } from '../../constants';
import { staggerContainer } from '../../utils/motion';
import { ExploreCard, TitleText, TypingText } from '../../components/home';

const Explore = () => {
  const [active, setActive] = useState('news-1');

  return (
    <section className={`${styles.paddings}`} id="explore">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex flex-col`}
      >
        <TypingText title="| what's going on right now" textStyles="text-center" />
        <TitleText
          title={<>What we<br className="md:block hidden" /> Offer</>}
          textStyles="text-center"
        />
        <div className="mt-[50px] flex lg:flex-row flex-col min-h-[70vh] gap-5">
          {exploreNews.map((news, index) => (
            <ExploreCard
              key={news.id}
              {...news}
              index={index}
              active={active}
              handleClick={setActive}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Explore;
