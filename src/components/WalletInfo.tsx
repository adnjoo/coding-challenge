import React from 'react';
import { Web3Button } from '@web3modal/react';
import { useAccount, useNetwork } from 'wagmi';

import { EthBalance } from './walletBalances/EthBalance';
import WethBalance from './walletBalances/WethBalance';

export const WalletInfo = (): any => {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='m-10 bg-gray-900 text-white p-4 text-3xl'>
        Wallet Information
      </div>
      {isConnected ? (
        <div className=''>
          <div className='m-10 bg-gray-900 text-white p-4'>Connected</div>
          <div className='m-10 bg-gray-900 text-white p-4'>
            Address: {address}
          </div>
          <EthBalance address={address} />
          <WethBalance address={address} chain={chain} />
        </div>
      ) : (
        <div>No Wallet Connected</div>
      )}
      <Web3Button />
    </div>
  );
};
