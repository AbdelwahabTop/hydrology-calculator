"use client";

import Area from "@/components/Area";
import Crop from "@/components/Crop";
import OneBlock from "@/components/OneBlock";
import PlanningResult from "@/components/PlanningResult";
import { Divider } from "@mui/material";
import { useEffect, useState } from "react";

export default function Planning() {
  const [inputValue, setInputValue] = useState("");
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [allowed, setAllowed] = useState(0);
  const [v, setV] = useState(1);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [q, setQ] = useState(0);
  const [hrs, setHrs] = useState(3);
  const [rows, setRows] = useState(2);
  const [irrg, setIrrg] = useState(2);
  const [palmLength, setPalmLength] = useState(0);
  const [palm, setPalm] = useState(false);
  const [palmQ, setPalmQ] = useState(0);
  const [lines, setLines] = useState([]);
  const [nOfLines, setNOfLines] = useState(0);
  const [subRoad, setSubRoad] = useState(0);
  const [mainRoad, setMainRoad] = useState(0);
  const [windDir, setWindDir] = useState("horizontal");
  const [gasLength, setGasLength] = useState(0);
  const [gas, setGas] = useState(false);
  const [gasQ, setGasQ] = useState(0);

  useEffect(() => {
    let newArr = [];

    for (let i = 0; i < nOfLines; i++) {
      let indexvalue = i;
      newArr.push({ length: 0, index: indexvalue, addLength: [] });
    }
    setLines(newArr);
    console.log(newArr);
  }, [nOfLines, setLines]);

  return (
    <main style={{ overflowX: "hidden" }}>
      <Crop
        inputValue={inputValue}
        setInputValue={setInputValue}
        x={x}
        setX={setX}
        y={y}
        setY={setY}
        q={q}
        setQ={setQ}
        palm={palm}
        setPalm={setPalm}
        palmLength={palmLength}
        setPalmLength={setPalmLength}
        palmQ={palmQ}
        setPalmQ={setPalmQ}
        gasQ={gasQ}
        setGas={setGas}
        gas={gas}
        gasLength={gasLength}
        setGasLength={setGasLength}
        setGasQ={setGasQ}
        v={v}
        hrs={hrs}
      />
      <Divider />
      <Area
        width={width}
        setWidth={setWidth}
        height={height}
        setHeight={setHeight}
        allowed={allowed}
        setAllowed={setAllowed}
        v={v}
        setV={setV}
        hrs={hrs}
        setHrs={setHrs}
        rows={rows}
        setRows={setRows}
        irrg={irrg}
        setIrrg={setIrrg}
        lines={lines}
        setLines={setLines}
        nOfLines={nOfLines}
        setNOfLines={setNOfLines}
        subRoad={subRoad}
        setSubRoad={setSubRoad}
        mainRoad={mainRoad}
        setMainRoad={setMainRoad}
        windDir={windDir}
        setWindDir={setWindDir}
      />
      <Divider />
      {x && y && allowed && width && height && q ? (
        <PlanningResult
          width={width}
          height={height}
          x={x}
          y={y}
          v={v}
          q={q}
          allowed={allowed}
          area={Math.round((width * height) / 4200)}
          hrs={hrs}
          rows={rows}
          irr={irrg}
          lines={lines}
          palmQ={palmQ}
          gasQ={gasQ}
          subRoad={subRoad}
          mainRoad={mainRoad}
          windDir={windDir}
        />
      ) : (
        ""
      )}

    </main>
  );
}
