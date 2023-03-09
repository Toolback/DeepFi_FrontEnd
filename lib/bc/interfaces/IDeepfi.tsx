import DeepfiToken from "../ABI/DeepfiToken.json";
import {ethers} from "ethers"
import { getProvider } from "../wallet-connect";


const IDeepfi = async (signer? : any) => {
    let provider = signer ? signer : await getProvider()
    let contractInstance = new ethers.Contract(
        "0x7b76dc056AD4Cc014a392Dcc4aac424E7506d251", // Deepfi Token Fantom testnet
        DeepfiToken.abi, 
        provider
    ); 
    return contractInstance;
} 

export default IDeepfi;
