import React from 'react'
import { NewRow, PageBody2024, PageWrapper2024 } from '../Styles';
import { NotFoundWrapper } from '../data/css/NotFound';
import config from "../data/config.json";

const NotFound = () => {
  const network = config.networks[config.currentNetwork];
  const currentWebsiteURL = config.production ? network.urls.website : config.localUrl;
  
  return (
    <PageWrapper2024>
      <PageBody2024>
        <NotFoundWrapper>
          <h2>Oops!</h2>
          <h3>404 - Page Not Found</h3>
          <p>
            The page you are looking for may have been moved, or it is temporarily unavailable.
            Or, it never existed and you broke everything. Great job.
          </p>

          <NewRow />
          
          <a href={currentWebsiteURL}>
          GO TO HOMEPAGE
          </a>
          
        </NotFoundWrapper>
      </PageBody2024>
    </PageWrapper2024>
  )
}

export default NotFound