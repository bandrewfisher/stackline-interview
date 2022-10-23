import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Sale } from "../types";
import { NumericFormat } from "react-number-format";
import CurrencyDisplay from "./CurrencyDisplay";
import TablePagination from "@mui/material/TablePagination";
import TableFooter from "@mui/material/TableFooter";
import TableSortLabel from "@mui/material/TableSortLabel";

interface HeadCell {
  id: keyof Sale;
  numeric: boolean;
  label: string;
}
const headCells: HeadCell[] = [
  {
    id: "weekEnding",
    numeric: false,
    label: "Week Ending",
  },
  {
    id: "retailSales",
    numeric: true,
    label: "Retail Sales",
  },
  {
    id: "wholesaleSales",
    numeric: true,
    label: "Wholesale Sales",
  },
  {
    id: "unitsSold",
    numeric: true,
    label: "Units Sold",
  },
  {
    id: "retailerMargin",
    numeric: true,
    label: "Retailer Margin",
  },
];

interface SalesTableCardProps {
  sales: Sale[];
}

function SalesTableCard({ sales }: SalesTableCardProps) {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState<keyof Sale>("weekEnding");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSortOrderChange = (property: keyof Sale) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortComparator = (a: Sale, b: Sale) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  return (
    <Card>
      <CardContent>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {headCells.map((cell) => (
                  <TableCell
                    key={cell.id}
                    align={cell.numeric ? "right" : "left"}
                    sortDirection={orderBy === cell.id ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === cell.id}
                      direction={orderBy === cell.id ? order : "asc"}
                      onClick={() => handleSortOrderChange(cell.id)}
                    >
                      {cell.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sales
                .sort((a, b) =>
                  order === "asc" ? -sortComparator(a, b) : sortComparator(a, b)
                )
                .slice(rowsPerPage * page, rowsPerPage * (page + 1))
                .map((sale) => (
                  <TableRow key={sale.weekEnding}>
                    <TableCell>{sale.weekEnding}</TableCell>
                    <TableCell align="right">
                      <CurrencyDisplay value={sale.retailSales} />
                    </TableCell>
                    <TableCell align="right">
                      <CurrencyDisplay value={sale.wholesaleSales} />
                    </TableCell>
                    <TableCell align="right">
                      <NumericFormat
                        displayType="text"
                        thousandSeparator=","
                        value={sale.unitsSold}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <CurrencyDisplay value={sale.retailerMargin} />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 50]}
                  colSpan={3}
                  count={sales.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={(_, newPage) => setPage(newPage)}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}

export default SalesTableCard;
