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
            let _size = this.props.size ? this.props.size : 'modal-lg';
            return (
                <Modal isOpen={this.state.isOpen} onRequestHide={this.hideModal} size={_size}>
                    <ModalHeader>
                        <ModalClose onClick={this.hideModal} />
                        <ModalTitle>{title}</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        {this.props.children}
                    </ModalBody>
                    <ModalFooter>
                        <button className='btn btn-default' onClick={this.hideModal}>
                            Close
                    </button>
                        <button className='btn btn-success' onClick={this.ok}>
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
    size: PropTypes.string,
    okText: PropTypes.string,
    okFunc: PropTypes.func
}

export default XModal;