import IHandler from "./interfaces/IHandler";
import IDeepfi from "./interfaces/IDeepfi";
import IVault from "./interfaces/IVault";
import IMLPAdapter from "./interfaces/IMLPAdapter";
import IFakeToken from "./interfaces/IFakeToken";
import {ethers} from "ethers";
import IERC20 from "./interfaces/IERC20";


// const getMsgSender = async () => {
//     let addressArray = await window.ethereum.request({ method: "eth_requestAccounts" });
//     let addr = addressArray[0]
//     return {addr};
// }

// -------------------- IERC20 --------------------

export const getTokenName = async (_addr : string, provider : any) => {
    try {
        let req = await (await IERC20(_addr, provider)).name();
        return (req);
    } catch (e) {
        console.error("SM : Error retrieving token name:", e)
    }
}

export const getTokenAllowance = async (_addr : string, provider : any, owner:string, to:string) => {
    try {
        let req = await (await IERC20(_addr, provider)).allowance(owner, to);
        return (req);
    } catch (e) {
        console.error("SM : Error retrieving token allowance:", e)
    }
}

export const getTokenBalanceOf = async (_contractAddr : string, _userAddr : string, provider : any) => {
    try {
        let req = await (await IERC20(_contractAddr, provider)).balanceOf(_userAddr);
        return (req);
    } catch (e) {
        console.error("SM : Error retrieving token balance:", e)
    }
}

export const getTokenDecimals = async (_contractAddr : string, provider : any) => {
    try {
        let req = await (await IERC20(_contractAddr, provider)).decimals();
        return (req);
    } catch (e) {
        console.error("SM : Error retrieving token decimals:", e)
    }
}


export const ApproveTokenAmount = async (_token:string, _target : string, _amount : number, _signer : any) => {
    try {
        let req = await (await IERC20(_token, _signer)).approve(_target, _amount);
        return (req);
    } catch (e) {
        console.error("SM : Error retrieving token decimals:", e)
    }
}

// -------------------- Test Token -------------------- 

export const mintFakeToken = async (_addr : string, _signer : any) => {
    try {
        await (await IFakeToken(_signer)).mint(_addr, ethers.utils.parseUnits('100', 18));
        return (true);
    } catch (e) {
        console.error("SM : Error minting fake token :", e)
    }
}

export const balOfFakeToken = async (_addr : string, provider : any) => {
    try {
        let bal = await (await IFakeToken(provider)).balanceOf(_addr);
        return (bal);
    } catch (e) {
        console.error("SM : Error retrieving fake token balance:", e)
    }
}

export const approveTargetFT = async (_target : string, _amount : number, _signer : any) => {
    try {
        let res = await (await IFakeToken(_signer)).approve(_target, _amount);
        return await res.wait();
    } catch (e) {
        console.error("SM : Error approving fake token :", e)
    }
}


// -------------------- Deepfi Token -------------------- 

export const balOfDeFiToken = async (_addr : string, provider : any) => {
    try {
        let bal = Number(ethers.utils.formatUnits(await (await IDeepfi(provider)).balanceOf(_addr), 18));
        return (bal);
    } catch (e) {
        console.error("SM : Error retrieving DeFi Token balance:", e)
    }
}

export const approveTargetDeepfi = async (_target : string, _amount : number, _signer : any, ) => {
    try {
        let res = await (await IDeepfi(_signer)).approve(_target, _amount);
        return await res.wait();
    } catch (e) {
        console.error("SM : Error approving Deepfi token :", e)
    }
}

export const transferDeepfi = async (_target : string, _amount : number, _signer : any) => {
    try {
        let res = await (await IDeepfi(_signer)).transfer(_target, _amount);
        return await res.wait();
    } catch (e) {
        console.error("SM : Error transfering Deepfi token :", e)
    }
}


// -------------------- Handler -------------------- 

export const getDeployedPoolsAndAdapters = async (provider : any) => {
    try {
        let res = await (await IHandler(provider)).getActiveAdapters();
        return (res);
    } catch (e) {
        console.error("SM : Error retrieving getDeployedPoolsAndAdapters:", e)
    }
}

export const getDeployedPools = async (provider : any) => {
    try {
        let res = await (await IHandler(provider)).getListOfPools();
        return (res);
    } catch (e) {
        console.error("SM : Error retrieving getDeployedPools:", e)
    }
}

export const getAdapterId = async (poolAddress : string, provider : any) => {
    try {
        let res = await (await IHandler(provider)).getAdapterId(poolAddress);
        return (res);
    } catch (e) {
        console.error("SM : Error retrieving getAdapterId:", e)
    }
}

export const getAdapterInfos = async (poolId : number, provider : any) => {
    try {
        let res = await (await IHandler(provider)).getAdapterInfo(poolId);
        return (res);
    } catch (e) {
        console.error("SM : Error retrieving getAdapterInfos:", e)
    }
}

export const isHandlerAdmin = async (userAddress : string, provider : any) => {
    try {
        const AdminRole = await (await IHandler(provider)).DEFAULT_ADMIN_ROLE();
        const res = await (await IHandler(provider)).hasRole(AdminRole, userAddress);
    return (res);
} catch (e) {
    console.error("SM : Error retrieving handler admin role:", e)
}
}


// Admin

export const setNewHandlerAdmin = async (newAdminAddress : string, signer : any) => {
    try {
        let adminRole = await (await IHandler(signer)).DEFAULT_ADMIN_ROLE(); 
        let res = await (await IHandler(signer)).grantRole(adminRole, newAdminAddress);
        return await res.wait();
    } catch (e) {
        console.error("SM : Error while setNewHandlerAdmin:", e)
    }
}

export const removeHandlerAdmin = async (newAdminAddress : string, signer : any) => {
    try {
        let adminRole = await (await IHandler(signer)).DEFAULT_ADMIN_ROLE(); 
        let res = await (await IHandler(signer)).revokeRole(adminRole, newAdminAddress);
        return await res.wait();
    } catch (e) {
        console.error("SM : Error while removeHandlerAdmin:", e)
    }
}

export const setPoolToAdapterId = async (poolAddress : string, adapterId : number, signer : any) => {
    try {
        let res = await (await IHandler(signer)).setPoolToAdapterId(poolAddress, adapterId);
        return (res);
    } catch (e) {
        console.error("SM : Error set pool to adapter id:", e)
    }
}

export const setAdapter = async (adapterId : number, adapter_name : string, percentage : number, adapter_address : string, adapter_status : boolean, signer : any) => {
    try {
        let res = await (await IHandler(signer)).setAdapter(adapterId, adapter_name, percentage, adapter_address, adapter_status);
        return (res);
    } catch (e) {
        console.error("SM : Error setAdapter:", e)
    }
}

export const changeAdapterStatus = async (adapterId : number, adapter_status : boolean, signer : any) => {
    try {
        let res = await (await IHandler(signer)).changeAdapterStatus(adapterId, adapter_status);
        return (res);
    } catch (e) {
        console.error("SM : Error set adapter status:", e)
    }
}

export const addAdapterContractInfo = async (adapterId : number, adapterContractName : string, adapterContractDescription : string, adapterContractLink : string, signer : any) => {
    try {
        let ContractsInfo = {
            name : adapterContractName,
            description : adapterContractDescription,
            link : adapterContractLink
        }
        let res = await (await IHandler(signer)).addContractInfoToAdapterInfo(adapterId, ContractsInfo);
        return (res);
    } catch (e) {
        console.error("SM : Error addAdapterContractInfo:", e)
    }
}

export const deleteAdapterContractInfo = async (adapterId : number, contractIndex : number, signer : any) => {
    try {
        let res = await (await IHandler(signer)).deleteContractInfoFromAdapterInfo(adapterId, contractIndex);
        return (res);
    } catch (e) {
        console.error("SM : Error deleteAdapterContractInfo:", e)
    }
}


// // -------------------- Vaults -------------------- 



export const vaultDeposit = async (vault_address : string, amount : number, signer : any) => {
    try {
        let res = await (await IVault(vault_address, signer)).deposit(amount);
        return (res);
    } catch (e) {
        console.error("SM : Error while deposit to vault:", e)
    }
}

export const vaultWithdraw = async (vault_address : string, amount : number, signer : any) => {
    try {
        let res = await (await IVault(vault_address, signer)).withdraw(amount);
        return (res);
    } catch (e) {
        console.error("SM : Error while withdraw from vault:", e)
    }
}

export const vaultClaim = async (vault_address : string, signer : any) => {
    try {
        let res = await (await IVault(vault_address, signer)).claimReward();
        return (res);
    } catch (e) {
        console.error("SM : Error while vaultClaim from vault:", e)
    }
}

// admin 

export const setRewardsDuration = async (vault_address : string, duration : number, signer : any) => {
    try {
        let res = await (await IVault(vault_address, signer)).setRewardsDuration(duration);
        return await res.wait();
    } catch (e) {
        console.error("SM : Error while setRewardsDuration:", e)
    }
}

export const notifyRewardAmount = async (vault_address : string, amount : number, signer : any) => {
    try {
        let res = await (await IVault(vault_address, signer)).notifyRewardAmount(amount);
        return await res.wait();
    } catch (e) {
        console.error("SM : Error while notifyRewardAmount:", e)
    }
}

export const setNewVaultAdmin = async (vault_address : string, newAdminAddress : string, signer : any) => {
    try {
        let adminRole = await (await IVault(vault_address, signer)).DEFAULT_ADMIN_ROLE(); 
        let res = await (await IVault(vault_address, signer)).grantRole(adminRole, newAdminAddress);
        return await res.wait();
    } catch (e) {
        console.error("SM : Error while setNewVaultAdmin:", e)
    }
}

export const removeVaultAdmin = async (vault_address : string, newAdminAddress : string, signer : any) => {
    try {
        let adminRole = await (await IVault(vault_address, signer)).DEFAULT_ADMIN_ROLE(); 
        let res = await (await IVault(vault_address, signer)).revokeRole(adminRole, newAdminAddress);
        return await res.wait();
    } catch (e) {
        console.error("SM : Error while removeVaultAdmin:", e)
    }
}

export const setPauseVault = async (vault_address : string, flag : number, signer : any) => {
    try {
        if (flag === 1)
        {
            let res = await (await IVault(vault_address, signer)).pause();
            return await res.wait();
        }
        else 
        {
            let res = await (await IVault(vault_address, signer)).unpause();
            return await res.wait();
        }
    } catch (e) {
        console.error("SM : Error while removeVaultAdmin:", e)
    }
}

export const getPausedVaultStatus = async (vault_address : string, provider : any) => {
    try {
        let res = await (await IVault(vault_address, provider)).paused();
        return res;
    } catch (e) {
        console.error("SM : Error while removeVaultAdmin:", e)
    }
}
// View Functions

export const getVaultUserBals = async (vault_address : string, user : string,  provider : any) => {
    try {
        let res = await (await IVault(vault_address, provider)).getUserBals(user);
        return (res);
    } catch (e) {
        console.error("SM : Error while getVaultGlobalData:", e)
    }
}

export const getVaultGlobalData = async (vault_address : string, provider : any) => {
    try {
        let res = await (await IVault(vault_address, provider)).getVaultInfos();
        return (res);
    } catch (e) {
        console.error("SM : Error while getVaultGlobalData:", e)
    }
}

export const getVaultName = async (vault_address : string, provider : any) => {
    try {
        let res = await (await IVault(vault_address, provider)).vaultName();
        return (res);
    } catch (e) {
        console.error("SM : Error retrieving vault name:", e)
    }
}

export const isVaultAdmin = async (vault_address : string, userAddress : string, provider : any) => {
    try {
        const AdminRole = await (await IVault(vault_address, provider)).DEFAULT_ADMIN_ROLE();
        const res = await (await IVault(vault_address, provider)).hasRole(AdminRole, userAddress);
    return (res);
} catch (e) {
    console.error("SM : Error retrieving vault admin role:", e)
}
}
export const getVaultTVL = async (vault_address : string, provider : any) => {
    try {
        let res = await (await IVault(vault_address, provider)).totalSupply();
        return (res);
    } catch (e) {
        console.error("SM : Error retrieving vault tvl:", e)
    }
}

export const getVaultUserDeposit = async (vault_address : string, user_address : string, provider : any) => {
    try {
        let res = await (await IVault(vault_address, provider)).getStakeBalance(user_address);
        return (res);
    } catch (e) {
        console.error("SM : Error retrieving user vault balance:", e)
    }
}

export const getVaultUserClaimable = async (vault_address : string, user_address : string, provider : any) => {
    try {
        let res = await (await IVault(vault_address, provider)).getUserAllClaimableRewards(user_address);
        return (res);
    } catch (e) {
        console.error("SM : Error retrieving user claimable balance:", e)
    }
}

export const getVaultTotalUserEarned = async (vault_address : string, user_address : string, provider : any) => {
    try {
        let res = await (await IVault(vault_address, provider)).getUserAllEarnedRewards(user_address);
        return (res);
    } catch (e) {
        console.error("SM : Error retrieving user total earned from vault balance:", e)
    }
}

export const getVaultEndRewardDuration = async (vault_address : string, provider : any) => {
    try {
        let res = await (await IVault(vault_address, provider)).finishAt();
        return (res);
    } catch (e) {
        console.error("SM : Error retrieving finishat reward vault:", e)
    }
}

export const getVaultRewardDuration = async (vault_address : string, provider : any) => {
    try {
        let res = await (await IVault(vault_address, provider)).duration();
        return (res);
    } catch (e) {
        console.error("SM : Error retrieving finishat reward vault:", e)
    }
}

export const getVaultRewardRate = async (vault_address : string, provider : any) => {
    try {
        let res = await (await IVault(vault_address, provider)).rewardRate();
        return (res);
    } catch (e) {
        console.error("SM : Error retrieving finishat reward vault:", e)
    }
}

export const getVaultStakeToken = async (vault_address : string, provider : any) => {
    try {
        let res = await (await IVault(vault_address, provider)).stakingToken();
        return (res);
    } catch (e) {
        console.error("SM : Error retrieving vault staking token :", e)
    }
}

// export const getVaultRewardToken = async (vault_address : string, provider : any) => {
//     try {
//         let res = await (await IVault(vault_address, provider)).getRewardToken();
//         return (res);
//     } catch (e) {
//         console.error("SM : Error retrieving vault reward token :", e)
//     }
// }

export const getVaultRewardToken = async (vault_address : string, provider : any) => {
    try {
        let res = await (await IVault(vault_address, provider)).rewardsToken();
        if (!Array.isArray(res))
        {
            let arr = [1];
            arr[0] = res;
            return (arr); 
        }
        return (res);
    } catch (e) {
        console.error("SM : Error getVaultRewardToken:", e)
    }
}

// // -------------------- MLP Adapter --------------------


export const isAdapterAdmin = async (userAddress : string, provider : any) => {
    try {
        const AdminRole = await (await IMLPAdapter(provider)).DEFAULT_ADMIN_ROLE();
        const res = await (await IMLPAdapter(provider)).hasRole(AdminRole, userAddress);
    return (res);
} catch (e) {
    console.error("SM : Error retrieving Adapter admin role:", e)
}
}

export const setNewAdapterAdmin = async (newAdminAddress : string, signer : any) => {
    try {
        let adminRole = await (await IMLPAdapter(signer)).DEFAULT_ADMIN_ROLE(); 
        let res = await (await IMLPAdapter(signer)).grantRole(adminRole, newAdminAddress);
        return await res.wait();
    } catch (e) {
        console.error("SM : Error while setNewAdapterAdmin:", e)
    }
}

export const removeAdapterAdmin = async (newAdminAddress : string, signer : any) => {
    try {
        let adminRole = await (await IMLPAdapter(signer)).DEFAULT_ADMIN_ROLE(); 
        let res = await (await IMLPAdapter(signer)).revokeRole(adminRole, newAdminAddress);
        return await res.wait();
    } catch (e) {
        console.error("SM : Error while removeAdapterAdmin:", e)
    }
}

export const setAdapterCompoundStatus = async (status : boolean, signer : any) => {
    try {
        let res = await (await IMLPAdapter(signer)).setCompoundRewardStatus(status);
        return await res.wait();
    } catch (e) {
        console.error("SM : Error while setAdapterCompoundStatus:", e)
    }
}