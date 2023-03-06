import D_Pool_SingleReward from "../ABI/D_Pool_SingleReward.json";
import {ethers, getDefaultProvider} from "ethers"
import { getProvider } from "../wallet-connect";

const IVault = async (vault_address : string, signer? : any) => {
    let provider = signer ? signer : await getProvider()
    let contractInstance = new ethers.Contract(
        vault_address, // Vault fantom 
        D_Pool_SingleReward.abi, 
        provider
    ); 
    return contractInstance;
} 

export default IVault;
