import React from 'react';
import { Web3Button } from '@web3modal/react';
import { useAccount, useNetwork } from 'wagmi';

import skilletLogo from '/skillet_logo.png';
import { EthBalance } from './walletBalances/EthBalance';
import WethBalance from './walletBalances/WethBalance';

export const WalletInfo = (): any => {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();

  return (
    <div className='flex flex-col justify-center items-center'>
      <img
        src={skilletLogo}
        alt='My Image'
        className='m-10 w-72 bg-slate-800'
      />
      <div className='m-10 bg-slate-800 text-white p-4 text-3xl text-center'>
        Wallet Information
      </div>
      {isConnected ? (
        <div className=''>
          <div className='m-10 bg-slate-800 text-white p-4'>Connected</div>
          <div className='m-10 bg-slate-800 text-white p-4'>
            Address: {address}
          </div>
          <EthBalance address={address} />
          <WethBalance address={address} chain={chain} />
        </div>
      ) : (
        <div className='text-white'>No Wallet Connected</div>
      )}
      <Web3Button />
    </div>
  );
};
