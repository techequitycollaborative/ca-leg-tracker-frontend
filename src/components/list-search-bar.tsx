'use client'
import { NextPage } from 'next';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  searchTerms: string;
}

const ListSearchBar: NextPage<Props> = function ListSearchBar(props) {
  const [searchTerms, setSearchTerms] = useState(props.searchTerms === undefined ? '' : props.searchTerms);
  const router = useRouter();

  function handleClick() {
    router.push('/search?s=' + searchTerms);
  }

  function handleKeyPress(e: any) {
    if (e.key === 'Enter') {
      handleClick();
    }
  }

  function handleInputChange(e: any) {
    setSearchTerms(e.target.value);
  }

  return (
    <div className="p-2 m-4 flex">
      <Image className="flex-none mt-4" src="/search.svg" alt="Link" width={28} height={28} />
      <input
        className="px-1 pt-4 border-black border-b flex-1 mx-2 outline-none"
        id="searchTerms"
        name="searchTerms"
        type="text"
        placeholder="Enter bill number, keyword, or author"
        value={searchTerms}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />
      <Button className="flex-none mt-1" onClick={handleClick}>Search</Button>
    </div>
  );
};

export default ListSearchBar;