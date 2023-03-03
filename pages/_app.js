import Head from 'next/head';

import '../styles/globals.css';
import { AppRouteStoreContainer } from '../data/StoreAppRouter'
import { AppDataStoreContainer } from '../data/StoreAppData'


const MyApp = ({ Component, pageProps }) => (
  <>
    <AppDataStoreContainer>
      <AppRouteStoreContainer>
            <Head>
              <title>Deposit.Finance</title>
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <link rel="icon" href="/favicon.ico" />
              <link rel="preconnect" href="https://stijndv.com" />
              <link rel="stylesheet" href="https://stijndv.com/fonts/Eudoxus-Sans.css" />
            </Head>
            <Component {...pageProps} />
      </AppRouteStoreContainer>
    </AppDataStoreContainer>
  </>
);

export default MyApp;
