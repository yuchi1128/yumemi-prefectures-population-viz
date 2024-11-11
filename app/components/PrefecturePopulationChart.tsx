"use client";

import { useCallback, useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { usePrefecture } from '../contexts/PrefectureContext';

type PopulationData = {
  year: number;
  value: number;
  rate?: number;
};

type DataSet = {
  label: string;
  data: PopulationData[];
};

type Prefecture = {
  prefCode: number;
  prefName: string;
};

type APIResponse = {
  message: null | string;
  result: {
    boundaryYear: number;
    data: DataSet[];
  };
};

const PREFECTURE_API = "https://yumemi-frontend-engineer-codecheck-api.vercel.app/api/v1/prefectures";

const PrefecturePopulationChart = () => {
  const [chartData, setChartData] = useState<{ [key: number]: DataSet[] }>({});
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const { selectedPrefectures, selectedDataType } = usePrefecture();
  const apiToken = process.env.NEXT_PUBLIC_X_API_KEY;

  const fetchPrefectures = useCallback(async () => {
    try {
      const res = await fetch(PREFECTURE_API, {
        headers: {
          "X-API-KEY": apiToken || "",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch prefecture data");

      const { result } = await res.json();
      setPrefectures(result);
    } catch (error) {
      console.error("Error fetching prefecture data:", error);
    }
  }, [apiToken]);

  const fetchPopulationData = useCallback(async (prefCode: number) => {
    try {
      const response = await fetch(
        `https://yumemi-frontend-engineer-codecheck-api.vercel.app/api/v1/population/composition/perYear?prefCode=${prefCode}`,
        {
          headers: {
            "X-API-KEY": apiToken || "",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch population data");

      const data: APIResponse = await response.json();
      setChartData(prev => ({
        ...prev,
        [prefCode]: data.result.data
      }));
    } catch (error) {
      console.error("Error fetching population data:", error);
    }
  }, [apiToken]);

  const getPrefectureName = (prefCode: number): string => {
    const prefecture = prefectures.find(pref => pref.prefCode === Number(prefCode));
    return prefecture ? prefecture.prefName : `Prefecture ${prefCode}`;
  };

  const getChartOptions = (): Highcharts.Options => {
    const series = Object.entries(selectedPrefectures)
      .filter(([, isSelected]) => isSelected)
      .map(([prefCode]): Highcharts.SeriesOptionsType => {
        const datasets = chartData[Number(prefCode)];
        if (!datasets) {
          return {
            type: 'line',
            name: getPrefectureName(Number(prefCode)),
            data: []
          };
        }

        const dataset = datasets.find(d => d.label === selectedDataType);
        if (!dataset) {
          return {
            type: 'line',
            name: getPrefectureName(Number(prefCode)),
            data: []
          };
        }

        return {
          type: 'line',
          name: getPrefectureName(Number(prefCode)),
          data: dataset.data.map(d => [d.year, d.value])
        };
      });

    const yAxisTitle = selectedDataType === "総人口" 
      ? "総人口数"
      : selectedDataType === "年少人口"
      ? "年少人口数（14歳以下）"
      : selectedDataType === "生産年齢人口"
      ? "生産年齢人口数（15-64歳）"
      : "老年人口数（65歳以上）";

    return {
      title: {
        text: `${selectedDataType}の推移`
      },
      xAxis: {
        title: {
          text: '年度'
        },
        type: 'linear',
        tickInterval: 5,
        labels: {
          format: '{value}年'
        }
      },
      yAxis: {
        title: {
          text: yAxisTitle
        },
        labels: {
          formatter: function(this: Highcharts.AxisLabelsFormatterContextObject) {
            if (typeof this.value === 'number') {
              return (this.value / 10000).toLocaleString() + '万人';
            }
            return '';
          }
        }
      },
      series,
      plotOptions: {
        series: {
          label: {
            connectorAllowed: false
          }
        }
      },
      credits: {
        enabled: false
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      },
      tooltip: {
        formatter: function(this: Highcharts.TooltipFormatterContextObject) {
          if (typeof this.y === 'number') {
            return `${this.series.name}<br/>
                    ${this.x}年: ${this.y.toLocaleString()}人`;
          }
          return '';
        }
      }
    };
  };

  useEffect(() => {
    if (apiToken) {
      fetchPrefectures();
    }
  }, [apiToken, fetchPrefectures]);

  useEffect(() => {
    Object.entries(selectedPrefectures).forEach(([prefCode, isSelected]) => {
      if (isSelected && !chartData[Number(prefCode)]) {
        fetchPopulationData(Number(prefCode));
      }
    });
  }, [selectedPrefectures, fetchPopulationData, chartData]);

  if (Object.entries(selectedPrefectures).filter(([, isSelected]) => isSelected).length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-4 text-center text-gray-600">
        都道府県を選択してください
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <HighchartsReact
        highcharts={Highcharts}
        options={getChartOptions()}
      />
    </div>
  );
};

export default PrefecturePopulationChart;