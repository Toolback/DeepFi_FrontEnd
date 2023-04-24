// import { ethers } from "ethers";
// import {
//     getTokenBalanceOf, 
//     getTokenDecimals, 
//     getVaultUserDeposit
// } from 'lib/bc/smc'

// const toClaimTemp = [
//     { name: 'Deepfi', balance: undefined, url: 'https://s2.coinmarketcap.com/static/img/exchanges/64x64/68.png' },
//     { name: 'FTM', balance: undefined, url: 'https://s3.coinmarketcap.com/static/img/portraits/62d51d9af192d82df8ff3a83.png' },

//   ]

//   const totalEarnedTemp = [
//     { name: 'Deepfi', balance: undefined, url: 'https://s2.coinmarketcap.com/static/img/exchanges/64x64/68.png' },
//     { name: 'FTM', balance: undefined, url: 'https://s3.coinmarketcap.com/static/img/portraits/62d51d9af192d82df8ff3a83.png' },
//   ]

// export const vaultMetrics = async (vault, userAddress, provider) => {
//     console.log("VAULT RETURNED : ", vault)

//     let res =
//     {
//       // vaultAddress: vault.address,
//       // stackingToken:stakeToken,

//       // tvl: (await getVaultTVL(vault.address, provider)).toString(),

//       // rewardRate: (Number(ethers.utils.formatUnits(await getVaultRewardRate(vault.address, provider), await getTokenDecimals(stakeToken, provider)))).toFixed(8),
//       userDeposit: connected == true ? (ethers.utils.formatUnits(await getVaultUserDeposit(vault.address, userAddress, provider), await getTokenDecimals(stakeToken, provider))) + ' ' + stakeTokenName : "N/a",
//       userClaimable: connected == true ? toClaimTemp : toClaimTemp,//[], // todo Multiple Reward Tokens
//       userTotalEarned: connected == true ? totalEarnedTemp : totalEarnedTemp, //[], // todo Multiple Reward Tokens
//       userAvailableStakingBal: connected == true ? (ethers.utils.formatUnits(await getTokenBalanceOf(stakeToken, userAddress, provider), await getTokenDecimals(stakeToken, provider))) + ' ' + stakeTokenName : "N/a",
//       // adapterContracts: (await getAdapterInfos(adapter_id, provider)).contracts
//     }

//     return {res};
//   }