import IHandler from "./interfaces/IHandler";
import IDeepfi from "./interfaces/IDeepfi";
import IVault from "./interfaces/IVault";
import IMLPAdapter from "./interfaces/IMLPAdapter";
import IFakeToken from "./interfaces/IFakeToken";
import {ethers} from "ethers";


// const getMsgSender = async () => {
//     let addressArray = await window.ethereum.request({ method: "eth_requestAccounts" });
//     let addr = addressArray[0]
//     return {addr};
// }

// -------------------- IExec Oracle --------------------



// -------------------- Test Token -------------------- 

export const mintFakeToken = async (_addr : string, _signer : any) => {
    try {
        await (await IFakeToken(_signer)).mint(_addr, ethers.utils.parseUnits('100', 18));
        return (true);
    } catch (e) {
        console.error("SM : Error minting fake token :", e)
    }
}

export const balOfFakeToken = async (_addr : string) => {
    try {
        let bal = await (await IFakeToken()).balanceOf(_addr);
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

export const balOfDeepfi = async (_addr : string) => {
    try {
        let bal = await (await IDeepfi()).balanceOf(_addr);
        return (bal);
    } catch (e) {
        console.error("SM : Error retrieving Deepfi balance:", e)
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

export const getDeployedPools = async () => {
    try {
        let res = await (await IHandler()).getListOfPools();
        return (res);
    } catch (e) {
        console.error("SM : Error retrieving protocol pools:", e)
    }
}

export const getAdapterId = async (poolAddress : string) => {
    try {
        let res = await (await IHandler()).getAdapterId(poolAddress);
        return (res);
    } catch (e) {
        console.error("SM : Error retrieving protocol pools:", e)
    }
}

export const getAdapterInfos = async (poolId : number) => {
    try {
        let res = await (await IHandler()).adapterIdsToAdapterInfo(poolId);
        return (res);
    } catch (e) {
        console.error("SM : Error retrieving protocol pools:", e)
    }
}



// Admin
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

// View Functions

export const getVaultName = async (vault_address : string) => {
    try {
        let res = await (await IVault(vault_address)).vaultName();
        return (res);
    } catch (e) {
        console.error("SM : Error retrieving vault name:", e)
    }
}

export const isVaultAdmin = async (vault_address : string, userAddress : string) => {
    try {
        const AdminRole = await (await IVault(vault_address)).DEFAULT_ADMIN_ROLE();
        const res = await (await IVault(vault_address)).hasRole(AdminRole, userAddress);
    return (res);
} catch (e) {
    console.error("SM : Error retrieving vault admin role:", e)
}
}
export const getVaultTVL = async (vault_address : string) => {
    try {
        let res = await (await IVault(vault_address)).totalSupply();
        return (res);
    } catch (e) {
        console.error("SM : Error retrieving vault tvl:", e)
    }
}

export const getVaultUserDeposit = async (vault_address : string, user_address : string) => {
    try {
        let res = await (await IVault(vault_address)).getStakeBalance(user_address);
        return (res);
    } catch (e) {
        console.error("SM : Error retrieving user vault balance:", e)
    }
}

export const getVaultUserClaimable = async (vault_address : string, user_address : string) => {
    try {
        let res = await (await IVault(vault_address)).getRewardBalance(user_address);
        return (res);
    } catch (e) {
        console.error("SM : Error retrieving user claimable balance:", e)
    }
}

export const getVaultTotalUserEarned = async (vault_address : string, user_address : string) => {
    try {
        let res = await (await IVault(vault_address)).getTotalUserEarned(user_address);
        return (res);
    } catch (e) {
        console.error("SM : Error retrieving user total earned from vault balance:", e)
    }
}

export const getVaultEndRewardDuration = async (vault_address : string) => {
    try {
        let res = await (await IVault(vault_address)).finishAt();
        return (res);
    } catch (e) {
        console.error("SM : Error retrieving finishat reward vault:", e)
    }
}

export const getVaultRewardDuration = async (vault_address : string) => {
    try {
        let res = await (await IVault(vault_address)).duration();
        return (res);
    } catch (e) {
        console.error("SM : Error retrieving finishat reward vault:", e)
    }
}

export const getVaultRewardRate = async (vault_address : string) => {
    try {
        let res = await (await IVault(vault_address)).rewardRate();
        return (res);
    } catch (e) {
        console.error("SM : Error retrieving finishat reward vault:", e)
    }
}

export const getVaultStakeToken = async (vault_address : string) => {
    try {
        let res = await (await IVault(vault_address)).getStakeToken();
        return (res);
    } catch (e) {
        console.error("SM : Error retrieving vault staking token :", e)
    }
}

export const getVaultRewardToken = async (vault_address : string) => {
    try {
        let res = await (await IVault(vault_address)).getRewardToken();
        return (res);
    } catch (e) {
        console.error("SM : Error retrieving vault reward token :", e)
    }
}


// // -------------------- MLP Adapter --------------------

