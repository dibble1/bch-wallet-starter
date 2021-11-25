/*
  This is a demonstration component. It helps to show how you can create new
  menu items and Views in your own BCH web wallet dashboard app.

  This file controls the View (the part on the right side of the dashboard) of
  the component. The menu item is controlled by the menu-components.js file.
*/

import React from 'react'
import { Row, Col, Content, Box, Button } from 'adminlte-2-react'
import { getWalletInfo } from 'gatsby-ipfs-web-wallet/src/components/localWallet'

class Wallet2 extends Wallet {
  // class Wallet2 extends React.Component {
  constructor (props) {
    super(props)
    console.log('Loading new example view.')

    // console.log('Wallet info: ', props.walletInfo)
  }

const BchWallet =
  typeof window !== 'undefined'
    ? window.SlpWallet
    : null

let _this
class Videos extends React.Component {
  constructor (props) {
    super(props)
    _this = this
    this.state = {
      test: 0

    }
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
