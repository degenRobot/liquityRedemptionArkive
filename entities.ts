import { createEntity } from './deps.ts'

interface IRedemption {
  account: string;
  lusdAmount: number;
  ethSent: number;
  ethFee: number;
  timestamp : number;
  block : number;
}

export const Redemption = createEntity<IRedemption>("Redemption", {
  account: String,
  lusdAmount: { type: Number, index: true },
  ethSent: { type: Number, index: true },
  ethFee: { type: Number, index: true },
  timestamp: { type: Number, index: true },
  block: { type: Number, index: true },

});