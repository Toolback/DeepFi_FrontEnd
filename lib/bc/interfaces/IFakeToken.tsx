import FakeToken from "../ABI/FakeToken.json";
import {ethers} from "ethers"

// Free Test Token
const IFakeToken = async (provider : any) => {
    let contractInstance = new ethers.Contract(
        "0xa6ccE76B22Cf07e28fF7c92B465cb038ab14808B", // fake token contract address Fantom Testnet
        FakeToken.abi, 
        provider
    ); 
    return contractInstance;
} 

export default IFakeToken;
