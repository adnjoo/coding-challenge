import React from 'react';
import axios from 'axios';

import DescriptionWithLinks from './utils/DescriptionWithLinks';
import { SocialLinks } from './SocialLinks';
import { AssetCards } from './AssetCards';

export interface CollectionMetaData {
  address: string;
  description: string;
  discord_url?: string;
  external_url: string;
  banner_image_url: string;
  image_url: string;
  name: string;
  schema_name: string;
  slug: string;
  symbol: string;
  twitter_username: string;
  instagram_username?: string;
}

export const SelectBar = (): JSX.Element => {
  const [selectedCollection, setSelectedCollection] =
    React.useState<CollectionMetaData | null>(null);
  const [collections, setCollections] = React.useState<CollectionMetaData[]>([]);

  React.useEffect(() => {
    axios
      .get<CollectionMetaData[]>(
        'https://skillet-interview-express-rng3tbs6qq-wl.a.run.app/getCollections'
      )
      .then(({ data }) => {
        setCollections(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const selectedCollection = collections.find(
      (collection) => collection.name === event.target.value
    );
    console.log(selectedCollection);
    setSelectedCollection(selectedCollection ?? null);
  };

  return (
    <div className="flex flex-col my-10 py-10 text-xl bg-slate-800 mx-auto">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Collections</h1>
        <select
          id="collections"
          value={selectedCollection?.name ?? ''}
          onChange={handleSelectChange}
          className="flex p-2 my-4 text-center text-white border border-gray-300 rounded-md bg-slate-800 hover:border-indigo-500 sm:w-1/2 md:w-1/3 xl:w-1/4 mx-auto"
        >
          <option value="">Select Collection</option>
          {collections?.map((collection: CollectionMetaData) => (
            <option key={collection.name} value={collection.name}>
              {collection.name}
            </option>
          ))}
        </select>
      </div>
      <div className="relative w-full">
        {selectedCollection?.banner_image_url ? (
          <img
            src={selectedCollection.banner_image_url}
            alt="banner"
            className="w-full mb-4 h-48 object-cover"
          />
        ) : (
          <div className="w-full mb-4 h-48 object-cover"></div>
        )}
        {selectedCollection?.image_url && (
          <img
            src={selectedCollection.image_url}
            alt={selectedCollection.name}
            className="w-24 md:w-36 lg:w-48 m-3 rounded-lg absolute bottom-0 left-0 border-4 border-slate-800"
          />
        )}
      </div>
      {selectedCollection && (
        <>
          <SocialLinks selectedCollection={selectedCollection} />
          <div
            className="text-white collection-description mb-10 mx-2 sm:mx-4 md:mx-6 lg:mx-8 xl:mx-10"
            dangerouslySetInnerHTML={{
              __html: DescriptionWithLinks(selectedCollection.description).html,
            }}
          />
        </>
      )}
      {selectedCollection && (
        <AssetCards collectionAddress={selectedCollection.address} />
      )}
    </div>
  );
};
