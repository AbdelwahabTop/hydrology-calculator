import StatPreview from "./StatPreview";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import AvailableDiameters from "./AvailableDiameters.json" assert { type: "json" };
import SpeedOutlinedIcon from "@mui/icons-material/SpeedOutlined";
const style = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gridTemplateRows: "repeat(4, auto)",
  gap: "40px",
  gridRowGap: "30px",
  marginLeft: "80px",
};

export default function LinesResults({ y, v, qPerRow, lines }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h3 style={{ color: "#2196f3" }}>Lines Results</h3>
      <div style={style}>
        {lines &&
          lines.length > 0 &&
          lines
            .sort((a, b) =>
              a.index > b.index ? 1 : b.index > a.index ? -1 : 0
            )
            .map((line) => {
              let qLine = Number((line.length * qPerRow) / y).toFixed(7);
              let extraValue= line.length
              if (line.addLength&& line.addLength.length > 0) {
                line.addLength.forEach((minLine) => {
                const regex = /-(\d+)/;
                const match = minLine.match(regex);

                if (match) {
                  const number = parseInt(match[1]);
                  extraValue = Number(extraValue) + Number(number)
                }
                  
                })
                qLine = Number((extraValue * qPerRow) / y).toFixed(4);
              }
              let dLine = Number(
                Math.sqrt(qLine / (0.78539816339 * v)) * (1000).toFixed(7)
              ).toFixed(2);
              let newV = qLine / (0.78539816339 * (dLine / 1000) ** 2);
              return (
                <div key={`${line.index}-line-div`}>
                  <StatPreview
                    label={`Line#${line.index + 1} Q`}
                    key={`${line.index}-flow`}
                    value={`${qLine} m³/sec`}
                    SelectedIcon={WaterDropIcon}
                  />
                  <StatPreview
                    label={`Line#${line.index + 1} diameter`}
                    key={`${line.index}-diamater`}
                    value={`${dLine} mm`}
                    SelectedIcon={CircleOutlinedIcon}
                  />
                  <StatPreview
                    label={`Line#${line.index + 1} V`}
                    key={`${line.index}-v`}
                    value={`${Number(newV).toFixed(2)} m/s`}
                    SelectedIcon={SpeedOutlinedIcon}
                  />
                </div>
              );
            })}
      </div>
    </div>
  );
}