import React from 'react';
import axios from 'axios';
import {HashRouter, BrowserRouter, Route, Link, Redirect, Switch} from 'react-router-dom'
import './App.css';

import UserList from './components/users.js'
import Footer from './components/footer.js'
import Menu from "./components/menu.js";
import ProjectList from './components/projects.js'
import TodoList from './components/todos.js'
import ProjectInfoList from './components/ProjectInfo.js'
import NotFound404 from './components/notfound404.js'


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'todos': []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users')
            .then(response => {
                const users = response.data
                this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => console.log(error))

        // const users = [
        //     {
        //         'username': 'Фёд',
        //         'first_name': 'Фёдор',
        //         'last_name': 'Достоевский',
        //         'email': '1821@mail.ru'
        //     },
        //     {
        //         'username': 'Алек',
        //         'first_name': 'Александр',
        //         'last_name': 'Грин',
        //         'email': '1880@mail.ru'
        //     },
        // ]
        // this.setState(
        //     {
        //         'users': users
        //     }
        // )

        axios.get('http://127.0.0.1:8000/api/project')
            .then(response => {
                const projects = response.data
                this.setState(
                    {
                        'projects': projects
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todo')
            .then(response => {
                const todos = response.data
                this.setState(
                    {
                        'todos': todos
                    }
                )
            }).catch(error => console.log(error))
    }


    render() {
        return (
            <div>
                <HashRouter>
                    <Menu/>
                    <Switch>
                        <Route exact path='/' component={() => <UserList users={this.state.users}/>}/>
                        <Route exact path='/project' component={() => <ProjectList projects={this.state.projects}/>}/>
                        <Route exact path='/todo' component={() => <TodoList todos={this.state.todos}/>}/>
                        <Route path='/project/:id'>
                            <ProjectInfoList todos={this.state.todos} projects={this.state.projects}/>
                        </Route>
                        <Redirect from='/users' to='/'/>
                        <Route component={NotFound404}/>
                    </Switch>
                </HashRouter>
                <Footer/>
            </div>
        )
    }
}

export default App;
