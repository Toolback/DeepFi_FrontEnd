import EQZAdapterABI from "../ABI/EqzAdapter.json";
import {ethers} from "ethers"

const IEQZAdapter = async (provider : any) => {
    let contractInstance = new ethers.Contract(
        "0xAE5257B5dd895027bE7C9263e810F5f9380AF7D7", // eqz strategy fantom testnet
        EQZAdapterABI.abi, 
        provider
    );
    return contractInstance;
} 

export default IEQZAdapter;
