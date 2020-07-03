import React, { useContext } from "react";
import firebase from "../firebase";
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
  container: {
    height:'100vh',
    paddingLeft:'200px',
    display: 'flex',
    justifyContent:'center',
    alignItems:'center'
  },
  paper: {
    background: 'transparent',
    borderRight: `2px solid ${theme.palette.secondary.main}`,
    boxShadow: `inset 0px 0px 20px 2px ${theme.palette.secondary.main},0px 0px 20px ${theme.palette.secondary.main}`,
  },
  textField: {
    background: 'transparent',
    width: "100%",
    textShadow: '0px 0px 5px #00bef7',
    fontSize: '.8em',
    fontWeight: 'bold',
    border: `2px solid ${theme.palette.secondary.main}`,
    boxShadow: `inset 0px 0px 20px 2px ${theme.palette.secondary.main},0px 0px 20px ${theme.palette.secondary.main}`,
    backgroundColor: '#F5F5F5',
  },
  button: {
    width: "100%",
  },
}));

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Email is mandatory!";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Password is mandatory!";
  } else if (values.password.length < 6) {
    errors.password = "Password must have at least 6 chars!";
  }
  return errors;
};

export default function Login() {
  const { currentUser } = useContext(AuthContext);
  let history = useHistory();
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(values.email, values.password);
        history.push("/");
      } catch (error) {
        alert(error);
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
    <div className={classes.container}>
      {currentUser && !currentUser.isAnonymous && <Redirect to="/" />}
      <Container maxWidth="xs">
        <Paper className={classes.paper}>
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
                        : "E-Mail address"
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
                        : "Password"
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
                    Log In
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
