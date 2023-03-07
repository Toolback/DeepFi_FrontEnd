import DeepfiToken from "../ABI/DeepfiToken.json";
import {ethers} from "ethers"
import { getProvider } from "../wallet-connect";


const IDeepfi = async (signer? : any) => {
    let provider = signer ? signer : await getProvider()
    let contractInstance = new ethers.Contract(
        "0x73C25f5Aa017688C2FD13578a0893EDd9D288Dc1", // Deepfi Token Fantom testnet
        DeepfiToken.abi, 
        provider
    ); 
    return contractInstance;
} 

export default IDeepfi;
