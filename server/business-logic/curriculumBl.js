const xlsx = require("xlsx");
const path = require("path");

let coursesArray = [];
let courseObj = {};

const it = [30049, 31021, 31010, 31007, 31023, 31027, 31024, 31025, 31026];
const programing = [30015, 30047, 30077, 30030];
const general = [
  30020, 96022, 30011, 30023, 30009, 30095, 30090, 30093, 30017, 30096, 30097,
  30057, 30098, 30051, 30036, 30037, 30099, 30064, 30100, 30101, 30102, 30088,
  30535, 30103, 30087, 92085,
];
const math = [96039, 30105, 96004, 30106, 30010, 30075, 30094, 30001, 30067];
const operation = [
  32032, 32033, 32038, 32035, 32037, 32041, 32028, 32040, 32039, 32042, 32043,
];
const physics = [30041, 30042, 96038, 96012];

const parse = (fileName) => {
  const workbook = xlsx.readFile(path.join(__dirname, `../assets/${fileName}`));
  const workSheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(workSheet);
  return data;
};

const createCourse = (obj, isOnlyPreCourse) => {
  if (!isOnlyPreCourse) {
    courseObj = {
      ...courseObj,
      code: obj["פרטי הקורס"],
      name: obj["__EMPTY"],
      lectureHours: obj["__EMPTY_2"] || 0,
      practiceHours: obj["__EMPTY_3"] || 0,
      laboratoryHours: obj["__EMPTY_4"] || 0,
      credits: obj["__EMPTY_5"],

      preCourses:
        obj["דרישות קדם"] !== undefined
          ? [
              {
                code: obj["דרישות קדם"],
                name: obj["__EMPTY_6"],
              },
            ]
          : [],
    };
    courseObj = { ...courseObj, department: setCourseDepartment(courseObj) };
    coursesArray.push(courseObj);
  } else {
    const courseIndex = coursesArray.findIndex(
      (course) => course.code === courseObj.code
    );
    coursesArray[courseIndex].preCourses.push({
      code: obj["דרישות קדם"],
      name: obj["__EMPTY_6"],
    });
  }
  if (courseObj.preCourses !== undefined) {
    setHasChilds(courseObj.preCourses);
  }
};

const setCourseDepartment = (obj) => {
  const code = obj.code;
  if (it.includes(code)) {
    return "it";
  } else if (math.includes(code)) {
    return "math";
  } else if (operation.includes(code)) {
    return "operation";
  } else if (physics.includes(code)) {
    return "physics";
  } else if (general.includes(code)) {
    return "general";
  } else if (programing.includes(code)) {
    return "programing";
  }
};

const setHasPerents = () => {
  for (let i = 0; i < coursesArray.length; i++) {
    if (coursesArray[i].preCourses.length > 0) {
      coursesArray[i] = {
        ...coursesArray[i],
        hasPerents: true,
      };
    }
  }
};

const setHasChilds = (preCourses) => {
  preCourses.forEach((preCourse) => {
    for (let i = 0; i < coursesArray.length; i++) {
      if (preCourse.code === coursesArray[i].code) {
        coursesArray[i] = {
          ...coursesArray[i],
          hasChilds: true,
        };
      }
    }
  });
};

exports.getCurriculum = (fileName) => {
  const parseResult = parse(fileName);
  coursesArray = [];
  parseResult.forEach((element) => {
    if (element["פרטי הקורס"] !== undefined) {
      if (typeof element["פרטי הקורס"] === "string") {
        if (element["פרטי הקורס"].includes("שנה")) {
          courseObj = {
            year: element["פרטי הקורס"],
          };
        } else if (element["פרטי הקורס"].includes("סמסטר")) {
          courseObj = {
            ...courseObj,
            semester: element["פרטי הקורס"],
          };
        }
      } else {
        if (
          typeof element["פרטי הקורס"] === "number" &&
          !element["__EMPTY"].includes("סמינר")
        ) {
          createCourse(element, false);
        }
      }
    } else if (
      element["פרטי הקורס"] === undefined &&
      typeof element["דרישות קדם"] === "number"
    ) {
      createCourse(element, true);
    }
  });
  setHasPerents();
  return coursesArray;
};
