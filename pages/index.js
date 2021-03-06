import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { DragDropContext } from 'react-beautiful-dnd';
import KanbanBoard from '../components/kanbanBoard/KanbanBoard'

export default function Home() {
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen flex overflow-y-hidden">
          <KanbanBoard></KanbanBoard>
        {/* <DragDropContext onDragEnd={console.log("hello")}>
          <div className="flex flex-row gap-2">
            <div className="w-1/6">
              <h1> Planificateur de parcours</h1>
              <CourseContainer />
            </div>
            <div className="w-5/6">
              <SessionContainer />
            </div>
          </div>
        </DragDropContext> */}
      </main>
    </div>
  );
}
