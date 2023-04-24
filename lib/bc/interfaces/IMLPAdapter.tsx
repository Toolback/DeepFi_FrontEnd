import MLPAdapterABI from "../ABI/MlpAdapter.json";
import {ethers} from "ethers"

const IMLPAdapter = async (provider : any) => {
    let contractInstance = new ethers.Contract(
        "0x991e0100f0d6d308D139B72F8407749e0A34254D", // mlp strategy fantom testnet
        MLPAdapterABI.abi, 
        provider
    );
    return contractInstance;
} 

export default IMLPAdapter;