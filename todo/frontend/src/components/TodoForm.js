import React from 'react'


class TodoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            project: props.project[0].id,
            from_user: props.users[0].id,
            is_active: 'True'
        }
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        this.props.createTodo(this.state.text, this.state.project, this.state.from_user, this.state.is_active)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label htmlFor="text">text</label>
                    <input type="text" className="form-control"
                           name="text" value={this.state.text}
                           onChange={(event) => this.handleChange(event)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="project">project</label>
                    <select name="project" className='form-control'
                            onChange={(event) => this.handleChange(event)}>
                        {this.props.project.map((item) =>
                            <option value={item.id}>
                                {item.name}
                            </option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="from_user">user</label>
                    <select name="from_user" className='form-control'
                            onChange={(event) => this.handleChange(event)}>
                        {this.props.users.map((item) =>
                            <option value={item.id}>
                                {item.username}
                            </option>)}
                    </select>
                </div>
                <input type="submit" className="btn btn-primary" value="Save"/>
            </form>
        );
    }
}

export default TodoForm
