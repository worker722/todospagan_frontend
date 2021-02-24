import React, { useEffect, useMemo, useState } from "react";
import { Formik, Form, Field } from "formik";
import { Modal, Card, Button, ProgressBar } from "react-bootstrap";
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

const CustomerEditSchema = Yup.object().shape({
    fir_post: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Field is required"),
    fir_institution: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Field is required"),
    fir_charge: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Field is required"),
    fir_finish_date: Yup.mixed()
        .nullable(false)
        .required("Finish Date is required"),
    sec_person: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Field is required"),
    sec_post: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Field is required"),
    sec_charge: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Field is required"),
    sec_finish_date: Yup.mixed()
        .nullable(false)
        .required("Finish Date is required"),
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
    status: 0,
    acceptTerms: false,
    type: 1
};
const AgentRegulatoryData = (props) => {
    const { onHide } = props;
    const countryLists = useMemo(() => countryList().getData(), []);
    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={initCustomer}
                validationSchema={CustomerEditSchema}
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
                {({ handleSubmit }) => (
                    <>
                        <Modal.Body className="overlay overlay-block cursor-default">
                            <Form className="form form-label-right">
                                <h3>Regulatory data</h3>
                                <hr></hr>
                                <p><b>Is or has been in the last two (02) years a politically exposed person (fulfills or has fulfilled prominent public functions, who belongs or has belonged to a political party)?</b></p>
                                <div className="form-group row">
                                    <div className="col-lg-3">
                                        <Field
                                            name="fir_post"
                                            component={Input}
                                            placeholder="Post"
                                            label="Post"
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <Field
                                            name="fir_institution"
                                            component={Input}
                                            placeholder="Institution"
                                            label="Institution"
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <Field
                                            name="fir_charge"
                                            component={Input}
                                            placeholder="charge"
                                            label="Are you currently in charge?"
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <DatePickerField
                                            name="fir_finish_date"
                                            label="Finish Date"
                                        />
                                    </div>
                                </div>
                                <p><b>Do you have or have you had in the last two (02) years a relationship with a politically exposed person, who belongs or has belonged to a political party?</b></p>
                                <div className="form-group row">
                                    <div className="col-lg-3">
                                        <Field
                                            name="sec_person"
                                            component={Input}
                                            placeholder="person"
                                            label="Relationship with the person"
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <Field
                                            name="sec_post"
                                            component={Input}
                                            placeholder="Post"
                                            label="Post"
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <Field
                                            name="sec_charge"
                                            component={Input}
                                            placeholder="charge"
                                            label="Are you currently in charge?"
                                            
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <DatePickerField
                                            name="sec_finish_date"
                                            label="Finish Date"
                                        />
                                    </div>
                                </div>
                                <h3>Sworn declaration</h3>
                                <div style={{ margin: 20, overflowY: 'scroll', maxHeight: 100 }}>
                                    <p>I certify that all the information provided is true and I assume the responsibility that derives from the erroneous, false or inaccurate information that has been provided in this registry and in its updates.
 
 I expressly declare that my activities are legal and comply with the prevention of the risk of money laundering, the financing of terrorism and the financing of the proliferation of weapons of mass destruction.
  
 Under oath, I declare that I am aware of the provisions of Law No. 23 of April 27, 2015 and Agreement No. 10-2015 of July 27, 2015, issued by the Superintendency of Banks of Panama, I declare in favor of the Data Information Agency Todos Pagan, SA and other entities that form it or become part of the Economic Group to which it belongs, that my activities are framed within the scope of the Law; and that the resources that I manage in my commercial activity come from and will be used for legal activities or purposes.</p>
                                </div>
                                <div className="form-group row">
                                    <input type="checkbox" style={{display: "none"}} />
                                    <label className="checkbox checkbox-lg checkbox-single">
                                        <input type="checkbox" name="" onChange={(value) => {console.log(value.target.checked)}} />
                                        <span />
                                        I agree with the terms of use of Todos Pagan S.A.
                                    </label>
                                </div>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <button
                                type="button"
                                onClick={onHide}
                                className="btn btn-light btn-elevate"
                            >
                                Cancel
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

export default injectIntl(connect(null, null)(AgentRegulatoryData));