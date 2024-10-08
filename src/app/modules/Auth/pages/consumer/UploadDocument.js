import React, { useEffect, useMemo, useState } from "react";
import { Modal, Card, Button, ProgressBar } from "react-bootstrap";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import pdf_icon from "../../../../../assets/images/svg/PDF_file_icon.svg";
import add_file_icon from "../../../../../assets/images/svg/add_file_icon.svg";
import cancel_icon from "../../../../../assets/images/icons/cancel.png";
import { shallowEqual, useSelector } from "react-redux";
import * as auth from "../../_redux/authRedux";
const UploadDocument = (props) => {
    const { onHide, setProgress, setContentName } = props;
    setProgress(80);
    const [first_document, setFirst] = useState([]);
    const [second_document, setSecond] = useState([]);
    const [third_document, setThird] = useState([]);
    const [fourth_document, setFourth] = useState([]);
    const [input_name, setInputTypeName] = useState(1);
    const [update_index, setUpdateIndex] = useState(0);

    const { consumer_document } = useSelector((state) => state.auth);
    useEffect(() => {
        console.log(consumer_document);
        if(consumer_document) {
            setFirst(consumer_document.first_document);
            setSecond(consumer_document.second_document);
            setThird(consumer_document.third_document);
            setFourth(consumer_document.fourth_document);
        }
    }, [consumer_document])

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
                case 4:
                    for (let i = 0; i < files.length; i++) {
                        setFourth(fourth_document => [...fourth_document, files[i]]);
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
                case 4:
                    fourth_document[update_index] = files[0];
                    setFourth(fourth_document => [...fourth_document]);
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
            case 4:
                document.getElementById('fourthFile').click();
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
            case 4:
                setFourth(fourth_document.filter((_, i) => i !== index));
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
            case 4:
                document.getElementById('fourthFileUpdate').click();
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
        console.log(second_document)
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

    const FourthDocument = () => {
        return (
            <>
                {fourth_document?.map((item, index) => (
                    <div key={index}>
                        <img src={cancel_icon} height={20} width={20} style={{ position: 'absolute', marginLeft: 80, marginTop: -5 }} onClick={() => { removeFile(4, index) }}></img>
                        <img src={pdf_icon} height={90} width={100} onClick={() => updateFile(4, index)}></img>
                        <p style={{ textAlign: 'center' }}>{item['name'].slice(0, 10)}</p>
                    </div>
                ))}
            </>
        )
    }
    const nextPage = () => {
        const data = {
            'first_document': first_document,
            'second_document': second_document,
            'third_document': third_document,
            'fourth_document': fourth_document
        }
        props.setConsumerDocument(data);
        setContentName("RegulatoryData");
    }
    return (
        <>
            <Modal.Body className="overlay overlay-block cursor-default">
                <h3>Documents to upload</h3>
                <p>* Identification Document: * Identity card issued by the Electoral Tribunal / Passport and provisional Residence Card or Refugee Card issued by the National Migration Service (current, scanned on both sides, legible, in case of passport, copy of the ( s) page (s) where the photograph, signature and generals of the applicant appear and the page where the stamp of entry to the country is stamped, in .pdf format.)</p>
                <input type="file" id='firstFile' onChange={onFileUpload} multiple={true} accept=".pdf" hidden={true}></input>
                <input type="file" id='firstFileUpdate' onChange={onFileUpdate} accept=".pdf" hidden={true}></input>
                <div className="row">
                    <div onClick={() => uploadFile(1)} style={{ borderWidth: 1, borderRadius: 5, borderStyle: "dashed", height: 100, width: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={add_file_icon} height={90} width={90}></img>
                    </div>
                    <FirstDocument></FirstDocument>
                </div>
                <p>* Second identification with recent photograph * (legible, on both sides, in .pdf format.)</p>
                <input type="file" id='secondFile' onChange={onFileUpload} multiple={true} accept=".pdf" hidden={true}></input>
                <input type="file" id='secondFileUpdate' onChange={onFileUpdate} accept=".pdf" hidden={true}></input>
                <div className="row">
                    <div onClick={() => uploadFile(2)} style={{ borderWidth: 1, borderRadius: 5, borderStyle: "dashed", height: 100, width: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={add_file_icon} height={90} width={90}></img>
                    </div>
                    <SecondDocument></SecondDocument>

                </div>
                <p>* Notice of operations * in case of being a merchant or exercising a profession in a personal capacity (legible, in .pdf format.)</p>
                <input type="file" id='thirdFile' onChange={onFileUpload} multiple={true} accept=".pdf" hidden={true}></input>
                <input type="file" id='thirdFileUpdate' onChange={onFileUpdate} accept=".pdf" hidden={true}></input>
                <div className="row">
                    <div onClick={() => uploadFile(3)} style={{ borderWidth: 1, borderRadius: 5, borderStyle: "dashed", height: 100, width: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={add_file_icon} height={90} width={90}></img>
                    </div>
                    <ThirdDocument></ThirdDocument>

                </div>
                <p>* Receipt of residential services * in the name of the applicant with the address indicated in the personal data (legible, recent date maximum 3 months, in .pdf format and maximum size ...). If the data does not coincide, attach a letter of authorization that justifies it, mentioning the existing relationship with the owner of the property.</p>
                <input type="file" id='fourthFile' onChange={onFileUpload} multiple={true} accept=".pdf" hidden={true}></input>
                <input type="file" id='fourthFileUpdate' onChange={onFileUpdate} accept=".pdf" hidden={true}></input>
                <div className="row">
                    <div onClick={() => uploadFile(4)} style={{ borderWidth: 1, borderRadius: 5, borderStyle: "dashed", height: 100, width: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={add_file_icon} height={90} width={90}></img>
                    </div>
                    <FourthDocument></FourthDocument>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button
                    type="button"
                    onClick={() => setContentName("PersonalReference")}
                    className="btn btn-light btn-elevate"
                >
                    Previous
                </button>
                <button
                    type="submit"
                    onClick={() => {nextPage()}}
                    className="btn btn-primary btn-elevate"
                >
                    Next
                </button>
            </Modal.Footer>
        </>
    )
}

export default injectIntl(connect(null, auth.actions)(UploadDocument));
