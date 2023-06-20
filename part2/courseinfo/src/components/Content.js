const Content = ({data}) => (
    <div>
        <ul>
            {data.map((part) => 
                <Part part={part} key={part.id}/>
            )}
        </ul>
    </div>
) 

const Part = ({part}) => {
    return(
        <li>
            {part.name} {part.exercises}
        </li>
    )
}

export default Content