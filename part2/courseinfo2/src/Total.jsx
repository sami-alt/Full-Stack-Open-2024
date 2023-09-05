const Total = (props) => {
    const {course} = props
    const total = course.parts.reduce((a, b) => a + b.exercises, 0)
    return total
}

export default Total