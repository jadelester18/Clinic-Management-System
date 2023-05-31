import React, { useEffect, useRef, useState } from "react";
import DoctorSearchFilter from "./DoctorSearchFilter";
import * as doctorSvc from "../../../../../../redux/PostApiCalls/doctor";
import { DAY_OF_WEEK_FORMAT } from "../../../../../../redux/default";
import DoctorsResultList from "./DoctorsResultList";

const MAX_RESULT_SIZE = 50;

const DoctorSearchStep = ({ selected, onSelect, date }) => {
  const [doctors, setDoctors] = useState(selected ? [selected] : []);
  const [query, setQuery] = useState({
    firstName: "",
    lastName: "",
    hmo: null,
    specialization: null,
    onlyScheduled: false,
  });

  const handleSelect = (value, origin) => {
    let newQuery;
    switch (origin) {
      case "specialization":
        newQuery = { ...query, specialization: value };
        break;
      case "hmo":
        newQuery = { ...query, hmo: value };
        break;
      case "onlyScheduled":
        newQuery = { ...query, onlyScheduled: value };
        break;
      default:
        throw new Error("Invalid input");
    }
    setQuery(newQuery);
    fetchDoctors(newQuery);
  };

  const debounce = useRef(null);

  const handleTextInput = (event) => {
    const { name, value } = event.target;
    const newQuery = { ...query, [name]: value };
    setQuery(newQuery);
    if (debounce.current) {
      clearTimeout(debounce.current);
    }
    debounce.current = setTimeout(() => fetchDoctors(newQuery), 400);
  };

  const fetchDoctors = async ({ firstName, lastName, hmo, specialization }) => {
    try {
      const { data: doctorsPage } = await doctorSvc.searchDoctors({
        firstName: firstName ? firstName : null,
        lastName: lastName ? lastName : null,
        hmoId: hmo ? hmo.id : null,
        specId: specialization ? specialization.id : null,
        days: [],
        pageNo: 0,
        pageSize: MAX_RESULT_SIZE,
      });
      console.log("Search Doctors Result", doctorsPage);
      setDoctors(sortDoctorsBySchedule(doctorsPage.content));
    } catch (error) {
      console.error(error);
    }
  };

  const sortDoctorsBySchedule = (doctors) => {
    // return negative (first in the order) if has schedule
    return doctors.sort((doctorA, doctorB) => {
      if (hasSchedule(doctorA) && !hasSchedule(doctorB)) {
        return -1;
      }
      if (!hasSchedule(doctorA) && hasSchedule(doctorB)) {
        return 1;
      }
      if (
        (hasSchedule(doctorA) && hasSchedule(doctorB)) ||
        (!hasSchedule(doctorA) && !hasSchedule(doctorB))
      ) {
        return 0;
      }
    });
  };

  const hasSchedule = (doctor) => {
    return doctor.schedules.some(
      (sched) => sched.day === date.format(DAY_OF_WEEK_FORMAT).toUpperCase()
    );
  };

  // useEffect(() => {
  //   if (selected) {
  //     setDoctors([selected]);
  //   }
  // }, [])

  return (
    <>
      <DoctorSearchFilter
        query={query}
        onSelect={handleSelect}
        onTextInput={handleTextInput}
      />
      <DoctorsResultList
        doctors={
          query.onlyScheduled
            ? doctors.filter((doctor) => hasSchedule(doctor))
            : doctors
        }
        date={date}
        selected={selected}
        onSelect={onSelect}
      />
    </>
  );
};

export default DoctorSearchStep;
