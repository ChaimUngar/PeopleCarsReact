import React from "react";
import axios from 'axios';
import withRouter from "./withRouter";

class AddPerson extends React.Component {
    state = {
        person: {
            firstName: '',
            lastName: '',
            age: ''
        }
    }

    onTextChange = e => {
        const copy = { ...this.state.person }
        copy[e.target.name] = e.target.value
        this.setState({ person: copy })
    }

    onSubmitClick = async () => {
        const {person} = this.state
        await axios.post('/api/people/addperson', person, +(person.age));
        this.props.navigate('/');
    }

    render() {

        const { firstName, lastName, age } = this.state

        return (
            <div className="container" style={{ marginTop: '60px' }}>
                <div style={{ minHeight: '1000px', paddingTop: '200px' }}>
                    <div className="row">
                        <div className="col-md-6 offset-md-3 card bg-light p-4">
                            <h2>Add a New Person</h2>
                            <input type="text" className="form-control" name="firstName" placeholder="First Name"
                                value={firstName} onChange={this.onTextChange} />
                            <br />
                            <input type="text" className="form-control" name="lastName" placeholder="Last Name"
                                value={lastName} onChange={this.onTextChange} />
                            <br />
                            <input type="text" className="form-control" name="age" placeholder="Age"
                                value={age} onChange={this.onTextChange} />
                            <br />
                            <button className="btn btn-primary btn-lg btn-block"
                                onClick={this.onSubmitClick}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default withRouter(AddPerson)