import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { GET_CARBON_BY_SESSION_ID } from "../graphql/queries";

type Result = {
  label: string;
  emissions: number;
};

export const Results = () => {
  const navigate = useNavigate();
  const [sessionId, setSessionId] = useState<string>();
  const [results, setResults] = useState<Result[]>();
  const { loading, error, data } = useQuery(GET_CARBON_BY_SESSION_ID, {
    variables: {
      sessionId: sessionId,
    },
    skip: !sessionId,
  });

  useEffect(() => {
    const id = sessionStorage.getItem("sessionId");
    if (id) {
      setSessionId(id);
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (!loading && data) {
      console.log(data);
      setResults([
        {
          label: "Air Travel",
          emissions: data.getCarbonBySessionId[0].airTravelEmissions,
        },
        {
          label: "Your commute",
          emissions: data.getCarbonBySessionId[0].commuteEmissions,
        },
        {
          label: "Household Electricity",
          emissions: data.getCarbonBySessionId[0].electricityEmissions,
        },
      ]);
    }
  }, [loading, data]);

  if (loading || !results) return <p>Loading...</p>;
  if (error) {
    navigate("/");
  }

  return (
    <div className="flex items-start flex-col gap-4 max-w-4xl w-full">
      <h2>Your Carbon emissions:</h2>
      <Table>
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
            <TableCell>Total Carbon emissions</TableCell>
            <TableCell>
              {results.reduce((acc, curr) => acc + curr.emissions, 0)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <Button onClick={() => navigate("/")}>Start over</Button>
    </div>
  );
};
