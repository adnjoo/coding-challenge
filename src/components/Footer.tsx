import React from 'react';

const Footer: React.FC = () => {
  return (
    <div className="bg-gray-800 text-gray-400 py-4 text-center">
      <p>© {new Date().getFullYear()} </p>
      <p>
        Made with <span className="text-red-500">&hearts;</span> by{' '}
        <a
          href="https://github.com/adnjoo/coding-challenge"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-300"
        >
          adnjoo
        </a>
      </p>
    </div>
  );
};

export default Footer;
