export interface GeneralTasksStatusEntity {
  todayPatient: number;
  todayRevenue: number;
  todayPrescription: number;
  totalPatient: number;
}

export interface TasksStatusEntity {
  todo: number;
  completed: number;
  total: number;
}

export interface TasksStatusNotificationEntity {
  doctorTask: boolean;
  pharmacyTask: boolean;
}
