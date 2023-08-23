import fruits from "./fruits.json" assert { type: "json" };
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import StartOutlinedIcon from "@mui/icons-material/StartOutlined";
import UpgradeOutlinedIcon from "@mui/icons-material/UpgradeOutlined";
import StatItem from "./StatItem";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function DropdownSection({
  inputValue,
  setInputValue,
  setX,
  setY,
  setQ,
}) {
  return (
    <div style={{ width: "500px" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label1">Crop</InputLabel>
        <Select
          labelId="demo-simple-select-labe1l"
          id="demo-simple-select1"
          value={inputValue}
          style={{ width: "300px" }}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
          label="Crop"
        >
          {fruits.map((fruit) => (
            <MenuItem key={`${fruit.label}-select-${fruit.y}`} value={fruit.label}>
              {fruit.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div style={{ display: "flex", width: "100%", gap: "15px" }}>
        {inputValue &&
          fruits
            .filter((fruit) => fruit.label == inputValue)
            .map((fruit) => {
              setQ(fruit.q);
              setX(fruit.x);
              setY(fruit.y);
              return (
                <>
                  <StatItem
                    key="horizontalkey12"
                    label="Horizontal space"
                    value={`${fruit.x} m`}
                    SelectedIcon={StartOutlinedIcon}
                  />
                  <StatItem
                    key="verticalkey12"
                    label="Vertical space"
                    value={`${fruit.y} m`}
                    SelectedIcon={UpgradeOutlinedIcon}
                  />
                  <StatItem
                    key="flowkey12"
                    label="Max Req water"
                    value={`${fruit.q} L/day`}
                    SelectedIcon={WaterDropOutlinedIcon}
                  />
                </>
              );
            })}
      </div>
    </div>
  );
}
