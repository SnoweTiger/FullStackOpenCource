import { useState } from "react";
// import { useQuery } from "@apollo/client";
import { useQuery, useSubscription } from "@apollo/client";
import { useApolloClient } from "@apollo/client";

import Select from "react-select";

import { ALL_BOOKS, BOOK_ADDED } from "../queries";
import BookTable from "./BookTable";

const Books = (props) => {
  const result = useQuery(ALL_BOOKS);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      console.log(data.data);
      const addedBook = data.data.bookAdded;
      console.log(addedBook);

      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(addedBook),
        };
      });
    },
  });

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
