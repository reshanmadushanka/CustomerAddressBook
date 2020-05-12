import React from 'react';

class ContactItem extends React.Component {

    onChange(updatedItem) {
        let newItem = updatedItem;
        newItem.mobile = parseFloat(newItem.mobile);
        this.props.onChange(newItem);
    }

    render() {
        const { item, addNew, onDelete, index } = this.props;
        return (
            <div className="row mt-2">
                <div className="col-md-10">
                    <input className="form-control" type="number" onChange={(e) => this.onChange({ ...item, mobile: e.target.value })} value={item.mobile} name={"items[" + index + "]"} />
                </div>
                <div className="col-md-2">
                    <button type="button" className="btn btn-primary" onClick={() => onDelete()}>-</button>
                    <button type="button" className="btn btn-primary ml-2" onClick={() => addNew()}>+</button>
                </div>
            </div>
        );
    }
}

export default ContactItem;