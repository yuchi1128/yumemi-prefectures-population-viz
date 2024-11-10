"use client";

import { useEffect, useState } from "react";

type Prefecture = {
  prefCode: number;
  prefName: string;
};

type CheckedState = Record<number, boolean>;

const API_ENDPOINT = "https://yumemi-frontend-engineer-codecheck-api.vercel.app/api/v1/prefectures";

const PrefectureSelector = () => {
  const apiToken = process.env.NEXT_PUBLIC_X_API_KEY;
  const [prefectureData, setPrefectureData] = useState<Prefecture[]>([]);
  const [selectedPrefectures, setSelectedPrefectures] = useState<CheckedState>({});

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

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">都道府県を選択</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {prefectureData.map(({ prefCode, prefName }) => (
          <button
            key={prefCode}
            className={`
              relative flex items-center px-3 py-2 rounded-md
              border border-gray-200 shadow-sm
              transition-all duration-200 ease-in-out
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
                mr-2 h-4 w-4 rounded
                transition-colors duration-200
                ${selectedPrefectures[prefCode]
                  ? 'text-blue-600 border-blue-600'
                  : 'text-gray-500 border-gray-300'}
              `}
            />
            <span className="text-sm font-medium">{prefName}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PrefectureSelector;