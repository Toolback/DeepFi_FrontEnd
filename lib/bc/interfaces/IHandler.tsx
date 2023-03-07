import LiquidityHandler from "../ABI/LiquidityHandler.json";
import {ethers} from "ethers"
import { getProvider } from "../wallet-connect";

const IHandler = async (signer? : any) => {
    let provider = signer ? signer : await getProvider()
    let contractInstance = new ethers.Contract(
        "0xdDF51cF3f82F942d081C4d6A9C2d97AfBAc3FA09", // liquidity handler fantom testnet
        LiquidityHandler.abi,
        provider
    ); 
    return contractInstance;
} 

export default IHandler;
