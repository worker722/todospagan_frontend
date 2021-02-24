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

const CustomerEditSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Firstname is required"),
    secondName: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Secondname is required"),
    surname: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Surname is required"),
    secondSurname: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Second Surname is required"),
    marriedSurname: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Married Surname is required"),
    personal_phone_1: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Phone Number is required"),
    personal_phone_2: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Phone Number is required"),
    email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
    userName: Yup.string().required("Username is required"),
    dateOfBbirth: Yup.mixed()
        .nullable(false)
        .required("Date of Birth is required"),
    countryOfBbirth: Yup.mixed()
        .nullable(false)
        .required("Date of Birth is required"),
    ipAddress: Yup.string().required("ID or Passport is required"),
    residentialTel: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Residential telephone is required"),
    cell: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Cell telephone is required"),
    profession: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Profession or occupation is required"),
    economicActivity: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Economic activity is required"),
    province: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Province is required"),
    district: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("District is required"),
    township: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Township is required"),
    neighborhood: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Township is required"),
    avenue: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Township is required"),
    edifice: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Township is required"),
    house: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Township is required"),
    reference: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Township is required"),
});
const initCustomer = {
    id: undefined,
    firstName: "",
    secondName: "",
    surname: "",
    secondSurname: "",
    marriedSurname: "",
    personal_phone_1: "",
    personal_phone_2: "",
    email: "",
    userName: "",
    gender: "Female",
    status: 0,
    dateOfBbirth: "",
    ipAddress: "",
    residentialTel: "",
    cell: "",
    profession: "",
    economicActivity: "",
    province: "",
    district: "",
    township: "",
    neighborhood: "",
    avenue: "",
    edifice: "",
    house: "",
    reference: "",
    type: 1
};
const PersonalRefrence = (props) => {
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
                                <h3>Personal information</h3>
                                <hr></hr>
                                <div className="form-group row">
                                    {/* First Name */}
                                    <div className="col-lg-3">
                                        <Field
                                            name="firstName"
                                            component={Input}
                                            placeholder="First Name"
                                            label="First Name"
                                        />
                                    </div>
                                    {/* Last Name */}
                                    <div className="col-lg-3">
                                        <Field
                                            name="secondName"
                                            component={Input}
                                            placeholder="Second Name"
                                            label="Second Name"
                                        />
                                    </div>
                                    {/* Login */}
                                    <div className="col-lg-3">
                                        <Field
                                            name="surname"
                                            component={Input}
                                            placeholder="Surname"
                                            label="Surname"
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <Field
                                            name="secondSurname"
                                            component={Input}
                                            placeholder="Second Surname"
                                            label="Second Surname"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-3">
                                        <Field
                                            name="marriedSurname"
                                            component={Input}
                                            placeholder="Married Surname"
                                            label="Married Surname"
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <Field
                                            name="personal_phone_1"
                                            component={Input}
                                            placeholder="Personal phone 1"
                                            label="Personal phone 1"
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <Field
                                            name="personal_phone_2"
                                            component={Input}
                                            placeholder="Personal phone 2"
                                            label="Personal phone 2"
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
                                            placeholder="Province"
                                            label="Province"
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <Field
                                            name="district"
                                            component={Input}
                                            placeholder="District"
                                            label="District"
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <Field
                                            name="township"
                                            component={Input}
                                            placeholder="Township"
                                            label="Township"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-3">
                                        <Field
                                            name="neighborhood"
                                            component={Input}
                                            placeholder="Neighborhood"
                                            label="Neighborhood"
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <Field
                                            name="avenue"
                                            component={Input}
                                            placeholder="Avenue"
                                            label="Avenue"
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <Field
                                            name="edifice"
                                            component={Input}
                                            placeholder="Edifice"
                                            label="Edifice"
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <Field
                                            name="house"
                                            component={Input}
                                            placeholder="House or Apt"
                                            label="House or Apt"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row justify-content-end">
                                    <div className="col-lg-5">
                                        <Field
                                            name="reference"
                                            component={Input}
                                            placeholder="Reference point"
                                            label="Reference point"
                                        />
                                    </div>
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

export default injectIntl(connect(null, null)(PersonalRefrence));