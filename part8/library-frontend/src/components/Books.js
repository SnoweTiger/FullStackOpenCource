import { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

import Select from "react-select";

const BookTable = ({ books, genre }) => {
  let booksShow = books;

  if (genre !== "All") {
    booksShow = booksShow.filter((b) => b.genres.includes(genre));
  }

  return (
    <table>
      <tbody>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Published</th>
          <th>Genres</th>
        </tr>
        {booksShow.map((b) => (
          <tr key={b.id}>
            <td>{b.title}</td>
            <td>{b.author.name}</td>
            <td>{b.published}</td>
            <td>{b.genres.toString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Books = (props) => {
  const result = useQuery(ALL_BOOKS);
  const [selectedGenre, setSelectedGenre] = useState("All");

  if (!props.show) {
    return null;
  }

  const genreOptions = [
    { value: "All", label: "All" },
    { value: "Comedy", label: "Comedy" },
    { value: "Drama", label: "Drama" },
    { value: "Epic", label: "Epic" },
  ];

  const changeGenre = (selected) => {
    setSelectedGenre(selected.value);
  };

  return (
    <div>
      <h2>Books</h2>
      <Select
        options={genreOptions}
        value={selectedGenre}
        onChange={changeGenre}
      />
      <BookTable books={result.data.allBooks} genre={selectedGenre} />
    </div>
  );
};

export default Books;
