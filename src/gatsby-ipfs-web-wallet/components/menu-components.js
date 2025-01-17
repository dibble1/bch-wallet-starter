/*
  This file is how you add new menu items to your site. It uses the Gatsby
  concept of Component Shadowing:
  https://www.gatsbyjs.org/blog/2019-04-29-component-shadowing/

  It over-rides he default file in the gatsby-ipfs-web-wallet Theme.
*/

import React from 'react'
import { Sidebar } from 'adminlte-2-react'

// Example/Demo component. This is how you would build a component internal to
// your wallet app/site.
//import DemoComponent from '../../demo-component'
import TokenSwap from '../../token-swap'
import EncryptedChat from '../../encrypted-chat'
import Videos from '../../videos'
import AboutMGTOW from '../../about-mgtow'
import Airdrops from '../../airdrops'

// TX History Plugin.
// This is an example of an external plugin for the wallet. It's a modular
// approach to sharing 'lego blocks' between wallet apps.
// import TXHistory from 'gatsby-plugin-bch-tx-history/src/components/txhistory'
//import TXHistory from 'gatsby-plugin-bch-tx-history'

// Default components from gatsby-ipfs-web-wallet.
import Wallet from 'gatsby-ipfs-web-wallet/src/components/admin-lte/wallet'
import Tokens from 'gatsby-ipfs-web-wallet/src/components/admin-lte/tokens'
import Configure from 'gatsby-ipfs-web-wallet/src/components/admin-lte/configure'
import SendReceive from 'gatsby-ipfs-web-wallet/src/components/admin-lte/send-receive'

const { Item } = Sidebar

const MenuComponents = props => {
  return [
    {
      key: 'Tokens',
      component: <Tokens key='Tokens' {...props} />,
      menuItem: <Item icon='fas-coins' key='Tokens' text='Tokens' />
    },
    {
      key: 'Send/Receive BCH',
      component: <SendReceive key='Send/Receive BCH' {...props} />,
      menuItem: (
        <Item
          icon='fa-exchange-alt'
          key='Send/Receive BCH'
          text='Send/Receive BCH'
        />
      )
    },
    {
      key: 'Wallet',
      component: <Wallet key='Wallet' {...props} />,
      menuItem: <Item icon='fa-wallet' key='Wallet' text='Wallet' />
    },
    {
      key: 'Configure',
      component: <Configure key='Configure' {...props} />,
      menuItem: <Item icon='fas-cog' key='Configure' text='Configure' />
    },
    {
      key: 'Encrypted Chat',
      component: <EncryptedChat key='Encrypted Chat' {...props} />,
      menuItem: <Item icon='fa-exchange-alt' key='Encrypted Chat' text='Encrypted Chat' />
    },
    //{
    //  key: 'TX History',
    //  component: <TXHistory key='TX History' {...props} />,
    //  menuItem: (
    //    <Item icon='fas-cog' key='TX History' text='TX History' />
    //  )
    //},
    //{
    //  key: 'Demo Component',
    //  component: <DemoComponent key='Demo Component' {...props} />,
    //  menuItem: (
    //    <Item icon='fas-cog' key='Demo Component' text='Demo Component' />
    //  )
    //},
    {
      key: 'Token Swap',
      component: <TokenSwap key='Token Swap' {...props} />,
      menuItem: (
        <Item icon='fa-exchange-alt' key='Token Swap' text='Token Swap' />
      )
    },
    {
      key: 'Airdrops',
      component: <TokenSwap key='Airdrops' {...props} />,
      menuItem: (
        <Item icon='fa-exchange-alt' key='Airdrops' text='Airdrops' />
      )
    },
    {
      key: 'Videos',
      component: <Videos key='Videos' {...props} />,
      menuItem: (
        <Item icon='fa-wallet' key='Videos' text='Videos' />
      )
    },
    {
      key: 'About MGTOW',
      component: <AboutMGTOW key='About MGTOW' {...props} />,
      menuItem: (
        <Item icon='fa-wallet' key='About MGTOW' text='About MGTOW' />
      )
    }
  ]
}

export default MenuComponents
