import React from "react"
import axios from 'axios';
import TableRow from "./TableRow";
import { Link } from "react-router-dom";

class Home extends React.Component {

    state = {
        people: [],
        person: {
            firstName: '',
            lastName: '',
            age: '',
            cars: []
        },
        searchedText: ''
    }

    componentDidMount = async () => {
        await this.refreshPeople()
    }

    refreshPeople = async () => {
        const response = await axios.get('/api/people/getall')
        this.setState({ people: response.data })
    }

    onSearchChange = e => {
        const text = e.target.value
        this.setState({ searchedText: text })
    }

    onClearClick = () => {
        this.setState({ searchedText: '' })
    }

    render() {
        const { people, searchedText } = this.state

        return (
            <body>
                <div>
                    <div className="container" style={{ marginTop: '60px' }}>
                        <div style={{ backgroundColor: 'white', minHeight: '1000px', paddingTop: '10px' }}>
                            <div className="row">
                                <div className="col-md-10">
                                    <input type="text" className="form-control form-control-lg" placeholder="Search People"
                                        onChange={this.onSearchChange} value={searchedText} />
                                </div>
                                <div className="col-md-2">
                                    <button className="btn btn-dark btn-lg w-100" onClick={this.onClearClick}>Clear</button>
                                </div>
                            </div>
                            <div className="row mt-5">
                                <div className="col-md-12" style={{ marginBottom: '20px' }}>
                                    <Link to='addperson' style={{ textDecoration: 'none' }}>
                                        <button className="btn btn-success btn-lg w-100">Add Person</button>
                                    </Link>
                                </div>
                            </div>

                            <table className="table table-hover table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Age</th>
                                        <th>Car Count</th>
                                        <th>Add Car</th>
                                        <th>Delete Cars</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {people.filter(p =>
                                        p.firstName.toLowerCase().includes(searchedText.toLowerCase()) ||
                                        p.lastName.toLowerCase().includes(searchedText.toLowerCase()))
                                        .map(p => <TableRow key={p.id} person={p} cars={p.cars} />)}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </body>


        )
    }
}

export default Home
