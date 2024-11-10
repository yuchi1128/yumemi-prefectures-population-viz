import PrefectureSelector from "./components/PrefectureSelector";
import OptionSelector from "./components/OptionSelector";
import PrefecturePopulationChart from "./components/PrefecturePopulationChart";

export default function Home() {
  return (
    <div>
      <PrefectureSelector />
      <OptionSelector />
      <PrefecturePopulationChart />
    </div>
  );
}
