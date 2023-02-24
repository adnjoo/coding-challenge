import React from 'react';
import { BsTwitter, BsInstagram, BsDiscord } from 'react-icons/bs';
import { BiLinkAlt } from 'react-icons/bi';

import etherscanLogo from '/etherscan_logo.svg';
import type { CollectionMetaData } from './SelectBar';
import ExternalLink from './utils/ExternalLink';

const iconSize = 30;

export const SocialLinks = ({
  selectedCollection,
}: {
  selectedCollection: CollectionMetaData;
}): JSX.Element => {
  return (
    <div className="p-4 m-10 text-3xl text-center text-white bg-slate-800">
      {selectedCollection.name} ({selectedCollection.symbol})
      <div className="flex items-center justify-center gap-4 my-2">
        {[
          {
            name: 'etherscan',
            url: selectedCollection?.address,
          },
          {
            name: 'twitter',
            username: selectedCollection?.twitter_username,
          },
          {
            name: 'instagram',
            username: selectedCollection?.instagram_username,
          },
          { name: 'discord', url: selectedCollection?.discord_url },
          { name: 'website', url: selectedCollection?.external_url },
        ].map((item, index) => (
          <React.Fragment key={index}>
            {item.username ?? item.url ? (
              <ExternalLink
                href={
                  item.name === 'etherscan'
                    ? `https://etherscan.io/address/${item.url}`
                    : item.name === 'twitter'
                    ? `https://twitter.com/${item.username}`
                    : item.name === 'instagram'
                    ? `https://instagram.com/${item.username}`
                    : item.name === 'discord'
                    ? `https://discord.com/invite/${item.url}`
                    : item.name === 'website'
                    ? item.url ?? ''
                    : ''
                }
              >
                {item.name === 'twitter' ? (
                  <BsTwitter
                    size={iconSize}
                    className="transition transform hover:text-gray-300 hover:scale-105"
                  />
                ) : item.name === 'instagram' ? (
                  <BsInstagram
                    size={iconSize}
                    className="transition transform hover:text-gray-300 hover:scale-105"
                  />
                ) : item.name === 'discord' ? (
                  <BsDiscord
                    size={iconSize}
                    className="transition transform hover:text-gray-300 hover:scale-105"
                  />
                ) : item.name === 'website' ? (
                  <BiLinkAlt
                    size={iconSize}
                    className="transition transform hover:text-gray-300 hover:scale-105"
                  />
                ) : (
                  <img
                    src={etherscanLogo}
                    width={iconSize}
                    height={iconSize}
                    className="transition transform hover:scale-105 bg-white rounded-md"
                  />
                )}
              </ExternalLink>
            ) : (
              <div className="text-slate-500">
                {item.name === 'twitter' ? (
                  <BsTwitter size={iconSize} />
                ) : item.name === 'instagram' ? (
                  <BsInstagram size={iconSize} />
                ) : item.name === 'discord' ? (
                  <BsDiscord size={iconSize} />
                ) : item.name === 'website' ? (
                  <BiLinkAlt size={iconSize} />
                ) : (
                  <img src={etherscanLogo} width={iconSize} height={iconSize} />
                )}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
