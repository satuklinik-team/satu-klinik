export interface TasksStatusEntity {
  todo: number;
  completed: number;
  total: number;
}

export interface TasksStatusNotificationEntity {
  doctorTask: boolean;
  pharmacyTask: boolean;
}
