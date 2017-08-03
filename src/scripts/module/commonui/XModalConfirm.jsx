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

class XModalConfirm extends React.Component {

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
        if (this.okFunc) {
            this.okFunc();
        }
        this.hideModal();
    }

    render() {
        if (this.state.isOpen) {
            let title = this.title ? this.title : 'Confirm';

            return (
                <Modal isOpen={this.state.isOpen} onRequestHide={this.hideModal}>
                    <ModalHeader>
                        <ModalClose onClick={this.hideModal} />
                        <ModalTitle>{title}</ModalTitle>
                    </ModalHeader>
                    <ModalFooter>
                        <button className='btn btn-default' onClick={this.hideModal}>
                            Close
                        </button>
                        <button className='btn btn-success' onClick={this.ok}>
                            Confirm
                        </button>
                    </ModalFooter>
                </Modal>
            )
        } else {
            return null;
        }

    }
}

export default XModalConfirm;