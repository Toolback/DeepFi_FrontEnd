import MLPAdapterABI from "../ABI/MlpAdapter.json";
import {ethers} from "ethers"
import { getProvider } from "../wallet-connect";

const IMLPAdapter = async (signer? : any) => {
    let provider = signer ? signer : await getProvider()
    let contractInstance = new ethers.Contract(
        "0x76C0F75205A6eF8cf956228c5C257e4921bf1397", // mlp strategy fantom testnet
        MLPAdapterABI.abi, 
        provider
    );
    return contractInstance;
} 

export default IMLPAdapter;
