import { BigNumber, ethers } from 'ethers';

export const connectWallet = async () => {
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork();
      console.log("Network Retrieved -> ", network.chainId) // 250 fantom / 4002 fantom testnet
      // if (network.chainId !== 4002) {
      //   await window.ethereum.request({
      //     method: "wallet_switchEthereumChain",
      //     params: [{ chainId: "0xfa2" }],
      //   });
      // }

      if (network.chainId !== 4002) {
        const chainData = {
          chainId: "0xfa2",
          chainName: "Fantom Opera Testnet",
          nativeCurrency: {
            name: "FTM",
            symbol: "FTM",
            decimals: 18,
          },
          rpcUrls: ["https://rpc.testnet.fantom.network/"],
          blockExplorerUrls: ["https://ftmscan.com/"],
        };
        try {
          await ethereum.request({
            method: "wallet_addEthereumChain",
            params: [chainData],
          });
        } catch (error) {
          console.log("Error adding network to Metamask:", error);
        }
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0xfa2" }],
        });
      }
      const accounts = await provider.send("eth_requestAccounts", []);
      const userAddress = accounts[0]
      const signer = provider.getSigner(userAddress);
      const userStatus = ""
      // console.log("ADDRess RETRIEVED first :", userAddress);
      return { accounts, userStatus, userAddress, signer }
    } catch (error) {
      //   setLoading(false);
      console.log(
        error,
        'got this error on connectToWallet catch block while connecting the wallet'
      );
    }
    // } catch (e) {
    //   console.log("error while retrieving signer", e);
    //   signer = await getProvider()
    //   return { signer }
    // }
  }
  else {
    console.log("We are on the server *OR* the user is not running metamask");
    provider = await getProvider()
  }
}

export const getProvider = async () => {
  let provider;

  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    // We are in the browser and metamask is running.
    // let addressArray = window.ethereum.request({ method: "eth_requestAccounts" });
    // provider = new ethers.providers.Web3Provider(window.ethereum);
    let req = new ethers.providers.Web3Provider(window.ethereum);
    const network = await req.getNetwork();
    if (network.chainId !== 4002) {
      provider = new ethers.providers.StaticJsonRpcProvider(
        "https://rpc.testnet.fantom.network/"
      )
    }
    else
    {
      provider = req;
    }
  } else {
    // We are on the server *OR* the user is not running metamask
    provider = new ethers.providers.StaticJsonRpcProvider(
      "https://rpc.testnet.fantom.network/"
    )
  }
  return (provider);
}

