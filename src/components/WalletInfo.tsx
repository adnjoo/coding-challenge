import React from 'react';
import { useAccount, useNetwork } from 'wagmi';

import WethBalance from './walletBalances/WethBalance';
import EthBalance from './walletBalances/EthBalance';

export const WalletInfo = (): any => {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();

  return (
    <div className="my-4 mx-2 sm:mx-6 md:mx-8 lg:mx-10 p-4 bg-white rounded-lg shadow-md">
      <div className="sm:mx-6 md:mx-9 lg:mx-12">
        <div className="text-xl font-medium mb-4">Wallet Information</div>
        {isConnected ? (
          <div className="p-4 bg-gray-100 rounded-lg">
            <div className="text-lg font-medium mb-4 overflow-auto">
              Address: {address}
            </div>
            <EthBalance address={address} />
            <WethBalance address={address} chain={chain} />
          </div>
        ) : (
          <div className="text-red-500">No Wallet Connected</div>
        )}
      </div>
    </div>
  );
};
