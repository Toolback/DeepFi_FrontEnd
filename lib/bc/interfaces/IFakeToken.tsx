import FakeToken from "../ABI/FakeToken.json";
import {ethers} from "ethers"
import { getProvider } from "../wallet-connect";

// Free Test Token
const IFakeToken = async (signer? : any) => {
    let provider = signer ? signer : await getProvider()
    let contractInstance = new ethers.Contract(
        "0xd2f933747cDe7cB612948e9B8A940dc6bBCF2da1", // fake token contract address Fantom Testnet
        FakeToken.abi, 
        provider
    ); 
    return contractInstance;
} 

export default IFakeToken;
