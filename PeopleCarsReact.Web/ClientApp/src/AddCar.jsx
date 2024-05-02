import React from "react";
import withRouter from "./withRouter";
import axios from "axios";

class AddCar extends React.Component {
    state = {
        carOwner: '',
        car: {
            make: '',
            model: '',
            year: ''
        }
    }

    componentDidMount = async () => {
        const { data } = await axios.get(`/api/people/getperson?id=${this.props.params.id}`);
        this.setState({ carOwner: `${data.firstName} ${data.lastName}` });
    }

    onSubmitClick = async () => {
        const { make, model, year } = this.state.car
        await axios.post(`/api/cars/addcar`, { personId: this.props.params.id, make, model, year })
        this.props.navigate('/')
    }

    onTextChange = e => {
        const copy = { ...this.state.car }
        copy[e.target.name] = e.target.value
        this.setState({ car: copy })
    }

    render() {

        const { make, model, year, carOwner } = this.state

        return (
            <div className="container" style={{ marginTop: '60px' }}>
                <div style={{ minHeight: '1000px', paddingTop: '200px' }}>
                    <div className="row">
                        <div className="col-md-6 offset-md-3 card bg-light p-4">
                            <h2>Add a car for {carOwner}</h2>
                            <input type="text" className="form-control" name="make" placeholder="Make"
                                onChange={this.onTextChange} value={make} />
                            <br />
                            <input type="text" className="form-control" name="model" placeholder="Model"
                                onChange={this.onTextChange} value={model} />
                            <br />
                            <input type="text" className="form-control" name="year" placeholder="Year"
                                onChange={this.onTextChange} value={year} />
                            <br />
                            <button className="btn btn-primary btn-lg btn-block" onClick={this.onSubmitClick}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(AddCar)