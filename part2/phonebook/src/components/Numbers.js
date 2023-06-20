
const Person = ({person, delHandler}) => (
    <li>
        {person.name} - {person.number}
        <button onClick={() => delHandler(person.id)}>
            Delete
        </button>
    </li>
)

const Numbers = ({ persons, delHandler }) => (
    <ul>
        {persons.map((person) => 
            <Person 
                key={person.id}
                person={person}
                delHandler={delHandler}
            />
        )}
    </ul>
)

export default Numbers

// {() => delHandler[index]}