import {
  APPOINTMENT_STATUS,
  CHECK_IN_STATUS,
  CONSULTATION_TYPES,
  DISPLAY_DATE_FORMAT,
  MED_CERT_PURPOSES,
  QUEUE_TYPE,
} from "./default";
import dayjs from "dayjs";

export function name(person) {
  if (person) {
    const { firstName, middleName, lastName, suffixName, suffixTitle } = person;
    return `${firstName} ${middleName.substring(0, 1)}. ${lastName} ${
      suffixName || ""
    }${suffixTitle ? `, ${suffixTitle}` : ""}`;
  }
}

export function timeSlot(slot) {
  if (slot) {
    const { startTime, endTime } = slot;
    return `${formatTime(startTime)} - ${formatTime(endTime)}`;
  }
}

export function date(dateString) {
  if (dateString) {
    return dayjs(dateString).format(DISPLAY_DATE_FORMAT);
  }
}

function convertTimeStringToObject(timeString) {
  if (timeString) {
    return {
      hour: +timeString.substring(0, 2),
      minute: +timeString.substring(3, 5),
    };
  }
}

export function formatTime(timeString) {
  if (timeString) {
    const timeObject = convertTimeStringToObject(timeString);
    let { hour, minute } = timeObject;
    let meridiem = "AM";

    if (hour >= 12) {
      hour -= 12;
      meridiem = "PM";
    }

    if (hour === 0) {
      hour = 12;
    }

    return `${hour}:${minute.toString().padStart(2, "0")} ${meridiem}`;
  }
}

export function fullAddress(address) {
  if (address) {
    const { street, barangay, city, province, country, postalCode } = address;
    return `${street}, ${barangay}, ${city}, ${province}, ${country}, ${postalCode}`;
  }
}

export function getDayjsFromDateAndTimeString(dateString, timeString) {
  if (dateString && timeString) {
    return dayjs(`${dateString}T${timeString.substring(0, 5)}`);
  }
}

export function morningSchedule(timeSlots) {
  if (timeSlots) {
    const morningSlots = timeSlots.filter((slot) => {
      const hour = slot.startTime.substring(0, 2);
      return hour < 12;
    });

    if (morningSlots.length > 0) {
      const startTime = formatTime(morningSlots[0].startTime);
      const endTime = formatTime(morningSlots[morningSlots.length - 1].endTime);

      return `${startTime} - ${endTime}`;
    }
  }
}

export function afternoonSchedule(timeSlots) {
  if (timeSlots) {
    const afternoonSlots = timeSlots.filter((slot) => {
      const hour = slot.startTime.substring(0, 2);
      return hour >= 12;
    });

    if (afternoonSlots.length > 0) {
      const startTime = formatTime(afternoonSlots[0].startTime);
      const endTime = formatTime(
        afternoonSlots[afternoonSlots.length - 1].endTime
      );

      return `${startTime} - ${endTime}`;
    }
  }
}

export function queueType(typeValue) {
  return QUEUE_TYPE.find((type) => type.value === typeValue).text;
}

export function elapsedTimeFromNow(timeString) {
  if (timeString) {
    const timeObject = convertTimeStringToObject(timeString);
    let { hour, minute } = timeObject;
    const now = dayjs();

    const timeInMinutes = hour * 60 + minute;
    const nowInMinutes = now.hour() * 60 + now.minute();
    const totalDiffInMinutes = nowInMinutes - timeInMinutes;

    const hoursDiff = (totalDiffInMinutes / 60).toFixed(0);
    const minutesDiff = totalDiffInMinutes % 60;

    console.log("hoursDiff", hoursDiff);
    console.log("minutesDiff", minutesDiff);
    if (+hoursDiff === 0 && +minutesDiff === 0) {
      return `just now`;
    }

    return `${hoursDiff > 0 ? `${hoursDiff}h ` : ""}${
      minutesDiff > 0 ? `${minutesDiff}m ` : ""
    } ago`;
  }
}

export function signatura(signatura) {
  if (signatura) {
    if (typeof signatura === "string") {
      return signatura;
    } else {
      const { action, totalPerIntake, packaging, totalPerDay, totalDays } =
        signatura;
      return `${action || "___"} ${totalPerIntake || "_"} ${packaging || "_"} ${
        totalPerDay || "_"
      } times per day for ${totalDays || "_"} days`;
    }
  }
}

export function checkInStatus(statusValue) {
  return CHECK_IN_STATUS.find((status) => status.value === statusValue).text;
}

export function consultationType(typeValue) {
  return CONSULTATION_TYPES.find((type) => type.value === typeValue).text;
}

export function medCertPurpose(purposeValue) {
  return MED_CERT_PURPOSES.find((purpose) => purpose.value === purposeValue)
    .text;
}

export function appointmentStatus(statusValue) {
  return APPOINTMENT_STATUS.find((status) => status.value === statusValue).text;
}
