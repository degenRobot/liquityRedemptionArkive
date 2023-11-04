import { formatUnits, fromHex, numberToHex } from 'npm:viem'
import { type EventHandlerFor } from 'https://deno.land/x/robo_arkiver@v0.4.22/mod.ts'
import { ERC_20_ABI } from './abis/erc20.ts'
import { Balance, BalanceHistory, Transfer } from './entities.ts'

// Alternatively, you can pull this from the chain
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

const getBalance = async (
  user: string,
  token: string,
  client,
  block,
  store,
) => {
  const bal = await Balance.findOne({ user })
  if (bal) {
    return bal
  } else {
    let userBalance = await client.readContract({
      address: token,
      abi: ERC_20_ABI,
      functionName: 'balanceOf',
      blockNumber: block.blockNumber,
      args: [user],
    })
    return new Balance({ user, token, balance: numberToHex(userBalance) })
  }
}

export const onTransfer: EventHandlerFor<typeof ERC_20_ABI, 'Transfer'> = async (
  { event, store, client, logger },
) => {
  // Store the transfer event
  const { from, to, value } = event.args
  const address = event.address

  // Grab the decimals with viem
  // Use store to cache the value so it is only called once
  const decimals = await store.retrieve(`${address}:decimals`, async () => {
    return await client.readContract({
      abi: ERC_20_ABI,
      address,
      functionName: 'decimals',
    })
  })

  const block = Number(event.blockNumber)
  await Transfer.create({
    token: address,
    hash: event.transactionHash,
    block,
    from,
    to,
    value: formatUnits(value, Number(decimals)),
  })
}