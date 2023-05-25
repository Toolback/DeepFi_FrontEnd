import DeepfiToken from "../ABI/DeepfiToken.json";
import {ethers} from "ethers"


const IDeepfi = async (provider : any) => {
    let contractInstance = new ethers.Contract(
        "0x6Aaee6aCa4555a715F70fA4Ed102b18851c6c71c", // Deepfi Token Fantom testnet
        DeepfiToken.abi, 
        provider
    ); 
    return contractInstance;
} 

export default IDeepfi;
