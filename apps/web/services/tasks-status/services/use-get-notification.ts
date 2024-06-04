"use client";

import { useQuery } from "@tanstack/react-query";

import { tasksStatusApi } from "../api";
import type { TasksStatusNotificationEntity } from "../types/entity";
import { TasksStatusQueryKeyFactory } from "../utils/query-key.factory";

export const useGetNotification = (dto?: object) => {
  const queryKeyFactory = new TasksStatusQueryKeyFactory();

  return useQuery<TasksStatusNotificationEntity>({
    queryFn: () => tasksStatusApi.getNotification(dto),
    queryKey: queryKeyFactory.notifications(),
    refetchInterval: 10000,
  });
};
