import React from 'react'
import { NewRow, PageBody2024, PageWrapper2024 } from '../Styles'
import { NotFoundWrapper } from '../data/css/NotFound'
import config from "../data/config.json"

const Landing = () => {

  return (
    <PageWrapper2024>
      <PageBody2024>
        <NotFoundWrapper>
          <h2>Soon!</h2>
          <h3>Mainnet Coming Soon</h3>
          <p>
            WaxFusion is currently live on WAX Testnet only. Check out our testnet site so you can get familiar and prepare for mainnet launch.
          </p>

          <NewRow />
          
          <a href={config.networks.testnet.urls.website}>
          GO TO TESTNET
          </a>
          
        </NotFoundWrapper>
      </PageBody2024>
    </PageWrapper2024>    
  )
}

export default Landing