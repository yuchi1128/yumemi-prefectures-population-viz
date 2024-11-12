"use client";

import { useEffect, useState } from "react";
import { usePrefecture } from "../contexts/PrefectureContext";

type Prefecture = {
  prefCode: number;
  prefName: string;
};

const API_ENDPOINT = "https://yumemi-frontend-engineer-codecheck-api.vercel.app/api/v1/prefectures";

const PrefectureSelector = () => {
  const apiToken = process.env.NEXT_PUBLIC_X_API_KEY;
  const [prefectureData, setPrefectureData] = useState<Prefecture[]>([]);
  const { selectedPrefectures, setSelectedPrefectures } = usePrefecture();

  const fetchPrefectureData = async (token: string) => {
    try {
      const res = await fetch(API_ENDPOINT, {
        headers: {
          "X-API-KEY": token,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch prefecture data");

      const { result } = await res.json();
      setPrefectureData(result);
    } catch (error) {
      console.error("Error fetching prefecture data:", error);
    }
  };

  useEffect(() => {
    if (!apiToken) return;
    fetchPrefectureData(apiToken);
  }, [apiToken]);

  const togglePrefectureSelection = (prefCode: number) => {
    setSelectedPrefectures((current) => ({
      ...current,
      [prefCode]: !current[prefCode],
    }));
  };

  const clearAllSelections = () => {
    setSelectedPrefectures({});
  };

  const selectedCount = Object.values(selectedPrefectures).filter(Boolean).length;

  return (
    <div className="max-w-[100rem] mx-auto pt-0 px-3 pb-4">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">
            {selectedCount}件選択中
          </span>
          {selectedCount > 0 && (
            <button
              onClick={clearAllSelections}
              className="px-2 py-1 text-xs bg-white text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
            >
              全ての選択を解除
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 gap-2">
          {prefectureData.map(({ prefCode, prefName }) => (
            <label
              key={prefCode}
              className={`
                relative flex items-center px-2 py-1.5
                min-w-20 max-w-28
                rounded-md border border-gray-200 shadow-sm 
                cursor-pointer transition-all duration-200 ease-in-out
                ${selectedPrefectures[prefCode] 
                  ? 'bg-blue-50 border-blue-300 text-blue-700' 
                  : 'bg-white hover:bg-gray-50 text-gray-700'}
              `}
            >
              <input
                type="checkbox"
                checked={selectedPrefectures[prefCode] ?? false}
                onChange={() => togglePrefectureSelection(prefCode)}
                className={`
                  mr-1.5 h-3.5 w-3.5 rounded cursor-pointer
                  transition-colors duration-200
                  ${selectedPrefectures[prefCode]
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-500 border-gray-300'}
                `}
                aria-label={`${prefName}を選択`}
              />
              <span className="text-sm font-medium whitespace-nowrap">{prefName}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrefectureSelector;