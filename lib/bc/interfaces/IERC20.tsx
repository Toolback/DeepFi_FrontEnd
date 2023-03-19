import DeepfiToken from "../ABI/DeepfiToken.json";
import {ethers} from "ethers"
import { getProvider } from "../wallet-connect";


const IERC20 = async (address : string, signer? : any) => {
    let provider = signer ? signer : await getProvider()
    let contractInstance = new ethers.Contract(
        address, // Deepfi Token Fantom testnet
        DeepfiToken.abi, 
        provider
    ); 
    return contractInstance;
} 

export default IERC20;
