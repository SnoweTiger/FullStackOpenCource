import { useDispatch } from "react-redux"
import { filterChange } from "../reducers/filterReducer"


const Filter = () => {
    const dispatch = useDispatch()

    const handleChange = (event) => {
        const filter_str = event.target.value
        dispatch(filterChange(filter_str))
    }

    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

export default Filter