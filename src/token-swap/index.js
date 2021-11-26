import React from 'react'
import PropTypes from 'prop-types'
import { Content, Row, Col, Box, Inputs, Button } from 'adminlte-2-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import bchImage from '../images/bch_deposit_address.png'
import fullStackLogo from '../images/fullstack-logo.png'
import zapitLogo from '../images/zapit-logo.png'
import bitcoincomLogo from '../images/bitcoincom-logo.jpeg'
import memocashLogo from '../images/memocash-logo.jpeg'
// import BchWallet from 'minimal-slp-wallet'
//import ScannerModal from '../../../gatsby-ipfs-web-wallet/src/components/qr-scanner/modal'
const { Text } = Inputs

const BchWallet = typeof window !== 'undefined' ? window.SlpWallet : null

let _this
class TokenSwap extends React.Component {
  constructor (props) {
    super(props)

    _this = this

    this.state = {
      address: 'bitcoincash:qpsm6kdg8382ml3d03mtyp6pt4wmpz4q2smpxlhqzj',
      amountSat: '',
      errMsg: '',
      txId: '',
      showScan: false,
      inFetch: false,
      sendCurrency: 'USD',
      sendMax: false,
      explorerURL: ''
    }
    _this.BchWallet = BchWallet
  }

  render () {
    return (
      <>
        <Content>
          <Row>
            <Col sm={2} />
            <Col sm={22}>
              <Box
                title='Swap BCH For MGTOW'
                type='primary'
                loaded={!_this.state.inFetch}
                closable
                collapsable
              >
                <Row>
                  <Col sm={12} className='text-center'>
                    <h1>
                      <FontAwesomeIcon
                        className='title-icon'
                      />
                    </h1>
                    <Box className='border-none'>
                      <Text
                        id='amountToSend'
                        name='amountSat'
                        value={_this.state.amountSat}
                        placeholder={`Enter amount to send in ${_this.state.sendCurrency}`}
                        label='bitcoincash:qpsm6kdg8382ml3d03mtyp6pt4wmpz4q2smpxlhqzj'
                        labelPosition='above'
                        onChange={_this.handleUpdate}
                        addonRight={_this.state.sendCurrency}
                        disabled={_this.state.sendMax}
                        buttonRight={
                          <Button
                            icon='fa-random'
                            onClick={_this.handleChangeCurrency}
                          />
                        }
                        buttonLeft={
                          <Button
                            text={_this.state.sendMax ? 'UNDO' : 'MAX'}
                            onClick={_this.handleSendType}
                          />
                        }
                      />
                      <div className='text-left pb-4'>
                        <p>
                          {_this.state.sendCurrency === 'BCH'
                            ? `USD: ${(
                                _this.state.amountSat *
                                (_this.props.currentRate / 100)
                              ).toFixed(2)}`
                            : `BCH: ${(
                                _this.state.amountSat /
                                (_this.props.currentRate / 100)
                              ).toFixed(8)}`}
                        </p>
                      </div>
                      <Button
                        text='Send'
                        type='primary'
                        className='btn-lg'
                        onClick={
                          _this.state.sendMax
                            ? _this.handleSendAll
                            : _this.handleSend
                        }
                      />
                    </Box>
                  </Col>
                  <Col sm={12} className='text-center'>
                    {_this.state.errMsg && (
                      <p className='error-color'>{_this.state.errMsg}</p>
                    )}
                    {_this.state.txId && (
                      <a
                        target='_blank'
                        rel='noopener noreferrer'
                        href={`${_this.state.explorerURL}/${_this.state.txId}`}
                      >
                        Transaction ID: {_this.state.txId}
                      </a>
                    )}
                  </Col>
                </Row>
              </Box>
            </Col>
            <Col sm={2} />
          </Row>

          <Box
            title='Use Your Own Wallet'
            type='primary'
            closable
            collapsable
            //loaded={!inFetch}
          >

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
          >
          </Box>

        </Content>
      </>
    )
  }

  componentDidMount () {
    const { bchWallet } = _this.props
    console.log('bchWallet', bchWallet)
    _this.defineExplorer()
  }

  // Define the explorer to use
  // depending on the selected chain
  defineExplorer () {
    const bchWalletLib = _this.props.bchWallet
    const bchjs = bchWalletLib.bchjs

    let explorerURL

    if (bchjs.restURL.includes('abc.fullstack')) {
      explorerURL = 'https://explorer.bitcoinabc.org/tx'
    } else {
      explorerURL = 'https://explorer.bitcoin.com/bch/tx'
    }
    _this.setState({
      explorerURL
    })
  }

  handleChangeCurrency () {
    if (_this.state.sendCurrency === 'USD') {
      _this.setState({
        sendCurrency: 'BCH'
      })
      if (_this.state.amountSat > 0) {
        _this.setState({
          amountSat: (
            _this.state.amountSat /
            (_this.props.currentRate / 100)
          ).toFixed(8)
        })
      }
    } else {
      _this.setState({
        sendCurrency: 'USD'
      })
      if (_this.state.amountSat > 0) {
        _this.setState({
          amountSat: (
            _this.state.amountSat *
            (_this.props.currentRate / 100)
          ).toFixed(2)
        })
      }
    }
  }

  handleSendType () {
    const sendMax = !_this.state.sendMax
    _this.setState({
      sendMax
    })
    if (sendMax) {
      _this.getMaxAmount()
    } else {
      _this.setState({
        amountSat: ''
      })
    }
  }

  async getMaxAmount () {
    try {
      const bchWalletLib = _this.props.bchWallet
      // Ensure the wallet UTXOs are up-to-date.
      const walletAddr = bchWalletLib.walletInfo.address
      await bchWalletLib.utxos.initUtxoStore(walletAddr)

      const utxos = bchWalletLib.utxos.utxoStore.bchUtxos
      if (!utxos.length) {
        throw new Error('No BCH Utxos to spend!')
      }

      // Get total of satoshis fron the bch utxos
      let totalAmount = 0
      utxos.map(val => (totalAmount += val.value))

      // Convert satoshis to bch
      let amountSat = totalAmount / 100000000

      // Change the amount to send to USD if is the selected currency
      if (_this.state.sendCurrency === 'USD') {
        const _usdAmount = amountSat * (_this.props.currentRate / 100)
        const usdAmount = Number(_usdAmount.toFixed(2)) // usd Amount
        amountSat = usdAmount
      }

      _this.setState({
        amountSat: amountSat
      })
    } catch (error) {
      console.error(error)
      _this.setState({
        errMsg: error.message,
        sendMax: false
      })
    }
  }

  async handleSendAll () {
    try {
      _this.validateInputs()

      const bchWalletLib = _this.props.bchWallet
      let { address, amountSat } = _this.state

      if (_this.state.sendCurrency === 'USD') {
        amountSat = (amountSat / (_this.props.currentRate / 100)).toFixed(8)
      }

      const amountToSend = Math.floor(Number(amountSat) * 100000000)
      console.log(`Sending ${amountToSend} satoshis to ${address}`)

      if (!bchWalletLib) {
        throw new Error('Wallet not found')
      }
      _this.setState({
        inFetch: true
      })

      // Ensure the wallet UTXOs are up-to-date.
      const walletAddr = bchWalletLib.walletInfo.address
      await bchWalletLib.utxos.initUtxoStore(walletAddr)

      // Send the BCH.
      const result = await bchWalletLib.sendAll(address)
      // console.log('result',result)

      _this.setState({
        txId: result
      })

      // update balance
      setTimeout(async () => {
        const myBalance = await bchWalletLib.getBalance()
        const bchjs = bchWalletLib.bchjs

        let currentRate

        if (bchjs.restURL.includes('abc.fullstack')) {
          currentRate = (await bchjs.Price.getBchaUsd()) * 100
        } else {
          // BCHN price.
          currentRate = (await bchjs.Price.getUsd()) * 100
        }

        _this.props.updateBalance({ myBalance, currentRate })
      }, 1000)

      _this.resetValues()
    } catch (error) {
      _this.handleError(error)
    }
  }

  handleUpdate (event) {
    const value = event.target.value
    _this.setState({
      [event.target.name]: value
    })
  }

  async handleSend () {
    try {
      _this.validateInputs()

      const bchWalletLib = _this.props.bchWallet
      let { address, amountSat } = _this.state

      if (_this.state.sendCurrency === 'USD') {
        amountSat = (amountSat / (_this.props.currentRate / 100)).toFixed(8)
      }

      const amountToSend = Math.floor(Number(amountSat) * 100000000)
      console.log(`Sending ${amountToSend} satoshis to ${address}`)

      const receivers = [
        {
          address,
          // amount in satoshis, 1 satoshi = 0.00000001 Bitcoin
          amountSat: amountToSend
        }
      ]
      // console.log("receivers", receivers)

      if (!bchWalletLib) {
        throw new Error('Wallet not found')
      }
      _this.setState({
        inFetch: true
      })

      // Ensure the wallet UTXOs are up-to-date.
      const walletAddr = bchWalletLib.walletInfo.address
      await bchWalletLib.utxos.initUtxoStore(walletAddr)

      // Used for debugging.
      // console.log(
      //   `bchWalletLib.utxos.bchUtxos: ${JSON.stringify(
      //     bchWalletLib.utxos.bchUtxos,
      //     null,
      //     2
      //   )}`
      // )

      // Send the BCH.
      const result = await bchWalletLib.send(receivers)
      console.log('result', result)

      _this.setState({
        txId: result.txid || result
      })

      // update balance
      setTimeout(async () => {
        const myBalance = await bchWalletLib.getBalance()
        const bchjs = bchWalletLib.bchjs

        let currentRate

        if (bchjs.restURL.includes('abc.fullstack')) {
          currentRate = (await bchjs.Price.getBchaUsd()) * 100
        } else {
          // BCHN price.
          currentRate = (await bchjs.Price.getUsd()) * 100
        }

        _this.props.updateBalance({ myBalance, currentRate })
      }, 1000)

      _this.resetValues()
    } catch (error) {
      _this.handleError(error)
    }
  }

  // Reset form and component state
  resetValues () {
    _this.setState({
      address: 'bitcoincash:qpsm6kdg8382ml3d03mtyp6pt4wmpz4q2smpxlhqzj',
      amountSat: '',
      errMsg: '',
      inFetch: false,
      sendMax: ''
    })
    const amountEle = document.getElementById('amountToSend')
    amountEle.value = ''

    const addressEle = document.getElementById('addressToSend')
    addressEle.value = ''
  }

  validateInputs () {
    const { address, amountSat } = _this.state
    const amountNumber = Number(amountSat)

    if (!address) {
      throw new Error('Address is required')
    }

    if (!amountSat) {
      throw new Error('Amount is required')
    }

    if (!amountNumber) {
      throw new Error('Amount must be a number')
    }

    if (amountNumber < 0) {
      throw new Error('Amount must be greater than zero')
    }
  }

  onHandleToggleScanner () {
    _this.setState({
      showScan: !_this.state.showScan
    })
  }

  handleModal () {
    _this.setState({
      showScan: !_this.state.showScan
    })
  }

  resetAddressValue () {
    _this.setState({
      address: '',
      errMsg: ''
    })
    const addressEle = document.getElementById('addressToSend')
    addressEle.value = ''
  }

  onHandleScan (data) {
    try {
      _this.resetAddressValue()
      if (!data) {
        throw new Error('No Result!')
      }
      if (typeof data !== 'string') {
        throw new Error('It should scan a bch address or slp address')
      }

      _this.setState({
        address: data,
        errMsg: ''
      })
      const addressEle = document.getElementById('addressToSend')
      addressEle.value = data

      _this.onHandleToggleScanner()
    } catch (error) {
      _this.onHandleToggleScanner()
      _this.setState({
        errMsg: error.message
      })
    }
  }

  handleError (error) {
    // console.error(error)
    let errMsg = ''
    if (error.message) {
      errMsg = error.message
    }
    if (error.error) {
      if (error.error.match('rate limits')) {
        errMsg = (
          <span>
            Rate limits exceeded, increase rate limits with a JWT token from
            <a
              style={{ marginLeft: '5px' }}
              target='_blank'
              href='https://fullstack.cash'
              rel='noopener noreferrer'
            >
              FullStack.cash
            </a>
          </span>
        )
      } else {
        errMsg = error.error
      }
    }
    _this.setState(prevState => {
      return {
        ...prevState,
        errMsg,
        txId: '',
        inFetch: false
      }
    })
  }
}
TokenSwap.propTypes = {
  updateBalance: PropTypes.func.isRequired,
  bchWallet: PropTypes.object,
  currentRate: PropTypes.number
}

export default TokenSwap
