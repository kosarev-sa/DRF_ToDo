import React from "react";
import { Link } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.css'


const Menu = () => {

    return (
        <div className="container">
            <div className="jumbotron">
                <h1 className="display-3">my 'ToDo'</h1> Menu:
                <a className="nav-link" href='#'>Sign in</a>
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
