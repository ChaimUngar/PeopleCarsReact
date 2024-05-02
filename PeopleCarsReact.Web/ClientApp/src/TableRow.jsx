import React from "react";
import { Link } from "react-router-dom";

function TableRow(props) {

    const { cars } = props
    const { id, firstName, lastName, age } = props.person

    return (
        <tr>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{age}</td>
            <td>{cars.length}</td>
            <td>
                <Link to={`/addcar/${id}`}>
                    <button class="btn btn-primary">Add Car</button>
                </Link>
            </td>
            <td>
                <Link to={`/deletecars/${id}`}>
                    <button class="btn btn-danger">Delete Cars</button>
                </Link>
            </td>
        </tr>
    )
}

export default TableRow