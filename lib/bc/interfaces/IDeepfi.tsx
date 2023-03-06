import DeepfiToken from "../ABI/DeepfiToken.json";
import {ethers} from "ethers"
import { getProvider } from "../wallet-connect";


const IDeepfi = async (signer? : any) => {
    let provider = signer ? signer : await getProvider()
    let contractInstance = new ethers.Contract(
        "0xa1757b47F980C1d2eEE7F6A5E77a3FB62502C026", // Deepfi Token Fantom testnet
        DeepfiToken.abi, 
        provider
    ); 
    return contractInstance;
} 

export default IDeepfi;
