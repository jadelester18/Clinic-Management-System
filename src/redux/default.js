export const DEFAULT_DATE_FORMAT = "YYYY-MM-DD";
export const DISPLAY_DATE_FORMAT = "MMMM D, YYYY";
export const DEFAULT_TIME_FORMAT = "HH:mm:ss";
export const DAY_OF_WEEK_FORMAT = "dddd";
export const UNEXPECTED_ERROR = "An unexpected error occurred";

export const QUEUE_TYPE = [
  { value: "WALK_IN", text: "Walk-in" },
  { value: "APPOINTMENT", text: "Appointment" },
];

export const CHECK_IN_STATUS = [
  { value: "SCHEDULED", text: "Scheduled" },
  { value: "FOR_ASSESSMENT", text: "For assessment" },
  { value: "ONGOING_ASSESSMENT", text: "Ongoing assessment" },
  { value: "FOR_CONSULTATION", text: "For consultation" },
  { value: "ONGOING_CONSULTATION", text: "Ongoing consultation" },
  { value: "FINISHED", text: "Finished" },
  { value: "CANCELLED", text: "Cancelled" },
];

export const CONSULTATION_TYPES = [
  { value: "INITIAL", text: "Initial" },
  { value: "FOLLOW_UP", text: "Follow-up" },
  { value: "CLEARANCE", text: "Clearance" },
];

export const MED_CERT_PURPOSES = [
  { value: "WORK", text: "Work" },
  { value: "SCHOOL", text: "School" },
  { value: "TRAVEL", text: "Travel" },
  { value: "OTHERS", text: "Any reason" },
];

export const MED_CERT_TYPES = [
  { value: "FIT", text: "Fit" },
  { value: "UNFIT", text: "Unfit" },
];
