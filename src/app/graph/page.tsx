"use client";

import React, { useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  AreaChart,
  Area,
} from "recharts";

// Define types
interface DataPoint {
  name: string;
  value: number;
}

type DatasetName = "Wavy" | "Steady" | "Flat";
type DatasetCollection = Record<DatasetName, DataPoint[]>;

const CustomizableYAxisChart = () => {
  // Sample datasets
  const sampleData: DatasetCollection = {
    Wavy: [
      { name: "Nov 5", value: 400 },
      { name: "Nov 21", value: 300 },
      { name: "Dec 17", value: 600 },
      { name: "Dec 23", value: 200 },
    ],
    Steady: [
      { name: "Nov 5", value: 600 },
      { name: "Nov 21", value: 612 },
      { name: "Dec 17", value: 613 },
      { name: "Dec 23", value: 621 },
    ],
    Flat: [
      { name: "Nov 5", value: 600 },
      { name: "Nov 21", value: 600 },
      { name: "Dec 17", value: 600 },
      { name: "Dec 23", value: 600 },
    ],
  };

  const [currentDataset, setCurrentDataset] = useState<DatasetName>("Wavy");
  const [data, setData] = useState<DataPoint[]>(sampleData["Wavy"]);
  const [isCustomData, setIsCustomData] = useState<boolean>(false);
  const [goal, setGoal] = useState<number>(625);
  const [showAxisLabels, setShowAxisLabels] = useState<boolean>(true);
  const [isPercentage, setIsPercentage] = useState<boolean>(true);
  const [minValue, setMinValue] = useState<string | number>(0);
  const [maxValue, setMaxValue] = useState<string | number>(700);
  const [belowMinPercentage, setBelowMinPercentage] = useState<number>(15);
  const [aboveMaxPercentage, setAboveMaxPercentage] = useState<number>(50);

  // Calculate actual data min and max
  const dataMin = Math.min(...data.map((item) => item.value));
  const dataMax = Math.max(...data.map((item) => item.value));

  // Calculate domain based on settings
  const calculateDomain = (): [number | string, number | string] => {
    if (!isPercentage) {
      const calculatedMin = parseFloat(minValue as string);
      const calculatedMax = parseFloat(maxValue as string);
      return [calculatedMin, calculatedMax];
    }

    const topValue = goal > dataMax ? goal : dataMax;
    const bottomValue = goal < dataMin ? goal : dataMin;
    const rawDelta = dataMax - dataMin;
    const actualDelta = topValue - bottomValue;

    const calculateCoeficent = (location: "top" | "bottom") => {
      //check if flat
      if (rawDelta < Math.abs(goal - dataMax) * 0.1) {
        //check if the goal is reached
        if (dataMin > goal) {
          if (location === "top") {
            return 1.75;
          }
          if (location === "bottom") {
            return 5;
          }
        } else {
          if (location === "top") {
            return 1;
          }
          if (location === "bottom") {
            return 5;
          }
        }
      }
      return 1;
    };
    const flatTopCoeficent = calculateCoeficent("top");
    const flatBottomCoeficent = calculateCoeficent("bottom");

    const calculatedMin = Math.max(
      0,
      bottomValue -
        ((actualDelta * belowMinPercentage) / 100) * flatBottomCoeficent
    );

    const calculatedMax =
      topValue + ((actualDelta * aboveMaxPercentage) / 100) * flatTopCoeficent;
    return [calculatedMin, calculatedMax];
  };

  const handleValueChange = (index: number, newValue: string): void => {
    const newData = [...data];
    newData[index].value = parseInt(newValue);
    setData(newData);
    setIsCustomData(true);
  };

  const handleDatasetChange = (datasetName: DatasetName | "Custom"): void => {
    if (datasetName === "Custom") {
      setIsCustomData(true);
    } else {
      setCurrentDataset(datasetName);
      setData([...sampleData[datasetName]]);
      setIsCustomData(false);
    }
  };

  return (
    <body style={{ background: "white", color: "black" }}>
      <div className="p-4 max-w-6xl mx-auto bg-white">
        <h1 className="text-2xl font-bold mb-4">
          Customizable Y-Axis Line Chart
        </h1>

        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Dataset Selection</h2>
          <div className="flex flex-wrap gap-2">
            {Object.keys(sampleData).map((datasetName) => (
              <button
                key={datasetName}
                onClick={() => handleDatasetChange(datasetName as DatasetName)}
                className={`px-4 py-2 rounded ${
                  currentDataset === datasetName && !isCustomData
                    ? "bg-black text-white"
                    : "bg-gray-200 hover:bg-gray-300 "
                }`}
              >
                {datasetName}
              </button>
            ))}
            <button
              onClick={() => handleDatasetChange("Custom")}
              className={`px-4 py-2 rounded ${
                isCustomData
                  ? "bg-black text-white"
                  : "bg-gray-200 hover:bg-gray-300 "
              }`}
            >
              Custom
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2 rounded text-xs">
            <ResponsiveContainer width="100%" height={208}>
              <AreaChart
                data={data}
                margin={{
                  top: 10,
                  right: 32,
                  left: showAxisLabels ? 0 : -40,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FAC938" stopOpacity={0.9} />
                    <stop offset="95%" stopColor="#FAC938" stopOpacity={0.08} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis
                  domain={calculateDomain()}
                  tick={showAxisLabels ? {} : false}
                />
                <Tooltip />
                <Area
                  //   type="monotone"
                  dataKey="value"
                  stroke="#000"
                  strokeWidth={2}
                  fill="url(#colorValue)"
                  activeDot={{ r: 8 }}
                  dot={{
                    r: 4,
                    fill: "#000",
                    fillOpacity: 1,
                    strokeWidth: 0,
                  }}
                />
                <ReferenceLine y={goal} stroke="red" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
            {isCustomData && (
              <div className="mt-4 grid grid-cols-4 gap-2">
                {data.map((point, index) => (
                  <div key={index} className="bg-gray-100 p-2 rounded">
                    <p className="font-medium">{point.name}</p>
                    <input
                      type="number"
                      value={point.value}
                      onChange={(e) => handleValueChange(index, e.target.value)}
                      className="w-full p-1 border rounded mt-1 bg-gray-200"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="col-span-1 bg-gray-100 p-4 rounded ">
            <label className="flex items-center mt-2 mb-4">
              <input
                type="checkbox"
                checked={showAxisLabels}
                onChange={(e) => setShowAxisLabels(e.target.checked)}
                className="mr-2"
              />
              Show Y-Axis Labels
            </label>
            <div className="mb-8">
              <label className="block text-sm">Goal</label>
              <div className="flex items-center">
                <input
                  type="number"
                  value={goal}
                  onChange={(e) => setGoal(parseInt(e.target.value))}
                  className="w-full p-1 border rounded text-black"
                />
              </div>
            </div>
            <h2 className="text-lg font-semibold mb-2">Y-Axis Controls</h2>

            <div className="space-y-4">
              <div>
                <div className="w-full flex mb-4">
                  <button
                    className={`p-2 ${
                      isPercentage
                        ? "bg-black text-white"
                        : "bg-white text-black"
                    }  w-full`}
                    onClick={() => {
                      setIsPercentage(true);
                    }}
                  >
                    Calculated
                  </button>
                  <button
                    className={`p-2 ${
                      !isPercentage
                        ? "bg-black text-white"
                        : "bg-white text-black"
                    }  w-full`}
                    onClick={() => {
                      setIsPercentage(false);
                    }}
                  >
                    Value
                  </button>
                </div>
                {!isPercentage ? (
                  <>
                    <div className="space-y-2">
                      <div>
                        <label className="block text-sm">Bottom margin</label>
                        <div className="flex">
                          <input
                            type="text"
                            value={minValue}
                            onChange={(e) => setMinValue(e.target.value)}
                            placeholder="auto or number"
                            className="w-full p-1 border rounded text-black"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm">Top margin</label>
                        <input
                          type="text"
                          value={maxValue}
                          onChange={(e) => setMaxValue(e.target.value)}
                          placeholder="auto or number"
                          className="w-full p-1 border rounded text-black"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm">
                            % of delta as bottom margin
                          </label>
                          <div className="flex items-center">
                            <input
                              type="number"
                              value={belowMinPercentage}
                              onChange={(e) =>
                                setBelowMinPercentage(parseInt(e.target.value))
                              }
                              className="w-full p-1 border rounded text-black"
                            />
                            <span className="ml-1">%</span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm">
                            % of delta as top margin
                          </label>
                          <div className="flex items-center">
                            <input
                              type="number"
                              value={aboveMaxPercentage}
                              onChange={(e) =>
                                setAboveMaxPercentage(parseInt(e.target.value))
                              }
                              className="w-full p-1 border rounded text-black"
                            />
                            <span className="ml-1">%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="bg-gray-200 p-2 rounded text-sm">
                <p>Data Min: {dataMin}</p>
                <p>Data Max: {dataMax}</p>
                <p>Values Delta: {dataMax - dataMin}</p>
                <p>
                  Current Domain: [{calculateDomain()[0]},{" "}
                  {calculateDomain()[1]}]
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default CustomizableYAxisChart;
