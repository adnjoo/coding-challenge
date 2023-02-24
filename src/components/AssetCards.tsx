import React from 'react';
import axios from 'axios';

interface Asset {
  token_id: string;
  image_url: string;
}

interface AssetCardsProps {
  collectionAddress: string;
}

export const AssetCards: React.FC<AssetCardsProps> = ({ collectionAddress }) => {
  const [assets, setAssets] = React.useState<Asset[]>([]);

  React.useEffect(() => {
    axios
      .get<Asset[]>(
        `https://skillet-interview-express-rng3tbs6qq-wl.a.run.app/getCollectionAssets?collectionAddress=${collectionAddress}`
      )
      .then(({ data }) => {
        setAssets(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [collectionAddress]);

  return (
    <div className="grid mx-4 sm:mx-6 md:mx-8 lg:mx-10 grid-cols-2 md:grid-cols-3 gap-4 mt-8">
      {assets.map((asset) => (
        <div key={asset.token_id} className="bg-white rounded-lg p-4">
          <img
            src={asset.image_url}
            alt={`NFT with token ID ${asset.token_id}`}
            className={`mx-auto mb-4 ${
              assets.length <= 2 ? 'w-full' : 'w-1/2'
            } outline outline-slate-800 rounded-lg`}
          />
          <div className="text-center">
            <p className="text-gray-800 font-bold">{asset.token_id}</p>
            <p className="text-gray-600">{`Owner address for ${asset.token_id}`}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
