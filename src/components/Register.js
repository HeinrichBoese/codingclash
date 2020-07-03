import React, { useContext } from "react";
import firebase, { db } from "../firebase";
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
import NativeSelect from '@material-ui/core/NativeSelect';
import Avatar from '@material-ui/core/Avatar';
import images from "./images";

const useStyles = makeStyles((theme) => ({
  rootcontainer: {
    height:'100vh',
    paddingLeft:'200px',
    display: 'flex',
    justifyContent:'center',
    alignItems:'center'
  },
  paper: {
    background:'transparent',
    borderRight: `2px solid ${theme.palette.secondary.main}`,
    boxShadow: `inset 0px 0px 20px 2px ${theme.palette.secondary.main},0px 0px 20px ${theme.palette.secondary.main}`,
  },
  textField: {
    width: "100%",
    textShadow: '0px 0px 5px #00bef7',
    fontSize: '.8em',
    fontWeight: 'bold',
    border: `2px solid ${theme.palette.secondary.main}`,
    boxShadow: `inset 0px 0px 20px 2px ${theme.palette.secondary.main},0px 0px 20px ${theme.palette.secondary.main}`,
    backgroundColor: '#F5F5F5',
  },
  selectField: {
    width: "100%",
    height: "100%",
    alignSelf: "right",
    border: `2px solid ${theme.palette.secondary.main}`,
    boxShadow: `inset 0px 0px 20px 2px ${theme.palette.secondary.main},0px 0px 20px ${theme.palette.secondary.main}`,
    backgroundColor: '#F5F5F5',
  },
  container: {
    background:'transparent',
    flexGrow: 1,
    direction: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
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
    errors.email = "Invalid email address!";
  }
  if (!values.password) {
    errors.password = "Password is mandatory!";
  } else if (values.password.length < 6) {
    errors.password = "Passwort must have 6 characters or more!";
  }
  if (!values.name) {
    errors.name = "Name is required";
  } else if (values.name.length < 3) {
    errors.name = "Name must have 3 characters or more";
  }
  return errors;
};

export default function Register(props) {
  let history = useHistory();

  const { currentUser } = useContext(AuthContext);
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      image: "Male1",
    },
    validate,
    onSubmit: async (values) => {
      if (currentUser && currentUser.isAnonymous) {
        const credential = firebase.auth.EmailAuthProvider.credential(values.email, values.password);
        firebase
          .auth()
          .currentUser.linkWithCredential(credential)
          .then((resp) => {
            resp.user.updateProfile({ displayName: values.name });
            db.collection('User').doc(resp.user.uid).set(
              {
                playerName: values.name,
                playerEmail: values.email,
                playerLevel: 0,
                playerImage: values.image,
              }
            )
          }).then(() => history.push("/"))
          .catch((error) => alert(error))
      } else {
        firebase
          .auth()
          .createUserWithEmailAndPassword(values.email, values.password)
          .then((resp) => {
            resp.user.updateProfile({ displayName: values.name });
            db.collection('User').doc(resp.user.uid).set(
              {
                playerName: values.name,
                playerEmail: values.email,
                playerLevel: 0,
                playerImage: values.image,
              }
            )
          }).then(() => history.push("/"))
          .catch((error) => alert(error))
      } // end Else
    } // end onSubmit
  }); // end Use Formik

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
    <div className={classes.rootcontainer}>
      {currentUser && !currentUser.isAnonymous && <Redirect to="/" />}
      <Container maxWidth="xs">
        <Paper className={classes.paper}>
          <Box display="flex" flexDirection="column" flexWrap="wrap" p={2}>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={1}>
                <Grid item xs={12} >
                  <TextField
                    className={classes.textField}
                    {...formikProps("name")}
                    type="text"
                    autoComplete="off"
                    label={
                      formik.touched.name && formik.errors.name
                        ? formik.errors.name
                        : "Player name"
                    }
                  />
                </Grid>
                <Grid container item xs={12} className={classes.container} >
                  <Grid item >
                    <Avatar alt="Avatar" src={images[formik.values.image]} />
                  </Grid>
                  <Grid item xs={6} >
                    <NativeSelect
                      className={classes.selectField}
                      {...formikProps("image")}
                      type="text"
                      autoComplete="off"
                      label={
                        formik.touched.image && formik.errors.image
                          ? formik.errors.image
                          : "Player Avatar"
                      }
                    >
                      <option value={"Male1"}>Male1</option>
                      <option value={"Male2"}>Male2</option>
                      <option value={"Robot"}>Robot</option>
                      <option value={"Female1"}>Female1</option>
                      <option value={"Female2"}>Female2</option>
                      <option value={"Zombie"}>Zombie</option>
                    </NativeSelect>
                  </Grid>
                </Grid>
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
                    SIGN UP
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Paper>
      </Container>
    </div >
  );
}
