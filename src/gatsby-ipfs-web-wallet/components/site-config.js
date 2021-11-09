/*
  This file is intended to be overwritten. It provides a common place to store
  site configuration data.
*/

const config = {
  title: 'MGTOW.cash',
  titleShort: 'MGTOW.cash',
  balanceText: 'BCH Balance',
  balanceIcon: 'fab-bitcoin',

  // The BCH address used in a memo.cash account. Used for tracking the IPFS
  // hash of the mirror of this site.
  memoAddr: 'bitcoincash:qrjk268ud379rlp76t8hr3n2uu3mgw2jdvy7r347vq',

  // Footer Information
  hostText: 'FullStack.cash',
  hostUrl: 'https://mgtow.cash/',
  sourceCode: 'https://github.com/Permissionless-Software-Foundation/bch-wallet-starter',
  torUrl: 'TBD',
  clearWebUrl: 'TBD'
}

module.exports = config
