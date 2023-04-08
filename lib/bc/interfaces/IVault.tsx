import D_Pool_SingleReward from "../ABI/D_Vault_SingleReward.json";
import {ethers} from "ethers"

const IVault = async (vault_address : string, provider : any) => {
    let contractInstance = new ethers.Contract(
        vault_address, // Vault fantom 
        D_Pool_SingleReward.abi, 
        provider
    ); 
    return contractInstance;
} 

export default IVault;
