import React from 'react';

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
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title" id="myModalLabel">Config</h4>
                        </div>
                        <div className="modal-body">
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

module.exports = { DeleteDialog, ConfigDialog };