import { useEffect, useState } from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import DropdownSection from "../DropdownSection";
import InputBoxes from "../InputBoxes";
import ParkOutlinedIcon from "@mui/icons-material/ParkOutlined";
import StatPreview from "../StatPreview";
import ForestIcon from "@mui/icons-material/Forest";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import { Divider } from "@mui/material";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";

const style = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridTemplateRows: "auto",
  gridGap: "10px",
};

export default function Crop({
  inputValue,
  setInputValue,
  x,
  setX,
  y,
  setY,
  q,
  setQ,
  palm,
  setPalm,
  v,
  palmLength,
  setPalmLength,
  palmQ,
  setPalmQ,
  gas,
  setGas,
  gasQ,
  setGasQ,
  gasLength,
  setGasLength,
  design,
  setDesign,
  qMax,
  setQMax,
  hrs,
}) {
  const [custom, setCustom] = useState("exist");
  
  const handleChange = (event) => {
    setCustom(event.target.value);
  };

  const handleDesign = (event) => {
    setDesign(event.target.value);
  };

  useEffect(() => {
    setPalmQ(((100 * (palmLength / 2)) / 1000).toFixed(2));
  }, [palmLength, setPalmQ]);

  useEffect(() => {
    setGasQ(((60 * gasLength) / 1000).toFixed(2));
  }, [gasLength, setGasQ]);

  return (
<div>
  <h2>Crop details</h2>
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gridGap: "10px",
    }}
  >
    {/* CROP */}
    <div style={{ border: "10px", padding: "10px" }}>
      {/* Exit or Costom */}
      <TextField
      id="flow-design"
      label="Max allowed Q (m³ /fed/day)"
      value={qMax}
      onFocus={(event) => {
        event.target.select();
      }}
      onChange={(event) => {
        setQMax(event.target.value);
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <WaterDropOutlinedIcon />
          </InputAdornment>
        ),
      }}
      variant="outlined"
      style={{ marginTop: "16px", maxWidth: "300px" }}
    />
      
    </div> 
    
    

    {/* PALM */}
    <div>
      {/* Palm CheckBox */}
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={palm}
              onChange={(event) => {
                setPalm(event.target.checked);
                if (!event.target.checked) {
                  setPalmLength(0);
                }
              }}
            />
          }
          label="Palm trees"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={gas}
              onChange={(event) => {
                setGas(event.target.checked);
                if (!event.target.checked) {
                  setGasLength(0);
                }
              }}
            />
          }
          label="Gasoline trees"
        />
      </FormGroup>

      {/* Palm input and out put */}
      {palm && <div
        style={{
          marginTop: "16px",
          marginBottom: "16px",
          opacity: palm && v ? 1 : 0,
          transition: "opacity 1s",
        }}
      >
        <div style={{ display: "flex", marginBottom: "30px" }}>
          <h2 style={{ marginRight: "35px", marginTop: "9px" }}>
            Palm Input
          </h2>

          <TextField
            id="palm"
            label="Length of palm trees per irrigation"
            value={palmLength}
            onFocus={(event) => {
              event.target.select();
            }}
            onChange={(event) => {
              setPalmLength(event.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ParkOutlinedIcon />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            style={{ marginRight: "16px", maxWidth: "300px" }}
          />
        </div>

        {palmLength ? (
          <div
            style={{
              opacity: palmLength ? 1 : 0,
              transition: "opacity 1s",
            }}
          >
            <StatPreview
              label="Number of palm trees"
              value={`${Math.floor(palmLength / 2)} tree`}
              SelectedIcon={ForestIcon}
            />
            <StatPreview
              label="Q of palm Trees"
              value={`${palmQ} m³/day`}
              SelectedIcon={WaterDropIcon}
            />
            <StatPreview
              label="Q of palm Trees/hr"
              value={`${Number(palmQ / hrs).toFixed(2)} m³/hr`}
              SelectedIcon={WaterDropIcon}
            />
            <StatPreview
              label="Diameter of palm tree pipe"
              value={`${Number(
                Math.sqrt(palmQ / (0.78539816339 * v * 60 * 60 * hrs)) * 1000
              ).toFixed(2)} mm`}
              SelectedIcon={CircleOutlinedIcon}
            />
          </div>
        ) : (
          ""
        )}
      </div>}

      {/* Gas inputand output */}
      {gas  ?  <div
        style={{
          marginTop: "16px",
          marginBottom: "16px",
          // display: "flex",
          // justifyContent: "space-around",
        }}
      >
        <div style={{ display: "flex", marginBottom: "30px" }}>
          <h2 style={{ marginRight: "35px", marginTop: "9px" }}>
            gas Input
          </h2>
          <TextField
            id="gas"
            label="Length of gas trees per irrigation"
            value={gasLength}
            onFocus={(event) => {
              event.target.select();
            }}
            onChange={(event) => {
              setGasLength(event.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ParkOutlinedIcon />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            style={{ marginRight: "16px", maxWidth: "300px" }}
          />
        </div>

        {gasLength ? (
          <div
            style={{
              opacity: gasLength ? 1 : 0,
              transition: "opacity 1s",
            }}
          >
            <StatPreview
              label="Number of gas trees"
              value={`${Math.floor(gasLength)} tree`}
              SelectedIcon={ForestIcon}
            />
            <StatPreview
              label="Q of gas Trees"
              value={`${gasQ} m³/day`}
              SelectedIcon={WaterDropIcon}
            />
            <StatPreview
              label="Q of gas Trees/hr"
              value={`${Number(gasQ / hrs).toFixed(2)} m³/hr`}
              SelectedIcon={WaterDropIcon}
            />
            <StatPreview
              label="Diameter of gas tree pipe"
              value={`${Number(
                Math.sqrt(gasQ / (0.78539816339 * v * 60 * 60 * hrs)) *
                  1000
              ).toFixed(2)} mm`}
              SelectedIcon={CircleOutlinedIcon}
            />
          </div>
        ) : ""}
      </div> : ""}
    </div>
  </div>
</div>
  );
}
