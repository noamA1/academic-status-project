import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import curriculumService from "../../services/curriculumService.js";
import eveningCurriculumService from "../../services/eveningCurriculumService.js";
import gradesService from "../../services/gradesService.js";

import Flow from "../UI/Flow/Flow.js";
import Upload from "../Upload/Upload.js";
import Dropzone from "../Upload/Dropzone/Dropzone.js";
import Select from "../UI/Select/Select.js";
import Card from "../UI/Card/Card.js";

import css from "./Grades.module.css";

const Grades = (props) => {
  const fileCurriculumName = useSelector((state) => state.curriculum.fileName);
  const isUploaded = useSelector((state) => state.curriculum.isUploaded);
  const fileGradesName = useSelector((state) => state.grades.gradesFile);
  const program = useSelector((state) => state.curriculum.selectedProgram);
  const [curriculumArray, setCurriculumArray] = useState();
  const [curriculumWithGradesArray, setCurriculumWithGradesArray] =
    useState(null);
  const [edges, setEdges] = useState();

  const [studentsArray, setStudentsArray] = useState([]);
  const [student, setStudent] = useState("");
  const [courseInfo, setCourseInfo] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const getGradesData = async () => {
    let tempGrades;
    tempGrades = await gradesService.getGrades(fileGradesName);
    setStudentsArray(tempGrades);
  };

  const getCurriculumData = async () => {
    let tempCurriculum;
    if (program === "בוקר") {
      tempCurriculum = await curriculumService.getCurriculum(
        fileCurriculumName
      );
    } else {
      tempCurriculum = await eveningCurriculumService.getEveningCurriculum(
        fileCurriculumName
      );
    }
    const tempEdges = await curriculumService.setEdges(tempCurriculum);
    setEdges(tempEdges);
    setCurriculumArray(tempCurriculum);
  };

  const getStudentGardes = (studentId) => {
    const currentStudent = studentsArray.find(
      (student) => student.studentID === studentId
    );
    if (currentStudent !== undefined) {
      const tempCurriculumWithGrades = gradesService.setGradeClasses(
        curriculumArray,
        currentStudent.grades
      );
      setCurriculumWithGradesArray(tempCurriculumWithGrades);
    }
  };

  const selectCourseHandler = (course) => {
    setCourseInfo(course);
    setIsOpen(true);
  };

  const closeCardHandler = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (fileGradesName && fileCurriculumName) {
      getCurriculumData();
      getGradesData();
    }
  }, [fileGradesName, fileCurriculumName]);

  const handleChange = (event) => {
    setStudent(event.target.value);
  };

  useEffect(() => {
    getStudentGardes(student);
  }, [student]);

  return (
    <>
      {((!curriculumArray && !isUploaded) || !fileGradesName) && (
        <div className={css.container}>
          {!isUploaded ? (
            <header className={css.header}>העלאת קובץ תוכנית לימודים</header>
          ) : (
            <div className={css.header_container}>
              <header className={[css.header]}>העלאת קובץ ציונים</header>
            </div>
          )}
          {!curriculumArray && !isUploaded && <Upload />}
          {!fileGradesName && isUploaded && <Dropzone />}
        </div>
      )}

      {fileGradesName && (
        <>
          <div className={css.select_container}>
            <Select
              text='בחר/י סטודנט/ית'
              type='students'
              options={[null, ...studentsArray]}
              onChange={handleChange}
            />
          </div>
          {courseInfo && isOpen && (
            <Card courseInfo={courseInfo} onClose={closeCardHandler} />
          )}
          {curriculumWithGradesArray && (
            <Flow
              flowEdges={edges}
              flowNodes={curriculumWithGradesArray}
              onSelectCourse={selectCourseHandler}
            />
          )}
        </>
      )}
    </>
  );
};

export default Grades;
