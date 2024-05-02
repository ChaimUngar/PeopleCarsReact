import React from "react";
import { Link } from "react-router-dom";
import withRouter from "./withRouter";
import axios from "axios";

class DeleteCars extends React.Component {
    state = {
        cars: [],
        carOwner: '',
        searchedText: ''
    }

    componentDidMount = async () => {
        const id = this.props.params.id
        const response = await axios.get(`/api/cars/getcars?id=${id}`)
        const ownerResponse = await axios.get(`/api/people/getperson?id=${id}`)
        this.setState({ cars: response.data, carOwner: ownerResponse.data })
        console.log(this.state.carOwner)
    }

    buildTable = () => {
        const { cars, searchedText } = this.state
        return (
            cars.filter(c =>
                c.make.toLowerCase().includes(searchedText.toLowerCase()) ||
                c.model.toLowerCase().includes(searchedText.toLowerCase()))
                .map(c =>
                    <tr key={c.id}>
                        <td>{c.make}</td>
                        <td>{c.model}</td>
                        <td>{c.year}</td>
                    </tr>)
        )
    }

    onYesClick = async () => {
        const id = this.props.params.id
        await axios.post(`/api/cars/deletecars?id=${id}`)
        this.props.navigate('/')
    }

    onSearchChange = e => {
        const text = e.target.value
        this.setState({ searchedText: text })
    }

    onClearClick = () => {
        this.setState({ searchedText: '' })
    }

    render() {
        const { firstName, lastName } = this.state.carOwner
        const { searchedText } = this.state

        return (
            <div className="container" style={{ marginTop: '60px' }}>
                <div style={{ backgroundColor: 'white', minHeight: '1000px', paddingTop: '10px' }}>
                    <h2>Delete cars for {firstName} {lastName}</h2>
                    <div className="row">
                        <div className="col-md-10">
                            <input type="text" className="form-control form-control-lg" placeholder="Search Cars"
                                onChange={this.onSearchChange} value={searchedText} />
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-dark btn-lg w-100" onClick={this.onClearClick}>Clear</button>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-md-12">
                            <table className="table table-hover table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>Make</th>
                                        <th>Model</th>
                                        <th>Year</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {this.buildTable()}

                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <h3>Are you sure you want to delete all of these cars?</h3>
                        </div>
                        <div className="col-md-6" style={{ marginTop: '20px' }}>
                            <Link to="/" style={{ textDecoration: 'none' }}>
                                <button className="btn btn-primary btn-lg w-100">No</button>
                            </Link>
                        </div>
                        <div className="col-md-6" style={{ marginTop: '20px' }}>
                            <button className="btn btn-danger btn-lg w-100" onClick={this.onYesClick}>Yes</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(DeleteCars)