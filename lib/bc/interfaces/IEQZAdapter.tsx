import EQZAdapterABI from "../ABI/EqzAdapter.json";
import {ethers} from "ethers"

const IEQZAdapter = async (provider : any) => {
    let contractInstance = new ethers.Contract(
        "0x0a40DCA2F0Ee6baB5abfe92Db3a41016E0Ce691E", // eqz strategy fantom testnet
        EQZAdapterABI.abi, 
        provider
    );
    return contractInstance;
} 

export default IEQZAdapter;
