const getGrades = async (fileName) => {
  let data = [];
  const response = await fetch(`http://localhost:9001/api/grades/${fileName}`);
  data = await response.json();

  return data;
};

const setGradeClasses = (nodes, studentGrades) => {
  const temp = nodes.map((node) => {
    const course = studentGrades.find(
      (grade) => node.data.code === grade.code || node.data.name === grade.name
    );

    if (course && course.grade !== "טרם") {
      if (course.grade < 55) {
        return {
          ...node,
          style: { backgroundColor: "#f03e3e", color: "#fff" },
        };
      } else {
        return {
          ...node,
          style: { backgroundColor: "#40c057", color: "#fff" },
        };
      }
    } else {
      return { ...node };
    }
  });
  return temp;
};

export default {
  getGrades,
  setGradeClasses,
};
