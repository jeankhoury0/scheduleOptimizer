import { DragDropContext, Droppable } from "react-beautiful-dnd";
import CourseCard from "../courseCard/CourseCard";
import courseData from "../data/courseData.json";
import { useState } from "react";

export default function CourseContainer() {

  const [courses, updateCourses] = useState(courseData.courses);

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    console.log(result)
    const items = Array.from(courses);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem)
    updateCourses(items);
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="courseList">
        {(provided, snapshot) => (
          
          <ul
            className="grid gap-3"
            {...provided.droppableProps}
            snapshot={snapshot}
            ref={provided.innerRef}
          >
            {courses.map((course, index) => {
              return (
                <CourseCard
                  course={course}
                  index={index}
                  key={index}
                ></CourseCard>
              );
            })}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}
