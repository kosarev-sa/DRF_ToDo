import React from 'react'
import {Link} from 'react-router-dom'

const TodoItem = ({todo, deleteTodo}) => {
    return (
        <tr>
            <td>{todo.text}</td>
            <td>{todo.project}</td>
            <td>{todo.from_user}</td>
            <td>{todo.is_active == true ? 'yes' : 'no'}</td>
            <td>{todo.created_at}</td>
            <td>{todo.updated_at}</td>
            <td>{todo.url}</td>
            <td>
                <button onClick={() => deleteTodo(todo.url)} type='button'>Delete</button>
            </td>
        </tr>
    )
}

const TodoList = ({todos, deleteTodo}) => {
    return (
        <div>
            <table>
                <th>Text</th>
                <th>Project</th>
                <th>From user</th>
                <th>Activity</th>
                <th>When created</th>
                <th>When updated</th>
                <th>Url</th>
                <th></th>

                {todos.map((todo) => <TodoItem todo={todo} deleteTodo={deleteTodo}/>)}
            </table>
            <Link to='/todo/create'>Create</Link>
        </div>
    )
}

export default TodoList
