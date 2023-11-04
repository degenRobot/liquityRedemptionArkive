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

export const Transfer = createEntity('Transfer', {
  token: String,
  block: { type: Number, index: true },
  hash: String,
  from: String,
  to: String,
  value: Number,
})

// Contains current balance for all users
export const Balance = createEntity('Balance', {
  token: String,
  user: String,
  balance: String,
})

// Contains all balance changes for every user
export const BalanceHistory = createEntity('BalanceHistory', {
  token: String,
  block: { type: Number, index: true },
  user: String,
  balance: String,
})