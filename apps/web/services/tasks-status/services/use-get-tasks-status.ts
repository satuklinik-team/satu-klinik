"use client";

import { useQuery } from "@tanstack/react-query";

import { tasksStatusApi } from "../api";
import type { TasksStatusEntity } from "../types/entity";
import { TasksStatusQueryKeyFactory } from "../utils/query-key.factory";

export const useGetTasksStatus = (dto?: object) => {
  const queryKeyFactory = new TasksStatusQueryKeyFactory();

  return useQuery<TasksStatusEntity>({
    queryFn: () => tasksStatusApi.getTasksStatus(dto),
    queryKey: queryKeyFactory.list(dto),
  });
};
