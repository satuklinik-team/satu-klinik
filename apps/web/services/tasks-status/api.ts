import type { AxiosInstance } from "axios";
import { stringify } from "qs";

import { api } from "@/lib/api";

import type {
  TasksStatusEntity,
  TasksStatusNotificationEntity,
} from "./types/entity";

class TasksStatusApi {
  api: AxiosInstance = api;

  async getTasksStatus(dto?: object): Promise<TasksStatusEntity> {
    const queryParams = stringify(dto);

    const { data } = await this.api.get<TasksStatusEntity>(
      `/tasks-status?&${queryParams}`
    );

    return data;
  }

  async getNotification(dto?: object): Promise<TasksStatusNotificationEntity> {
    const queryParams = stringify(dto);

    const { data } = await this.api.get<TasksStatusNotificationEntity>(
      `/tasks-status/notification?&${queryParams}`
    );

    return data;
  }
}

export const tasksStatusApi = new TasksStatusApi();