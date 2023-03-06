import FakeToken from "../ABI/FakeToken.json";
import {ethers} from "ethers"
import { getProvider } from "../wallet-connect";

// Free Test Token
const IFakeToken = async (signer? : any) => {
    let provider = signer ? signer : await getProvider()
    let contractInstance = new ethers.Contract(
        "0xA339d00d4120108Caeb4169Ce42424B0cA549A4C", // fake token contract address Fantom Testnet
        FakeToken.abi, 
        provider
    ); 
    return contractInstance;
} 

export default IFakeToken;
