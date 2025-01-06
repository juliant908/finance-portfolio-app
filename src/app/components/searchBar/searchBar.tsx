"use client"
import { MagnifyingGlass } from 'geist-icons';
import { useRef, MouseEventHandler, } from 'react';
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from "@/components/components/ui/select"
import { useRouter } from 'next/navigation';

export default function SearchBar() {

 const inputRef = useRef<HTMLInputElement>(null);
 const selectRef = useRef<HTMLButtonElement>(null);
 const router = useRouter();

 const handleSearch: MouseEventHandler<HTMLButtonElement> = (e) => {
  e.preventDefault();
  const ticker = inputRef.current?.value.toUpperCase();
  const market = selectRef.current?.firstChild?.textContent?.toLowerCase();
  if (ticker && market) {
   router.push(`/market/${market}/${ticker}`);
  }
 }



 return (
  <header className="w-full" >
   <form className="container mx-auto flex justify-center mt-12 min-w-[800px]">
    <div className="relative flex flex-1 items-center max-w-[800px]">
     <div className="h-full flex items-center border-2 border-r-0 border-gray-600 rounded-tl-lg rounded-bl-lg p-2 bg-gray-700 text-gray-500">
      <MagnifyingGlass />
     </div>
     <input
      ref={inputRef}
      type="text"
      placeholder="Search for a stock"
      className="flex-1 border-x-0 border-2 border-gray-600 bg-gray-700 text-gray-50 p-2"
     />
    </div>
    <Select>
     <SelectTrigger ref={selectRef} className="w-[180px] min-h-[44px] border-x-0 rounded-none border-gray-600 bg-gray-700/90 text-gray-50">
      <SelectValue placeholder="Stocks" defaultValue={"stocks"} />
     </SelectTrigger>
     <SelectContent>
      <SelectItem value="stocks">Stocks</SelectItem>
      <SelectItem value="crypto">Crypto</SelectItem>
      <SelectItem value="fx">Fx</SelectItem>
      <SelectItem value="otc">Otc</SelectItem>
      <SelectItem value="indices">Indices</SelectItem>
     </SelectContent>
    </Select>
    <button onClick={handleSearch} className='bg-gray-600 text-white rounded-tr-lg rounded-br-lg p-2'>
     Search
    </button>
   </form>
  </header>
 );
}