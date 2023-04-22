import React from "react"

const Courses = ({courses}) => 
  courses.map(course => <Course key={course.id} course={course} />)

const Course = ({course}) => {
  const {id, name, parts} = course
  return(
    <>
    <Header name={name}/>
    <Content parts={parts}/>
    <Total parts={parts}/>
    </>
  )
}

const Header = ({name}) => <h2>{name}</h2>

const Content = ({parts}) => parts.map (part => <p key={part.id}>{part.name} {part.exercises}</p>)

const Total = ({parts}) =>{
const array = parts.map (item => item.exercises)
const total = array.reduce( (accumulator, currentValue) => accumulator + currentValue, 0 )
return (
  <strong>total of {total} exercises</strong>
  )
}

export default Courses