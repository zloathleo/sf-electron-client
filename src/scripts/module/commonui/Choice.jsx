import React from 'react';
import PropTypes from 'prop-types';

class Choice extends React.Component {
 
    render() {
        let index = this.props.selectIndex;
        let labels = this.props.labels;
        if (index == 1) {
            return (
                <div className="btn-group" data-toggle="buttons">
                    <label className="btn btn-primary ">
                        <input type="radio" />{labels[0]}
                    </label>
                    <label className="btn btn-primary active">
                        <input type="radio" defaultChecked />{labels[1]}
                    </label>
                </div>
            )
        } else {
            return (
                <div className="btn-group" data-toggle="buttons">
                    <label className="btn btn-primary active">
                        <input type="radio" defaultChecked />{labels[0]}
                    </label>
                    <label className="btn btn-primary ">
                        <input type="radio" />{labels[1]}
                    </label>
                </div>
            )
        }

    };

}

Choice.PropsType = {
    selectIndex: PropTypes.number,
    labels: PropTypes.array,
}


module.exports = Choice;