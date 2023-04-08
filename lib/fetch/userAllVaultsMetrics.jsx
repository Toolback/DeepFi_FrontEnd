import { ethers } from 'ethers';
import { protocolTokens } from '../../constants';
import { 
    balOfDeFiToken, 
} from 'lib/bc/smc'


export const userAllVaultsMetrics = async (vaults, userAddress, provider ) => {
    // console.log("Updated Vault Passed In ", vaults)
      let totalDefiBal = await balOfDeFiToken(userAddress, provider);
      let resUserMetrics = {
        totalDeposit: [],
        totalClaimable: [],
        totalEarned: [],
        totalBal: totalDefiBal,
      }
      // await Promise.all(
        await vaults.map(async (vault, t_vault) => {
          // ---------- Total Deposit ----------
          // let stakeTokenBal = ethers.BigNumber.from(await getVaultUserDeposit(vault.address, userAddress, provider));
          let stakeTokenBal = ethers.BigNumber.from(vault.stakeToken.bal);
          
          // check if token already exist, else create new one
          let i1 = resUserMetrics.totalDeposit.findIndex(deposit => deposit.adress === vault.stakeToken.address);
          if (i1 != -1)
          {

            ((resUserMetrics.totalDeposit[i1]).balance).add(stakeTokenBal);
          }
          else {

            resUserMetrics.totalDeposit.push({
              adress: vault.stakeToken.address,
              id: vault.stakeToken.id,
              name: vault.stakeToken.name,
              url: vault.stakeToken.url,
              dec: vault.stakeToken.dec,
              balance: stakeTokenBal,
            });
          }

          
          // ---------- Claimable & Total Earned ---------- 
          // fetch vault arrays

              await vault.rewardsToken.map((token, t_index) => {
              // check if token already exist, else create new one
              let iTC = resUserMetrics.totalClaimable.findIndex(Ptoken => Ptoken.address === token.address);
              let iTE = resUserMetrics.totalEarned.findIndex(Ptoken => Ptoken.address === token.address);
              if (iTC != -1){
                ((resUserMetrics.totalClaimable[iTC]).balance).add(token.claimable);
              }
              else
                resUserMetrics.totalClaimable.push({
                  address:token.address,
                  id: token.id,
                  name: token.name,
                  url: token.url,
                  dec: token.dec,
                  balance: token.claimable,
                });
              if (iTE != -1)
              {
                ((resUserMetrics.totalEarned[iTE]).balance).add(token.totalEarned);
              } 
              else
                resUserMetrics.totalEarned.push({
                  address:token.address,
                  id: token.id,
                  name: token.name,
                  url: token.url,
                  dec: token.dec,
                  balance: token.totalEarned,
                });
            })

        })
      return {resUserMetrics}

    
  }
