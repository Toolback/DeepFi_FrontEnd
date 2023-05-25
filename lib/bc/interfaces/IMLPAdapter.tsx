import MLPAdapterABI from "../ABI/MlpAdapter.json";
import {ethers} from "ethers"

const IMLPAdapter = async (provider : any) => {
    let contractInstance = new ethers.Contract(
        "0x3454B91f94b50ED277F57cBec4E8354F00A97970", // mlp strategy fantom testnet
        MLPAdapterABI.abi, 
        provider
    );
    return contractInstance;
} 

export default IMLPAdapter;