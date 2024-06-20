"use client";

import { useQuery } from "@tanstack/react-query";

import { tasksStatusApi } from "../api";
import type { TasksStatusChartEntity } from "../types/entity";
import { TasksStatusQueryKeyFactory } from "../utils/query-key.factory";

export const useGetTasksStatusChart = (dto?: object) => {
  const queryKeyFactory = new TasksStatusQueryKeyFactory();

  return useQuery<TasksStatusChartEntity[]>({
    queryFn: () => tasksStatusApi.getChart(dto),
    queryKey: queryKeyFactory.chart(dto),
  });
};
