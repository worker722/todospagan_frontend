import React, { useEffect, useMemo, useState } from "react";
import { Modal, Card, Button, ProgressBar } from "react-bootstrap";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import pdf_icon from "../../../../../assets/images/svg/PDF_file_icon.svg";
import add_file_icon from "../../../../../assets/images/svg/add_file_icon.svg";
import cancel_icon from "../../../../../assets/images/icons/cancel.png";
const UploadDocument = (props) => {
    const { onHide } = props;
    const [first_document, setFirst] = useState([]);
    const [second_document, setSecond] = useState([]);
    const [third_document, setThird] = useState([]);
    const [input_name, setInputTypeName] = useState(1);
    const [update_index, setUpdateIndex] = useState(0);
    const onFileUpload = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            switch (input_name) {
                case 1:
                    for (let i = 0; i < files.length; i++) {
                        setFirst(first_document => [...first_document, files[i]]);
                    }
                    return;
                case 2:
                    for (let i = 0; i < files.length; i++) {
                        setSecond(second_document => [...second_document, files[i]]);
                    }
                    return;
                case 3:
                    for (let i = 0; i < files.length; i++) {
                        setThird(third_document => [...third_document, files[i]]);
                    }
                    return;
                default:
                    break;
            }
        }
        // (files.length > 0) && setUrl(URL.createObjectURL(files[0]));
    }

    const onFileUpdate = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            switch (input_name) {
                case 1:
                    first_document[update_index] = files[0];
                    setFirst(first_document => [...first_document]);
                    return;
                case 2:
                    second_document[update_index] = files[0];
                    setSecond(second_document => [...second_document]);
                    return;
                case 3:
                    third_document[update_index] = files[0];
                    setThird(third_document => [...third_document]);
                    return;
                default:
                    break;
            }
        }
        // (files.length > 0) && setUrl(URL.createObjectURL(files[0]));
    }

    const uploadFile = (id) => {
        setInputTypeName(id);
        switch (id) {
            case 1:
                document.getElementById('firstFile').click();
                return;
            case 2:
                document.getElementById('secondFile').click();
                return;
            case 3:
                document.getElementById('thirdFile').click();
                return;
            default:
                return;
        }
    }

    const removeFile = (id, index) => {
        switch (id) {
            case 1:
                setFirst(first_document.filter((_, i) => i !== index));
                return;
            case 2:
                setSecond(second_document.filter((_, i) => i !== index));
                return;
            case 3:
                setThird(third_document.filter((_, i) => i !== index));
                return;
            default:
                return;
        }
    }

    const updateFile = (id, index) => {
        setInputTypeName(id);
        setUpdateIndex(index);
        switch (id) {
            case 1:
                document.getElementById('firstFileUpdate').click();
                return;
            case 2:
                document.getElementById('secondFileUpdate').click();
                return;
            case 3:
                document.getElementById('thirdFileUpdate').click();
                return;
            default:
                return;
        }
    }

    const FirstDocument = () => {
        return (
            <>
                {first_document?.map((item, index) => (
                    <div key={index}>
                        <img src={cancel_icon} height={20} width={20} style={{ position: 'absolute', marginLeft: 80, marginTop: -5 }} onClick={() => { removeFile(1, index) }}></img>
                        <img src={pdf_icon} height={90} width={100} onClick={() => updateFile(1, index)}></img>
                        <p style={{ textAlign: 'center' }}>{item['name'].slice(0, 10)}</p>
                    </div>
                ))}
            </>
        )
    }

    const SecondDocument = () => {
        return (
            <>
                {second_document?.map((item, index) => (
                    <div key={index}>
                        <img src={cancel_icon} height={20} width={20} style={{ position: 'absolute', marginLeft: 80, marginTop: -5 }} onClick={() => { removeFile(2, index) }}></img>
                        <img src={pdf_icon} height={90} width={100} onClick={() => updateFile(2, index)}></img>
                        <p style={{ textAlign: 'center' }}>{item['name'].slice(0, 10)}</p>
                    </div>
                ))}
            </>
        )
    }

    const ThirdDocument = () => {
        return (
            <>
                {third_document?.map((item, index) => (
                    <div key={index}>
                        <img src={cancel_icon} height={20} width={20} style={{ position: 'absolute', marginLeft: 80, marginTop: -5 }} onClick={() => { removeFile(3, index) }}></img>
                        <img src={pdf_icon} height={90} width={100} onClick={() => updateFile(3, index)}></img>
                        <p style={{ textAlign: 'center' }}>{item['name'].slice(0, 10)}</p>
                    </div>
                ))}
            </>
        )
    }

    return (
        <>
            <Modal.Body className="overlay overlay-block cursor-default">
                <h3>Documents to upload</h3>
                <p>* Identification Document of the Legal Representative * Identity card issued by the Electoral Tribunal / Passport and provisional Residence Card (current, scanned on both sides, legible, in .pdf format.)</p>
                <input type="file" id='firstFile' onChange={onFileUpload} multiple={true} accept=".pdf" hidden={true}></input>
                <input type="file" id='firstFileUpdate' onChange={onFileUpdate} accept=".pdf" hidden={true}></input>
                <div className="row">
                    <div onClick={() => uploadFile(1)} style={{ borderWidth: 1, borderRadius: 5, borderStyle: "dashed", height: 100, width: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={add_file_icon} height={90} width={90}></img>
                    </div>
                    <FirstDocument></FirstDocument>
                </div>
                <p>* Articles of incorporation and its modifications * (all pages scanned, legible on both sides and in .pdf format)</p>
                <input type="file" id='secondFile' onChange={onFileUpload} multiple={true} accept=".pdf" hidden={true}></input>
                <input type="file" id='secondFileUpdate' onChange={onFileUpdate} accept=".pdf" hidden={true}></input>
                <div className="row">
                    <div onClick={() => uploadFile(2)} style={{ borderWidth: 1, borderRadius: 5, borderStyle: "dashed", height: 100, width: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={add_file_icon} height={90} width={90}></img>
                    </div>
                    <SecondDocument></SecondDocument>
                </div>
                <p>* Notice of operations * (scanned, legible and in .pdf format)</p>
                <input type="file" id='thirdFile' onChange={onFileUpload} multiple={true} accept=".pdf" hidden={true}></input>
                <input type="file" id='thirdFileUpdate' onChange={onFileUpdate} accept=".pdf" hidden={true}></input>
                <div className="row">
                    <div onClick={() => uploadFile(3)} style={{ borderWidth: 1, borderRadius: 5, borderStyle: "dashed", height: 100, width: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={add_file_icon} height={90} width={90}></img>
                    </div>
                    <ThirdDocument></ThirdDocument>
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

export default injectIntl(connect(null, null)(UploadDocument));
