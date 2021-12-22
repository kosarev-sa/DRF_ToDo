import React from 'react'


class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            rep_url: '',
            user: props.users[0].id
        }
        // user: 0}
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleUserChange(event) {
        if (!event.target.selectedOptions) {
            this.setState({
                'user': []
            })
            return;
        }
        let users = []
        for (let i = 0; i < event.target.selectedOptions.length; i++) {
            users.push(event.target.selectedOptions.item(i).value)
        }
        this.setState({
            'user': users
        })
    }


    handleSubmit(event) {
        this.props.createProject(this.state.name, this.state.rep_url, this.state.user)
        // console.log(this.state.name)
        // console.log(this.state.rep_url)
        // console.log(this.state.user)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label htmlFor="name">name</label>
                    <input type="text" className="form-control"
                           name="name" value={this.state.name}
                           onChange={(event) => this.handleChange(event)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="rep_url">rep_url</label>
                    <input type="url" className="form-control"
                           name="rep_url" value={this.state.rep_url}
                           onChange={(event) => this.handleChange(event)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="user">user</label>

                    {/*    <input type="number" className="form-control" name="user" value={this.state.user}*/}
                    {/*           onChange={(event) => this.handleChange(event)}/>*/}

                    {/*<select name="user" className='form-control'*/}
                    {/*        onChange={(event) => this.handleChange(event)}>*/}
                    {/*    {this.props.users.map((item) =>*/}
                    {/*        <option value={item.id}>*/}
                    {/*            {item.username}*/}
                    {/*        </option>)}*/}
                    {/*</select>*/}

                    <select name="user"
                            multiple onChange={(event) => this.handleUserChange(event)}>
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

export default ProjectForm
