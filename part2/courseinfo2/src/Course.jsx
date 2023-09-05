
import Total from "./Total"


const CourseInfo = ({course}) => {
  return(
  <div>
    <h1>{course.name}</h1>
    <ul>
      {course.parts.map(part => <li key={part.id}>{part.name} {part.exercises}</li>) }
    </ul>
   <p>Total of exercises <Total course={course}></Total></p> 
  </div>
  )
}

const Courses = (props) => {
    const {courses} = props 
    return (
        <div>
            {courses.map(course => <CourseInfo key={course.id} course={course}/>)}
        </div>
    )
}

export default Courses