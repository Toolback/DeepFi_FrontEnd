import {
    // balOfDeFiToken, 
    getVaultTotalUserEarned,
    getVaultUserClaimable,
    getVaultUserDeposit,
    getTokenBalanceOf
} from 'lib/bc/smc'
import { ethers } from 'ethers'

export const getUserVaultData = async (vaults, userAddress, provider) => {
    if (vaults === undefined || vaults === null) {
        console.log("GetUserVaultData -ERROR /!/ Received Vault Undefined")
        return
    }

    if (Array.isArray(vaults))
    {
        for (let vault of vaults) {
            vault.stakeToken.bal = await getVaultUserDeposit(vault.address, userAddress, provider)
            let claimBals = await getVaultUserClaimable(vault.address, userAddress, provider);
            let earnedBals = await getVaultTotalUserEarned(vault.address, userAddress, provider)
            for (let rewardToken_index = 0; rewardToken_index < vault.rewardsToken.length; rewardToken_index++) {
                vault.rewardsToken[rewardToken_index].claimable = claimBals[rewardToken_index]
                vault.rewardsToken[rewardToken_index].totalEarned = earnedBals[rewardToken_index];
            }
        }
    }
    else if (typeof vaults === 'object')
    {
        vaults.stakeToken.bal = ethers.utils.formatUnits(await getVaultUserDeposit(vaults.address, userAddress, provider), vaults.stakeToken.dec)
        vaults.stakeToken.balToStake = ethers.utils.formatUnits(await getTokenBalanceOf(vaults.stakeToken.address, userAddress, provider), vaults.stakeToken.dec)
        let claimBals = await getVaultUserClaimable(vaults.address, userAddress, provider);
        let earnedBals = await getVaultTotalUserEarned(vaults.address, userAddress, provider)
        for (let rewardToken_index = 0; rewardToken_index < vaults.rewardsToken.length; rewardToken_index++) {
            vaults.rewardsToken[rewardToken_index].claimable = claimBals[rewardToken_index]
            vaults.rewardsToken[rewardToken_index].totalEarned = earnedBals[rewardToken_index];
        }
    }
    // console.log("getUserVaultData() SENDED TypeOf Vault ?/", vaults)
    return vaults;
}