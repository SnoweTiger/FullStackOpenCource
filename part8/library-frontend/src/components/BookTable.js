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

export default BookTable;
