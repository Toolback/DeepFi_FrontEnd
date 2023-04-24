import Head from 'next/head';

import '../styles/globals.css';
import { AppRouteStoreContainer } from '../data/StoreAppRouter'
import { AppDataStoreContainer } from '../data/StoreAppData'

import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { arbitrum, fantom, fantomTestnet, mainnet, polygon } from 'wagmi/chains'
import { useEffect, useState } from 'react';

const chains = [fantomTestnet]
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

const { provider } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiClient = createClient({
  // autoConnect: true,
  connectors: w3mConnectors({ chains, version: 1, projectId }),
  provider
})
const ethereumClient = new EthereumClient(wagmiClient, chains)


const MyApp = ({ Component, pageProps }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);
  return (
  <>
  {ready ?
      <WagmiConfig client={wagmiClient}>

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
    </WagmiConfig>
        :
        null}

<Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
  </>
)};

export default MyApp;
