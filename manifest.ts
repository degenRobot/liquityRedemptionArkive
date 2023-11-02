import { TROVE_MANAGER } from './abis/troveManager.ts'
import { RPC } from './config.ts'
import { Manifest } from './deps.ts'
import { Redemption } from './entities.ts'
import { redemptionHandler } from './redemptionHandler.ts'

const manifest = new Manifest('liquityRedemptions')

manifest
  .addEntity(Redemption)
  .addChain('mainnet', (chain) =>
    chain
      .setOptions({
        blockRange : 500n,
        rpcUrl: 'https://rpc.ankr.com/eth',
      })
      .addContract({
        name: 'Erc20',
        abi: TROVE_MANAGER,
        sources: { '0xA39739EF8b0231DbFA0DcdA07d7e29faAbCf4bb2': 12178557n },
        eventHandlers: { 'Redemption': redemptionHandler },
      }))

export default manifest.build()
