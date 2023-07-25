import { useState } from "react";
import { useQuery } from "@apollo/client";

import { ALL_BOOKS } from "../queries";
import BookTable from "./BookTable";

const Recommend = (props) => {
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
      <h2>Recommendation</h2>
      <p>Your favorite genre {}</p>
      <BookTable books={result.data.allBooks} genre={selectedGenre} />
    </div>
  );
};

export default Recommend;
