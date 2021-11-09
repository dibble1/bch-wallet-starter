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
  hostUrl: 'https://fullstack.cash/',
  sourceCode: 'https://github.com/Permissionless-Software-Foundation/bch-wallet-starter',
  torUrl: 'tozqhxcrknbv5l3wshwgj6vp3bj5ezw7qp4jdn4bjrhcpetpcq74j7ad.onion',
  clearWebUrl: 'https://demo-wallet.fullstack.cash'
}

module.exports = config
