"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

interface NutritionFact {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds?: number;
}

export default function NutritionTable({
  nutrients,
  dailyPercentage,
}: {
  nutrients: NutritionFact[];
  dailyPercentage: boolean;
}) {
  if (dailyPercentage) {
    return (
      <Table aria-label="table with nutritional information">
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>AMOUNT</TableColumn>
          <TableColumn>DAILY PERCENTAGE</TableColumn>
        </TableHeader>
        <TableBody>
          {nutrients?.map((nutrient, index) => {
            return (
              <TableRow key={index + 1}>
                <TableCell>{nutrient.name}</TableCell>
                <TableCell>
                  {nutrient.amount} {nutrient.unit}
                </TableCell>
                <TableCell>{nutrient.percentOfDailyNeeds}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  } else {
    return (
      <Table aria-label="table with nutritional information">
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>AMOUNT</TableColumn>
        </TableHeader>
        <TableBody>
          {nutrients?.map((nutrient, index) => {
            return (
              <TableRow key={index + 1}>
                <TableCell>{nutrient.name}</TableCell>
                <TableCell>
                  {nutrient.amount} {nutrient.unit}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }
}
