//@ts-nocheck
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogPosts) => {
    if (blogPosts.length == 0) return 0

    if (blogPosts.length === 1) return blogPosts[0].likes

    if (blogPosts.length > 1) {
        const sumLikes = blogPosts.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.likes
        }, 0)
        return sumLikes
    }
}

// const favoriteBlog = (blogPosts) => {
//     const likesArray = blogPosts.map(blog => blog.likes)
//     const highestLikes = Math.max(...likesArray)
//     const highestLikesIndex = likesArray.indexOf(highestLikes)
//     return blogPosts[highestLikesIndex]
// }

const favoriteBlog = (blogPosts) => {
    return blogPosts.reduce((maxLikesBlog, currentBlog) => {
        return currentBlog.likes > maxLikesBlog.likes ? currentBlog : maxLikesBlog
    })
}

const mostBlogs = (blogArray) => {
    let n = 0
    let authorArray = []
    while (blogArray[n]) {
        let authorIndex = authorArray.findIndex(authorObject => authorObject.author == blogArray[n].author)
        if (authorIndex >= 0) {//if the author exists
            authorArray[authorIndex].blogs++
        }
        else {// otherwise we add the authorObject to authorArray
            const authorObject = {
                author: blogArray[n].author,
                blogs: 1
            }
            authorArray.push(authorObject)
        }
        n++
    }
    return authorArray.reduce((maxAuthor, currentAuthor) => {
        return currentAuthor.blogs > maxAuthor.blogs ? currentAuthor : maxAuthor
    })
}

const mostLikes = (blogArray) => {
    let n = 0
    let authorArray = []
    while (blogArray[n]) {
        let authorIndex = authorArray.findIndex(authorObject => authorObject.author == blogArray[n].author)
        if (authorIndex >= 0) {//if the author exists
            authorArray[authorIndex].likes += blogArray[n].likes
        }
        else {// otherwise we add the authorObject to authorArray
            const authorObject = {
                author: blogArray[n].author,
                likes: blogArray[n].likes
            }
            authorArray.push(authorObject)
        }
        n++
    }
    return authorArray.reduce((maxAuthor, currentAuthor) => {
        return currentAuthor.likes > maxAuthor.likes ? currentAuthor : maxAuthor
    })
}


module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}