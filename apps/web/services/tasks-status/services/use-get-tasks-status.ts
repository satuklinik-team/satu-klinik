"use client";

import { useQuery } from "@tanstack/react-query";

import { tasksStatusApi } from "../api";
import type { TasksStatusEntity } from "../types/entity";
import { TasksStatusQueryKeyFactory } from "../utils/query-key.factory";

export const useGetTasksStatus = <T = TasksStatusEntity>(dto?: object) => {
  const queryKeyFactory = new TasksStatusQueryKeyFactory();

  return useQuery<T>({
    queryFn: () => tasksStatusApi.getTasksStatus<T>(dto),
    queryKey: queryKeyFactory.list(dto),
  });
};
