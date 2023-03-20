import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

// import { DisplayedCoins } from '../components';
// import { getFeaturedPosts } from '../services';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 2,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 768, min: 640 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 2,
  },
};

const CoinCarousel = ({ coins }) => {
  const [displayedCoins, setDisplayCoins] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    setDisplayCoins(coins);
    setDataLoaded(true);
  }, [coins]);

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
    <div className="py-4 w-[300px]">
      <Carousel infinite customLeftArrow={customLeftArrow} customRightArrow={customRightArrow} responsive={responsive} itemClass="px-4">
        {dataLoaded && displayedCoins?.map((coin, index) => (
          
          <div key={index} className="overflow-hidden flex flex-col items-center ">
            {coin.url ? <img className="z-30 h-[44px]" src={coin.url} /> : <div className="h-[44px]"></div>}
            <dt className="truncate text-sm font-medium text-gray-300">{coin.name}</dt>
            <dd className="mt-1 text-xl font-semibold tracking-tight">{coin.balance}</dd>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CoinCarousel;