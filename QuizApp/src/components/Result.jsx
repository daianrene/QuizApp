import { useEffect, useState } from "react";
import useStateContext from "../hooks/useStateContext";
import { createAPIEndpoint } from "../services";
import {
  Alert,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { getFormattedTimeFromSeconds } from "../helper";
import { green } from "@mui/material/colors";
import Answer from "./Answer";

const Result = () => {
  const { context, setContext } = useStateContext();
  const [score, setScore] = useState(0);
  const [qnAnswers, setQnAnswers] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const ids = context.selectedOptions.map((x) => x.qnId);

    createAPIEndpoint("question/getanswers")
      .post(ids)
      .then((res) => {
        const qna = context.selectedOptions.map((x) => ({
          ...x,
          ...res.data.find((y) => y.qnId == x.qnId),
        }));
        setQnAnswers(qna);
        calculateScore(qna);
      })
      .catch((err) => console.log(err));
  }, []);

  const calculateScore = (qna) => {
    let tempScore = qna.reduce((acc, curr) => {
      return curr.answer == curr.selected ? acc + 1 : acc;
    }, 0);
    setScore(tempScore);
  };

  const restart = () => {
    setContext({
      timeTaken: 0,
      selectedOptions: [],
    });
    navigate("/quiz");
  };

  const submit = () => {
    createAPIEndpoint("participant")
      .put(context.participantId, {
        participantId: context.participantId,
        score: score,
        timeTaken: context.timeTaken,
      })
      .then((res) => {
        console.log(res);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 2000);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Card
        sx={{
          mt: 5,
          display: "flex",
          width: "100%",
          maxWidth: 640,
          mx: "auto",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <CardContent sx={{ flex: "1 0 auto", textAlign: "center" }}>
            <Typography variant="h4">Congratulations!</Typography>
            <Typography variant="h6">YOUR SCORE</Typography>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              <Typography variant="span" color={green[400]}>
                {score}
              </Typography>
              /5
            </Typography>
            <Typography variant="h6">
              Took {getFormattedTimeFromSeconds(context.timeTaken) + " mins"}
            </Typography>
            <Button
              variant="contained"
              sx={{ mx: 1, mt: 2 }}
              size="small"
              onClick={submit}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              sx={{ mx: 1, mt: 2 }}
              size="small"
              onClick={restart}
            >
              Re-try
            </Button>
            <Alert
              severity="success"
              variant="string"
              sx={{
                width: "60%",
                m: "auto",
                visibility: showAlert ? "visible" : "hidden",
              }}
            >
              Score Updated.
            </Alert>
          </CardContent>
        </Box>
        <CardMedia component="img" sx={{ width: 220 }} image="./result.png" />
      </Card>
      <Answer qnAnswers={qnAnswers} />
    </>
  );
};

export default Result;
