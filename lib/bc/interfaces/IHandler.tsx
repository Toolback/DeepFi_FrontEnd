import LiquidityHandler from "../ABI/LiquidityHandler.json";
import {ethers} from "ethers"

const IHandler = async (provider : any) => {
    let contractInstance = new ethers.Contract(
        "0x123e7875f63cF69fA76Fa597536cD1997bEAa4d6", // liquidity handler fantom testnet
        LiquidityHandler.abi,
        provider
    ); 
    return contractInstance;
} 

export default IHandler;
