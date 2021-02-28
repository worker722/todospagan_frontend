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
    email: Yup.string()
        .email("Invalid email")
        .required("This field is required"),
    birth_date: Yup.mixed()
        .nullable(false)
        .required("This field is required"),
    birth_country: Yup.mixed()
        .nullable(false)
        .required("This field is required"),
    passport: Yup.string().required("This field is required"),
    telephone_number: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("This field is required"),
    cell: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("This field is required"),
    profession: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("This field is required"),
    position: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("This field is required"),
    economic_activity: Yup.string()
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
    email: "",
    status: 0,
    gender: "Female",
    birth_country: "",
    birth_date: "",
    passport: "",
    telephone_number: "",
    cell: "",
    profession: "",
    position: "",
    economic_activity: "",
    province: "",
    district: "",
    township: "",
    neighborhood: "",
    avenue: "",
    edifice: "",
    house: "",
    reference: "",
    nationality: "PA",
    country: "PA",
    marital_status: "active",
    education: "0",
    type: 1
};
const UserInfo = (props) => {
    const { onHide, setProgress, setContentName } = props;
    setProgress(20);
    const countryLists = useMemo(() => countryList().getData(), []);
    const { user_info } = useSelector((state) => state.auth);

    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={user_info?user_info:initCustomer}
                validationSchema={CustomerEditSchema}
                onSubmit={(values) => {
                    var birth_country = values['birth_country'];
                    values['birth_country'] = Moment(birth_country).format('YYYY-MM-DD');
                    var birth_date = values['birth_date'];
                    values['birth_date'] = Moment(birth_date).format('YYYY-MM-DD');
                    props.setUserInfo(values);
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
                                    {/* Date of birth */}
                                    <div className="col-lg-3">
                                        <DatePickerField
                                            name="birth_date"
                                            label="Date of Birth"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-3">
                                        <Select name="marital_status" label="Marital status">
                                            <option value="active">yes</option>
                                            <option value="disable">no</option>
                                        </Select>
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
                                    <div className="col-lg-3">
                                        <Field
                                            name="telephone_number"
                                            component={Input}
                                            label="Residential telephone"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-3">
                                        <Field
                                            name="cell"
                                            component={Input}
                                            label="Cell"
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <Field
                                            type="email"
                                            name="email"
                                            component={Input}
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
                                            label="Profession or occupation"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-3">
                                        <Field
                                            name="position"
                                            component={Input}
                                            label="Position"
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <Field
                                            name="economic_activity"
                                            component={Input}
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
                                onClick={() => setContentName("")}
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

export default injectIntl(connect(null, auth.actions)(UserInfo));