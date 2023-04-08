import React, { useState, useEffect, useContext } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Loader from "components/app/Loader";
import { ethers } from 'ethers';
import { AppDataStoreContext } from 'data/StoreAppData';
const CoinCarousel = ({ coins, displayNbMobile, displayNbDesktop, mode }) => {
  const { stateAppData, dispatchAppData } = useContext(AppDataStoreContext);

  const [displayedCoins, setDisplayCoins] = useState([{}]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: displayNbDesktop,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: displayNbDesktop,
    },
    tablet: {
      breakpoint: { max: 768, min: 640 },
      items: displayNbDesktop,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: displayNbMobile,
    },
  };
  let num;

  useEffect(() => {
    console.log("COIN RECEIVED : ", coins, 'IN MODE => ', mode)
    setDataLoaded(false);
    setDisplayCoins(coins);
    setDataLoaded(true);
  }, [coins, stateAppData.userAddress]);

  const customLeftArrow = (
    <div className="absolute arrow-btn left-0 text-center py-3 cursor-pointer ">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
    </div>
  );

  const customRightArrow = (
    <div className="absolute arrow-btn right-0 text-center py-3 cursor-pointer ">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </div>
  );

  return (
    <div className="py-4">
      {dataLoaded === false ? (
        <Loader />
        ) : (
        <>

      <Carousel
        infinite
        ssr
        // centerMode={true}
        customLeftArrow={customLeftArrow}
        customRightArrow={customRightArrow}
        responsive={responsive}
        itemClass="px-4"
      >
        {/* <Carousel infinite ssr={false} centerMode={false} responsive={responsive} itemClass="px-4"> */}

        {displayedCoins?.map((coin, index) => {
          let popUpActive = false;
          let num;
          if (mode === 0)
            num = coin.balance
          else if (mode === 1)
            num = coin.claimable
          else if (mode === 2)
            num = coin.totalEarned
            // console.log("NUM FETCHED  : ", num, 'IN MODE => ', mode)

          let bal = num === undefined ? 0 : num;
          // let test = Number(num);
          let dec = ethers.utils.formatUnits(bal, coin.dec);
          let res;
          if (dec.length > 12) {
            popUpActive = true;
            res = dec.slice(0, 12) + '...';
          }
          else {
            popUpActive = false;
            res = dec
          }
          // let bal = ((coin.balance).toString()).length > 5 ? ((coin.balance).toString()).substring(0, 3) + '...' + ((coin.balance).toString()).substring(((coin.balance).toString()).length - 2) : coin.balance;

          return (
            <div key={index} className="  flex flex-col items-center ">
              {coin.url ? <img className="z-30 h-[44px]" src={coin.url} /> : <div className="h-[44px]"></div>}
              <dt className="truncate text-sm font-medium text-gray-300">{coin.name}</dt>
              {popUpActive ?

                <div className="group flex relative">
                  <span className=" mt-1 text-sm tracking-tight">{res}</span>
                  <div className=" group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-xs text-gray-100 rounded-md
                     absolute left-1/2 -translate-x-1/2 translate-y-1/2
                     opacity-0">
                    <div className=''>
                      {dec}
                    </div>
                  </div>
                </div>
                :
                <dd className="mt-1 text-sm  tracking-tight">{res}</dd>
              }
            </div>
          )
        })}
      </Carousel>
      </>
                        )} 
    </div>
  );
};

export default CoinCarousel;