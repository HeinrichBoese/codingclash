import React, { useState, useContext } from "react";
import firebase from './firebase';
import { useHistory, Redirect } from "react-router-dom";
import { useFormik } from "formik";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { AuthContext } from "../Auth";

const useStyles = makeStyles((theme) => ({
    textField: {
        width: "100%",
    },
    button: {
        width: "100%",
    },
}));

const validate = (values) => {
    const errors = {};
    if (!values.email) {
        errors.email = "Email muss angegeben werden!";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address";
    }
    if (!values.password) {
        errors.password = "Passwort muss angegeben werden!";
    } else if (values.password.length < 8) {
        errors.password = "Passwort muss mindestens 8 Zeichen lang sein!";
    }
    return errors;
};

export default function Login() {
    const { currentUser } = useContext(AuthContext);
    let history = useHistory()
    const classes = useStyles();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validate,
        onSubmit: async (values) => {
            {
                try {
                    await firebase
                        .auth()
                        .signInWithEmailAndPassword(values.email, values.password);
                    history.push("/");
                } catch (error) {
                    alert(error);
                }
            }
        },
    });

    const formikProps = (name, initialValue = "") => ({
        id: name,
        name: name,
        variant: "outlined",
        value: formik.values[name],
        onChange: formik.handleChange,
        onBlur: formik.handleBlur,
        error: Boolean(formik.errors[name] && formik.touched[name]),
    });

    return (
        <div>
            {currentUser && <Redirect to="/" />}
            <Container maxWidth="xs">
                <Paper>
                    <Box display="flex" flexDirection="column" flexWrap="wrap" p={2}>
                        <form onSubmit={formik.handleSubmit}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <TextField
                                        className={classes.textField}
                                        {...formikProps("email")}
                                        type="email"
                                        autoComplete="off"
                                        label={
                                            formik.touched.email && formik.errors.email
                                                ? formik.errors.email
                                                : "E-Mail Adresse"
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        className={classes.textField}
                                        {...formikProps("password")}
                                        type="password"
                                        autoComplete="off"
                                        label={
                                            formik.touched.password && formik.errors.password
                                                ? formik.errors.password
                                                : "Passwort"
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        className={classes.button}
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Anmelden
                  </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Paper>
            </Container>
        </div>
    );
}
