"use client";

import { useMemo, useState } from "react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { timeRangeOptions } from "@/features/clinic-medical-record/utils";
import { useGetTasksStatusChart } from "@/services/tasks-status/services/use-get-tasks-status-chart";

export function ClinicDashboardOverviewCharts(): React.JSX.Element {
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>("today");

  const { data: chartData, isLoading } = useGetTasksStatusChart({
    type: selectedTimeRange,
  });

  const modifiedChartData = useMemo(() => {
    if (!chartData) return [];

    return chartData.map((item) => {
      return {
        visitLabel: item.visitLabel,
        doctor: item.count.d1,
        entry: item.count.e1,
        pharmacy: item.count.p1,
        total: item.count.total,
      };
    });
  }, [chartData]);

  if (isLoading) return <p className="text-sm">Loading...</p>;

  return (
    <div className="flex flex-col gap-2 h-96">
      <Select
        onValueChange={(value) => {
          setSelectedTimeRange(value);
        }}
        value={selectedTimeRange}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Pilih waktu" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Pilih waktu</SelectLabel>
            {timeRangeOptions.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <ResponsiveContainer height="100%" width="100%">
        <ComposedChart data={modifiedChartData} height={250}>
          <XAxis dataKey="visitLabel" fontSize={14} />
          <YAxis fontSize={14} />
          <Tooltip />
          <Legend />
          <CartesianGrid stroke="#f5f5f5" />
          <Bar barSize={20} dataKey="entry" fill="#0494ff" name="Entry" />
          <Bar barSize={20} dataKey="doctor" fill="#00e89c" name="Doctor" />
          <Bar barSize={20} dataKey="pharmacy" fill="#ffae1c" name="Pharmacy" />
          <Line
            dataKey="total"
            name="Total"
            stroke="#fe4356"
            strokeWidth={3}
            type="monotone"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
