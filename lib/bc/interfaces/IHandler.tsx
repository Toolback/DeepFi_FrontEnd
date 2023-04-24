import LiquidityHandler from "../ABI/LiquidityHandler.json";
import {ethers} from "ethers"

const IHandler = async (provider : any) => {
    let contractInstance = new ethers.Contract(
        "0xb0871E0Eea7ef5783d1a314ca6a33930AeD79795", // liquidity handler fantom testnet
        LiquidityHandler.abi,
        provider
    ); 
    return contractInstance;
} 

export default IHandler;
