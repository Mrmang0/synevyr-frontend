import {
  Avatar,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { TheGrateBoostRun } from "../TheGrateBoostTypes";
import StyledContainer from "../../../components/StyledContainer";

const TheGrateBoostTable = ({
  runs,
  loading,
}: {
  runs: TheGrateBoostRun[];
  loading: boolean;
}) => {
  return (
    <StyledContainer sx={{ margin: "auto" }} maxHeight={"60vh"}>
      {loading && <LinearProgress />}
      <TableContainer>
        <Table
          sx={{
            minWidth: 650,
            "& td, & th": { borderBottom: "1px solid #aaaaaa" },
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ height: 89 }}></TableCell>
              <TableCell sx={{ fontSize: "1rem" }} align="center">
                Ім'я
              </TableCell>
              <TableCell sx={{ fontSize: "1rem" }} align="center">
                Закрито ключів
              </TableCell>
              <TableCell sx={{ fontSize: "1rem" }} align="center">
                Часу в ключах
              </TableCell>
              <TableCell sx={{ fontSize: "1rem" }} align="center">
                Рахунок
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {runs.length == 0 && (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  sx={{ height: "30vh", textAlign: "center", fontSize: "3rem" }}
                  colSpan={5}
                >
                  Немає записів за поточний період
                </TableCell>
              </TableRow>
            )}
            {runs.map((run) => (
              <TableRow
                key={run.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ fontSize: "1rem" }} component="th" scope="row">
                  <Avatar sx={{ width: 56, height: 56 }} src={run.pictureUrl} />
                </TableCell>
                <TableCell sx={{ fontSize: "1rem" }} align="center">
                  {run.name}
                </TableCell>
                <TableCell sx={{ fontSize: "1rem" }} align="center">
                  {run.keysClosed}
                </TableCell>
                <TableCell sx={{ fontSize: "1rem" }} align="center">
                  {run.timeInKeys.split(".")[0]}
                </TableCell>
                <TableCell sx={{ fontSize: "1rem" }} align="center">
                  {run.score}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledContainer>
  );
};

export default TheGrateBoostTable;
