import { useState } from "react";
import TextField from "@mui/material/TextField";
import AspectRatioOutlinedIcon from "@mui/icons-material/AspectRatioOutlined";
import StartOutlinedIcon from "@mui/icons-material/StartOutlined";
import UpgradeOutlinedIcon from "@mui/icons-material/UpgradeOutlined";
import { FormGroup, InputAdornment, MenuItem, Select, Typography } from "@mui/material";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import DensitySmallIcon from "@mui/icons-material/DensitySmall";
import LooksOneOutlinedIcon from "@mui/icons-material/LooksOneOutlined";
import WidthWideOutlinedIcon from "@mui/icons-material/WidthWideOutlined";
import StatPreview from "../StatPreview";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import { CustomSlider } from "../CustomSlider";
import { useEffect } from "react";

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { CheckBox } from "@mui/icons-material";

export default function Area({
  width,
  setWidth,
  height,
  setHeight,
  allowed,
  setAllowed,
  v,
  setV,
  hrs,
  setHrs,
  diameter,
  setDiameter,
  irrg,
  setIrrg,
  lines,
  setLines,
  nOfLines,
  setNOfLines,
  subRoad,
  setSubRoad,
  mainRoad,
  setMainRoad,
  windDir,
  setWindDir,
  setTurns,
  turns
}) {
  const handleChange = (event) => {
    setWindDir(event.target.value);
  };
  // console.log(windDir)

  return (
    <>
      <h2 style={{ marginBottom: "32px" }}>Data input</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: "30px",
        }}
      >
        <TextField
          id="width"
          label="Width (m)"
          type="number"
          value={width}
          onFocus={(event) => {
            event.target.select();
          }}
          onChange={(event) => {
            setWidth(event.target.value);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <StartOutlinedIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          style={{ marginRight: "16px", maxWidth: "300px" }}
        />
        <TextField
          id="height"
          label="Height (m)"
          type="number"
          value={height}
          onFocus={(event) => {
            event.target.select();
          }}
          onChange={(event) => {
            setHeight(event.target.value);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <UpgradeOutlinedIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          style={{ marginRight: "16px", maxWidth: "300px" }}
        />

        <div style={{ display: "flex", flexDirection: "column" }}>
          Velocity (m/s)
          <CustomSlider
            valueLabelDisplay="auto"
            aria-label="pretto slider"
            id="slider1"
            value={v}
            onChange={(event) => {
              setV(event.target.value);
            }}
            max={2}
            min={1}
            step={0.01}
          />
          <span>Current velocity: {v} m/s</span>
        </div>
        {width && height ? (
          <StatPreview
            label="Area"
            value={`${Math.round((width * height) / 4200)} fed`}
            SelectedIcon={AspectRatioOutlinedIcon}
          />
        ) : (
          <StatPreview
            label="Area"
            value="0.0 fed"
            SelectedIcon={AspectRatioOutlinedIcon}
          />
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: "30px",
        }}
      >
        <TextField
          id="hours"
          label="Working hours per day"
          type="number"
          value={hrs}
          onFocus={(event) => {
            event.target.select();
          }}
          onChange={(event) => {
            setHrs(event.target.value);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccessTimeOutlinedIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          style={{ marginRight: "16px", maxWidth: "300px" }}
        />
        <TextField
          id="irrginput"
          label="Days to irrigate all pivots"
          type="number"
          value={irrg}
          onFocus={(event) => {
            event.target.select();
          }}
          onChange={(event) => {
            setIrrg(event.target.value);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LooksOneOutlinedIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          style={{ marginRight: "16px", maxWidth: "300px" }}
        />
        <TextField
          id="turns"
          label="Number of turns"
          type="number"
          value={turns}
          onFocus={(event) => {
            event.target.select();
          }}
          onChange={(event) => {
            setTurns(event.target.value);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LooksOneOutlinedIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          style={{ marginRight: "16px", maxWidth: "300px" }}
        />
         <TextField
          id="diameter-99"
          label="Diameter of Pivot"
          type="number"
          value={diameter}
          onFocus={(event) => {
            event.target.select();
          }}
          onChange={(event) => {
            setDiameter(event.target.value);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CircleOutlinedIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          style={{ marginRight: "16px", maxWidth: "300px" }}
        />
      </div>
    </>
  );
}
