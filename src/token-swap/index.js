/*
  This is a demonstration component. It helps to show how you can create new
  menu items and Views in your own BCH web wallet dashboard app.

  This file controls the View (the part on the right side of the dashboard) of
  the component. The menu item is controlled by the menu-components.js file.
*/

import React from 'react'
import { Row, Col, Content, Box, Button } from 'adminlte-2-react'
import { getWalletInfo } from 'gatsby-ipfs-web-wallet/src/components/localWallet'
import bchImage from '../images/bch_deposit_address.png'
import fullStackLogo from '../images/fullstack-logo.png'
import zapitLogo from '../images/zapit-logo.png'
import bitcoincomLogo from '../images/bitcoincom-logo.jpeg'
import memocashLogo from '../images/memocash-logo.jpeg'

const BchWallet =
  typeof window !== 'undefined'
    ? window.SlpWallet
    : null

let _this
class TokenSwap extends React.Component {
  constructor (props) {
    super(props)
    _this = this
    this.state = {
      unconfirmedBalance: 0,
      confirmedBalance: 0,
      totalBalance: 0,
      inFetch: false,
      bchWallet: '',
      isChecked: ''

    }
  }

  render () {
    const {
      unconfirmedBalance,
      confirmedBalance,
      totalBalance,
      inFetch,
      isChecked
    } = _this.state
    return (
      <Content
        title='Token Swap'
        //featuredImage: ../images/bch_deposit_address.png
        subTitle='Swap BCH For MGTOW'
        browserTitle='Token Swap'
      >
        <Row>
          <Col xs={22}>
            <Box
              title='MGTOW Token Vending Machine'
              type='primary'
              closable
              collapsable
              loaded={!inFetch}
              //footer={
                //<Button
                //  type='primary'
                //  text='Check Balance'
                //  onClick={_this.handleGetBalance}
                ///>
              //}
            >
            <p><strong>Collect your very own MGTOW Tokens today and start tipping!</strong></p>
            <p>Vending Machine Status: <i>Online</i></p>

            <table>
               <tr>
                  <td><p><img src={bchImage} width="150" height="150"/></p></td>
                  <td><p><img src={fullStackLogo} width="100" height="100"/></p></td>
                  <td><p><img src={zapitLogo} width="100" height="100"/></p></td>
                  <td><p><img src={bitcoincomLogo} width="100" height="100"/></p></td>
                  <td><p><img src={memocashLogo} width="100" height="100"/></p></td>
               </tr>
               <tr>
                  <td><p>Send any amount of Bitcoin Cash (BCH) to this address and receive MGTOW tokens in return in the very same wallet.</p></td>
                  <td>https://wallet.fullstack.cash</td>
                  <td>https://zapit.io</td>
                  <td>https://wallet.bitcoin.com</td>
                  <td>https://memo.cash</td>
               </tr>
            </table>

            <form>
                <label for="sendbch">Send BCH From Wallet (US $)</label>
                <input id="sendbch" type="number" name="number" value=".10"/>
                <input type="button" value="Send"/>
            </form>

            <form>
              <label>
                Is going:
                <input
                  name="isGoing"
                  type="checkbox"
                  checked={this.state.isGoing}
                  onChange={this.handleInputChange} />
              </label>
              <br />
              <label>
                Number of guests:
                <input
                  name="numberOfGuests"
                  type="number"
                  value={this.state.numberOfGuests}
                  onChange={this.handleInputChange} />
                  <button type="submit">Submit</button>
              </label>
            </form>

            </Box>

          </Col>



        </Row>
      </Content>
    )
  }

  componentDidMount () {
    _this.instanceWallet() // Creates a web wallet instance
  }

  // Get wallet balance
  async handleGetBalance () {
    try {
      _this.setState({
        inFetch: true
      })

      const addr = 'bitcoincash:qr69kyzha07dcecrsvjwsj4s6slnlq4r8c30lxnur3'

      const bchWallet = _this.state.bchWallet
      const bchjs = bchWallet.bchjs

      // Get the Balance
      const balances = await bchjs.Electrumx.balance(addr)

      const totalBalance = balances.balance.confirmed + balances.balance.unconfirmed

      _this.setState({
        inFetch: false,
        unconfirmedBalance: balances.balance.unconfirmed,
        confirmedBalance: balances.balance.confirmed,
        totalBalance: totalBalance,
        isChecked: true
      })
    } catch (error) {
      console.error(error)
      _this.setState({
        inFetch: false
      })
    }
  }

  // Creates an instance  of minimal-slp-wallet, with
  // the local storage information if it exists
  instanceWallet () {
    try {
      const localStorageInfo = getWalletInfo()
      if (!localStorageInfo.mnemonic) return null

      const jwtToken = localStorageInfo.JWT
      const restURL = localStorageInfo.selectedServer
      const bchjsOptions = {}

      if (jwtToken) {
        bchjsOptions.apiToken = jwtToken
      }
      if (restURL) {
        bchjsOptions.restURL = restURL
      }
      const bchWalletLib = new BchWallet(localStorageInfo.mnemonic, bchjsOptions)

      // Update bchjs instances  of minimal-slp-wallet libraries
      bchWalletLib.tokens.sendBch.bchjs = new bchWalletLib.BCHJS(bchjsOptions)
      bchWalletLib.tokens.utxos.bchjs = new bchWalletLib.BCHJS(bchjsOptions)

      _this.setState({
        bchWallet: bchWalletLib
      })
      return bchWalletLib
    } catch (error) {
      console.warn(error)
    }
  }
}

export default TokenSwap
