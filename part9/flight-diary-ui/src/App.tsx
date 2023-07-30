import { useState, useEffect } from "react";
import diaryService from "./services/diaries"
import { Diary } from "./types";
// import { Note } from "./types";
// import { getAllDiaries, createNote } from './noteService';


const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  // const [newDiary, setNewDiary] = useState('');

  useEffect(() => {
    diaryService.getAll().then(data => {
      setDiaries(data)
    })
  }, [])

  // const noteCreation = (event: React.SyntheticEvent) => {
  //   event.preventDefault()
  //   createNote({ content: newNote }).then(data => {
  //     setNotes(notes.concat(data))
  //   })

  //   setNewNote('')
  // };

  return (
    <div>
      {/* <form onSubmit={noteCreation}>
        <input
          value={newNote}
          onChange={(event) => setNewNote(event.target.value)}
        />
        <button type='submit'>add</button>
      </form> */}
      <h3>Diaries:</h3>
      <ul>
        {diaries.map(diary =>
          <li key={diary.id}>
          {diary.date} - {diary.weather} - {diary.visibility}
          </li>)}
      </ul>
    </div>
  )
}

export default App;