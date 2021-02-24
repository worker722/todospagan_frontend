import React, { useEffect, useMemo, useState } from "react";
import { Modal, Card, Button, ProgressBar } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import UserInfo from './consumer/UserInfo';
import LaborData from './consumer/LaborData';
import PersonalRefrence from './consumer/PersonalRefrence';
import UploadDocument from './consumer/UploadDocument';
import RegulatoryData from './consumer/RegulatoryData';
import CompanyData from './economic_agent/CompanyData';
import ShareholderData from './economic_agent/ShareholderData';
import CommercialReferencesor from './economic_agent/CommercialReferencesor';
import AgentUploadDocument from './economic_agent/AgentUploadDocument';
import AgentResidentDetails from './economic_agent/AgentResidentDetails';
import AgentRegulatoryData from './economic_agent/AgentRegulatoryData';

export function UserRegister({ show, onHide }) {
    // Customers UI Context
    const [progressValue, setProgress] = useState(0);
    const [contentName, setContentName] = useState("");
    const consumerPage = () => {
        setContentName('UserInfo');
    }
    const  agentPage = () => {
        setContentName('CompanyData');
    }
    const RegisterMain = () => {
        return (
            <>
                <Modal.Body className="overlay overlay-block cursor-default">

                    <div><h4 className="text-center">Gracias por registrarte en Todos Pagan.  Para completar tu afiliación debes completar el proceso de afiliación de uno de los siguientes planes.</h4></div>
                    <div ><h6 style={{ textAlign: 'center' }}>Disfruta de nuestra prueba gratuita por X días y completa tu afiliación ahora.</h6></div>
                    <div className="row">
                        <div className="col-md-6">
                            <Card border="dark" style={{ width: "40rem" }}>
                                <Card.Header>CONSUMIDOR</Card.Header>
                                <Card.Body>
                                    <Card.Title>COMPRADORES de productos y servicios</Card.Title>
                                    <div>description</div>
                                    <div>description</div>
                                    <div>description</div>
                                    <div>description</div>
                                    <div>description</div>
                                    <div>description</div>
                                    <div className="w-100 d-flex mt-10 justify-content-center">
                                        <span className="pr-4">
                                            <Button variant="secondary" onClick={() => { consumerPage() }}>Secondary</Button>
                                        </span>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-md-6">
                            <Card border="dark" style={{ width: "40rem" }}>
                                <Card.Header>AGENTE ECONOMICO</Card.Header>
                                <Card.Body>
                                    <Card.Title>VENDEDORES de productos y servicios</Card.Title>
                                    <div>description</div>
                                    <div>description</div>
                                    <div>description</div>
                                    <div>description</div>
                                    <div>description</div>
                                    <div>description</div>
                                    <div className="w-100 d-flex mt-10 justify-content-center">
                                        <span className="pr-4">
                                            <Button variant="secondary" onClick={() => agentPage()}>Secondary</Button>
                                        </span>
                                    </div>
                                </Card.Body>

                            </Card>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <span className="pr-4">
                        <Button variant="secondary" onClick={onHide}>Cancel</Button>
                    </span>
                </Modal.Footer>
            </>
        )
    }

    return (
        <Modal
            className="mt-10 mb-10"
            size="xl"
            show={show}
            onHide={onHide}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeLabel="close" closeButton>
                <Modal.Title id="example-modal-sizes-title-lg" className="text-center w-100">
                    MEMBERSHIP PROCESS
                    <ProgressBar now={progressValue} label={`${progressValue}%`} srOnly className="w-100 mt-10" />
                </Modal.Title>
            </Modal.Header>
            {contentName == "" &&
                <RegisterMain></RegisterMain>
            }
            {contentName == "UserInfo" &&
                <UserInfo onHide={onHide} setProgress={setProgress} setContentName={setContentName}></UserInfo>
            }
            {contentName == "LaborData" &&
                <LaborData onHide={onHide} setProgress={setProgress} setContentName={setContentName}></LaborData>
            }
            {contentName == "PersonalRefrence" &&
                <PersonalRefrence onHide={onHide} setProgress={setProgress} setContentName={setContentName}></PersonalRefrence>
            }
            {contentName == "UploadDocument" &&
                <UploadDocument onHide={onHide} setProgress={setProgress} setContentName={setContentName}></UploadDocument>
            }
            {contentName == "RegulatoryData" &&
                <RegulatoryData onHide={onHide} setProgress={setProgress} setContentName={setContentName}></RegulatoryData>
            }
        </Modal>
    );
}
