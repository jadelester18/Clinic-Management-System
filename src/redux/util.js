import dayjs from "dayjs";
import { DISPLAY_DATE_FORMAT } from "./default";

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

function formatTime(timeString) {
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
    return `${street}, Brgy. ${barangay}, ${city}, ${province}, ${country}, ${postalCode}`;
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
