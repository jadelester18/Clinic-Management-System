import { http } from "./http";

export function getAllPrograms() {
  return http.get("/programs");
}

export function findProgramByCode(programCode) {
  return http.get(`/programs/searchByCode/${programCode}`);
}

export function searchPrograms(searchProgramsDto) {
  return http.post(`/programs/search`, searchProgramsDto);
}

export function findProgramById(programId) {
  return http.get(`/programs/${programId}`);
}

export function searchProgramsBySubject(
  subjectId,
  page,
  rowsPerPage,
  column,
  order
) {
  return http.get(
    `/programs/searchBySubject/${subjectId}/page/${page}/${rowsPerPage}/sort/${column}/${order}`
  );
}

export function verifyIfProgramExists(programCode) {
  return http.get(`/programs/verifyIfExists/${programCode}`);
}

export function addProgram(createProgramDto) {
  return http.post(`/programs`, createProgramDto);
}

export function updateProgram(updateProgramDto) {
  return http.put(`/programs`, updateProgramDto);
}

export function activateProgram(programId) {
  return http.put(`/programs/${programId}/activate`);
}

export function deactivateProgram(programId) {
  return http.put(`/programs/${programId}/deactivate`);
}

export const TEST_PROGRAMS = [
  {
    id: 1,
    code: "BSCS",
    title: "Bachelor of Science in Computer Science",
    major: "Computer Science",
    description:
      "This degree program provides students with a solid foundation in computer programming, data structures, algorithms, and software engineering.",
    department: "Computer Science",
    duration: 5,
    noOfStudents: 200,
  },
  {
    id: 2,
    code: "BSIT",
    title: "Bachelor of Science in Information Technology",
    major: "Information Technology",
    description:
      "This degree program focuses on the practical aspects of computing and information technology, including database management, network administration, and web development.",
    department: "Information Technology",
    duration: 4,
    noOfStudents: 150,
  },
  {
    id: 3,
    code: "BBA",
    title: "Bachelor of Business Administration",
    major: "Business Administration",
    description:
      "This degree program prepares students for leadership roles in the business world, teaching them the fundamentals of management, accounting, marketing, and finance.",
    department: "Business",
    noOfStudents: 300,
    duration: 5,
  },
  {
    id: 4,
    code: "BAE",
    title: "Bachelor of Arts in Education",
    major: "Education",
    description:
      "This degree program is designed for students who want to pursue a career in teaching, providing them with the knowledge and skills they need to succeed in the classroom.",
    department: "Education",
    noOfStudents: 100,
    duration: 5,
  },
  {
    id: 5,
    code: "BSCHE",
    title: "Bachelor of Science in Chemical Engineering",
    major: "Chemical Engineering",
    description:
      "This degree program combines the principles of chemistry, physics, and engineering to design and develop chemical processes and products.",
    department: "Chemical Engineering",
    noOfStudents: 50,
    duration: 5,
  },
  {
    id: 6,
    code: "BSME",
    title: "Bachelor of Science in Mechanical Engineering",
    major: "Mechanical Engineering",
    description:
      "This degree program focuses on the design, development, and manufacturing of mechanical systems, including machines, engines, and devices.",
    department: "Mechanical Engineering",
    noOfStudents: 75,
    duration: 5,
  },
  {
    id: 7,
    code: "BSCE",
    title: "Bachelor of Science in Civil Engineering",
    major: "Civil Engineering",
    description:
      "This degree program prepares students to design and build the infrastructure that supports modern society, including buildings, bridges, roads, and water systems.",
    department: "Civil Engineering",
    noOfStudents: 80,
    duration: 5,
  },
  {
    id: 8,
    code: "BARCH",
    title: "Bachelor of Architecture",
    major: "Architecture",
    description:
      "This degree program teaches students the principles of design, construction, and sustainability, preparing them for careers in architecture and related fields.",
    department: "Architecture",
    noOfStudents: 60,
    duration: 4,
  },
  {
    id: 9,
    code: "BFA",
    title: "Bachelor of Fine Arts",
    major: "Fine Arts",
    description:
      "This degree program focuses on the creative arts, including painting, sculpture, graphic design, and multimedia production.",
    department: "Fine Arts",
    noOfStudents: 40,
    duration: 4,
  },
  {
    id: 10,
    code: "BBA100",
    title: "Bachelor of Business Administration",
    major: "Marketing",
    description:
      "Learn how to create effective marketing campaigns and build brand awareness.",
    department: "Business",
    noOfStudents: 300,
    duration: 4,
  },
  {
    id: 11,
    code: "BS100",
    title: "Bachelor of Science",
    major: "Computer Science",
    description:
      "Gain skills in programming, software development, and computer systems analysis.",
    department: "Computer Science",
    noOfStudents: 250,
    duration: 5,
  },
  {
    id: 12,
    code: "BA100",
    title: "Bachelor of Arts",
    major: "English",
    description:
      "Study the literary works of diverse cultures and explore different perspectives.",
    department: "Humanities",
    noOfStudents: 200,
    duration: 4,
  },
  {
    id: 13,
    code: "BENG100",
    title: "Bachelor of Engineering",
    major: "Mechanical Engineering",
    description:
      "Learn how to design and develop mechanical systems and machines.",
    department: "Engineering",
    noOfStudents: 150,
    duration: 5,
  },
];

export const TEST_DEPTS = Array.from(
  new Set(TEST_PROGRAMS.map((program) => program.department))
);
