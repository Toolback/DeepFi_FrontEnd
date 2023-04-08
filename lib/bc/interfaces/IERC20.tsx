import DeepfiToken from "../ABI/DeepfiToken.json";
import {ethers} from "ethers"


const IERC20 = async (address : string, provider : any) => {
    let contractInstance = new ethers.Contract(
        address, // Deepfi Token Fantom testnet
        DeepfiToken.abi, 
        provider
    ); 
    return contractInstance;
} 

export default IERC20;
