import StatPreview from "../StatPreview";
import BorderOuterIcon from "@mui/icons-material/BorderOuter";
import AvailableDiameters from "../AvailableDiameters.json" assert { type: "json" };
import ForestIcon from "@mui/icons-material/Forest";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import HeatPumpIcon from "@mui/icons-material/HeatPump";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import ShowerIcon from '@mui/icons-material/Shower';


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
  diameter,
  setDiameter,
  qMax,
  windDir,
  design,
  nOfTurns
}) {

  const circleArea = Number((0.78539816339 * (diameter**2)) / 4200).toFixed(3);
  
  const nOfTrees = design == "flow" ? Math.floor(Number((qMax * circleArea)/(q*.001))) : Math.floor(Number(circleArea *4200 / (x*y)))
  const nOfCirclesX = Math.floor(width / diameter);
  const nOfCirclesY = Math.floor(height / diameter);
  const totalCircles = nOfCirclesX * nOfCirclesY;
  const circlesPerDay = (totalCircles / irr);
  const hoursPerTurn = hrs / nOfTurns


  const requiredWaterPerCircle =  (nOfTrees * (q*.001) ) / hrs 
  const quantityCultivatedPerIrr = Number(qMax * circleArea * irr).toFixed(3);

  console.log(quantityCultivatedPerIrr);
  console.log(quantityCultivatedPerIrr + Number(palmQ / hrs) + Number(gasQ / hrs));
  

  const qPump = Number(
    Number(quantityCultivatedPerIrr) + Number(palmQ / hrs) + Number(gasQ / hrs)
  ).toFixed(2); // n of rows
  const z = totalCircles / irr;
  const qPivotSec = Number((quantityCultivatedPerIrr / hoursPerTurn) / 3600).toFixed(4)
  console.log(qPivotSec);
  const nOfWorkingHours = Number((hrs * z).toFixed(2));
  
  const mainLineDiameter = Number(
    Math.sqrt(((4*qPivotSec ) + Number(palmQ / (hoursPerTurn*3600)) + Number(gasQ / (hoursPerTurn*3600)))  / (0.78539816339 * v )) * 1000
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
            label="Total Pivots"
            value={`${totalCircles} Pivot`}
            SelectedIcon={CircleOutlinedIcon}
          />
          <StatPreview
            label="No of turns"
            value={`${nOfTurns} turn`}
            SelectedIcon={WaterDropIcon}
          />
          <StatPreview
            label="Pivots per day"
            value={`${circlesPerDay} Pivot`}
            SelectedIcon={CircleOutlinedIcon}
          />
          <StatPreview
            label="Q per Pivot hourly"
            value={`${Number(quantityCultivatedPerIrr / hoursPerTurn).toFixed(2)} m³/hr`}
            SelectedIcon={WaterDropIcon}
          />
          <StatPreview
            label="Q Pivot"
            value={`${quantityCultivatedPerIrr} m³/day`}
            SelectedIcon={HeatPumpIcon}
          />
          <StatPreview
            label="Sprinklers for pivot"
            value={`${Math.ceil(diameter / 2.75)} Sprinklers/Pivot`}
            SelectedIcon={ShowerIcon}
          />
          <StatPreview
            label="Total Sprinklers"
            value={`${Math.ceil((diameter / 2.75) * totalCircles)} Sprinklers`}
            SelectedIcon={ShowerIcon}
          />
        </div>
      </div>    
    </div>
  );
}
