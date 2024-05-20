const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likes = blogs.map(blog => blog.likes).reduce((sum, likes) => sum + likes, 0)
    
    return blogs.length ? likes : 0
}



module.exports = {
    dummy,
    totalLikes
}