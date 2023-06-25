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

module.exports = {
  dummy, 
  totalLikes,
  favoriteBlog
}

