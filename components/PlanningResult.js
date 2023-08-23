import StatPreview from "./StatPreview";
import BorderOuterIcon from "@mui/icons-material/BorderOuter";
import AvailableDiameters from "./AvailableDiameters.json" assert { type: "json" };
import ForestIcon from "@mui/icons-material/Forest";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import HeatPumpIcon from "@mui/icons-material/HeatPump";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import DensitySmallIcon from "@mui/icons-material/DensitySmall";
import GrassIcon from "@mui/icons-material/Grass";
import OneBlock from "./OneBlock";
import LinesResults from "./LinesResults";
import Inventory from "@/components/Inventory";
import { Divider } from "@mui/material";


const style = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridTemplateRows: "repeat(3, auto)",
  gap: "40px",
  gridRowGap: "30px",
  marginLeft: "80px",
};

export default function PlanningResult({
  width,
  height,
  x,
  y,
  q,
  v,
  allowed,
  hrs,
  rows,
  irr,
  area,
  lines,
  palmQ,
  gasQ,
  subRoad,
  mainRoad,
  windDir,
}) {
  const nOfSubs = Number((area / allowed).toFixed(2));
  const widthOfSub = Number(width / (nOfSubs / rows)) - subRoad / 2; // n of rows
  const hightOfSub = Number(height / rows) - mainRoad / 2;
  let treesPerRow = 0;
  let nOfLinesPerSub = 0;

  if (windDir == "horizontal") {
    treesPerRow = 2 * Math.floor((widthOfSub - 3) / x / 2);
    nOfLinesPerSub = Math.floor(hightOfSub / y);
  } else if (windDir == "verticals") {
    treesPerRow = 2 * Math.floor((hightOfSub - 3) / x / 2);
    nOfLinesPerSub = Math.floor(widthOfSub / y);
  }
  const nOfTrees = nOfLinesPerSub * treesPerRow;
  const qSubArea = Number(((q * nOfTrees) / 1000).toFixed(2));
  const hoursPerIrrg = hrs; //hours input
  const qSubHour = (qSubArea / hoursPerIrrg).toFixed(2);
  const subIrrgHour = irr; // subs Irrigated per hour
  const qPump = Number(
    qSubHour * subIrrgHour + Number(palmQ / hrs) + Number(gasQ / hrs)
  ).toFixed(2); // n of rows
  const z = nOfSubs / subIrrgHour;
  const nOfWorkingHours = Number((hoursPerIrrg * z).toFixed(2));
  const qPerRow = Number((treesPerRow * q) / (1000 * 60 * 60 * hrs)).toFixed(7);
  const mainLineDiameter = Number(
    Math.sqrt(qPump / (0.78539816339 * v * 60 * 60)) * 1000
  ).toFixed(2);
  const khartoumDiamter = Number(
    Math.sqrt(qPerRow / (0.78539816339 * v)) * 1000
  ).toFixed(2);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h2 style={{ marginBottom: "32px" }}>Results</h2>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h3 style={{ color: "#2196f3" }}>General Results</h3>
        <div style={style}>
          <StatPreview
            label="Mainline diameter"
            value={`${mainLineDiameter} mm`}
            SelectedIcon={CircleOutlinedIcon}
          />
          <StatPreview
            label="Hose Diameter"
            value={`${khartoumDiamter} mm`}
            SelectedIcon={CircleOutlinedIcon}
          />
          <StatPreview
            label="Number of Subs"
            value={`${nOfSubs} sub`}
            SelectedIcon={GrassIcon}
          />
          <StatPreview
            label="Number of Trees"
            value={`${nOfTrees} tree`}
            SelectedIcon={ForestIcon}
          />
          <StatPreview
            label="Q sub Area"
            value={`${qSubArea} m³/day`}
            SelectedIcon={WaterDropIcon}
          />
          <StatPreview
            label="Q sub per irrigation hours"
            value={`${qSubHour} m³/hr`}
            SelectedIcon={WaterDropIcon}
          />
          <StatPreview
            label="Q pump"
            value={`${qPump} m³/hr`}
            SelectedIcon={HeatPumpIcon}
          />
          <StatPreview
            label="Number of working hours"
            value={`${nOfWorkingHours} hr`}
            SelectedIcon={QueryBuilderIcon}
            limitedValue={18}
            valueNum={nOfWorkingHours}
          />
          <StatPreview
            label="Trees per row"
            value={`${treesPerRow} tree`}
            SelectedIcon={DensitySmallIcon}
          />
          <StatPreview
            label="Number of lines per sub"
            value={`${nOfLinesPerSub} line`}
            SelectedIcon={DensitySmallIcon}
          />
          <StatPreview
            label="Q per row"
            value={`${qPerRow} m³/sec`}
            SelectedIcon={WaterDropIcon}
          />
        </div>
      </div>
      {lines && lines.length > 0 && (
        <LinesResults y={y} qPerRow={qPerRow} lines={lines} v={v} />
      )}
      
      <Divider />
      <Inventory
          nOfLinesPerSub={nOfLinesPerSub}
          qPerRow={qPerRow}
          nOfSubs={nOfSubs}
          qCrop={q}
          qSubArea={qSubArea}
          qPump={qPump}
          subHeight={hightOfSub}
          length={width}
          rows={rows}
          qGas={gasQ}
          qPalm={palmQ}
          widthOfSub={widthOfSub}
          nOfTrees={nOfTrees}
          hrs={hrs}
      />
<Divider />
<h3 style={{ color: "#2196f3" }}>Block Dimensions</h3>
      <OneBlock
        rectwidth={widthOfSub}
        rectheight={hightOfSub}
        verticalspace={y}
      />
    </div>
  );
}
