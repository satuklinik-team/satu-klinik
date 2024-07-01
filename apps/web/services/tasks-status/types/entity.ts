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
  doctorTask: number;
  pharmacyTask: number;
}

export interface TasksStatusChartEntity {
  visitLabel: string;
  count: {
    e1: number;
    d1: number;
    p1: number;
    total: number;
  };
}
