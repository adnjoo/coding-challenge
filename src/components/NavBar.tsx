import React from 'react';
import { Web3Button } from '@web3modal/react';

import skilletLogo from '/skillet_logo.png';

const Navbar = (): JSX.Element => {
  return (
    <nav className="bg-gray-800 px-4 pt-6 pb-4 md:px-8">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="md:ml-4">
          <a href="/">
            <img src={skilletLogo} alt="Skillet Logo" className="h-10" />
          </a>
        </div>
        <div className="md:mr-4">
          <Web3Button />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
