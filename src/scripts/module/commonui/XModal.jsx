import React from 'react';
import PropTypes from 'prop-types';

import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody,
    ModalFooter
} from 'react-modal-bootstrap';

class XModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isOpen: false };

        this.openModal = this.openModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.ok = this.ok.bind(this);

    }

    openModal() {
        this.setState({
            isOpen: true
        });
    };

    hideModal() {
        this.setState({
            isOpen: false
        });
    };

    ok() {
        if (this.props.okFunc) {
            this.props.okFunc();
        }
        this.hideModal();
    }

    render() {
        if (this.state.isOpen) {
            let title = this.props.title ? this.props.title : 'Title';
            let okText = this.props.okText ? this.props.okText : 'OK';

            return (
                <Modal isOpen={this.state.isOpen} onRequestHide={this.hideModal}>
                    <ModalHeader>
                        <ModalClose onClick={this.hideModal} />
                        <ModalTitle>{title}</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        {this.props.body}
                    </ModalBody>
                    <ModalFooter>
                        <button className='btn btn-default' onClick={this.hideModal}>
                            Close
                    </button>
                        <button className='btn btn-primary' onClick={this.ok}>
                            {okText}
                        </button>
                    </ModalFooter>
                </Modal>
            )
        } else {
            return null;
        }

    }
}

XModal.PropsType = {
    title: PropTypes.string,
    body: PropTypes.any,
    okText: PropTypes.string,
    okFunc: PropTypes.func
}

export default XModal;