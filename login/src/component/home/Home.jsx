import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getFetch } from "../api/Api";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  {
    name: "sahil",
    email: "sahil@gmail.com",
    password: "123456",
    Role: "Admin",
  },
  {
    name: "aman",
    email: "aman@gmail.com",
    password: "123456",
    Role: "user",
  },
  {
    name: "vashu",
    email: "vashu@gmail.com",
    password: "123456",
    Role: "Admin",
  },
  {
    name: "ashish",
    email: "ashish@gmail.com",
    password: "123456",
    Role: "user",
  },
];

const Home = () => {
  const getAllUser = async () => {
    try {
      const res = await getFetch("http://localhost:4000/api/v1/get-all");

      console.log("homeRes", res);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getAllUser();
  }, []);
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Password</TableCell>
            <TableCell align="right">Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.password}</TableCell>
              <TableCell align="right">{row.Role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Home;
