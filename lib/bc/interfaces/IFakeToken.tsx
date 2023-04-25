import FakeToken from "../ABI/FakeToken.json";
import {ethers} from "ethers"

// Free Test Token
const IFakeToken = async (tokenAddr:string, provider : any) => {
    let contractInstance = new ethers.Contract(
        tokenAddr, // fake token contract address Fantom Testnet
        FakeToken.abi, 
        provider
    ); 
    return contractInstance;
} 

export default IFakeToken;
