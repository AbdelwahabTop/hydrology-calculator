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
import StatPreview from "./StatPreview";
import { CustomSlider } from "./CustomSlider";
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useEffect } from "react";
import Image from 'next/image'
import instructions from "../public/instructions.png"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
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
  rows,
  setRows,
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
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (event) => {
    setWindDir(event.target.value);
  };
  let ordersOfInput= []
  if(nOfLines) {
    ordersOfInput=[...Array(nOfLines).keys()]
  }
  // console.log(windDir)

  return (
    <>
      <h2 style={{ marginBottom: "32px" }}>Data input <div>
      <Button style={{fontWeight:"bold"}} variant="outlined" onClick={handleOpen}>See inputs explaination</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Image
      src={instructions}
      alt="Picture of the author"
      width="450"
    />
        </Box>
      </Modal>
    </div></h2>
      
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
        <TextField
          id="allowed"
          label="Sub Area (20 ~ 30) Fed"
          type="number"
          value={allowed}
          onFocus={(event) => {
            event.target.select();
          }}
          onChange={(event) => {
            setAllowed(event.target.value);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <StartOutlinedIcon />
              </InputAdornment>
            ),
            inputProps: { min: 20, max: 30 },
          }}
          variant="outlined"
          style={{ marginRight: "16px", width: "150px" }}
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
          label="Hours for one sub"
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
          id="rows"
          label="Number of rows"
          type="number"
          value={rows}
          onFocus={(event) => {
            event.target.select();
          }}
          onChange={(event) => {
            setRows(event.target.value);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <DensitySmallIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          style={{ marginRight: "16px", maxWidth: "300px" }}
        />
        <TextField
          id="irrginput"
          label="Number Of Subs Irrigated in paraller"
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
          id="lines"
          label="Numnber of lines to divide the sub"
          type="number"
          value={nOfLines}
          onFocus={(event) => {
            event.target.select();
          }}
          onChange={(event) => {
            setNOfLines(event.target.value);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <DensitySmallIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          style={{ marginRight: "16px", maxWidth: "300px" }}
        />
      </div>
      {lines.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginBottom: "30px",
          }}
        >
          {lines.map((line) => (
            <div key={`${line.index}-line-div`} style={{order:line.index + 1}}>
              <TextField
                id={`${line.index + 6}-line-boxq`}
                key={`${line.index + 6}-line-box`}
                label={`Line #${line.index + 1} Length (m)`}
                type="number"
                value={
                  lines.filter((stateLine) => stateLine.index == line.index)[0]
                    .length
                }
                onFocus={(event) => {
                  event.target.select();
                }}
                onChange={(event) => {
                  setLines((oldLines) => {
                    let currentLine = {
                      ...lines.filter(
                        (stateLine) => stateLine.index == line.index
                      )[0],
                      length: event.target.value,
                    };
                    return [
                      ...oldLines.filter(
                        (oldLine) => oldLine.index != line.index
                      ),
                      currentLine,
                    ];
                  });

                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DensitySmallIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                style={{
                  marginRight: "16px",
                  maxWidth: "300px",
                  order:line.index + 1,
                }}
              />

                <Select
                labelId={`${line.index}-group1`}
                id={`${line.index}-group1`}
                value={lines.filter((smallLine) => smallLine.index == line.index)[0].addLength}
                multiple={true}
                style={{ marginRight: "16px",
                  width: "200px",marginTop:"16px" }}
                onChange={(event) => {
                  setLines((oldLines) => {
                    let currentLine = lines.filter((smallLine) => smallLine.index == line.index)[0];
                    let newline = {...currentLine,addLength:event.target.value}
                    return [
                      ...oldLines.filter(
                        (oldLine) => oldLine.index != line.index
                      ),
                      newline,
                    ]
                  })
                }}
                label="Include Lines"
              >
                {lines.map((checkLine) => (
                <MenuItem disabled={checkLine.index == line.index} key={`${checkLine.index}-${line.index}-select`} value={`${checkLine.index}-${checkLine.length}`}>
                {`Line# ${checkLine.index +1}`}
              </MenuItem>
                ))}
               </Select>
            </div>
          ))}
        </div>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginBottom: "30px",
        }}
      >
        <TextField
          id="mainroad"
          label="Main Road width (m)"
          type="number"
          value={mainRoad}
          onFocus={(event) => {
            event.target.select();
          }}
          onChange={(event) => {
            setMainRoad(event.target.value);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <WidthWideOutlinedIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          style={{ marginRight: "16px", maxWidth: "300px" }}
        />
        <TextField
          id="subroad"
          label="Subroad width (m)"
          type="number"
          value={subRoad}
          onFocus={(event) => {
            event.target.select();
          }}
          onChange={(event) => {
            setSubRoad(event.target.value);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <WidthWideOutlinedIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          style={{ marginRight: "16px", maxWidth: "300px" }}
        />
      </div>

      <FormControl style={{ marginLeft: "41%" }}>
        <FormLabel id="demo-row-radio-buttons-group-label">
          Wind Direction
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          defaultValue="horizontal"
          value={windDir}
          onChange={handleChange}
        >
          <FormControlLabel
            value="horizontal"
            control={<Radio />}
            label="Horizontal"
          />
          <FormControlLabel
            value="verticals"
            control={<Radio />}
            label="Verticals"
          />
        </RadioGroup>
      </FormControl>
    </>
  );
}
