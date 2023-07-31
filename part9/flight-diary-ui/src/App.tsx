import { useState, useEffect } from "react";
import diaryService from "./services/diaries"
import { Diary, DiaryFormValues } from "./types";
// import { Note } from "./types";
// import { getAllDiaries, createNote } from './noteService';


const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [newDate, setNewDate] = useState('');
  const [newWeather, setNewWeather] = useState('');
  const [newVisibility, setNewVisibility] = useState('');

  useEffect(() => {
    diaryService.getAll().then(data => {
      setDiaries(data)
    })
  }, [])

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()

    const newDiary: DiaryFormValues = {
      date: newDate,
      weather: newWeather,
      visibility: newVisibility
    }

    diaryService.addNew(newDiary).then(addedDiary => {
      setDiaries(diaries.concat(addedDiary))
    })

    setNewDate('')
    setNewWeather('')
    setNewVisibility('')
  };

  return (
    <div>
      <form onSubmit={diaryCreation}>
        <div>
          <input
            value={newDate}
            placeholder="Date"
            onChange={(event) => setNewDate(event.target.value)}
          />
        </div>
        <div>
          <input
            value={newWeather}
            placeholder="Weather"
            onChange={(event) => setNewWeather(event.target.value)}
          />
        </div>
        <div>
          <input
            value={newVisibility}
            placeholder="Visibility"
            onChange={(event) => setNewVisibility(event.target.value)}
          />
        </div>
        <button type='submit'>add</button>
      </form>
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