/**
 * The CourseCard component is used to display a course card
 * @param {*} props 
 * @returns the card
 */
import React from 'react'
import { Draggable } from 'react-beautiful-dnd';


export default function CourseCard(props) {


    var borderColorByType = "border-black" ;

    if (props.course?.type == "obligatoire") {
      borderColorByType =  "border-red-500"
    } 
    if (props.course?.type == "choix") {
      borderColorByType = "border-violet-500";
    } 
    
    


    return (
      <Draggable draggableId={props.course.id} index={props.index}>
        {(provided) => (
          <div
            className={`${borderColorByType} p-2 rounded-md bg-white  text-center shadow-sm border-2 `}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <h3 className="text-center ">{props.course.name}</h3>
            <span className="uppercase">{props.course.id}</span>
            <span className="font-bold pl-2">
              {props.course.credits} {plurialiseCredit(props.course.credits)}
            </span>
          </div>
        )}
      </Draggable>
    );
}


function plurialiseCredit(credits) {
    if(!credits) {return ""}
    if (credits == 1) {
        return "credit";
    }
    else {
        return "credits";
    }
}