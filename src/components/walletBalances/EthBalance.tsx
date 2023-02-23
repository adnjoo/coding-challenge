import React from 'react';
import { useBalance } from 'wagmi';
import { FaEthereum } from 'react-icons/fa';

import type { WalletAddress } from './WethBalance';

interface EthBalanceProps {
  address: WalletAddress;
}

const EthBalance = ({ address }: EthBalanceProps): JSX.Element => {
  const [ethBalance, setEthBalance] = React.useState<string>('');
  const { data } = useBalance({ address });

  React.useEffect(() => {
    if (data) {
      setEthBalance(parseFloat(data.formatted).toFixed(3));
    }
  }, [data]);

  return (
    <div className="mb-4 flex">
      <FaEthereum size={30} className="mr-2 hover:scale-110 transition duration-500" />
      <div>ETH {ethBalance}</div>
    </div>
  );
};

export default EthBalance;
