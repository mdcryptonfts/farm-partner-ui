import React from 'react';
import { FooterCont, ColumnLinks, ColumnTitle, FooterBrandText, FooterColumn, FooterHref, FooterLeft, FooterRight, SocialIconsDiv } from '../data/css/FooterStyles';
import { discord_svg, medium_svg, telegram_svg, twitter_svg } from '../data/svgs';
import config from "../data/config.json"


const Footer = () => {
  const network = config.networks[config.currentNetwork];
  const currentWebsiteURL = config.production ? network.urls.website : config.localUrl;

  return (
    <FooterCont>
      <FooterLeft>
      {/* <FooterLogo src={header_logo} /> */}
      <FooterBrandText>
        WaxFusion
      </FooterBrandText>
      </FooterLeft>

      <FooterRight>

      <FooterColumn>
        <ColumnTitle>
        Ecosystem
        </ColumnTitle>
        <ColumnLinks>
        <FooterHref href={`${currentWebsiteURL}/stake`}>Liquid Staking</FooterHref><br/>
        <FooterHref href={`${currentWebsiteURL}/rent`}>Short CPU Rental</FooterHref><br/>
        <FooterHref href={`${currentWebsiteURL}/long-term-rent`}>Long CPU Rental</FooterHref><br/>
        <FooterHref href={`${currentWebsiteURL}/powerup`}>PowerUp</FooterHref><br/>
        
        </ColumnLinks>
        </FooterColumn>


        <FooterColumn>
        <ColumnTitle>
        Support
        </ColumnTitle>
        <ColumnLinks>
        <FooterHref href={network.urls.docs} target="none">Documentation</FooterHref><br/>
        <FooterHref href={network.urls.discord} target="none">Discord</FooterHref><br/>
        <FooterHref href={network.urls.telegram} target="none">Telegram</FooterHref><br/>
        </ColumnLinks>
        </FooterColumn>


      </FooterRight>

      <SocialIconsDiv>
        {/* Telegram */}
        <a href={network.urls.telegram} target="none">
          {telegram_svg}
        </a>

      {/* Twitter */}
      <a href={network.urls.twitter} target="none">
        {twitter_svg}
      </a>

      {/* Discord */}
      <a href={network.urls.discord} target="none">
        {discord_svg}
      </a>

      {/* Medium */}
      <a href={network.urls.medium} target="none">
        {medium_svg}
      </a>       
      </SocialIconsDiv>
    </FooterCont>
  )
}

export default Footer