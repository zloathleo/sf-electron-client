import React from 'react';
import PropTypes from 'prop-types';

class ButtonMenu extends React.Component {

    render() {
        let selected = this.props.selected;
        return (
            <select ref={(ref) => this.select = ref} className="form-control" defaultValue={selected}>
                <option>COM3</option>
                <option>COM4</option>
                <option>COM5</option>
                <option>COM6</option>
                <option>COM7</option>
                <option>COM8</option>
            </select>
        )
    };

    value(){
        return this.select.selectedOptions.value;
    }

}

ButtonMenu.PropsType = {
    selected: PropTypes.string,
    items: PropTypes.array,
}


module.exports = ButtonMenu;