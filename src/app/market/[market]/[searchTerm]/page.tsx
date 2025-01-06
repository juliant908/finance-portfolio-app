import { getTickers } from "../../../../services/getTickers";
import Link from "next/link";

type Params = Promise<{ market: string; searchTerm: string; }>;

export default async function Page({ params }: Readonly<{ params: Params }>) {
 const { market, searchTerm } = await params;
 const { results } = await getTickers({ market, searchTerm });
 return (
  <div className="container my-12">
   <h1 className="text-2xl font-bold mb-8">Search results for &ldquo;{searchTerm}&rdquo; in the {market} market</h1>
   <div className="flex justify-center items-center">
    <table className="min-w-full border border-b-2 border-gray-200">
     <thead>
      <tr>
       <th className="text-start px-4 py-2 border-b">Symbol</th>
       <th className="text-start px-4 py-2 border-b">Name</th>
       <th className="text-start px-4 py-2 border-b">Market</th>
       <th className="border-b"></th>
      </tr>
     </thead>
     <tbody>
      {results.map((ticker) => (
       <tr key={ticker.ticker} className="hover:bg-gray-700">
        <td className="px-4 py-2 border-b">{ticker.ticker}</td>
        <td className="px-4 py-2 border-b">{ticker.name}</td>
        <td className="px-4 py-2 border-b">{ticker.market.substring(0, 1).toUpperCase() + ticker.market.substring(1)}</td>
        <td className="px-4 py-2 border-b">
         <Link className="font-bold text-nowrap text-zinc-100 hover:underline" href={`/stock/${ticker.ticker}`}>View ➡️</Link>
        </td>
       </tr>
      ))}
     </tbody>
    </table>
   </div>
  </div>
 );
}