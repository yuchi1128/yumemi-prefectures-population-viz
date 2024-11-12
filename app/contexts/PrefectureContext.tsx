"use client";

import React, { createContext, useContext, useState } from "react";

type PrefectureContextType = {
  selectedPrefectures: Record<number, boolean>;
  setSelectedPrefectures: React.Dispatch<
    React.SetStateAction<Record<number, boolean>>
  >;
  selectedDataType: string;
  setSelectedDataType: React.Dispatch<React.SetStateAction<string>>;
};

const PrefectureContext = createContext<PrefectureContextType | undefined>(
  undefined,
);

export function PrefectureProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedPrefectures, setSelectedPrefectures] = useState<
    Record<number, boolean>
  >({});
  const [selectedDataType, setSelectedDataType] = useState<string>("総人口");

  return (
    <PrefectureContext.Provider
      value={{
        selectedPrefectures,
        setSelectedPrefectures,
        selectedDataType,
        setSelectedDataType,
      }}
    >
      {children}
    </PrefectureContext.Provider>
  );
}

export function usePrefecture() {
  const context = useContext(PrefectureContext);
  if (context === undefined) {
    throw new Error("usePrefecture must be used within a PrefectureProvider");
  }
  return context;
}
