import React from "react";
import { NewRow, PageBody2024, PageWrapper2024 } from "../Styles";
import config from "../data/config.json";
import {
  FeatureCard,
  FeaturesWrapper,
  MainSection,
} from "../data/css/LandingPage";
import { code_svg, coins_svg, efficient_svg, handshake_svg, sale_svg, unlocked_svg } from "../data/svgs";

const network = config.networks[config.currentNetwork];
const currentWebsiteURL = config.production
  ? network.urls.website
  : config.localUrl;

const Landing = () => {
  return (
    <PageWrapper2024>
      <PageBody2024 fullWidth={true}>
        <MainSection>
          <h2>Create Your Own Token Farms</h2>
          <h3>With No Code</h3>
          <p>Add up to 10 different reward tokens to your farm.</p>

          <NewRow />

          <a href={config.socials.docs} target="none">
            LEARN MORE
          </a>
        </MainSection>

        <FeaturesWrapper>
          <h2>What We Offer</h2>
          <p>Explore the benefits of WaxDAO's token farms</p>

          <FeatureCard fill="none" stroke={config.theme.darkGrey}>
            <div className="w-100 flex justify-center pt-10">{sale_svg}</div>

            <h3>Low Cost</h3>

            <p>
              Our low prices make farm creation accessible to all users. No need to pay development costs and waste time 
              building your own tools.
            </p>
          </FeatureCard>

          <FeatureCard>
            <div className="w-100 flex justify-center pt-10">{code_svg}</div>

            <h3>No Code</h3>

            <p>
            WaxDAO allows you to get your farm set up in just a few clicks. No development experience required.
            </p>
          </FeatureCard>

          <FeatureCard>
            <div className="w-100 flex justify-center pt-10">{handshake_svg}</div>

            <h3>Partner Program</h3>

            <p>
            We've built an open source front end and smart contract, so you can launch your own farming platform. 
            Earn fees from any farms created through your platform!
            </p>
          </FeatureCard>      

          <FeatureCard stroke={config.theme.darkGrey} fill="none">
            <div className="w-100 flex justify-center pt-10">{efficient_svg}</div>

            <h3>Efficient</h3>

            <p>
            Our token farms pay out every second. No off-chain scripts, no waiting hours for payouts. You can claim rewards 
            as often as you like.
            </p>
          </FeatureCard>   

          <FeatureCard>
            <div className="w-100 flex justify-center pt-10">{coins_svg}</div>

            <h3>Multiple Reward Tokens</h3>

            <p>
            Farm creators can add up to 10 reward tokens to a farm. Rewards can run concurrently, or 
            at different times. Customize however you like!
            </p>
          </FeatureCard>    

          <FeatureCard fill="none" stroke={config.theme.darkGrey}>
            <div className="w-100 flex justify-center pt-10">{unlocked_svg}</div>

            <h3>Permissionless</h3>

            <p>
            No approval or whitelisting is required to create a farm. Anyone can use our service, the only 
            requirement is the farm creation fee.
            </p>
          </FeatureCard>                                

        </FeaturesWrapper>

        <div className="w-100 mt-4 pt-4 flex justify-center">
          <a href={`${currentWebsiteURL}/farms`} className="stake-button">
            GET STARTED NOW
          </a>
        </div>
      </PageBody2024>
    </PageWrapper2024>
  );
};

export default Landing;
