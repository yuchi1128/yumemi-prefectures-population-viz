"use client";

import { usePrefecture } from "../contexts/PrefectureContext";

export const chartOptions = ["総人口", "年少人口", "生産年齢人口", "老年人口"];

const OptionSelector = () => {
  const { selectedDataType, setSelectedDataType } = usePrefecture();

  const handleChange = (value: string) => {
    setSelectedDataType(value);
  };

  return (
    <div className="max-w-[90rem] mx-auto p-4">
      <div className="flex justify-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {chartOptions.map((buttonData: string) => (
            <label
              key={buttonData}
              className={`
                relative flex items-center px-2.5 py-1.5
                min-w-24 max-w-32
                rounded-md border border-gray-200 shadow-sm 
                cursor-pointer transition-all duration-200 ease-in-out
                ${
                  selectedDataType === buttonData
                    ? "bg-blue-50 border-blue-300 text-blue-700"
                    : "bg-white hover:bg-gray-50 text-gray-700"
                }
              `}
            >
              <input
                type="radio"
                name="option"
                checked={selectedDataType === buttonData}
                onChange={() => handleChange(buttonData)}
                className={`
                  mr-1.5 h-4 w-4 rounded cursor-pointer
                  transition-colors duration-200
                  ${
                    selectedDataType === buttonData
                      ? "text-blue-600 border-blue-600"
                      : "text-gray-500 border-gray-300"
                  }
                `}
                aria-label={`${buttonData}を選択`}
              />
              <span className="text-sm font-medium whitespace-nowrap">
                {buttonData}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OptionSelector;
