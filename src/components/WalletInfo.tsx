import React from 'react';
import { useAccount, useNetwork } from 'wagmi';

import WethBalance from './walletBalances/WethBalance';
import EthBalance from './walletBalances/EthBalance';

export const WalletInfo = (): any => {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="text-xl font-medium mb-4">Wallet Information</div>
      {isConnected ? (
        <div className="p-4 bg-gray-100 rounded-lg">
          <div className="text-lg font-medium mb-4">Address: {address}</div>
          <div className="mb-4 flex">
            <EthBalance address={address} />
          </div>
          <div className="mb-4 flex">
            <WethBalance address={address} chain={chain} />
          </div>
        </div>
      ) : (
        <div className="text-red-500">No Wallet Connected</div>
      )}
    </div>
  );
};
