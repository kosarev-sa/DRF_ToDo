import React from 'react'
import { useParams } from 'react-router-dom'


const TodoItem = ({todo, projects}) => {
    return (
        <tr>
            <td>{todo.text}</td>
            <td>{todo.is_active==true ? 'yes' : 'no'}</td>
            <td>{todo.from_user}</td>
            <td>{todo.created_at}</td>
            <td>{todo.updated_at}</td>
            <td>
                {projects.find((project) => project.id == todo.project).name}
            </td>
        </tr>
   )
}

const ProjectInfoList = ({todos, projects}) => {
    let {id} = useParams();
    // console.log(id, useParams())
    let filtered_items = todos.filter((todo) => todo.project == id)
    // console.log(filtered_items)
   return (
       <table>
           <th>What todo</th>
           <th>Activity</th>
           <th>From user</th>
           <th>When created</th>
           <th>When updated</th>
           <th>Project</th>

           {filtered_items.map((todo) => <TodoItem todo={todo} projects={projects}/>)}
       </table>
   )
}

export default ProjectInfoList
