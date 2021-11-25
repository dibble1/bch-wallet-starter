import React from 'react'
import PropTypes from 'prop-types'
import { Content, Row, Col, Box, Inputs, Button } from 'adminlte-2-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import BchWallet from 'minimal-slp-wallet'
//import ScannerModal from '../../qr-scanner/modal'
const { Text } = Inputs

const BchWallet = typeof window !== 'undefined' ? window.SlpWallet : null



let _this
class Videos extends React.Component {
  constructor (props) {
    super(props)

    _this = this

    this.state = {
      address: '',
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
    const {
      test
    } = _this.state
    return (
      <Content
        title='Videos'
        subTitle='Videos'
        browserTitle='Videos'
      >
        <Row>
          <Col xs={12}>
            <Box
              title='Videos'
              type='primary'
              closable
              collapsable
              //loaded={!inFetch}
            >
            </Box>

            <Box
              title='test'
              type='primary'
              closable
              collapsable
              //loaded={!inFetch}
            >
            </Box>

          </Col>
        </Row>
      </Content>
    )
  }


}

export default Videos
