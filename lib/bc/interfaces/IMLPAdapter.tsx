import MLPAdapterABI from "../ABI/MlpAdapter.json";
import {ethers} from "ethers"
import { getProvider } from "../wallet-connect";

const IMLPAdapter = async (signer? : any) => {
    let provider = signer ? signer : await getProvider()
    let contractInstance = new ethers.Contract(
        "0xd29266219fc8A71C8320f2bBF0C2f7b22C7527FA", // mlp strategy fantom testnet
        MLPAdapterABI.abi, 
        provider
    );
    return contractInstance;
} 

export default IMLPAdapter;
