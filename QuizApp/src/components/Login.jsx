import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import Center from "./Center";
import useForm from "../hooks/useForm";
import { createAPIEndpoint } from "../services";
import useStateContext from "../hooks/useStateContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const getFreshModelObject = () => ({
  name: "",
  email: "",
});

const Login = () => {
  //const { values, setValues, errors, setErrors, handleInputChange } = useForm(getFreshModelObject);
  const { values, handleInputChange } = useForm(getFreshModelObject);

  const { context, setContext, resetContext } = useStateContext();
  const navigate = useNavigate();

  useEffect(() => {
    resetContext();
  }, []);

  const login = (e) => {
    e.preventDefault();

    createAPIEndpoint("Participant")
      .post(values)
      .then((res) => {
        setContext({ participantId: res.data.id });
        navigate("/quiz");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Center>
      <Card sx={{ width: "400px" }}>
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h3" sx={{ my: 3 }}>
            Quiz App!
          </Typography>
          <Box
            sx={{
              "& .MuiTextField-root": {
                margin: 1,
                width: "90%",
              },
            }}
          >
            <form noValidate autoComplete="off" onSubmit={login}>
              <TextField
                label="Email"
                name="email"
                value={values.email}
                onChange={handleInputChange}
                variant="outlined"
              />
              <TextField
                label="Name"
                name="name"
                value={values.name}
                onChange={handleInputChange}
                variant="outlined"
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ width: "90%" }}
              >
                Start
              </Button>
            </form>
          </Box>
        </CardContent>
      </Card>
    </Center>
  );
};

export default Login;
