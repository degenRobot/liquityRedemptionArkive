import { ERC_20_ABI } from './abis/erc20.ts'
import { TROVE_MANAGER } from './abis/troveManager.ts'
import { RPC } from './config.ts'
import { Manifest } from './deps.ts'
import { Redemption, Transfer } from './entities.ts'
import { redemptionHandler } from './redemptionHandler.ts'
import { onTransfer } from "./transferHandlers.ts";

const manifest = new Manifest('liquityRedemptions')

manifest
  .addEntities([
    Redemption,
    Transfer,
  ])
  .addChain('mainnet', (chain) =>
    chain
      .setOptions({
        blockRange : 500n,
        rpcUrl: 'https://rpc.ankr.com/eth',
      })
      .addContract({
        name: 'TROVE_MANAGER',
        abi: TROVE_MANAGER,
        sources: { '0xA39739EF8b0231DbFA0DcdA07d7e29faAbCf4bb2': 12178557n },
        eventHandlers: { 'Redemption': redemptionHandler },
      })
      .addContract({
        name : 'LUSD',
        abi : ERC_20_ABI,
        sources : {'0x5f98805A4E8be255a32880FDeC7F6728C6568bA0' : 12178594n },
        eventHandlers : { 'Transfer' : onTransfer}

      }))

export default manifest.build()
