import { DragDropContext } from "react-beautiful-dnd";
import initialData from "../data/initial-data";
import SemesterContainer from "../semesterContainer/SemesterContainer";
import { useState  } from "react";
import moment, { now } from "moment";
import StateSelectionModal from "../modal/StateSelectionModal";

export default function KanbanBoard(){
    const [state, updateState] = useState(initialData);
    

    function isTheCourseGivenInASemester(courseID, destination) {
      const semesterGiven = state.courses[courseID].semester;
      const desiredSemester = destination.droppableId[0];
      var match = false;
      semesterGiven.map((s) => {
        if (s[0] === desiredSemester) {
          console.info("Course is available")
          match = true
          return
        }
      })

      if (match == true )return true

      console.error("This course is not available for the given semester")
      return false

    }

    function onDragEnd(result){
        console.log(state)
        const { destination, source, draggableId } = result;

        if (!destination) return console.log("No Destination");
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) return console.log("Nothing changed");

        const startCol = state.columns[source.droppableId];
        const finishCol = state.columns[destination.droppableId];
        
        if (startCol === finishCol){
            const newCourseIds = Array.from(startCol.courseIds);
            newCourseIds.splice(source.index, 1);
            newCourseIds.splice(destination.index, 0, draggableId);
            const newColumn = {
              ...startCol,
              courseIds: newCourseIds,
            };

            const newState = {
              ...state,
              columns: {
                ...state.columns,
                [newColumn.id]: newColumn,
              },
            };
            updateState(newState);
            return;
        }

        if (!isTheCourseGivenInASemester(draggableId, destination)) return; 
        // one col to the other
        const startCourseIds = Array.from(startCol.courseIds);
        startCourseIds.splice(source.index,1)
        const newStartCol = {
          ...startCol,
          courseIds: startCourseIds,
        };

        const finishCourseIds = Array.from(finishCol.courseIds);
        console.log(finishCourseIds);
        finishCourseIds.splice(destination.index, 0, draggableId);
        const newFinishCol = {
          ...finishCol,
          courseIds: finishCourseIds,
        };
   
        const newState = {
            ...state, 
            columns:{
                ...state.columns,
                [newStartCol.id]: newStartCol,
                [newFinishCol.id]: newFinishCol,
            }
        }
        updateState(newState);
    }
    
    function resetAction(){
        updateState(initialData);
    }

    function saveAction(){
        // Save the file to JSON for future use
        let tobesavedjson = JSON.stringify(state)
        let dataUri = "data:application/json;charset=utf-8,"+ encodeURIComponent(tobesavedjson);
        let exportFileName = "diroCourseParser" + moment().format() + ".json"
        let linkElement = document.createElement("a");
        linkElement.setAttribute("href", dataUri);
        linkElement.setAttribute("download", exportFileName);
        linkElement.click();
    }
    
    function uploadAction(){
        var input = document.createElement('input')
        input.setAttribute("type", "file")
        input.click()
        
        input.onchange = function (e) {
            input.files[0]
              .text()
              .then((data) => updateState(JSON.parse(data)))
              
        };

    }

    const stateModalClassHidden = "hidden"
    const [stateModal, updateStateModal] = useState(stateModalClassHidden);
    function showStateModal(){
      
    }
      
    

    return (
      <div className="flex">
        <StateSelectionModal></StateSelectionModal>
        <div className="m-3 text-white text-center font-semibold">
          <button
            className="w-[4em] h-[3em] bg-green-500 hover:bg-green-600 my-1 "
            onClick={saveAction}
          >
            Save
          </button>
          <button
            onClick={resetAction}
            className="w-[4em] h-[3em] bg-red-500 my-1 hover:bg-red-600"
          >
            Reset
          </button>
          <button
            className="w-[4em] h-[3em] bg-green-500 hover:bg-green-600 my-1 "
            onClick={uploadAction}
          >
            Upload
          </button>

          <button
            id="modalPreselect"
            onClick={showStateModal}
            className="w-[4em] h-[3em] bg-red-500 my-1 hover:bg-red-600"
          >
            Preset
          </button>
          <a href="#">
            <button className="w-[4em] h-[3em] bg-violet-400 my-1">Git</button>
          </a>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          {state.columnsOrder.map((columnId) => {
            const column = state.columns[columnId];
            var creditCounter = 0;
            const courses = column.courseIds?.map(
              (courseId) => {
                creditCounter+= parseInt(state.courses[courseId].credits)
                return state.courses[courseId]}
            );
            return (
              <SemesterContainer
                semester={column}
                creditCounter={creditCounter}
                key={column.id}
                index={column.id}
                courses={courses}
              />
            );
          })}
        </DragDropContext>
      </div>
    );
}