import { useState, useEffect } from "react";
import diaryService from "./services/diaries"
import { Diary, DiaryFormValues } from "./types";
// import { Note } from "./types";
// import { getAllDiaries, createNote } from './noteService';


const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [newDate, setNewDate] = useState('');
  const [newWeather, setNewWeather] = useState('sunny');
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


    diaryService.addNew(newDiary).then((addedDiary) => {
      setDiaries(diaries.concat(addedDiary))
    })
    // .catch((e) => console.log(e.response))

    setNewDate('')
    setNewWeather('sunny')
    setNewVisibility('good')
  };

  function switchWeather(event: React.SyntheticEvent) {
    const target = event.target as HTMLInputElement;
    setNewWeather(target.value);
  }

  function switchVisibility(event: React.SyntheticEvent) {
    const target = event.target as HTMLInputElement;
    setNewVisibility(target.value);
  }

  return (
    <div>
      <form onSubmit={diaryCreation}>
        <h4 style={{ color: 'red' }}>Notification</h4>
        <div>
          <input
            type="date"
            value={newDate}
            placeholder="Date"
            onChange={(event) => setNewDate(event.target.value)}
          />
        </div>
        <fieldset>
          <legend>Weather:</legend>
          <div>
            <input
              type="radio" name="weather"
              value="sunny"
              checked={newWeather === 'sunny' ? true : false}
              onChange={switchWeather}
            />
            <label>sunny</label>
            <input
              type="radio" name="weather"
              value="rainy"
              checked={newWeather === 'rainy' ? true : false}
              onChange={switchWeather}
            />
            <label>rainy</label>
            <input
              type="radio" name="weather"
              value="windy"
              checked={newWeather === 'windy' ? true : false}
              onChange={switchWeather}
            />
            <label>windy</label>
            <input
              type="radio" name="weather"
              value="cloudy"
              checked={newWeather === 'cloudy' ? true : false}
              onChange={switchWeather}
            />
            <label>cloudy</label>
          </div>
        </fieldset>

        <fieldset>
          <legend>Visibility:</legend>
          <div>
            <input
              type="radio" name="visibility"
              value="good"
              checked={newVisibility === 'good' ? true : false}
              onChange={switchVisibility}
            />
            <label>good</label>
            <input
              type="radio" name="visibility"
              value="poor"
              checked={newVisibility === 'poor' ? true : false}
              onChange={switchVisibility}
            />
            <label>poor</label>
          </div>
        </fieldset>
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