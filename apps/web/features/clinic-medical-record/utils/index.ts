import dayjs from "dayjs";

export const timeRangeOptions = [
  {
    label: "Today",
    value: "today",
    getFrom: () => {
      return dayjs().format("DD/MM/YYYY");
    },
    getTo: () => {
      return dayjs().format("DD/MM/YYYY");
    },
  },
  {
    label: "Yesterday",
    value: "yesterday",
    getFrom: () => {
      return dayjs().subtract(1, "day").format("DD/MM/YYYY");
    },
    getTo: () => {
      return dayjs().subtract(1, "day").format("DD/MM/YYYY");
    },
  },
  {
    label: "7 Days Ago",
    value: "oneWeekAgo",
    getFrom: () => {
      return dayjs().subtract(7, "day").format("DD/MM/YYYY");
    },
    getTo: () => {
      return dayjs().format("DD/MM/YYYY");
    },
  },
  {
    label: "21 Days Ago",
    value: "threeWeeksAgo",
    getFrom: () => {
      return dayjs().subtract(21, "day").format("DD/MM/YYYY");
    },
    getTo: () => {
      return dayjs().format("DD/MM/YYYY");
    },
  },
  {
    label: "This Month",
    value: "thisMonth",
    getFrom: () => {
      return dayjs().startOf("month").format("DD/MM/YYYY");
    },
    getTo: () => {
      return dayjs().endOf("month").format("DD/MM/YYYY");
    },
  },
  {
    label: "Last Month",
    value: "lastMonth",
    getFrom: () => {
      return dayjs().subtract(1, "month").startOf("month").format("DD/MM/YYYY");
    },
    getTo: () => {
      return dayjs().subtract(1, "month").endOf("month").format("DD/MM/YYYY");
    },
  },
];
