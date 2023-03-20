import MLPAdapterABI from "../ABI/MlpAdapter.json";
import {ethers} from "ethers"
import { getProvider } from "../wallet-connect";

const IMLPAdapter = async (signer? : any) => {
    let provider = signer ? signer : await getProvider()
    let contractInstance = new ethers.Contract(
        "0x0818C046e7da9Eb0B42525e9f841141f67B401de", // mlp strategy fantom testnet
        MLPAdapterABI.abi, 
        provider
    );
    return contractInstance;
} 

export default IMLPAdapter;