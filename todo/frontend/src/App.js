import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

import UserList from './components/users.js'
import Footer from "./components/footer.js";
import Menu from "./components/menu.js";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
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
   }

    render() {
        return (
            <div>
                <Menu/>
                <UserList users={this.state.users}/>
                <Footer/>
            </div>
        )
    }
}

export default App;
