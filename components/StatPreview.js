import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

export default function StatPreview({ SelectedIcon, label, value, limitedValue = 0, valueNum }) {
    const exceedLimit = valueNum > limitedValue ? "red" : "";

    return (
        <div style={{ display: "flex", flexDirection: "column", color: exceedLimit }}>
            <div style={{fontWeight: "bold", marginBottom: "5px"}}>
                {exceedLimit ? (                
                    <div>
                        <ErrorOutlineOutlinedIcon fontSize='' style={{marginRight: "2px", marginBottom: "-2px"}} />
                        Exceed Limit
                    </div>
                ) : ('')}
                {label}
            </div>
            <p style={{ fontWeight: 800, fontSize: "32px", marginTop: "0" }}>
                <SelectedIcon
                    style={{ marginRight: "12px", color: exceedLimit ? exceedLimit : "#2196f3" }}
                />
                {value}
            </p>
        </div>
    );
}