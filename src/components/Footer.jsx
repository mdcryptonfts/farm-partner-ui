import React from "react";
import {
  FooterCont,
  ColumnLinks,
  ColumnTitle,
  FooterBrandText,
  FooterColumn,
  FooterHref,
  FooterLeft,
  FooterRight,
  SocialIconsDiv,
  Slider,
  SliderCircle,
} from "../data/css/FooterStyles";
import config from "../data/config.json";
import { capitalizeFirstLetter, getSocialLogo } from "../data/functions/helpers";
import { useTheme } from "../contexts/ThemeContext";
import { moon_svg, sun_svg } from "../data/svgs";


const Footer = () => {
  const network = config.networks[config.currentNetwork];
  const currentWebsiteURL = config.production
    ? network.urls.website
    : config.localUrl;

  const { theme, toggleTheme } = useTheme();

  return (
    <FooterCont>
      <FooterLeft>
        <FooterBrandText>{config.appName}</FooterBrandText>
      </FooterLeft>

      <FooterRight>
        <FooterColumn>
          <ColumnTitle>Ecosystem</ColumnTitle>
          <ColumnLinks>
          {Object.entries(config.ecosystem).length > 0 &&
          Object.entries(config.ecosystem).map(([key, value]) => (
            <FooterHref href={value} target="none">
              {key}
            </FooterHref>
          ))}           
          </ColumnLinks>
        </FooterColumn>

        <FooterColumn>
          <ColumnTitle>Support</ColumnTitle>
          <ColumnLinks>
          {Object.entries(config.socials).length > 0 &&
            Object.entries(config.socials).map(([key, value]) => (
              <FooterHref href={value} target="none">
                {capitalizeFirstLetter(key)}
              </FooterHref>
            ))}       
          </ColumnLinks>
        </FooterColumn>
      </FooterRight>

      <SocialIconsDiv>
        {Object.entries(config.socials).length > 0 &&
          Object.entries(config.socials).map(([key, value]) => (
            <a href={value} target="none">
              {getSocialLogo(key)}
            </a>
          ))}

            <Slider
                onClick={(e) => {
                  toggleTheme();
                }}
                toggled={theme == config.themes.dark}
            >
              {theme == config.themes.dark ? sun_svg : moon_svg}
                <SliderCircle toggled={theme == config.themes.dark} />
            </Slider>          
      </SocialIconsDiv>
      
    </FooterCont>
  );
};

export default Footer;
