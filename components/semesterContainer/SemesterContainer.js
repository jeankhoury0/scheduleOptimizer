import { Droppable } from "react-beautiful-dnd";
import CourseCard from "../courseCard/CourseCard";
import styled from "styled-components";
import { useState } from "react";



export default function SemesterContainer(props){

  var credit = 0;
  const [creditAmount, updateCreditAmount] = useState(credit)

  
  function addToCredit(number){
    credit = parseInt(credit) + parseInt(number);
    updateCreditAmount(credit);
  }
  function getCreditAmount() {return creditAmount}
  
  function getCreditText(nbOfCredit){
    if(nbOfCredit == 0) return 
    if (nbOfCredit > 15){
      return <p className="text-red-400 font-bold"> {nbOfCredit} Credits</p>;
    }
    return <p> {nbOfCredit} Credits</p>;
  }

    
    return (
      <div className="flex-none w-[250px] bg-slate-500 mx-[1px]">
        <h2 className=" text-white text-center font-bold p-1">
          {props.semester.name}
        </h2>

        <Droppable droppableId={props.semester.id} index={0}>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="p-1 grid gap-1 h-[90%] auto-rows-max bg-slate-300 ml-3 overflow-y-scroll"
            >
              {props.courses?.map((course, index) => {
                addToCredit(course.credits);
                return (
                  <CourseCard
                    course={course}
                    index={index}
                    key={course.id}
                  ></CourseCard>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <div className="text-center h-5 text-white text-xl">
          <hr />
          {getCreditText(props.creditCounter)}
        </div>
      </div>
    );
}
