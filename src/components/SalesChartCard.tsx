import React, { useMemo } from "react";
import { Chart, AxisOptions } from "react-charts";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

interface SaleChartData {
  date: Date;
  sales: number;
}

interface Series {
  label: string;
  data: SaleChartData[];
}

interface SalesChartCardProps {
  retailSales: SaleChartData[];
  wholesaleSales: SaleChartData[];
}

function SalesChartCard({ retailSales, wholesaleSales }: SalesChartCardProps) {
  const data: Series[] = useMemo(
    () => [
      {
        label: "Retail Sales",
        data: retailSales,
      },
      {
        label: "Wholesale Sales",
        data: wholesaleSales,
      },
    ],
    [retailSales, wholesaleSales]
  );

  const primaryAxis = useMemo(
    (): AxisOptions<SaleChartData> => ({
      getValue: (datum) => datum.date,
      scaleType: "time",
      showGrid: false,
    }),
    []
  );

  const secondaryAxes = useMemo(
    (): AxisOptions<SaleChartData>[] => [
      {
        getValue: (datum) => datum.sales,
        elementType: "line",
        showGrid: false,
        show: false,
      },
    ],
    []
  );

  return (
    <Card>
      <CardContent>
        Retail Sales
        <div
          style={{
            height: 150,
          }}
        >
          <Chart
            options={{
              data,
              primaryAxis,
              secondaryAxes,
              showDebugAxes: false,
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default SalesChartCard;
