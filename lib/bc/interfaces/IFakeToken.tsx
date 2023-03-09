import FakeToken from "../ABI/FakeToken.json";
import {ethers} from "ethers"
import { getProvider } from "../wallet-connect";

// Free Test Token
const IFakeToken = async (signer? : any) => {
    let provider = signer ? signer : await getProvider()
    let contractInstance = new ethers.Contract(
        "0x87a64cDe9ee4141c086eE151553A5b1E2056F2a7", // fake token contract address Fantom Testnet
        FakeToken.abi, 
        provider
    ); 
    return contractInstance;
} 

export default IFakeToken;
