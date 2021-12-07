import React from "react";
import { Link } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.css'


const Menu = ({is_authenticated, logout, login}) => {

    return (
        <div className="container">
            <div className="jumbotron">
                <h1 className="display-3">my 'ToDo'</h1> Menu:
                {is_authenticated() ?
                    <h6>{login} <button onClick={()=>{logout()}}>Log out</button></h6> :
                    <Link className="nav-link" to='/login'>Log in</Link>}
                <ul>
                    <nav>
                        <ul>
                            <li>
                                <Link to='/'>Users</Link>
                            </li>
                            <li>
                                <Link to='/project'>Project</Link>
                            </li>
                            <li>
                                <Link to='/todo'>ToDo</Link>
                            </li>
                        </ul>
                    </nav>
                </ul>
            </div>
        </div>
    )
}

export default Menu
