import React from 'react';
import { useBalance } from 'wagmi';

export type WalletAddress = `0x${string}` | undefined;

interface EthBalanceProps {
  address: WalletAddress;
}

export const EthBalance = ({ address }: EthBalanceProps): JSX.Element => {
  const [ethBalance, setEthBalance] = React.useState<string>('');

  const { data } = useBalance({ address });

  React.useEffect(() => {
    if (data) {
      setEthBalance(data.formatted);
    }
  }, [data]);

  return <div className="m-10 bg-gray-900 text-white p-4">ETH Balance: {ethBalance}</div>;
};
