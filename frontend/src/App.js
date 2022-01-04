import React from 'react';
import axios from 'axios';
import {HashRouter, BrowserRouter, Route, Link, Redirect, Switch} from 'react-router-dom';
import './App.css';
import Cookies from 'universal-cookie';

import UserList from './components/users.js';
import Footer from './components/footer.js';
import Menu from './components/menu.js';
import ProjectList from './components/projects.js';
import TodoList from './components/todos.js';
import ProjectInfoList from './components/ProjectInfo.js';
import NotFound404 from './components/notfound404.js';
import LoginForm from './components/LoginForm.js';
import ProjectForm from './components/ProjectForm.js';
import TodoForm from './components/TodoForm.js';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
            'token': '',
            'login': ''
        }
    }

    createProject(name, rep_url, user) {
    const headers = this.get_headers()
    const data = {name: name, rep_url: rep_url, users: user}
        // console.log(data)
    axios.post(`http://127.0.0.1:8000/api/project/`, data, {headers})
        .then(response => {
          // let new_project = response.data
          // const user = this.state.users.filter((item) => item.id === new_project.users)[0]
          // new_project.users = user
          // this.setState({projects: [...this.state.projects, new_project]})
            this.load_data()
        })
        .catch(error => {
            console.log(error)
            this.setState({projects: []})
        })
    }

    createTodo(text, project, from_user, is_active) {
    const headers = this.get_headers()
    const data = {text: text, project: project, from_user: from_user, is_active: is_active}
        // console.log(data)
    axios.post(`http://127.0.0.1:8000/api/todo/`, data, {headers})
        .then(response => {
            this.load_data()
        })
        .catch(error => {
            console.log(error)
            this.setState({todos: []})
        })
    }

    deleteTodo(url) {
    const headers = this.get_headers()
        // console.log(headers)
        // console.log(url)
    axios.delete(`${url}`, {headers})
        .then(response => {
          // this.setState(
            // {
            // todos: this.state.todos.filter((item)=>item.url !== url)
            // }
            // )
            this.load_data()
        })
        .catch(error => {
            console.log(error)
            this.setState({todos: []})
        })
    }

    deleteProject(id) {
    const headers = this.get_headers()
    axios.delete(`http://127.0.0.1:8000/api/project/${id}`, {headers})
        .then(response => {
            this.load_data()
        })
        .catch(error => {
            console.log(error)
            this.setState({projects: []})
        })
    }

    set_token(token, username) {
        const cookies = new Cookies()
        cookies.set('token', token)
        localStorage.setItem('login', username)
        this.setState({'token': token, 'login': username},() => this.load_data())
    }

    is_authenticated() {
        return !!this.state.token
    }

    logout() {
        this.set_token('')
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        let username = localStorage.getItem('login')
        this.setState({'token': token, 'login': username},() => this.load_data())
    }

    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
        .then(response => {
            this.set_token(response.data['token'], username)
        }).catch(error => alert('Неверный логин или пароль'))
    }

    get_headers() {
        let headers = {'Content-Type': 'application/json'}
        if (this.is_authenticated()){
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    load_data () {
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/users', {headers})
            .then(response => {
                const users = response.data
                this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => {console.log(error)
            this.setState({users: []})}
            )

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

        axios.get('http://127.0.0.1:8000/api/project', {headers})
            .then(response => {
                const projects = response.data
                this.setState(
                    {
                        'projects': projects
                    }
                )
            }).catch(error => {console.log(error)
            this.setState({projects: []})}
            )

        axios.get('http://127.0.0.1:8000/api/todo', {headers})
            .then(response => {
                const todos = response.data
                this.setState(
                    {
                        'todos': todos
                    }
                )
            }).catch(error => {console.log(error)
            this.setState({todos: []})}
            )
    }

    componentDidMount() {
        this.get_token_from_storage()
        // this.load_data ()
    }

    render() {
        return (
            <div>
                <HashRouter>
                    <Menu is_authenticated={this.is_authenticated.bind(this)}
                          logout={() => {this.logout()}} login={this.state.login}/>
                    <Switch>
                        <Route exact path='/' component={() => <UserList users={this.state.users}/>}/>
                        <Route exact path='/project/create' component={() => <ProjectForm
                            users={this.state.users}
                            createProject={(name, rep_url, user) => this.createProject(name, rep_url, user)}
                        />}/>
                        <Route exact path='/project' component={() => <ProjectList projects={this.state.projects}
                                                                    deleteProject={(id)=>this.deleteProject(id)}/>}/>
                        <Route exact path='/todo/create' component={() => <TodoForm
                            project={this.state.projects} users={this.state.users}
                            createTodo={(text, project, from_user, is_active) =>
                                this.createTodo(text, project, from_user, is_active)}
                        />}/>
                        <Route exact path='/todo' component={() => <TodoList todos={this.state.todos}
                                                                    deleteTodo={(url)=>this.deleteTodo(url)}/>}/>
                        <Route path='/project/:id'>
                            <ProjectInfoList todos={this.state.todos} projects={this.state.projects}/>
                        </Route>
                        <Route exact path='/login' component={() => <LoginForm get_token={(username, password) =>
                            this.get_token(username, password)} />} />
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
