import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";

export const Results = () => {
  const navigate = useNavigate();

  const results = [
    {
      label: "Air Travel",
      emissions: 0.5,
    },
    {
      label: "Your commute",
      emissions: 2.5,
    },
    {
      label: "Household Electricity",
      emissions: 1.5,
    },
  ];

  return (
    <div className="flex items-start	 flex-col gap-4">
      <h2>Your Carbon emissions</h2>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Kg CO2/kWh</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((results) => (
            <TableRow key={results.label}>
              <TableCell className="font-medium">{results.label}</TableCell>
              <TableCell>{results.emissions}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total Carbon emissions</TableCell>
            <TableCell className="text-right">
              {results.reduce((acc, curr) => acc + curr.emissions, 0)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <Button onClick={() => navigate("/")}>Start over</Button>
    </div>
  );
};
