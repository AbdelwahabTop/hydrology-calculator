import PipesDropdown from "./PipesDropdown";
import PipesDropdownLength from "./PipesDropdownLength";
import { Divider } from "@mui/material";
import TextField from "@mui/material/TextField";
import { FormGroup, InputAdornment, MenuItem, Select, Typography } from "@mui/material";
import StatPreview from "./StatPreview";
import ShowerIcon from '@mui/icons-material/Shower';
import StartOutlinedIcon from "@mui/icons-material/StartOutlined";
import ForestIcon from '@mui/icons-material/Forest';
import { useState } from "react";

export default function Inventory({ 
    qPerRow,
    nOfLinesPerSub,
    nOfSubs,
    rows,
    subHeight,
    length,
    qCrop,
    qSubArea,
    widthOfSub,
    nOfTrees,
    qGas,
    qPalm,
    hrs,
    qPump
}) {
    const [qSprinkler, setQSprinkler] = useState(0);
    const khartomLength = nOfLinesPerSub * nOfSubs;
    const linesLength = 0;
    const subMainLength = 0;
    const MainLength = 0;
    // const subsStopcock = nOfSubs  // محابس اللي داخله لكل حوشه بعدد الحوش
    console.log(qPump);
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <h2 style={{ marginBottom: "32px" }}>Inventory</h2>
            <div>
                <PipesDropdown header="Hose" q={qPerRow }  length={nOfLinesPerSub * nOfSubs * widthOfSub}/>
                <PipesDropdownLength header="Sub Main" q={(qPump / (60*60))} />
                { qPalm > 0 &&<><PipesDropdownLength header="Palm trees" q={(Number(qPalm / hrs).toFixed(2))/3600 } /></>}
                { qGas > 0 &&<><PipesDropdownLength header="Gasoline" q={(Number(qGas / hrs).toFixed(2))/3600} /></>}
                <PipesDropdownLength header="Main" q={qPump / (60*60)} />
                <div style={{display: "flex", flexDirection: "row", gap: "20px", flexWrap: "wrap", marginTop: "35px", marginBottom: "35px"}}>
                    <h2 style={{width: "120px"}}>Emitters</h2>
                    <TextField
                        id="water duty"
                        label="water duty (m³/day)"
                        type="number"
                        value={qSprinkler}
                        onFocus={(event) => {
                            event.target.select();
                        }}
                        onChange={(event) => {
                            setQSprinkler(event.target.value);
                        }}
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <StartOutlinedIcon />
                            </InputAdornment>
                            ),
                        }}
                        variant="outlined"
                        style={{ marginRight: "16px", maxWidth: "300px", marginTop: "10px" }}
                    />
                   {qSprinkler && qSprinkler > 0 ? <><StatPreview
            label="Number of emmiter / tree"
            value={`${Math.ceil(Number(qCrop / qSprinkler))} emitter/tree`}
            SelectedIcon={ForestIcon}
          />
          <StatPreview
            label="Approx total number of emmiter"
            value={`${Math.ceil(Number(qCrop / qSprinkler)) * nOfTrees * nOfSubs} emmiter`}
            SelectedIcon={ShowerIcon}
          /></>: ""}
                </div>
            </div>
        </div>
    );
}