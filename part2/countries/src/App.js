import { useState, useEffect } from 'react'
import Search from "./component/Search";
import countriesService from './services/countries'
import Countries from './component/Countries';


const App = () => {
  const [searchString, setSearchString] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountries, setSelectedCountries] = useState([])


  const handlerSearchChange = (e) => {
    setSearchString(e.target.value)
  }

  const handlerShow = (name) => {
    setSearchString(name)
    // console.log(name)
  }

  useEffect(() => {
    countriesService
      .getAll()
      .then(initValue => {setCountries(initValue)})
  }, [])

  useEffect(() => {
    const searchStrLower = searchString.toLowerCase();
    const countriesToShow = searchString
      ? countries.filter(country => country.name.common.toLowerCase().includes(searchStrLower))
      : countries
    setSelectedCountries(countriesToShow)
  }, [countries, searchString])


  

  return (
    <div>
      <Search
        value={searchString}
        handler={handlerSearchChange}
      />
      <Countries 
        countries={selectedCountries}
        handlerShow={handlerShow}
      />
    </div>
  );
}

export default App;
