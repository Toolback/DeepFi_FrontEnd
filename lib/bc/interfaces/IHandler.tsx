import LiquidityHandler from "../ABI/LiquidityHandler.json";
import {ethers} from "ethers"
import { getProvider } from "../wallet-connect";

const IHandler = async (signer? : any) => {
    let provider = signer ? signer : await getProvider()
    let contractInstance = new ethers.Contract(
        "0x574F66292F5Feb78Db7906e686ac4554e2d27B6c", // liquidity handler fantom testnet
        LiquidityHandler.abi,
        provider
    ); 
    return contractInstance;
} 

export default IHandler;
