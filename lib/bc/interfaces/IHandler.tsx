import LiquidityHandler from "../ABI/LiquidityHandler.json";
import {ethers} from "ethers"

const IHandler = async (provider : any) => {
    let contractInstance = new ethers.Contract(
        "0x0EA5b1d7Df2155255E73683F6dE820B3462E5D71", // liquidity handler fantom testnet
        LiquidityHandler.abi,
        provider
    ); 
    return contractInstance;
} 

export default IHandler;
