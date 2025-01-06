import Image from "next/image";
import { Results } from "../../interfaces/tickerDetails.interface";

export default async function StockHeader({ props }: Readonly<{ props: Results }>) {
 const { ticker, name } = props;
 const { icon_url } = props.branding ?? '';
 const icon = icon_url + `?apiKey=${process.env.API_KEY}`;
 return (
  <header className="flex flex-col justify-center items-center gap-4">
   <div className="flex justify-center items-center gap-4">
    {icon_url && <Image src={icon} alt={`Icon of ${name}`} width={100} height={100} />}
    <div className="flex flex-col gap-2">
     <h1 className="text-4xl font-bold">{name}</h1>
     <span className="text-xl font-semibold">{ticker}</span>
    </div>
   </div>
  </header>
 );
}