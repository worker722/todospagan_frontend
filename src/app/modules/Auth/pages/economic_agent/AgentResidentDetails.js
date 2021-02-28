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
import Moment from 'moment';

const CustomerEditSchema = Yup.object().shape({
    first_name: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("This field is required"),
    second_name: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("This field is required"),
    first_surname: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("This field is required"),
    second_surname: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("This field is required"),
    married_surname: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("This field is required"),
    birth_date: Yup.mixed()
        .nullable(false)
        .required("This field is required"),
    birth_country: Yup.mixed()
        .nullable(false)
        .required("This field is required"),
    passport: Yup.string().required("This field is required"),
    marital_status: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("This field is required"),
    main_phone: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("This field is required"),
    secondary_phone: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("This field is required"),
    primary_cell: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("This field is required"),
    secondary_cell: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("This field is required"),
    primary_email: Yup.string()
        .email("Invalid email")
        .required("This field is required"),
    secondary_email: Yup.string()
        .email("Invalid email")
        .required("This field is required"),
    post: Yup.string()
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
        .required("Township is required"),
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
    first_name: "",
    second_name: "",
    first_surname: "",
    second_surname: "",
    married_surname: "",
    status: 0,
    birth_country: "",
    birth_date: "",
    passport: "",
    marital_status: "",
    main_phone: "",
    secondary_phone: "",
    primary_cell: "",
    secondary_cell: "",
    primary_email: "",
    secondary_email: "",
    post: "",
    province: "",
    district: "",
    township: "",
    neighborhood: "",
    avenue: "",
    edifice: "",
    house: "",
    reference: "",
    gender: "Female",
    residence_country: "PA",
    nationality: "PA",
    passport_country: "PA",
    type: 1
};
const AgentResidentDetails = (props) => {
    const { onHide, setProgress, setContentName } = props;
    setProgress(60);
    const countryLists = useMemo(() => countryList().getData(), []);
    const { agent_resident_details } = useSelector((state) => state.auth);
    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={agent_resident_details ? agent_resident_details : initCustomer}
                validationSchema={CustomerEditSchema}
                onSubmit={(values) => {
                    var birth_country = values['birth_country'];
                    values['birth_country'] = Moment(birth_country).format('YYYY-MM-DD');
                    var birth_date = values['birth_date'];
                    values['birth_date'] = Moment(birth_date).format('YYYY-MM-DD');
                    props.setAgentResidentDetails(values);
                    setContentName("ShareholderData");
                }}
            >
                {({ handleSubmit }) => (
                    <>
                        <Modal.Body className="overlay overlay-block cursor-default">
                            <Form className="form form-label-right">
                                <h3>Resident agent details</h3>
                                <hr></hr>
                                <div className="form-group row">
                                    {/* First Name */}
                                    <div className="col-lg-3">
                                        <Field
                                            name="first_name"
                                            component={Input}
                                            label="First Name"
                                        />
                                    </div>
                                    {/* Last Name */}
                                    <div className="col-lg-3">
                                        <Field
                                            name="second_name"
                                            component={Input}
                                            label="Second Name"
                                        />
                                    </div>
                                    {/* Login */}
                                    <div className="col-lg-3">
                                        <Field
                                            name="first_surname"
                                            component={Input}
                                            label="Surname"
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <Field
                                            name="second_surname"
                                            component={Input}
                                            label="Second Surname"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-3">
                                        <Field
                                            name="married_surname"
                                            component={Input}
                                            label="Married Surname"
                                        />
                                    </div>
                                    {/* Gender */}
                                    <div className="col-lg-3">
                                        <Select name="gender" label="Gender">
                                            <option value="Female">Female</option>
                                            <option value="Male">Male</option>
                                        </Select>
                                    </div>
                                    {/* IP Address */}
                                    <div className="col-lg-3">
                                        <Field
                                            name="passport"
                                            component={Input}
                                            label="ID or Passport"
                                        // customFeedbackLabel="We'll never share customer IP Address with anyone else"
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <Select name="passport_country" label="Passport issuing country">
                                            {countryLists?.map((country, index) => {
                                                return (
                                                    <option key={index} value={country.value}>{country.label}</option>
                                                )
                                            })}
                                            {/*  */}
                                            {/* <option value="Male">Male</option> */}
                                        </Select>
                                    </div>
                                </div>
                                <div className="form-group row">

                                    <div className="col-lg-3">
                                        <DatePickerField
                                            name="birth_date"
                                            label="Date of Birth"
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <Field
                                            name="marital_status"
                                            component={Input}
                                            label="Marital status"
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <DatePickerField
                                            name="birth_country"
                                            label="Country of Birth"
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <Select name="nationality" label="Nationality">
                                            {countryLists?.map((country, index) => {
                                                return (
                                                    <option key={index} value={country.value}>{country.label}</option>
                                                )
                                            })}
                                            {/*  */}
                                            {/* <option value="Male">Male</option> */}
                                        </Select>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-3">
                                        <Select name="residence_country" label="Country of Residence">
                                            {countryLists?.map((country, index) => {
                                                return (
                                                    <option key={index} value={country.value}>{country.label}</option>
                                                )
                                            })}
                                            {/*  */}
                                            {/* <option value="Male">Male</option> */}
                                        </Select>
                                    </div>
                                    <div className="col-lg-3">
                                        <Field
                                            name="main_phone"
                                            component={Input}
                                            label="Main phone"
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <Field
                                            name="secondary_phone"
                                            component={Input}
                                            label="Secondary Phone"
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <Field
                                            name="primary_cell"
                                            component={Input}
                                            label="Primary cell"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-3">
                                        <Field
                                            name="secondary_cell"
                                            component={Input}
                                            label="Secondary cell"
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <Field
                                            type="email"
                                            name="primary_email"
                                            component={Input}
                                            label="Primary email"
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <Field
                                            type="email"
                                            name="secondary_email"
                                            component={Input}
                                            label="Secondary email"
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <Field
                                            name="post"
                                            component={Input}
                                            label="Post"
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
                                onClick={() => setContentName("CommercialReferences")}
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

export default injectIntl(connect(null, auth.actions)(AgentResidentDetails));