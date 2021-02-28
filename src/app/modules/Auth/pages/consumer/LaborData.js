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
    employment_situation: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("This field is required"),
    work_place: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("This field is required"),
    work_phone: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("This field is required"),
    work_email: Yup.string()
        .email("Invalid email")
        .required("This field is required"),
    monthly_income: Yup.number()
        .min(1, "$1 is minimum")
        .max(1000000, "$1000000 is maximum")
        .required("This field is required"),
    other_recurring_income: Yup.number()
        .min(1, "$1 is minimum")
        .max(1000000, "$1000000 is maximum")
        .required("This field income is required"),
    source_recurring_income: Yup.number()
        .min(1, "$1 is minimum")
        .max(1000000, "$1000000 is maximum")
        .required("This field is required"),
    province: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("This field is required"),
    district: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("District is required"),
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
    current_work_start_date: Yup.mixed()
        .nullable(false)
        .required("This field is required"),
});
const initCustomer = {
    id: undefined,
    employment_situation: "",
    work_place: "",
    work_phone: "",
    work_email: "",
    monthly_income: "",
    other_recurring_income: "",
    source_recurring_income: "",
    province: "",
    district: "",
    township: "",
    neighborhood: "",
    avenue: "",
    edifice: "",
    house: "",
    reference: "",
    current_work_start_date: "",
};
const LaborData = (props) => {
    const { onHide, setProgress, setContentName } = props;
    setProgress(40);
    const countryLists = useMemo(() => countryList().getData(), []);
    const { labor_data } = useSelector((state) => state.auth);
    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={labor_data ? labor_data : initCustomer}
                validationSchema={CustomerEditSchema}
                onSubmit={(values) => {
                    var current_work_start_date = values['current_work_start_date'];
                    values['current_work_start_date'] = Moment(current_work_start_date).format('YYYY-MM-DD');
                    props.setLaborData(values);
                    setContentName("PersonalReference");
                    console.log(values);
                }}
            >
                {({ handleSubmit }) => (
                    <>
                        <Modal.Body className="overlay overlay-block cursor-default">
                            <Form className="form form-label-right">
                                <h3>Labor data</h3>
                                <hr></hr>
                                <div className="form-group row">
                                    <div className="col-lg-3">
                                        <Field
                                            name="employment_situation"
                                            component={Input}
                                            label="Employment situation"
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <Field
                                            name="work_place"
                                            component={Input}
                                            label="Workplace"
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <Field
                                            name="work_phone"
                                            component={Input}
                                            label="Work phone"
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <Field
                                            name="work_email"
                                            component={Input}
                                            label="Work email"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-3">
                                        <DatePickerField
                                            name="current_work_start_date"
                                            label="Current Work Start Date"
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <Field
                                            type="number"
                                            name="monthly_income"
                                            component={Input}
                                            label="Monthly income"
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <Field
                                            type="number"
                                            name="other_recurring_income"
                                            component={Input}
                                            label="Other recurring income"
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <Field
                                            type="number"
                                            name="source_recurring_income"
                                            component={Input}
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
                                onClick={() => { setContentName("UserInfo") }}
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

export default injectIntl(connect(null, auth.actions)(LaborData));