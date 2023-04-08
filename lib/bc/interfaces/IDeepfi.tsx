import DeepfiToken from "../ABI/DeepfiToken.json";
import {ethers} from "ethers"


const IDeepfi = async (provider : any) => {
    let contractInstance = new ethers.Contract(
        "0xCf93B1a43334Ae7fB823100782C60C9E34899D8e", // Deepfi Token Fantom testnet
        DeepfiToken.abi, 
        provider
    ); 
    return contractInstance;
} 

export default IDeepfi;
