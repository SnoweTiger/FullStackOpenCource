import WeatherWidget from './Weather'


const CountriesList = ({countries, handlerShow}) => {

    return (
        <ul>
            {countries.map(country => 
                <li>
                    {country.name.common} 
                    <button onClick={() => handlerShow(country.name.common)}>Show details</button>
                </li>
            )}
        </ul>
    )
}

const CountryDetails = ({countries}) => {
    const country = countries[0]
    const languages = Object.values(country.languages)

    return (
        <div>
            <h3>{country.name.common}</h3>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>

            <p>Languages:</p>
            <ul>
                {languages.map(language => 
                    <li>
                        {language}
                    </li>
                )}
            </ul>
            <img 
                src={country.flags.png} 
                alt={country.flags.alt}
            ></img>
            <WeatherWidget
                lat={country.latlng[0]}
                lon={country.latlng[1]}
            />
        </div>
    )
}

const Countries = ({ countries, handlerShow }) => {
    if (countries.length > 10) {
        return (
            <div>
                <h3>Found countries:</h3>
                <p>Found over 10 countries.</p>
            </div>
        )
    } else if (!countries.length) {
        return (
            <div>
                <h3>Found countries:</h3>
                <p>Nothing found.</p>
            </div>
        )
    } else if (countries.length === 1) {
        return (
            <div>
                <h3>Found countries:</h3>
                <CountryDetails countries={countries}/>
            </div>
        )
    } else {
        return (
            <div>
                <h3>Found countries:</h3>
                <CountriesList countries={countries} handlerShow={handlerShow} />
            </div>
        )
    }
}

export default Countries