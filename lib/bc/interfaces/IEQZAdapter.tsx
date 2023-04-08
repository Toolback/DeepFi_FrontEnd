import EQZAdapterABI from "../ABI/EqzAdapter.json";
import {ethers} from "ethers"

const IEQZAdapter = async (provider : any) => {
    let contractInstance = new ethers.Contract(
        "0xA428DEceD50Bd48b8F09dab66805A9cc2e08b369", // eqz strategy fantom testnet
        EQZAdapterABI.abi, 
        provider
    );
    return contractInstance;
} 

export default IEQZAdapter;
