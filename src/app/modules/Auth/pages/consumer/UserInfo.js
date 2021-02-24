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
    position: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Position is required"),
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
    email: "",
    userName: "",
    gender: "Female",
    status: 0,
    dateOfBbirth: "",
    countryOfBbirth: "",
    ipAddress: "",
    residentialTel: "",
    cell: "",
    profession: "",
    position: "",
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
const UserInfo = (props) => {
    const { onHide, setProgress, setContentName } = props;
    setProgress(20);
    const countryLists = useMemo(() => countryList().getData(), []);
    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={initCustomer}
                validationSchema={CustomerEditSchema}
                onSubmit={(values) => {
                    console.log(values);
                    setContentName("LaborData");
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
                                    {/* Gender */}
                                    <div className="col-lg-3">
                                        <Select name="Gender" label="Gender">
                                            <option value="Female">Female</option>
                                            <option value="Male">Male</option>
                                        </Select>
                                    </div>
                                    {/* IP Address */}
                                    <div className="col-lg-3">
                                        <Field
                                            name="ipAddress"
                                            component={Input}
                                            placeholder="ID or Passport"
                                            label="ID or Passport"
                                        // customFeedbackLabel="We'll never share customer IP Address with anyone else"
                                        />
                                    </div>
                                    {/* Date of birth */}
                                    <div className="col-lg-3">
                                        <DatePickerField
                                            name="dateOfBbirth"
                                            label="Date of Birth"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-3">
                                        <Select name="type" label="Type">
                                            <option value="0">Business</option>
                                            <option value="1">Individual</option>
                                        </Select>
                                    </div>
                                    <div className="col-lg-3">
                                        <DatePickerField
                                            name="countryOfBbirth"
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
                                    <div className="col-lg-3">
                                        <Field
                                            name="residentialTel"
                                            component={Input}
                                            placeholder="Residential telephone"
                                            label="Residential telephone"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-3">
                                        <Field
                                            name="cell"
                                            component={Input}
                                            placeholder="Cell"
                                            label="Cell"
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <Field
                                            type="email"
                                            name="email"
                                            component={Input}
                                            placeholder="Email"
                                            label="Email"
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <Select name="education" label="Education">
                                            <option value="0">Business</option>
                                            <option value="1">Individual</option>
                                        </Select>
                                    </div>
                                    <div className="col-lg-3">
                                        <Field
                                            type="profession"
                                            name="profession"
                                            component={Input}
                                            placeholder="Profession or occupation"
                                            label="Profession or occupation"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-3">
                                        <Field
                                            name="position"
                                            component={Input}
                                            placeholder="Position"
                                            label="Position"
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <Field
                                            name="economicActivity"
                                            component={Input}
                                            placeholder="Economic activity"
                                            label="Economic activity"
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

export default injectIntl(connect(null, null)(UserInfo));