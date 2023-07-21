const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
const mongoose = require("mongoose");

const { v1: uuid } = require("uuid");

const Author = require("./models/author");
const Book = require("./models/book");
require("dotenv").config();

mongoose.set("strictQuery", false);

const MONGODB_URI = process.env.MONGODB_URI;
console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

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

  type Query {
    dummy: Int
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String = null, genre: String = null): [Book]!
    allAuthors: [Author]!
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
  }
`;

const resolvers = {
  Query: {
    dummy: () => 0,
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allAuthors: async (root, args) => await Author.find({}),
    allBooks: async (root, args) => {
      let books = await Book.find({}).populate("author", {
        name: 1,
        born: 1,
        id: 1,
      });

      if (args.author) {
        books = books.filter((b) => b.author.name === args.author);
      }
      if (args.genre) {
        books = books.filter((b) => b.genres.includes(args.genre));
      }

      return books;
    },
  },

  Mutation: {
    addAuthor: async (root, args) => {
      const author = new Author({ ...args });
      try {
        await author.save();
      } catch (error) {
        throw new GraphQLError("Saving Author failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }

      return author;
    },

    addBook: async (root, args) => {
      const author = await Author.findOne({ name: args.author });
      if (!author) {
        const newAuthor = new Author({
          name: args.author,
          bookCount: 1,
        });
        author = await newAuthor.save();
      }

      const book = new Book({ ...args, author: author });

      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError("Saving Book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }

      return book;
    },

    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name });
      if (!author) {
        return null;
      }
      author.born = args.setBornTo;
      try {
        await author.save();
      } catch (error) {
        throw new GraphQLError("Edit author failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }

      return author;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
