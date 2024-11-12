import { PrefectureProvider } from "./contexts/PrefectureContext";
import PrefectureSelector from "./components/PrefectureSelector";
import PrefecturePopulationChart from "./components/PrefecturePopulationChart";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PrefectureProvider>
        <div>
          <header className="max-w-[90rem] mx-auto px-6 pt-6 pb-2">
            <h1 className="text-2xl font-bold text-gray-800">
              グラフで見る都道府県別人口推移
            </h1>
          </header>
          <PrefectureSelector />
          <PrefecturePopulationChart />
        </div>
      </PrefectureProvider>
    </div>
  );
}
