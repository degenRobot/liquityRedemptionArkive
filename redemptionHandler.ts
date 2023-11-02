import { EventHandlerFor, formatUnits } from './deps.ts'
import { Redemption } from './entities.ts'
import { TROVE_MANAGER } from './abis/troveManager.ts'
import { number } from 'https://deno.land/x/valibot@v0.8.0/mod.ts'
import { black } from 'https://deno.land/std@0.181.0/fmt/colors.ts'

export const redemptionHandler: EventHandlerFor<typeof TROVE_MANAGER, 'Redemption'> =
  async (
    { event, client, store, contract, logger  },
  ) => {
    const { _actualLUSDAmount, _ETHSent, _ETHFee } = event.args

    
    const block = await store.retrieve(
      `getBlock: ${event.blockNumber}`,
      async () => await client.getBlock({ blockNumber: event.blockNumber }),
    );

    const txHash = event.transactionHash;
    const receipt = await client.getTransactionReceipt({ hash: txHash });
    const txSender = receipt.from;

    await Redemption.create({
      account : txSender,
      ethFee : Number(_ETHFee) / Number(1e18), 
      ethSent : Number(_ETHSent) /  Number(1e18),
      lusdAmount : Number(_actualLUSDAmount) / Number(1e18),
      timestamp : Number(block), 
      block : Number(event.blockNumber),
    })


  }
