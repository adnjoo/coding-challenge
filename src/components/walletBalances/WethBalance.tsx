import React from 'react';
import axios from 'axios';

import type { WalletAddress } from './EthBalance';
import { ETHERSCAN_KEY } from '../../config';

const GET_WETH_ROUTE = (address: string, mainNet = true): string => {
  if (mainNet) {
    return `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2&address=${address}&tag=latest&apikey=${ETHERSCAN_KEY}`;
  }
  return `https://api-goerli.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6&address=${address}&tag=latest&apikey=${ETHERSCAN_KEY}`;
};

interface GetWethBalanceParams {
  address: WalletAddress;
  useProxy?: boolean;
}

export const getWethBalance = async ({
  address,
  useProxy = true,
}: GetWethBalanceParams): Promise<string> => {
  const route = useProxy
    ? GET_WETH_ROUTE(String(address))
    : GET_WETH_ROUTE(String(address), false);
  try {
    const res = await axios.get(route);
    const { result } = res.data;
    return (result / 10 ** 18).toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 5,
    });
  } catch (error) {
    throw new Error('Failed to get WETH balance');
  }
};

interface WethBalanceProps {
  address: WalletAddress;
  chain?: any;
}

const WethBalance = ({ address, chain }: WethBalanceProps): JSX.Element => {
  const [wethBalance, setWethBalance] = React.useState<string>('');

  React.useEffect(() => {
    if (chain?.network === 'homestead') {
      getWethBalance({ address }).then(setWethBalance).catch(console.error);
    }
    if (chain?.network === 'goerli') {
      getWethBalance({ address, useProxy: false })
        .then(setWethBalance)
        .catch(console.error);
    }
  }, [address, chain]);

  return (
    <div className="m-10 bg-gray-900 text-white p-4">WETH Balance: {wethBalance}</div>
  );
};

export default WethBalance;
