import React from 'react';
import axios from 'axios';

import DescriptionWithLinks from './utils/DescriptionWithLinks';
import { SocialLinks } from './SocialLinks';

export interface CollectionMetaData {
  address: string;
  description: string;
  discord_url: string;
  external_url: string;
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
    setSelectedCollection(selectedCollection || null);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 m-10 text-xl text-center bg-slate-800">
      <label htmlFor="collections" className="block font-medium text-white text-md">
        Collections
      </label>
      <select
        id="collections"
        value={selectedCollection?.name || ''}
        onChange={handleSelectChange}
        className="flex justify-center w-full p-2 my-4 text-center text-white border border-gray-300 rounded-md bg-slate-800 hover:border-indigo-500 sm:w-1/2 md:w-1/3 xl:w-1/4"
      >
        <option value="">Select Collection</option>
        {collections?.map((collection: CollectionMetaData) => (
          <>
            <option key={collection.name} value={collection.name}>
              {collection.name}
            </option>
          </>
        ))}
      </select>
      {selectedCollection && (
        <>
          <div
            className="text-white collection-description"
            dangerouslySetInnerHTML={{
              __html: DescriptionWithLinks(selectedCollection.description).html,
            }}
          />
          <SocialLinks selectedCollection={selectedCollection} />
        </>
      )}
    </div>
  );
};

// Address: 0xa3aee8bce55beea1951ef834b99f3ac60d1abeeb

// Banner image URL: https://i.seadn.io/gae/4RYeNt3ET75VLMoCZz-fsOhXg8AW8qlkHfgkbA0FfEayNpsHvOZROygyy9IhY4LwrnJUXqkeDjBZBr8bCf0Ng_xUiRZqWRGng3sc?w=500&auto=format

// Description: A Gary Vaynerchuk NFT project centered around meaningful intellectual property and an extraordinary community.

// Discord URL: N/A

// External URL: https://veefriends.com/

// Image URL: https://i.seadn.io/gae/5y-UCAXiNOFXH551w5bWdZEYOCdHPwbqmcKb-xa3uVQEjQgxvih3HtZWSmzqDqd0uk7kIqFrZhw32Gt6xPBFg4t_n9BKhpou-dwnOg?w=500&auto=format

// Schema Name: ERC721

// Slug: veefriends

// Symbol: VFT
