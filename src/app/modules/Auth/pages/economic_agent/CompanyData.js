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
import {
    Switch,
    Grid,
    Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import * as auth from "../../_redux/authRedux";
import { shallowEqual, useSelector } from "react-redux";
import { economic_agent_insert } from "../../_redux/authCrud";

const AntSwitch = withStyles(theme => ({
    root: {
        width: 28,
        height: 16,
        padding: 0,
        display: "flex"
    },
    switchBase: {
        padding: 2,
        color: theme.palette.grey[500],
        "&$checked": {
            transform: "translateX(12px)",
            color: theme.palette.common.white,
            "& + $track": {
                opacity: 1,
                backgroundColor: theme.palette.primary.main,
                borderColor: theme.palette.primary.main
            }
        }
    },
    thumb: {
        width: 12,
        height: 12,
        boxShadow: "none"
    },
    track: {
        border: `1px solid ${theme.palette.grey[500]}`,
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: theme.palette.common.white
    },
    checked: {}
}))(Switch);

const CustomerEditSchema = Yup.object().shape({
    business_name: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("This field is required"),
    business_reason: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("This field is required"),
    RUC: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("This field is required"),
    main_economic_activity: Yup.string().required("This field is required"),
    operating_day: Yup.number()
        .min(1, "1 is minimum")
        .max(1000000, "1000000 is maximum")
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
    total_last_year_sales: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required("This field is required"),
    num_employee: Yup.number()
        .min(1, "1 is minimum")
        .max(1000000, "1000000 is maximum")
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
    business_name: "",
    business_reason: "",
    RUC: "",
    main_economic_activity: "",
    operating_day: "",
    company_email_1: "",
    company_email_2: "",
    company_phone_1: "",
    company_phone_2: "",
    total_last_year_sales: "",
    num_employee: "",
    economic_activity: "",
    province: "",
    district: "",
    township: "",
    neighborhood: "",
    avenue: "",
    edifice: "",
    house: "",
    reference: "",
    incorporation_country: "PA",
    country: "PA",
    type: 1
};
const CompanyData = (props) => {
    const { onHide, setProgress, setContentName } = props;
    setProgress(16);
    const [checked, setChecked] = useState(false);
    const countryLists = useMemo(() => countryList().getData(), []);
    const handleChange = () => event => {
        setChecked(event.target.checked);
    };
    const { company_data } = useSelector((state) => state.auth);
    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={company_data ? company_data : initCustomer}
                validationSchema={CustomerEditSchema}
                onSubmit={(values) => {
                    values['is_ampyme'] = checked;
                    props.setCompanyData(values);
                    setContentName('CommercialReferences');
                }}
            >
                {({ handleSubmit }) => (
                    <>
                        <Modal.Body className="overlay overlay-block cursor-default">
                            <Form className="form form-label-right">
                                <h3>Company data</h3>
                                <hr></hr>
                                <div className="form-group row">
                                    {/* First Name */}
                                    <div className="col-lg-3">
                                        <Field
                                            name="business_name"
                                            component={Input}
                                            label="Business Name"
                                        />
                                    </div>
                                    {/* Last Name */}
                                    <div className="col-lg-3">
                                        <Field
                                            name="business_reason"
                                            component={Input}
                                            label="Business Reason"
                                        />
                                    </div>
                                    {/* Login */}
                                    <div className="col-lg-3">
                                        <Select name="incorporation_country" label="Country of incorporation">
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
                                            name="economic_activity"
                                            component={Input}
                                            label="Economic Activity"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
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
                                        // customFeedbackLabel="We'll never share customer IP Address with anyone else"
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <label>Do you belong to AMPYME?</label>
                                        <div style={{ padding: 13 }}>
                                            <Typography component="div">
                                                <Grid
                                                    component="label"
                                                    container
                                                    alignItems="center"
                                                    spacing={1}
                                                >
                                                    <Grid item>No</Grid>
                                                    <Grid item>
                                                        <AntSwitch
                                                            checked={checked}
                                                            onChange={handleChange()}
                                                        />
                                                    </Grid>
                                                    <Grid item>Yes</Grid>
                                                </Grid>
                                            </Typography>
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <Field
                                            type="number"
                                            name="operating_day"
                                            component={Input}
                                            label="How long have you been operating?"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
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

                                    <div className="col-lg-3">
                                        <Field
                                            name="company_phone_2"
                                            component={Input}
                                            label="Company Phone 2"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-3">
                                        <Field
                                            name="total_last_year_sales"
                                            component={Input}
                                            label="Total sales last year"
                                        />
                                    </div>
                                    <div className="col-lg-3">
                                        <Field
                                            type="number"
                                            name="num_employee"
                                            component={Input}
                                            label="Number of employees"
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

export default injectIntl(connect(null, auth.actions)(CompanyData));