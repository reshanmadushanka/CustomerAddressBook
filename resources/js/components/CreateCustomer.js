
import React from 'react';
import ReactDOM from 'react-dom';
import ContactItem from './ContactItem';
import CustomerList from './CustomerList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const itemDataTemplate = {
    mobile: ""
}

class CreateCustomer extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.addNew = this.addNew.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.addCustomer = this.addCustomer.bind(this);
        this.getCustomers = this.getCustomers.bind(this);
        this.deleteCustomer = this.deleteCustomer.bind(this);
        this.searchCustomer = this.searchCustomer.bind(this);
        this.state = {
            name: "",
            nic: "",
            address: "",
            item_list: [],
            customer_list: [],
            serach_name: "",

        }
    }

    componentDidMount() {
        this.setState({
            item_list: [itemDataTemplate]
        })
        this.getCustomers();
    }

    addNew() {
        const { item_list } = this.state;
        let newItemList = item_list;
        newItemList.push(itemDataTemplate);

        this.setState({
            item_list: newItemList
        })
    }


    onDelete(selectedItem, index) {
        const { item_list } = this.state;


        let newItemList = item_list.filter((row, i) => {
            return index != i;
        });

        this.setState({
            item_list: newItemList
        })
    }

    onChangeItem(item, index) {

        const { item_list } = this.state;
        let newItemList = item_list.filter((row, i) => {
            return index != i;
        });

        newItemList.splice(index, 0, item);

        this.setState({
            item_list: newItemList
        })

    }

    renderItems() {
        const { item_list } = this.state;

        return item_list.map((row, index) => {
            return <ContactItem
                onChange={(item) => this.onChangeItem(item, index)}
                onDelete={() => this.onDelete(row, index)}
                addNew={() => this.addNew()}
                item={row}
                index={index}
            />
        })
    }
    addCustomer() {
        let self = this;
        axios.post('api/customers/create', {
            name: this.state.name,
            nic: this.state.nic,
            address: this.state.address,
            item_list: this.state.item_list,
        })
            .then(function (res) {
                self.getCustomers()
                toast.success(res.data.msg, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                self.setState({
                    name: "",
                    nic: "",
                    address: "",
                    item_list: [itemDataTemplate]

                })
            }).catch(function (data) {

                if (data.response.data.errors) {

                    $.each(data.response.data.errors, function (key, msg) {
                        toast.error('' + msg, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    });
                } else {
                    toast.error('Error!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            });
    }

    getCustomers() {

        let self = this;
        axios.get('api/customers', {
        }).then(function (res) {
            self.setState({
                customer_list: res.data.data
            })
        })
    }

    deleteCustomer(id) {
        let self = this;
        axios.post('api/customers/delete', {
            id: id
        }).then(function (res) {
            self.getCustomers()
            toast.success(res.data.msg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
    }

    searchCustomer(e) {
        this.setState({
            serach_name: e.target.value
        })

        let self = this;
        axios.post('api/customers/search', {
            name: e.target.value
        }).then(function (res) {
            self.setState({
                customer_list: res.data.data
            })
        })
    }


    render() {
        return (
            <div className="container">
                <div className="text-center">
                    <h1>Create Customer</h1>
                </div>
                <ToastContainer />
                <form>
                    <div className="form-group row">
                        <label className="col-md-2 col-form-label" >Name *</label>
                        <div className="col-md-10">
                            <input type="text" onChange={(e) => this.setState({ name: e.target.value })} value={this.state.name} className="form-control" id="staticEmail" placeholder="name" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-2 col-form-label" >NIC *</label>
                        <div className="col-md-10">
                            <input type="text" className="form-control" onChange={(e) => this.setState({ nic: e.target.value })} value={this.state.nic} placeholder="915485764V" />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-md-2 col-form-label" >Address *</label>
                        <div className="col-md-10">
                            <textarea type="text" className="form-control" value={this.state.address} onChange={(e) => this.setState({ address: e.target.value })} />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-md-2 col-form-label" >Telephone *</label>
                        <div className="col-md-8">
                            {this.renderItems()}
                        </div>
                    </div>

                    <div className="from-group text-right">
                        <button type="button" onClick={this.addCustomer} className="btn btn-primary">Save</button>
                    </div>

                </form>
                <div className="mt-5">
                    <div className="container">
                        <div className="from-group row">
                            <label className="col-md-2 col-form-label" >Search Name</label>
                            <div className="col-md-6">
                                <input className="form-control" onChange={this.searchCustomer} value={this.state.serach_name}></input>
                            </div>

                        </div>
                    </div>
                    <CustomerList customers={this.state.customer_list} deleteCustomer={this.deleteCustomer}></CustomerList>

                </div>
            </div>


        );
    }

}

export default CreateCustomer;

if (document.getElementById('create-customer')) {
    const component = document.getElementById('create-customer');
    const props = Object.assign({}, component.dataset)
    ReactDOM.render(<CreateCustomer {...props} />, component);
}
