import React from 'react'


const TodoItem = ({todo}) => {
    return (
        <tr>
            <td>{todo.text}</td>
            <td>{todo.project}</td>
            <td>{todo.from_user}</td>
            <td>{todo.is_active==true ? 'yes' : 'no'}</td>
            <td>{todo.created_at}</td>
            <td>{todo.updated_at}</td>
            <td>{todo.url}</td>
        </tr>
   )
}

const TodoList = ({todos}) => {
   return (
       <table>
           <th>Text</th>
           <th>Project</th>
           <th>From user</th>
           <th>Activity</th>
           <th>When created</th>
           <th>When updated</th>
           <th>Url</th>

           {todos.map((todo) => <TodoItem todo={todo} />)}
       </table>
   )
}

export default TodoList
