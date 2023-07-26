const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const { PubSub } = require("graphql-subscriptions");

const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

const pubsub = new PubSub();

const resolvers = {
  Query: {
    dummy: () => 0,
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allAuthors: async (root, args) => {
      return await Author.find({}).populate("books");
    },
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
    me: async (root, args, context) => {
      console.log(context.currentUser);
      return context.currentUser;
    },
  },

  Mutation: {
    addAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError("wrong credentials", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

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

    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError("wrong credentials", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      const author = await Author.findOne({ name: args.author });
      if (!author) {
        const newAuthor = new Author({
          name: args.author,
          bookCount: 1,
        });
        author = await newAuthor.save();
      }

      // const book = new Book({ ...args, author: author });
      const book = new Book({ ...args });
      book.author = author;

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

      pubsub.publish("BOOK_ADDED", { bookAdded: book });

      return book;
    },

    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError("wrong credentials", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

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

    createUser: async (root, args) => {
      const user = new User({ ...args });

      return user.save().catch((error) => {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      });
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },

  Author: {
    bookCount: async (root) => {
      if (root.books) {
        return root.books.lenght;
      } else {
        return 0;
      }
    },
  },
};
module.exports = resolvers;
