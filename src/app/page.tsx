import { getDailyOpenClose } from "./services/dailyOpenClose";

export default async function Home() {
  const data = await getDailyOpenClose("AAPL", "2023-01-03");
  console.log(data);
  return (
    <div>
      Hello world!
    </div>
  );
}
