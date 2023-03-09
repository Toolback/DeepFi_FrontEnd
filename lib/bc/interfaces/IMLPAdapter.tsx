import MLPAdapterABI from "../ABI/MlpAdapter.json";
import {ethers} from "ethers"
import { getProvider } from "../wallet-connect";

const IMLPAdapter = async (signer? : any) => {
    let provider = signer ? signer : await getProvider()
    let contractInstance = new ethers.Contract(
        "0xC3CCE338bC613F4c7aB05fd7730da020DA54D9BD", // mlp strategy fantom testnet
        MLPAdapterABI.abi, 
        provider
    );
    return contractInstance;
} 

export default IMLPAdapter;
