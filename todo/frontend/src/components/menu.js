import React from "react";
import 'bootstrap/dist/css/bootstrap.css'


const Menu = () => {

    return (
        <div className="container">
            <div className="jumbotron">
                <h1 className="display-3">my 'ToDo'</h1> Menu:
                <a className="nav-link" href='#'>Sign in</a>
                <ul>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Calendar</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">About</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Menu
