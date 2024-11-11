// app/components/OptionSelector.tsx
"use client";

import { usePrefecture } from "../contexts/PrefectureContext";

export const chartOptions = ["総人口", "年少人口", "生産年齢人口", "老年人口"];

const OptionSelector = () => {
  const { selectedDataType, setSelectedDataType } = usePrefecture();

  const handleChange = (value: string) => {
    setSelectedDataType(value);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">オプション選択</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {chartOptions.map((buttonData: string) => (
          <button
            key={buttonData}
            onClick={() => handleChange(buttonData)}
            className={`
              relative flex items-center justify-center px-3 py-2 rounded-md
              border shadow-sm
              transition-all duration-200 ease-in-out
              ${selectedDataType === buttonData 
                ? 'bg-blue-50 border-blue-300 text-blue-700' 
                : 'bg-white hover:bg-gray-50 text-gray-700'}
            `}
          >
            <input
              type="radio"
              name="option"
              checked={selectedDataType === buttonData}
              onChange={() => handleChange(buttonData)}
              className={`
                mr-2 h-4 w-4
                transition-colors duration-200
                ${selectedDataType === buttonData
                  ? 'text-blue-600 border-blue-600'
                  : 'text-gray-500 border-gray-300'}
              `}
            />
            <span className="text-sm font-medium">{buttonData}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default OptionSelector;