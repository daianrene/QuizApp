import { useEffect, useState } from "react";
import useStateContext from "../hooks/useStateContext";
import { createAPIEndpoint } from "../services";
import {
  CardContent,
  Typography,
  Card,
  List,
  CardHeader,
  Box,
  LinearProgress,
  ListItemButton,
} from "@mui/material";
import { getFormattedTimeFromSeconds } from "../helper";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const { context, setContext } = useStateContext();
  const [qns, setQns] = useState([]);
  const [qnIndex, setQnIndex] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const navigate = useNavigate();

  let timer;

  const starTime = () => {
    timer = setInterval(() => {
      setTimeTaken((prev) => prev + 1);
    }, [1000]);
  };

  useEffect(() => {
    setContext({
      timeTaken: 0,
      selectedOptions: [],
    });
    createAPIEndpoint("question")
      .fetch()
      .then((res) => {
        setQns(res.data);
        starTime();
      });

    return () => {
      clearInterval(timer);
    };
  }, []);

  const updateAnswer = (qnId, optionIdx) => {
    const temp = [...context.selectedOptions];
    temp.push({
      qnId,
      selected: optionIdx,
    });

    if (qnIndex < 4) {
      setContext({ selectedOptions: [...temp] });
      setQnIndex(qnIndex + 1);
    } else {
      setContext({ selectedOptions: [...temp], timeTaken });
      navigate("/result");
    }
  };

  return qns.length != 0 ? (
    <Card
      sx={{
        maxWidth: 640,
        mx: "auto",
        mt: 5,
        "& .MuiCardHeader-action ": { m: 0, alignSelf: "center" },
      }}
    >
      <CardHeader
        title={"Question " + (qnIndex + 1) + " of 5"}
        action={
          <Typography>{getFormattedTimeFromSeconds(timeTaken)}</Typography>
        }
      />
      <Box>
        <LinearProgress
          variant="determinate"
          value={((qnIndex + 1) * 100) / 5}
        />
      </Box>
      <CardContent>
        <Typography variant="h6">{qns[qnIndex].qnInWords}</Typography>
        <List>
          {qns[qnIndex].options.map((item, indx) => (
            <ListItemButton
              key={indx}
              onClick={() => updateAnswer(qns[qnIndex].qnId, indx)}
            >
              <div>
                <b>{String.fromCharCode(65 + indx) + " . "}</b>
                {item}
              </div>
            </ListItemButton>
          ))}
        </List>
      </CardContent>
    </Card>
  ) : null;
};

export default Quiz;
