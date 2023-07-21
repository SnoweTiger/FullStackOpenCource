import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ALL_AUTHORS, UPDATE_AUTHOR } from "../queries";
import Select from "react-select";

const NewAuthorForm = ({ authors }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [born, setBorn] = useState("");
  const [updatedAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const authorOptions = authors.map((a) => ({ value: a.name, label: a.name }));

  const submit = async (event) => {
    event.preventDefault();

    updatedAuthor({ variables: { name: selectedOption.value, born: born } });

    setBorn("");
    setSelectedOption(null);
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          Name
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={authorOptions}
          />
        </div>
        <div>
          Born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type="submit">Update author</button>
      </form>
    </div>
  );
};

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Born</th>
            <th>Books</th>
          </tr>
          {result.data.allAuthors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {props.token ? <NewAuthorForm authors={result.data.allAuthors} /> : null}
    </div>
  );
};

export default Authors;
