import Head from 'next/head';

import '../styles/globals.css';
import { AppRouteStoreContainer } from '../data/StoreAppRouter'
import { AppDataStoreContainer } from '../data/StoreAppData'

// web3 connect
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

// https://wagmi.sh/react/providers/configuring-chains

// const testnet = {
//   id: 97,
//   name: 'Bsc Testnet',
//   network: 'Testnet',
//   nativeCurrency: {
//     decimals: 18,
//     name: 'Binance Smart Chain Testnet',
//     symbol: 'tBNB',
//   },
//   rpcUrls: {
//     default: 'https://bsc-testnet.nodereal.io/v1/4cfcf4b758214e13a3ea8f7be79940e6',
//   },
//   blockExplorers: {
//     default: { name: 'bscscan', url: 'https://testnet.bscscan.com/' },
//   },
//   testnet: true,
// }

const { chains, provider } = configureChains(
  [chain.polygon, chain.polygonMumbai],
  [
    // jsonRpcProvider({
    //   rpc: (chain) => {
    //     if (chain.id !== testnet.id) return null
    //     return { http: testnet.rpcUrls.default }
    //   },
    // }),
    // alchemyProvider({ apiKey: "process.env.ALCHEMY_ID "}),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

const MyApp = ({ Component, pageProps }) => (
  <>
    <AppDataStoreContainer>
      <AppRouteStoreContainer>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains}>
            <Head>
              <title>Deposit.Finance</title>
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <link rel="icon" href="/favicon.ico" />
              <link rel="preconnect" href="https://stijndv.com" />
              <link rel="stylesheet" href="https://stijndv.com/fonts/Eudoxus-Sans.css" />
            </Head>
            <Component {...pageProps} />
          </RainbowKitProvider>
        </WagmiConfig>
      </AppRouteStoreContainer>
    </AppDataStoreContainer>
  </>
);

export default MyApp;
