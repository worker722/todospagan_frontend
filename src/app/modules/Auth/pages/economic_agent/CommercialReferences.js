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
} from "../../../../../_metronic/_partials/controls";
import countryList from 'react-select-country-list'
import { shallowEqual, useSelector } from "react-redux";
import * as auth from "../../_redux/authRedux";

const CustomerEditSchema = Yup.object().shape({
    commercial_reference: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("This field is required"),
    business_name: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("This field is required"),
    RUC: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("This field is required"),
    main_economic_activity: Yup.string().required("This field is required"),
    web_page: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("This field is required"),
    company_email_1: Yup.string()
        .email("Invalid email")
        .required("This field is required"),
    company_email_2: Yup.string()
        .email("Invalid email")
        .required("This field is required"),
    company_phone_1: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("This field is required"),
    company_phone_2: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("This field is required"),
    province: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("This field is required"),
    district: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("This field is required"),
    township: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("This field is required"),
    neighborhood: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("This field is required"),
    avenue: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("This field is required"),
    edifice: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("This field is required"),
    house: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("This field is required"),
    reference: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("This field is required"),
});
const initCustomer = {
    id: undefined,
    commercial_reference: "",
    business_name: "",
    RUC: "",
    main_economic_activity: "",
    web_page: "",
    company_email_1: "",
    company_email_2: "",
    company_phone_1: "",
    company_phone_2: "",
    province: "",
    district: "",
    township: "",
    neighborhood: "",
    avenue: "",
    edifice: "",
    house: "",
    reference: "",
    country: "PA",
    type: 1
};
const CommercialReferences = (props) => {
    const { onHide, setProgress, setContentName } = props;
    setProgress(40);
    const countryLists = useMemo(() => countryList().getData(), []);
    const { commercial_references_data } = useSelector((state) => state.auth);
    
    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={commercial_references_data?commercial_references_data:initCustomer}
                validationSchema={CustomerEditSchema}
                onSubmit={(values) => {
                    props.setCommercialReferences(values);
                    setContentName('AgentResidentDetails');
                }}
            >
                {({ handleSubmit }) => (
                    <>
                        <Modal.Body className="overlay overlay-block cursor-default">
                            <Form className="form form-label-right">
                                <h3>Commercial references</h3>
                                <hr></hr>
                                <div className="form-group row">
                                    <div className="col-lg-3">
                                        <Field
                                            name="commercial_reference"
                                            component={Input}
                                            label="Commercial reference"
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <Field
                                            name="business_name"
                                            component={Input}
                                            label="Business Name"
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <Field
                                            name="RUC"
                                            component={Input}
                                            label="RUC"
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <Field
                                            name="main_economic_activity"
                                            component={Input}
                                            label="Main economic activity"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-3">
                                        <Field
                                            name="web_page"
                                            component={Input}
                                            label="Web page"
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <Field
                                            type="email"
                                            name="company_email_1"
                                            component={Input}
                                            label="Company Email 1"
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <Field
                                            type="email"
                                            name="company_email_2"
                                            component={Input}
                                            label="Company Email 2"
                                        />
                                    </div>

                                    <div className="col-lg-3">
                                        <Field
                                            name="company_phone_1"
                                            component={Input}
                                            label="Company Phone 1"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-3">
                                        <Field
                                            name="company_phone_2"
                                            component={Input}
                                            label="Company Phone 2"
                                        />
                                    </div>
                                </div>
                                <h3>Residential address</h3>
                                <hr></hr>
                                <div className="form-group row">
                                    <div className="col-lg-3">
                                        <Select name="country" label="Country">
                                            {countryLists?.map((country, index) => {
                                                return (
                                                    <option key={index} value={country.value}>{country.label}</option>
                                                )
                                            })}
                                        </Select>
                                    </div>
                                    <div className="col-lg-3">
                                        <Field
                                            name="province"
                                            component={Input}
                                            label="Province"
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <Field
                                            name="district"
                                            component={Input}
                                            label="District"
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <Field
                                            name="township"
                                            component={Input}
                                            label="Township"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-3">
                                        <Field
                                            name="neighborhood"
                                            component={Input}
                                            label="Neighborhood"
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <Field
                                            name="avenue"
                                            component={Input}
                                            label="Avenue"
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <Field
                                            name="edifice"
                                            component={Input}
                                            label="Edifice"
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <Field
                                            name="house"
                                            component={Input}
                                            label="House or Apt"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row justify-content-end">
                                    <div className="col-lg-5">
                                        <Field
                                            name="reference"
                                            component={Input}
                                            label="Reference point"
                                        />
                                    </div>
                                </div>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <button
                                type="button"
                                onClick={() => setContentName("CompanyData")}
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

export default injectIntl(connect(null, auth.actions)(CommercialReferences));