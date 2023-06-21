
const Search = ({ value, handler}) => {

    return (
        <div>
            Find countries:
            <input 
                value={value}
                onChange={handler}
            />
        </div>
    )
}

export default Search