// app/page.tsx
import { PrefectureProvider } from "./contexts/PrefectureContext";
import PrefectureSelector from "./components/PrefectureSelector";
import OptionSelector from "./components/OptionSelector";
import PrefecturePopulationChart from "./components/PrefecturePopulationChart";

export default function Home() {
  return (
    <PrefectureProvider>
      <div>
        <PrefectureSelector />
        <OptionSelector />
        <PrefecturePopulationChart />
      </div>
    </PrefectureProvider>
  );
}