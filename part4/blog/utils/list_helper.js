const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
  let totalLikes = 0
  blogs.forEach(element => {
    // console.log(element.likes)
    totalLikes += element.likes
  });
  return totalLikes
}
  
const favoriteBlog = (blogs) => {
  if (blogs.length > 0) {
    let topBlog = blogs.reduce((top, blog) => top.likes > blog.likes ? top : blog);
    return {
      title: topBlog.title,
      author: topBlog.author,
      likes: topBlog.likes
    }
  } else {
    return null
  }
}

const mostBlogs = (blogs) => {

  if (blogs.length === 0) {
    return null
  }

  const authorsBlogs = blogs.reduce((authors, {author, likes}) => {
    authors[author] = authors[author] || 0
    authors[author] += 1
    return authors
  }, {})

  const mostBlogs = Math.max(...Object.values(authorsBlogs))
  const mostAuthor = Object.keys(authorsBlogs).find(key => authorsBlogs[key] === mostBlogs);


  return {
    author: mostAuthor,
    blogs: mostBlogs
  }
}

const mostLikes = (blogs) => {

  if (blogs.length === 0) {
    return null
  }

  const authorsLikes = blogs.reduce((authors, {author, likes}) => {
    authors[author] = authors[author] || 0
    authors[author] += likes
    return authors
  }, {})

  const mostLikes = Math.max(...Object.values(authorsLikes))
  const mostAuthor = Object.keys(authorsLikes).find(key => authorsLikes[key] === mostLikes);


  return {
    author: mostAuthor,
    likes: mostLikes
  }
}



module.exports = {
  dummy, 
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}

