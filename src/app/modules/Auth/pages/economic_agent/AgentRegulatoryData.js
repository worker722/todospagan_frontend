import React, { useEffect, useMemo, useState } from "react";
import { Formik, Field } from "formik";
import { Modal, Card, Button, ProgressBar, Form, Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import {
    Input,
    Select,
    DatePickerField,
    Checkbox
} from "../../../../../_metronic/_partials/controls";
import countryList from 'react-select-country-list'
import { shallowEqual, useSelector } from "react-redux";
import * as auth from "../../_redux/authRedux";
import Moment from 'moment';
import { useToasts } from 'react-toast-notifications'
import { economic_agent_insert } from "../../_redux/authCrud";

const CustomerEditSchema = Yup.object().shape({
    fir_post: Yup.string()
        .max(50, "Maximum 50 symbols"),
    fir_institution: Yup.string()
        .max(50, "Maximum 50 symbols"),
    fir_charge: Yup.string()
        .max(50, "Maximum 50 symbols"),
    fir_finish_date: Yup.mixed()
        .nullable(false),
    sec_person: Yup.string()
        .max(50, "Maximum 50 symbols"),
    sec_post: Yup.string()
        .max(50, "Maximum 50 symbols"),
    sec_charge: Yup.string()
        .max(50, "Maximum 50 symbols"),
    sec_finish_date: Yup.mixed()
        .nullable(false),
    acceptTerms: Yup.bool().required(
        "You must accept the terms and conditions"
        ),
});
const initCustomer = {
    id: undefined,
    fir_post: "",
    fir_institution: "",
    fir_charge: "",
    fir_finish_date: "",
    sec_person: "",
    sec_post: "",
    sec_charge: "",
    sec_finish_date: "",
    acceptTerms: false,
    type: 1
};
const AgentRegulatoryData = (props) => {
    const { onHide, setProgress, setContentName } = props;
    const [is_exceed, setExceed] = useState(false);
    const countryLists = useMemo(() => countryList().getData(), []);
    const { agent_regulatory, agent_document, shareholder_data, company_data, commercial_references_data, agent_resident_details } = useSelector((state) => state.auth);
    const [showPolitical, setShowPolitical] = useState(true);
    const [showRelationShip, setShowRelationShip] = useState(true);
    const [allowTearms, setTearms] = useState(false);
    console.log(agent_regulatory);
    const { addToast } = useToasts()
    useEffect(() => {
        if(agent_regulatory) {
            setExceed(agent_regulatory?agent_regulatory['is_exceed']:false);
            setShowPolitical(agent_regulatory?agent_regulatory['is_fir_politician']:false);
            setShowRelationShip(agent_regulatory?agent_regulatory['is_sec_plitician']:false);
        }
    }, [])
    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={agent_regulatory?agent_regulatory:initCustomer}
                validationSchema={CustomerEditSchema}
                onSubmit={(values) => {
                    if(!allowTearms) {
                        addToast('You must agree before submitting.', {
                            appearance: 'warning',
                            autoDismiss: true,
                          })
                        return;
                    }
                    values['is_exceed'] = is_exceed;
                    values['is_fir_politician'] = showPolitical;
                    console.log(showPolitical);
                    values['is_sec_plitician'] = showRelationShip;
                    console.log(is_exceed);
                    var fir_finish_date = values['fir_finish_date'];
                    values['fir_finish_date'] = Moment(fir_finish_date).format('YYYY-MM-DD');
                    var sec_finish_date = values['sec_finish_date'];
                    values['sec_finish_date'] = Moment(sec_finish_date).format('YYYY-MM-DD');
                    props.setAgentRegulatory(values);
                    economic_agent_insert(company_data, commercial_references_data, agent_resident_details, shareholder_data, agent_document, values)
                    .then(({ data }) => {
                        console.log(data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                }}
            >
                {({ handleSubmit }) => (
                    <>
                        <Modal.Body className="overlay overlay-block cursor-default">
                            <Form className="form form-label-right">
                                <h3>Regulatory data</h3>
                                <hr></hr>
                                <p><b>Is or has been in the last two (02) years a politically exposed person (performs or has performed prominent public functions, that he belongs or has belonged to a political party)?</b></p>
                                <Form.Group>
                                    <Row>
                                        <Form.Check
                                            checked={showPolitical}
                                            onChange={(value) => setShowPolitical(true)}
                                            style={{ paddingLeft: 30 }}
                                            type="radio"
                                            label="Yes"
                                            name="political"
                                            id="political1"
                                        />
                                        <Form.Check
                                            checked={!showPolitical}
                                            style={{ paddingLeft: 30 }}
                                            onChange={(value) => setShowPolitical(false)}
                                            type="radio"
                                            label="No"
                                            name="political"
                                            id="political2"
                                        />
                                    </Row>
                                </Form.Group>
                                <div className="form-group row">
                                    <div className="col-lg-3">
                                        <Field
                                            name="fir_post"
                                            component={Input}
                                            placeholder="post"
                                            label="Post"
                                            disabled={!showPolitical}
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <Field
                                            name="fir_institution"
                                            component={Input}
                                            placeholder="institution"
                                            label="Institution"
                                            disabled={!showPolitical}
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <Field
                                            name="fir_charge"
                                            component={Input}
                                            placeholder="charge"
                                            label="Are you currently in charge?"
                                            disabled={!showPolitical}
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <DatePickerField
                                            name="fir_finish_date"
                                            label="Finish Date"
                                            disabled={!showPolitical}
                                        />
                                    </div>
                                </div>
                                <p><b>Do you have or have you had in the last two (02) years a relationship with a politically exposed person, who belongs or has belonged to a political party?</b></p>
                                <Form.Group>
                                    <Row>
                                        <Form.Check
                                            checked={showRelationShip}
                                            onChange={(value) => setShowRelationShip(true)}
                                            style={{ paddingLeft: 30 }}
                                            type="radio"
                                            label="Yes"
                                            name="relationship"
                                            id="relationship1"
                                        />
                                        <Form.Check
                                            checked={!showRelationShip}
                                            style={{ paddingLeft: 30 }}
                                            onChange={(value) => setShowRelationShip(false)}
                                            type="radio"
                                            label="No"
                                            name="relationship"
                                            id="relationship2"
                                        />
                                    </Row>
                                </Form.Group>
                                <div className="form-group row">
                                    <div className="col-lg-3">
                                        <Field
                                            name="sec_person"
                                            component={Input}
                                            placeholder="person"
                                            label="Relationship with the person"
                                            disabled={!showRelationShip}
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <Field
                                            name="sec_post"
                                            component={Input}
                                            placeholder="post"
                                            label="Post"
                                            disabled={!showRelationShip}
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <Field
                                            name="sec_charge"
                                            component={Input}
                                            placeholder="charge"
                                            label="Are you currently in charge?"
                                            disabled={!showRelationShip}
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <DatePickerField
                                            name="sec_finish_date"
                                            label="Finish Date"
                                            disabled={!showRelationShip}
                                        />
                                    </div>
                                </div>
                                <p><b>Will the credit transactions you expect to transmit or consult on the Todos Pagan platform exceed US $ 5,000.00 per month?</b></p>
                                <Form.Group>
                                    <Row>
                                        <Form.Check
                                            defaultChecked={is_exceed}
                                            onChange={(value) => setExceed(true)}
                                            style={{ paddingLeft: 30 }}
                                            type="radio"
                                            label="Yes"
                                            name="transaction"
                                            id="transaction1"
                                        />
                                        <Form.Check
                                            defaultChecked={!is_exceed}
                                            style={{ paddingLeft: 30 }}
                                            onChange={(value) => setExceed(false)}
                                            type="radio"
                                            label="No"
                                            name="transaction"
                                            id="transaction2"
                                        />
                                    </Row>
                                </Form.Group>
                                <h3>Sworn declaration</h3>
                                <div className="form-control" style={{ margin: 20, overflowY: 'scroll', height: 100 }}>
                                    <p>I certify that all the information provided is true and I assume the responsibility that derives from the erroneous, false or inaccurate information that has been provided in this registry and in its updates.
 
                                    I expressly declare that my activities are legal and comply with the prevention of the risk of money laundering, the financing of terrorism and the financing of the proliferation of weapons of mass destruction.
                                    
                                    Under oath, I declare that I am aware of the provisions of Law No. 23 of April 27, 2015 and Agreement No. 10-2015 of July 27, 2015, issued by the Superintendency of Banks of Panama, I declare in favor of the Data Information Agency Todos Pagan, SA and other entities that form it or become part of the Economic Group to which it belongs, that my activities are framed within the scope of the Law; and that the resources that I manage in my commercial activity come from and will be used for legal activities or purposes.</p>
                                </div>
                                <Form.Group>
                                    <Form.Check
                                        defaultValue={false}
                                        onChange={(value) => setTearms(value.target.checked)}
                                        required
                                        label="I agree with the terms of use of Todos Pagan S.A."
                                        feedback="You must agree before submitting."
                                    />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <button
                                type="button"
                                onClick={() => setContentName("AgentUploadDocument")}
                                className="btn btn-light btn-elevate"
                            >
                                Previous
                            </button>
                            <> </>
                            <button
                                type="submit"
                                onClick={() => handleSubmit()}
                                className="btn btn-primary btn-elevate"
                            >
                                Next
                            </button>
                        </Modal.Footer>
                    </>
                )}
            </Formik>
        </>
    )
}

export default injectIntl(connect(null, auth.actions)(AgentRegulatoryData));