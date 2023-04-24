import DeepfiToken from "../ABI/DeepfiToken.json";
import {ethers} from "ethers"


const IDeepfi = async (provider : any) => {
    let contractInstance = new ethers.Contract(
        "0xb483aE4D4dE9F0E341d13Ff0A9B3530E84265352", // Deepfi Token Fantom testnet
        DeepfiToken.abi, 
        provider
    ); 
    return contractInstance;
} 

export default IDeepfi;
