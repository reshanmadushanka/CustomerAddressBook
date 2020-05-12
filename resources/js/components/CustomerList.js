import React from 'react';
import PropTypes from "prop-types";
import ReactDOM from 'react-dom';

class CustomerList extends React.Component {

    handleDelete(id) {
        this.props.deleteCustomer(id);
    }

    renderCustomerList() {
        const { customers } = this.props;
        return customers.map((row) => {
            return <tr>
                <th scope="row">{row.id}</th>
                <td>{row.name}</td>
                <td>{row.nic}</td>
                <td>{row.address}</td>
                <td>
                    {row.contact.map(function (item) {
                        return (
                            <p>{item.mobile}</p>
                        );
                    })}
                </td>
                <td onClick={(e) => this.handleDelete(row.id)} className="text-center"><button className="btn btn-danger">Delete</button></td>
            </tr>
        })
    }

    render() {
        return (
            <div className="mt-5">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>NAME</th>
                            <th>NIC</th>
                            <th>ADDRESS</th>
                            <th>CONTACT</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderCustomerList()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default CustomerList;