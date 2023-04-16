import {
  Avatar,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import StyledContainer from "../../../components/StyledContainer";
import { RosterPageState } from "../RoosterPageTypes";

type SortLabelProps = {
  name: string;
  descending: boolean;
  current: string;
  onClick: (name: string) => void;
  children: string;
};

const SortableCell = ({
  name,
  descending,
  current,
  onClick,
  children,
}: SortLabelProps) => {
  return (
    <TableCell sx={{ fontSize: "1rem" }} align="center">
      <TableSortLabel
        active={current == name}
        direction={descending ? "desc" : "asc"}
        onClick={() => onClick(name)}
      >
        {children}
      </TableSortLabel>
    </TableCell>
  );
};

type RosterTableProps = {
  onHeaderCellClick: (name: string) => void;
  state: RosterPageState;
};

const RosterTable = ({ onHeaderCellClick, state }: RosterTableProps) => {
  const getClassColor = (characterClass: string) => {
    switch (characterClass) {
      case "Death Knight":
        return "#C41E3A";
      case "Demon Hunter":
        return "#A330C9";
      case "Druid":
        return "#FF7C0A";
      case "Evoker":
        return "#33937F";
      case "Hunter":
        return "#AAD372";
      case "Mage":
        return "#3FC7EB";
      case "Monk":
        return "#00FF98";
      case "Paladin":
        return "#F48CBA";
      case "Priest":
        return "#FFFFFF";
      case "Rogue":
        return "#FFF468";
      case "Shaman":
        return "#0070DD";
      case "Warlock":
        return "#8788EE";
      case "Warrior":
        return "#C69B6D";
      default:
        break;
    }
  };

  const getRioColor = (rating: number) => {
    if (rating > 2800) return "#ff8000";
    if (rating > 2500) return "#d44daa";
    if (rating > 2000) return "#b23ade";
    if (rating > 1500) return "#6560e4";
    if (rating > 1250) return "#2476d7";
    if (rating > 750) return "#67ff4b";
    if (rating > 375) return "#d9ffc9";

    return "ffffff";
  };

  return (
    <StyledContainer minHeight={"30vh"} maxHeight={"60vh"} component={Paper}>
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
              <SortableCell
                name={"Name"}
                current={state.sortField}
                descending={state.isDescending}
                onClick={onHeaderCellClick}
              >
                Ім'я
              </SortableCell>
              <SortableCell
                name={"Rank"}
                current={state.sortField}
                descending={state.isDescending}
                onClick={onHeaderCellClick}
              >
                Ранг
              </SortableCell>
              <SortableCell
                name={"Spec"}
                current={state.sortField}
                descending={state.isDescending}
                onClick={onHeaderCellClick}
              >
                Спек
              </SortableCell>
              <SortableCell
                name={"CharacterClass"}
                current={state.sortField}
                descending={state.isDescending}
                onClick={onHeaderCellClick}
              >
                Клас
              </SortableCell>
              <SortableCell
                name={"ItemLevel"}
                current={state.sortField}
                descending={state.isDescending}
                onClick={onHeaderCellClick}
              >
                Рівень предметів
              </SortableCell>
              <SortableCell
                name={"Rio"}
                current={state.sortField}
                descending={state.isDescending}
                onClick={onHeaderCellClick}
              >
                RIO
              </SortableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.roster.length == 0 && (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  sx={{ height: "30vh", textAlign: "center", fontSize: "3rem" }}
                  colSpan={7}
                >
                  Гравців не знайдено
                </TableCell>
              </TableRow>
            )}
            {state.roster.map((member) => (
              <TableRow
                key={member.name}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell sx={{ fontSize: "1rem" }} component="th" scope="row">
                  <Avatar
                    sx={{
                      width: 72,
                      height: 72,
                      boxShadow: `${getClassColor(
                        member.characterClass
                      )} 1px 3px 10px 2px`,
                    }}
                    src={member.image}
                  />
                </TableCell>
                <TableCell sx={{ fontSize: "1rem" }} align="center">
                  {member.name}
                </TableCell>
                <TableCell sx={{ fontSize: "1rem" }} align="center">
                  {member.rank}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "600",
                  }}
                  align="center"
                >
                  {member.spec}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "600",
                  }}
                  align="center"
                >
                  {member.characterClass}
                </TableCell>
                <TableCell sx={{ fontSize: "1rem" }} align="center">
                  {member.itemLevel}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    color: getRioColor(member.rio),
                  }}
                  align="center"
                >
                  {member.rio}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledContainer>
  );
};

export default RosterTable;
