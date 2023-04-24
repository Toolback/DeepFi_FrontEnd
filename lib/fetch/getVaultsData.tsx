// import { protocolTokens } from '../../constants';
// import { ethers } from 'ethers'
// import {
//   getDeployedPools,
//   getVaultName,
//   getVaultRewardToken,
//   getVaultStakeToken,
//   getAdapterId,
//   getAdapterInfos,
//   getVaultTVL,
//   getVaultRewardRate,
//   getDeployedPoolsAndAdapters
// } from 'lib/bc/smc'

// export const getVaultsData = async (provider: any) => {
//   const res = await getDeployedPoolsAndAdapters(provider);
//   const deployedPools = await getDeployedPools(provider);
//   let vaults: any = new Array
//   // await Promise.all(
//   // await deployedPools.map(async (vault_address: string, vault_index: number) => {
//   for (let vault_index = 0; vault_index < deployedPools.length; vault_index++) {
//     const vault_address = deployedPools[vault_index];
//     const vaultName = await getVaultName(vault_address, provider);
//     const adapterId = await getAdapterId(vault_address, provider);
//     const adapterContracts = (await getAdapterInfos(adapterId, provider)).contracts
//     const tvl = (await getVaultTVL(vault_address, provider)).toString()

//     // ---------- Staking Token ----------
//     const stakeTokenAddress = await getVaultStakeToken(vault_address, provider);
//     // check for token infos in constants/protocolTokens.js
//     let stakeTokenName: string;
//     let stakeTokenUrl: string;
//     let stakeTokenDec: any;
//     const stakeTokenId: number = protocolTokens.findIndex(token => token.address === stakeTokenAddress);
//     if (stakeTokenId === -1) {
//       // TODO handle create unknown tokens in protocolTokens.js
//       console.log("UNKNOWN STAKING TOKEN id FETCHED /1/, token address => ", stakeTokenAddress)
//       return
//     }
//     else {
//       stakeTokenName = protocolTokens[stakeTokenId].name;
//       stakeTokenUrl = protocolTokens[stakeTokenId].url;
//       stakeTokenDec = protocolTokens[stakeTokenId].decimals
//     }
//     const rewardRate = (Number(ethers.utils.formatUnits(await getVaultRewardRate(vault_address, provider), stakeTokenDec))).toFixed(8)
//     const stakeToken = {
//       name: stakeTokenName,
//       address: stakeTokenAddress,
//       id: stakeTokenId,
//       bal: ethers.BigNumber.from(0),
//       balToStake: ethers.BigNumber.from(0),
//       dec: stakeTokenDec,
//       url: stakeTokenUrl
//     }

//     // ---------- Rewards Tokens ----------
//     let rewardsToken: any[] = [];
//     const rewardsTokenAddress = await getVaultRewardToken(vault_address, provider)
//     if (rewardsTokenAddress) {

//       // rewardsTokenAddress?.map((address, rewardToken_index) => {
//       for (let rewardToken_index = 0; rewardToken_index < rewardsTokenAddress.length; rewardToken_index++) {
//         const rTokenAddr = rewardsTokenAddress[rewardToken_index]
//         // check for token infos in constants/protocolTokens.js
//         const id = protocolTokens.findIndex(Ptoken => Ptoken.address === rTokenAddr);
//         let rewardTokenName;
//         let rewardTokenUrl;
//         let rewardTokenDec;
//         if (id === -1) {
//           // TODO handle create unknown tokens in protocolTokens.js
//           console.log("UNKNOWN REWARD TOKEN id FETCHED /1/, token address => ", rTokenAddr)
//         }
//         else {
//           rewardTokenName = protocolTokens[id].name;
//           rewardTokenUrl = protocolTokens[id].url;
//           rewardTokenDec = protocolTokens[id].decimals;
//         }
//         rewardsToken.push({
//           name: rewardTokenName,
//           id: rewardToken_index,
//           address: rTokenAddr,
//           claimable: ethers.BigNumber.from(0),
//           totalEarned: ethers.BigNumber.from(0),
//           dec: rewardTokenDec,
//           url: rewardTokenUrl
//         })
//       }
//       // })
//     }
//     // )
//     await vaults.push({
//       vaultId: vault_index,
//       address: vault_address,
//       vaultButtonName: vaultName,
//       adapterId,
//       tvl,
//       rewardRate,
//       adapterContracts,
//       stakeToken,
//       rewardsToken
//     })
//     // })
//   }
//   return vaults;
// }


import { protocolTokens } from '../../constants';
import { ethers } from 'ethers'
import {
  getDeployedPools,
  getVaultName,
  getVaultRewardToken,
  getVaultStakeToken,
  getAdapterId,
  getAdapterInfos,
  getVaultTVL,
  getVaultRewardRate,
  getDeployedPoolsAndAdapters,
  getVaultGlobalData
} from 'lib/bc/smc'

export const getVaultsData = async (provider: any) => {
  const res = await getDeployedPoolsAndAdapters(provider);
  const deployedAdapters = res[0];
  const deployedPools = res[1];
  let vaults: any = new Array

  for (let vault_index = 0; vault_index < deployedPools.length; vault_index++) {
    const vault_address = deployedPools[vault_index];
    const vault_data = await getVaultGlobalData(vault_address, provider);
    const vaultName = vault_data.name;
    // const adapterId = await getAdapterId(vault_address, provider);
    const adapterContracts = deployedAdapters[vault_index].contracts
    const tvl = (vault_data.totalSupply).toString()

    // ---------- Staking Token ----------
    const stakeTokenAddress = vault_data.stakingToken;
    // check for token infos in constants/protocolTokens.js
    let stakeTokenName: string;
    let stakeTokenUrl: string;
    let stakeTokenDec: any;
    const stakeTokenId: number = protocolTokens.findIndex(token => token.address === stakeTokenAddress);
    if (stakeTokenId === -1) {
      // TODO handle create unknown tokens in protocolTokens.js
      console.log("UNKNOWN STAKING TOKEN id FETCHED /1/, token address => ", stakeTokenAddress)
      return
    }
    else {
      stakeTokenName = protocolTokens[stakeTokenId].name;
      stakeTokenUrl = protocolTokens[stakeTokenId].url;
      stakeTokenDec = protocolTokens[stakeTokenId].decimals
    }
    const rewardRate = (Number(ethers.utils.formatUnits(vault_data.rewardRate, stakeTokenDec))).toFixed(8)
    const stakeToken = {
      name: stakeTokenName,
      address: stakeTokenAddress,
      id: stakeTokenId,
      bal: ethers.BigNumber.from(0),
      balToStake: ethers.BigNumber.from(0),
      dec: stakeTokenDec,
      url: stakeTokenUrl
    }

    // ---------- Rewards Tokens ----------
    let rewardsToken: any[] = [];
    const rewardsTokenAddress = vault_data.rewardsToken;
    if (rewardsTokenAddress) {

      for (let rewardToken_index = 0; rewardToken_index < rewardsTokenAddress.length; rewardToken_index++) {
        const rTokenAddr = rewardsTokenAddress[rewardToken_index]
        // check for token infos in constants/protocolTokens.js
        const id = protocolTokens.findIndex(Ptoken => Ptoken.address === rTokenAddr);
        let rewardTokenName;
        let rewardTokenUrl;
        let rewardTokenDec;
        if (id === -1) {
          // TODO handle create unknown tokens in protocolTokens.js
          console.log("UNKNOWN REWARD TOKEN id FETCHED /1/, token address => ", rTokenAddr)
        }
        else {
          rewardTokenName = protocolTokens[id].name;
          rewardTokenUrl = protocolTokens[id].url;
          rewardTokenDec = protocolTokens[id].decimals;
        }
        rewardsToken.push({
          name: rewardTokenName,
          id: rewardToken_index,
          address: rTokenAddr,
          claimable: ethers.BigNumber.from(0),
          totalEarned: ethers.BigNumber.from(0),
          dec: rewardTokenDec,
          url: rewardTokenUrl
        })
      }
    }

    await vaults.push({
      vaultId: vault_index,
      address: vault_address,
      vaultButtonName: vaultName,
      // adapterId,
      tvl,
      rewardRate,
      adapterContracts,
      stakeToken,
      rewardsToken
    })
  }
  return vaults;
}