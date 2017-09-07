import React from 'react';
import PropTypes from 'prop-types';

class Choice extends React.Component {

    constructor(props) {
        super(props);
        this.getSelectIndex = this.getSelectIndex.bind(this);
    }

    render() {
        let index = this.props.selectIndex;
        let labels = this.props.labels;
        if (index == 1) {
            return (
                <div className="btn-group" data-toggle="buttons">
                    <label ref={(ref) => this.label1 = ref} className="btn btn-primary " onClick={this.props.onClick} >
                        <input type="radio" />{labels[0]}
                    </label>
                    <label ref={(ref) => this.label2 = ref} className="btn btn-primary active" onClick={this.props.onClick} >
                        <input type="radio" defaultChecked />{labels[1]}
                    </label>
                </div>
            )
        } else {
            return (
                <div className="btn-group" data-toggle="buttons">
                    <label ref={(ref) => this.label1 = ref} className="btn btn-primary active" onClick={this.props.onClick}>
                        <input type="radio" defaultChecked />{labels[0]}
                    </label>
                    <label ref={(ref) => this.label2 = ref} className="btn btn-primary " onClick={this.props.onClick}>
                        <input type="radio" />{labels[1]}
                    </label>
                </div>
            )
        }
    }

    getSelectIndex() {
        let v1 = this.label1.className;
        if (v1.indexOf('active') >= 0) {
            return 0;
        } else {
            return 1;
        }
    }

}

Choice.PropsType = {
    selectIndex: PropTypes.number,
    labels: PropTypes.array,
    onClick: PropTypes.func,
}

module.exports = Choice;