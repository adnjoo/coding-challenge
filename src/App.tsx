import React from 'react';
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, goerli } from 'wagmi/chains';

import { WALLETCONNECT_PROJECT_ID } from './config';
import { WalletInfo } from './components/WalletInfo';
import { SelectBar } from './components/SelectBar';
import Navbar from './components/NavBar';

const chains = [mainnet, goerli];
const projectId = WALLETCONNECT_PROJECT_ID;
const wagmiConfig = {
  autoConnect: true,
  connectors: modalConnectors({
    projectId,
    version: '1', // or "2"
    appName: 'web3Modal',
    chains,
  }),
};

const { provider } = configureChains(chains, [walletConnectProvider({ projectId })]);
const wagmiClient = createClient({
  ...wagmiConfig,
  provider,
});
const ethereumClient = new EthereumClient(wagmiClient, chains);

const App = (): any => {
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <Navbar />
        <WalletInfo />
        <SelectBar />
      </WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
};

export default App;
