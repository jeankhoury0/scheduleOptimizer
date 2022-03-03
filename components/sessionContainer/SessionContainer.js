import SemesterContainer from "../semesterContainer/SemesterContainer";
import semesterData from "../data/semesterData.json"
import CourseCard from "../courseCard/CourseCard";

export default function SessionContainer() {
       
  return (
    <>
      <div className="overflow-x-auto flex">
        {semesterData.semesters.map((semester, index) => {
          return (
            <SemesterContainer semester={semester} index={index} key={index}>
            </SemesterContainer>
          );
        })}
      </div>
    </>
  );
}
