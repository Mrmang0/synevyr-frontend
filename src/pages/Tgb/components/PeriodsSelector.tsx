import {
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  LinearProgress,
  CircularProgress,
} from "@mui/material";
import { TheGrateBoostState } from "../TheGrateBoostTypes";

const PeriodSelector = ({
  loading,
  onChange,
  state,
}: {
  loading: boolean;
  onChange: (e: SelectChangeEvent) => void;
  state: TheGrateBoostState;
}) => {
  return (
    <FormControl>
      <InputLabel>Періоди</InputLabel>
      <Select
        label="Періоди"
        defaultValue={state.currentPeriod?.start}
        value={state.currentPeriod?.start}
        onChange={onChange}
        sx={{ minWidth: 200 }}
        MenuProps={{
          disableScrollLock: true,
          disablePortal: true,
          PaperProps: {
            sx: { backgroundColor: "rgba(54, 73, 92, 0.8)" },
          },
        }}
      >
        {state.periods.map((x) => (
          <MenuItem key={x.start} value={x.start}>
            {new Date(x.start).toLocaleDateString()} -{" "}
            {new Date(x.end).toLocaleDateString()}
          </MenuItem>
        ))}
      </Select>
      {loading && <LinearProgress />}
    </FormControl>
  );
};

export default PeriodSelector;
