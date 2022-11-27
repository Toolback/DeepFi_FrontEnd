import { useState } from 'react';
import cn from 'classnames';
import { SwapIcon } from '../../components/app/utils/icons/swap-icon';
import CoinInput from '../../components/app/coin-input';
import TransactionInfo from '../../components/app/transaction-info';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInBottom } from '../../utils/fade-in-bottom';
const Stake = () => {
    let [toggleCoin, setToggleCoin] = useState(false);

    return (
        <>
    <div className="flex justify-center items-center pt-8 text-md">
      <div className="mx-auto w-full max-w-lg rounded-lg bg-white bg-opacity-5 p-10 shadow-card xs:p-6 xs:pt-5">

        <AnimatePresence exitBeforeEnter>
          <motion.div
            initial="exit"
            animate="enter"
            exit="exit"
            variants={fadeInBottom('easeIn', 0.25)}
          >
        <div className="mb-5 border-b border-dashed border-gray-200 pb-5 dark:border-gray-800 xs:mb-7 xs:pb-6">
          <div
            className={cn(
              'relative flex gap-3',
              toggleCoin ? 'flex-col-reverse' : 'flex-col'
            )}
          >
            <CoinInput
              label={'From'}
              exchangeRate={0.0}
              defaultCoinIndex={0}
              getCoinValue={(data) => console.log('From coin value:', data)}
            />
            <div className="absolute top-1/2 left-1/2 z-[1] -mt-4 -ml-4 rounded-full bg-white shadow-large dark:bg-gray-600">
              <button
                // size="mini"
                // color="gray"
                // shape="circle"
                // variant="transparent"
                onClick={() => setToggleCoin(!toggleCoin)}
              >
                <SwapIcon className="h-auto w-3" />
              </button>
            </div>
            <CoinInput
              label={'To'}
              exchangeRate={0.0}
              defaultCoinIndex={1}
              getCoinValue={(data) => console.log('To coin value:', data)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 xs:gap-[18px]">
          <TransactionInfo label={'Min. Received'} />
          <TransactionInfo label={'Rate'} />
          <TransactionInfo label={'Offered by'} />
          <TransactionInfo label={'Price Slippage'} value={'1%'} />
          <TransactionInfo label={'Network Fee'} />
          <TransactionInfo label={'Criptic Fee'} />
        </div>
        <button
        //   size="large"
        //   shape="rounded"
        //   fullWidth={true}
          className="mt-6 xs:mt-8 w-full text-bold text-lg border-solid border rounded"
        >
          Swap
        </button>
        </motion.div>
        </AnimatePresence>
      </div>
    </div>
    </>

    )
}

export default Stake