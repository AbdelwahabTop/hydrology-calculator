import pipes from "./pipes.json" assert { type: "json" };
import { useState } from "react";
import SpeedIcon from '@mui/icons-material/Speed';
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { InputAdornment, TextField } from "@mui/material";
import StatPreview from "./StatPreview";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import RemoveIcon from '@mui/icons-material/Remove';

export default function PipesDropdownLength ({ q, header }) {
    const [diameter, setDiameter] = useState('');
    const [price, setPrice] = useState('')
    const [length, setLength] = useState(0)
    const diameterMeter = (Number(diameter.split('/')[0])*.0254).toFixed(4)
    let v = (( q ) / ( 0.78539816339 * (diameterMeter**2) )).toFixed(4)
    let red = 0
    if (v === "Infinity") {
        v = 0
        red = 0
    } else if (v > 2 || v < 1) {
        red = 1
    } else {
        red = 0
    }

    return (
        <div style={{display: "flex", flexDirection: "row", gap: "20px", flexWrap: "wrap", marginTop: "30px", }}>
            <h2 style={{width: "120px"}}>{header}</h2>
            <FormControl style={{ marginTop: "10px"}}>
                <InputLabel id={"demo-simple-select-label1"  + header}>Diameter</InputLabel>
                <Select
                    labelId={"demo-simple-select-labe1l" + header}
                    id={"demo-simple-select1"  + header}
                    value={diameter}
                    style={{ width: "300px" }}
                    onChange={(event) => {
                     setDiameter(event.target.value);
                    }}
                    label="Diameter"
                >
                    {pipes.map((pipe) => (
                        <MenuItem key={`${pipe.SKU}-select-${pipe.internalD}-${header}`} value={`${pipe.internalD}/${pipe.SKU}`}>
                            <div style={{display: "flex", flexDirection: "row"}}>
                                <div style={{marginRight: "50px"}}>
                                    {`${(pipe.internalD*25.4).toFixed(2)}mm`}
                                </div>
                                {`SKU: ${pipe.SKU}`}
                            </div>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                id={`${header}-price-input`}
                label="Price per unit (meter)"
                value={price}
                onFocus={(event) => {
                event.target.select();
                }}
                onChange={(event) => {
                setPrice(event.target.value);
                }}
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                    <AttachMoneyIcon/>
                    </InputAdornment>
                ),
                }}
                variant="outlined"
                style={{ marginRight: "16px",marginTop:"10px", maxWidth: "300px" }}
            />
            <TextField
                id={`${header}-length-input`}
                label="Total Length (m)"
                value={length}
                onFocus={(event) => {
                event.target.select();
                }}
                onChange={(event) => {
                setLength(event.target.value);
                }}
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                    <RemoveIcon/>
                    </InputAdornment>
                ),
                }}
                variant="outlined"
                style={{ marginRight: "16px",marginTop:"10px", maxWidth: "300px" }}
            />

                <StatPreview SelectedIcon={SpeedIcon} label="Speed" value= {`${v} m/s`} valueNum={red} style={{marginBottom: "30px"}} />

                {price * length > 0  && diameter&&<StatPreview SelectedIcon={AttachMoneyIcon} label="Total cost" value={`${Number(price * length).toFixed(2)} $`} style={{marginTop: "10px"}}/>}

        </div>
    );
}