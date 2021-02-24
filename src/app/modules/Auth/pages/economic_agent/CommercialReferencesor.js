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
    employment_situation: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Employment situation is required"),
    work_place: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Workplace is required"),
    work_phone: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Work Phone is required"),
    work_email: Yup.string()
        .email("Invalid email")
        .required("Work Email is required"),
    monthly_income: Yup.number()
        .min(1, "$1 is minimum")
        .max(1000000, "$1000000 is maximum")
        .required("Monthly income is required"),
    other_income: Yup.number()
        .min(1, "$1 is minimum")
        .max(1000000, "$1000000 is maximum")
        .required("Other recurring income is required"),
    source_income: Yup.number()
        .min(1, "$1 is minimum")
        .max(1000000, "$1000000 is maximum")
        .required("Source of recurring income is required"),
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
        .required("Neighborhood is required"),
    avenue: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Avenue is required"),
    edifice: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Edifice is required"),
    house: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("House or Apt is required"),
    reference: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("Township is required"),
    start_date: Yup.mixed()
        .nullable(false)
        .required("Start Date is required"),
});
const initCustomer = {
    id: undefined,
    employment_situation: "",
    work_place: "",
    work_phone: "",
    work_email: "",
    monthly_income: "",
    other_income: "",
    source_income: "",
    gender: "Female",
    status: 0,
    province: "",
    district: "",
    township: "",
    neighborhood: "",
    avenue: "",
    edifice: "",
    house: "",
    reference: "",
    start_date: "",
    type: 1
};
const CommercialReferencesor = (props) => {
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
                                    <div className="col-lg-3">
                                        <Field
                                            name="employment_situation"
                                            component={Input}
                                            placeholder="Employment situation"
                                            label="Employment situation"
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <Field
                                            name="work_place"
                                            component={Input}
                                            placeholder="Workplace"
                                            label="Workplace"
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <Field
                                            name="work_phone"
                                            component={Input}
                                            placeholder="Work phone"
                                            label="Work phone"
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <Field
                                            name="work_email"
                                            component={Input}
                                            placeholder="Work email"
                                            label="Work email"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-3">
                                        <DatePickerField
                                            name="start_date"
                                            label="Current Work Start Date"
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <Field
                                            type="number"
                                            name="monthly_income"
                                            component={Input}
                                            placeholder="Price"
                                            label="Monthly income"
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <Field
                                            type="number"
                                            name="other_income"
                                            component={Input}
                                            placeholder="Price"
                                            label="Other recurring income"
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <Field
                                            type="number"
                                            name="source_income"
                                            component={Input}
                                            placeholder="Price"
                                            label="Source of recurring income"
                                        />
                                    </div>
                                </div>
                                <h6>Residential address</h6>
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

export default injectIntl(connect(null, null)(CommercialReferencesor));