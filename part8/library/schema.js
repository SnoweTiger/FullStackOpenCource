const typeDefs = `

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String]
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String
    id: ID!
  }

  type Token {
    value: String!
  }

  type Subscription {
    bookAdded: Book!
  }

  type Query {
    dummy: Int
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String = null, genre: String = null): [Book]!
    allAuthors: [Author]!
    me: User!
  }

  type Mutation {

    addAuthor(
      name: String!,
      born: Int
    ) : Author

    addBook(
      title: String!,
      author: String!,
      published: Int!,
      genres: [String]
    ) : Book

    editAuthor(
      name: String!, 
      setBornTo: Int!
    ) : Author

    createUser(
      username: String!
      favoriteGenre: String
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }

    
`;
module.exports = typeDefs;
