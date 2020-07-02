import React, { useContext, useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { db } from "../firebase";
import { useFormik } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import {
    Box,
    Button,
    Container,
    FormGroup,
    Grid,
    TextField,
    Paper,
    IconButton,
} from "@material-ui/core";
import AddBoxIcon from '@material-ui/icons/AddBox';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { AuthContext } from "../Auth";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-start",
        padding: "30px 10px",
    },
    textField: {
        padding: "3px 3px",
        width: "100%",
    },
    button: {
        width: "100%",
    },
}));

const validate = (values) => {
    const errors = {};
    // if (!values.name) {
    //     errors.name = "The Name is Required";
    // } else if (values.name.length < 3) {
    //     errors.name = "Must be 3 characters or more";
    // }
    if (!values.title) {
        errors.title = "The Title is Required";
    } else if (values.title.length < 10 || values.title.length > 80) {
        errors.title = "Must be at least 10 characters and a max of 80 characters";
    }
    if (!values.description) {
        errors.description = "The Description is Required";
    } else if (
        values.description.length < 10 ||
        values.description.length > 500) {
        errors.description =
            "Must be at least 10 characters and a max of 500 characters";
    }
    // if (!values.location) {
    //     errors.location = "The Location is Required";
    // } else if (values.location.length < 3) {
    //     errors.location = "Must be at least 3 characters long";
    // }
    // if (/[^0-9.,]/.test(values.price)) {
    //     errors.price = "bitte nur Zahlen eingeben";
    // } else if (/[.|,]\w*[.|,]/.test(values.price)) {
    //     errors.price = "bitte nur einen Punkt oder Komma verwenden";
    // }
    // if (/^[^0|+]/.test(values.phone)) {
    //     errors.phone = 'Bitte mit einer "0" oder einem "+" beginnen';
    // } else if (/[^0-9-+ ]/.test(values.phone)) {
    //     errors.phone =
    //         'bitte nur Zahlen eingeben und ggf. mit "-" oder " " trennen';
    // } else if (/.[+]/.test(values.phone)) {
    //     errors.phone = 'bitte das "+" nur am Anfang der Nummer verwenden';
    // }
    // if (!values.email) {
    //     errors.email = "E-Mail is Required";
    // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    //     errors.email = "Invalid email address";
    // }
    return errors;
};



export const InputForm = (props) => {
    const { currentUser } = useContext(AuthContext);
    const [testCount, setTestCount] = useState(1);
    const [isAllOk, setIsAllOk] = useState(false);
    const classes = useStyles();
    const history = useHistory();
    const testCases = [];
    const formik = useFormik({
        initialValues: {
            title: "",
            example: "",
            description: "",
            code: "",
            tags: "",
            email: currentUser ? "++" : "",
        },
        validate,
        validateOnMount: true,
        onSubmit: async (values) => {
            db.collection("challenges").add({
                creator: currentUser.displayName,
                title: formik.values.title,
                description: formik.values.description,
                example: formik.values.example,
                template: formik.values.code,
                tags: formik.values.tags
                    .toLowerCase()
                    .replace(/[^\w\s]/g, '')
                    .split(' ')
                ,
                testcases: testes(values),
            })
                .then(function (docRef) {
                    console.log("Document written with ID: ", docRef.id);
                }).then(() => history.push("/"))
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                });
        }, // End onSubmit ;
    });
    const formikProps = (name, initialValue = "") => ({
        id: name,
        name: name,
        type: "text",
        variant: "outlined",
        value: formik.values[name] || '',
        onChange: formik.handleChange,
        onBlur: formik.handleBlur,
        error: Boolean(formik.errors[name] && formik.touched[name]),
        className: classes.textField,
    });
    for (let i = 0; i < testCount; ++i) {
        testCases.push(
            <FormGroup key={i}>
                <Box py={1} >
                    <TextField
                        {...formikProps("funct" + i)}
                        label={
                            formik.touched.price && formik.errors.price
                                ? formik.errors.price
                                : "Funktion des Testfalls"
                        }
                    />
                    <TextField
                        {...formikProps("exp" + i)}
                        label={
                            formik.touched.price && formik.errors.price
                                ? formik.errors.price
                                : "erwartete Rückgabe"
                        }
                    />
                    <TextField
                        {...formikProps("testdescr" + i)}
                        type="textarea"
                        multiline
                        rows={1}
                        label={
                            formik.touched.price && formik.errors.price
                                ? formik.errors.price
                                : "Bitte eine Beschreibung des Testfalls eingeben. " +
                                formik.values.description.length +
                                "/200 Zeichen"
                        }
                    />
                </Box>
            </FormGroup>
        )
    }
    const testes = (values) => {
        let tests = []
        for (let i = 0; i < testCount; ++i) {
            if (formik.values["funct" + i] && formik.values["exp" + i]) {
                tests.push({
                    test: formik.values["funct" + i],
                    expected: formik.values["exp" + i],
                    description: formik.values["testdescr" + i]
                })
            }
        }
        return tests
    };

    return (
        <Container maxWidth="sm">
            {currentUser
                ? currentUser.isAnonymous
                    ? <Redirect to="/" />
                    : null
                : <Redirect to="/" />
            }
            <h2>Neue Aufgabe anlegen</h2>
            <Box >
                <Paper elevation={2} className={classes.root}>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid
                            container
                            spacing={2}
                            direction="row"
                            justify="center"
                            alignItems="flex-start"
                        >
                            <Grid item xs={12}>
                                <Box px={2} py={1}>
                                    <TextField
                                        {...formikProps("title")}
                                        label={
                                            formik.touched.title && formik.errors.title
                                                ? formik.errors.title
                                                : "Titel mit max. " +
                                                formik.values.title.length +
                                                "/80 Zeichen"
                                        }
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box px={2} py={1}>
                                    <TextField
                                        {...formikProps("description")}
                                        type="textarea"
                                        multiline
                                        rows={2}
                                        label={
                                            formik.touched.description && formik.errors.description
                                                ? formik.errors.description
                                                : "Bitte eine Beschreibung ihrer Aufgabe eingeben. " +
                                                formik.values.description.length +
                                                "/500 Zeichen"
                                        }
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box px={2} py={1}>
                                    <TextField
                                        {...formikProps("example")}
                                        label={
                                            formik.touched.example && formik.errors.example
                                                ? formik.errors.example
                                                : "Beispiel mit max. " +
                                                formik.values.example.length +
                                                "/80 Zeichen"
                                        }
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box px={2} py={1}>
                                    <TextField
                                        {...formikProps("code")}
                                        type="textarea"
                                        multiline
                                        rows={2}
                                        label={
                                            formik.touched.description && formik.errors.description
                                                ? formik.errors.description
                                                : "Bitte den Code eingeben. " +
                                                formik.values.description.length +
                                                "/500 Zeichen"
                                        }
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <IconButton disabled={testCount >= 3} onClick={() => setTestCount(testCount + 1)} color="primary" aria-label="add a test">
                                    <AddBoxIcon />
                                </IconButton>
                                <IconButton disabled={testCount <= 1} onClick={() => setTestCount(testCount - 1)} color="secondary" aria-label="remove a test">
                                    <RemoveCircleIcon />
                                </IconButton>
                                <Box px={2} py={1}>
                                    {testCases}
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box px={2} py={1}>
                                    <TextField
                                        {...formikProps("tags")}
                                        label={
                                            formik.touched.tags && formik.errors.tags
                                                ? formik.errors.tags
                                                : "die Tags für die Aufgabe, nur einzelne Wörter verwenden"
                                        }
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={8}>
                                <Box px={2} py={1}>
                                    {!isAllOk ?
                                        <Button
                                            className={classes.button}
                                            variant="outlined"
                                            color="primary"
                                            onClick={(e) => {
                                                e.preventDefault(); setIsAllOk(true);
                                            }}
                                        >
                                            is everythig ok?
                                        </Button>
                                        :
                                        <Button
                                            className={classes.button}
                                            type="submit"
                                            variant="outlined"
                                            color="primary"
                                        >
                                            Submit
                                    </Button>
                                    }
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Box>
        </Container>
    );
};
