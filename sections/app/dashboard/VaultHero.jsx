import Link from 'next/link';

import { motion } from 'framer-motion';

import styles from 'styles';
import { slideIn, staggerContainer, textVariant } from 'utils/motion';
import {appHeroTitle, appHeroText, appHeroImg, appHeroButton, appHeroButtonLink} from 'constants/AppPage_Text'
export default function VaultHero() {
  return (
    <section className='sm:pt-8 sm:pb-20 py-12'>
    <motion.div
    variants={staggerContainer}
    initial="hidden"
    whileInView="show"
    viewport={{ once: false, amount: 0.60 }}
    className={`${styles.innerWidth} mx-auto flex flex-col`}
  >
    <div className="relative z-10 pb-4 sm:py-8">
      <div className="absolute inset-x-0 top-0 hidden h-1/2 lg:block" aria-hidden="true" />
      <div className="mx-auto max-w-7xl bg-transparent lg:px-8">
        <div className="lg:grid lg:grid-cols-12">
        <motion.div
        variants={slideIn('left', 'tween', 0.1, 0.75)}
        className="relative z-10 lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:bg-transparent lg:py-16"
      >
                  {/* <div className="relative z-10 lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:bg-transparent lg:py-16"> */}     
      <div className="absolute inset-x-0 h-1/2 lg:hidden" aria-hidden="true" />
            <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-none lg:p-0">
              <div className="aspect-w-10 aspect-h-6 sm:aspect-w-2 sm:aspect-h-1 lg:aspect-w-1">
                <img
                  className="border border-white border-opacity-40 rounded-3xl object-cover object-center shadow-2xl"
                  src={appHeroImg}
                  alt=""
                />
              </div>
            </div>
            {/* </div> */}
            </motion.div>
            <motion.div
        variants={slideIn('right', 'tween', 0.1, 0.75)}
        className="relative border border-white border-opacity-10 bg-purple-500/10 lg:col-span-10 lg:col-start-3 lg:row-start-1 lg:grid lg:grid-cols-10 lg:items-center lg:rounded-3xl"
      >
            <div className="absolute inset-0 hidden overflow-hidden rounded-3xl lg:block" aria-hidden="true">
              <svg
                className="absolute bottom-full left-full translate-y-1/3 -translate-x-2/3 transform xl:bottom-auto xl:top-0 xl:translate-y-0"
                width={404}
                height={384}
                fill="none"
                viewBox="0 0 404 384"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect x={0} y={0} width={4} height={4} className="text-indigo-500" fill="currentColor" />
                  </pattern>
                </defs>
                <rect width={404} height={384} fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)" />
              </svg>
              <svg
                className="absolute top-full -translate-y-1/3 -translate-x-1/3 transform xl:-translate-y-1/2"
                width={404}
                height={384}
                fill="none"
                viewBox="0 0 404 384"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect x={0} y={0} width={4} height={4} className="text-indigo-500" fill="currentColor" />
                  </pattern>
                </defs>
                <rect width={404} height={384} fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)" />
              </svg>
            </div>
            <div className="relative mx-auto max-w-md space-y-6 py-12 px-4 sm:max-w-3xl sm:py-16 sm:px-6 lg:col-span-6 lg:col-start-4 lg:max-w-none lg:p-0">
              <motion.h2 variants={textVariant(1.1)} className="text-3xl sm:text-4xl font-bold tracking-tight text-white" id="join-heading">
                {appHeroTitle}
              </motion.h2>
              <motion.p variants={textVariant(1.2)} className="text-lg text-white">
                {appHeroText}
              </motion.p>

              <motion.div  variants={textVariant(1.2)} >
                  <Link href={appHeroButtonLink}>
                <button className='block w-full rounded-md border border-transparent bg-white py-3 px-5 text-center text-base font-medium  text-indigo-700 shadow-md hover:bg-gray-50 sm:inline-block sm:w-auto'>
                    {appHeroButton}
                </button>
                    </Link>
              </motion.div>

            </div>
          </motion.div>


        </div>
      </div>
    </div>
    </motion.div>
  </section>
  )
}