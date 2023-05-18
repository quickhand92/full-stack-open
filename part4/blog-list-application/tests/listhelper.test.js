//@ts-nocheck
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    const listWithBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 8,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 13,
            __v: 0
        }
    ]

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('when list has multiple blogs, equals likes of all blogs', () => {
        const result = listHelper.totalLikes(listWithBlogs)
        expect(result).toBe(26)
    })

})

describe('blog with most likes', () => {
    const blogs = [
        {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        },
        {
            title: "Canonical string ",
            author: "Dijkstra",
            likes: 17
        },
        {
            title: "Canonical",
            author: "Edsger W.",
            likes: 19
        }
    ]

    test('find blog with most likes in array', () => {
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual(blogs[2])
    })
})

describe('author with most blogs', () => {
    const blogs = [
        { title: "Clean Code", author: "Robert C. Martin" },
        { title: "Code Complete", author: "Steve McConnell" },
        { title: "Refactoring", author: "Martin Fowler" },
        { title: "Clean Architecture", author: "Robert C. Martin" },
        { title: "The Pragmatic Programmer", author: "Andrew Hunt" },
        { title: "Design Patterns", author: "Erich Gamma" },
        { title: "Clean Code", author: "Robert C. Martin" },
        { title: "Clean Architecture", author: "Robert C. Martin" },
        { title: "Refactoring", author: "Martin Fowler" }
    ]

    test('find author with most blogs in array', () => {
        const result = listHelper.mostBlogs(blogs)
        expect(result).toEqual({ author: "Robert C. Martin", blogs: 4 })
    })
})

describe('author with most likes', () => {
    const blogs = [
        { title: "Clean Code", author: "Robert C. Martin", likes: 64 },
        { title: "Code Complete", author: "Steve McConnell", likes: 31 },
        { title: "Refactoring", author: "Martin Fowler", likes: 87 },
        { title: "Clean Architecture", author: "Robert C. Martin", likes: 12 },
        { title: "The Pragmatic Programmer", author: "Andrew Hunt", likes: 52 },
        { title: "Design Patterns", author: "Erich Gamma", likes: 95 },
        { title: "Clean Code", author: "Robert C. Martin", likes: 73 },
        { title: "Clean Architecture", author: "Robert C. Martin", likes: 44 },
        { title: "Refactoring", author: "Martin Fowler", likes: 6 }
    ]

    test('find author with most likes in array', () => {
        const result = listHelper.mostLikes(blogs)
        expect(result).toEqual({ author: "Robert C. Martin", likes: 193 })
    })
})