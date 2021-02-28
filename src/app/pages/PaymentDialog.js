import React from "react";
import { PaymentMethods } from 'react-payment';
import { Modal, Card, Button, ProgressBar } from "react-bootstrap";
import { FormattedMessage, injectIntl } from "react-intl";
import { connect } from "react-redux";
import * as Yup from "yup";
import { Link } from "react-router-dom";
export function PaymentDialog () {
    return (
        <Modal
            size="lg"
            show={true}
            onHide={() => {}}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>Payment</Modal.Header>
            <Modal.Body className="overlay overlay-block cursor-default">
                <PaymentMethods
                    showCards={true}
                    showBanks={false}
                    cards={[{ id: '1', last4: '1234', brand: 'visa' }]}
                    onAddCard={this.showCardFormDialog}
                    onRemoveCard={this.removeCard}
                />
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
        </Modal>
    )
}

