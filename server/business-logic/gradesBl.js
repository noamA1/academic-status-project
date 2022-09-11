const xlsx = require("xlsx");
const path = require("path");

let dataFile, firstRow, numOfKeys;
let allStudentsGradesAndInfo = [];

const parse = (fileName) => {
  const workbook = xlsx.readFile(path.join(__dirname, `../assets/${fileName}`));
  const workSheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(workSheet);
  return data;
};

const addStudentGrades = (row) => {
  let grades = [];
  let student = {
    studentID: row["__EMPTY"],
    lastName: row["__EMPTY_1"],
    firstName: row["__EMPTY_2"],
    average: row["__EMPTY_6"],
    firstYearAverage: row["__EMPTY_7"],
    numberOfTimeSatyYear: row["__EMPTY_8"] || "",
    changeDepartments: row["__EMPTY_9"] || "",
  };

  for (let index = 1; index < numOfKeys; index++) {
    if (
      dataFile[0][`__EMPTY_${index}`] !== "" &&
      dataFile[1][`__EMPTY_${index}`]
    ) {
      grades.push({
        code: dataFile[0][`__EMPTY_${index}`],
        name: dataFile[1][`__EMPTY_${index}`],
        grade: row[`__EMPTY_${index}`] || "טרם",
      });
    }
  }
  student = { ...student, grades };
  allStudentsGradesAndInfo.push(student);
};

exports.getGradesArray = (fileName) => {
  allStudentsGradesAndInfo = [];
  dataFile = parse(fileName);
  firstRow = parse(fileName)[1];
  numOfKeys = Object.keys(firstRow).length;

  dataFile.forEach((element) => {
    if (element["__EMPTY"] !== "" && element["__EMPTY"] !== "ת.ז") {
      addStudentGrades(element);
    }
  });
  return allStudentsGradesAndInfo;
};
