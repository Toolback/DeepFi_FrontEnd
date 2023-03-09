import LiquidityHandler from "../ABI/LiquidityHandler.json";
import {ethers} from "ethers"
import { getProvider } from "../wallet-connect";

const IHandler = async (signer? : any) => {
    let provider = signer ? signer : await getProvider()
    let contractInstance = new ethers.Contract(
        "0x47c03f1a44Ab370994419cA38Ac05E70DEC10578", // liquidity handler fantom testnet
        LiquidityHandler.abi,
        provider
    ); 
    return contractInstance;
} 

export default IHandler;
