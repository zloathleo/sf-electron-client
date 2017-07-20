import React from 'react';
import PropTypes from 'prop-types';

class DeleteDialog extends React.Component {

    render() {
        return (
            <div className="modal fade" id={this.props.id} role="dialog" aria-labelledby="myModalLabel">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title" id="myModalLabel">Delete</h4>
                        </div>
                        <div className="modal-body">
                            Delete the current
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-danger">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}

class ConfigDialog extends React.Component {

    render() { 
        return (
            <div className="modal fade" id={this.props.id} role="dialog" aria-labelledby="myModalLabel">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title" id="myModalLabel">{this.props.title}</h4>
                        </div>
                        <div className="modal-body custom-modal-body">
                            {this.props.body()}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-info">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}

ConfigDialog.PropsType = {
    title: PropTypes.string
}

module.exports = { DeleteDialog, ConfigDialog };