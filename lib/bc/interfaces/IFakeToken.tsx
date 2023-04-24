import FakeToken from "../ABI/FakeToken.json";
import {ethers} from "ethers"

// Free Test Token
const IFakeToken = async (provider : any) => {
    let contractInstance = new ethers.Contract(
        "0x18188A8d50cC6f44a4eCB9D112E2F98d47d9491c", // fake token contract address Fantom Testnet
        FakeToken.abi, 
        provider
    ); 
    return contractInstance;
} 

export default IFakeToken;
