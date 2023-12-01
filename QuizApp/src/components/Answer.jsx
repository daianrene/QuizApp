import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import { red, green, grey } from "@mui/material/colors";

const Answer = ({ qnAnswers }) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const markCorrectOrNot = (qna, idx) => {
    if ([qna.answer, qna.selected].includes(idx)) {
      return { sx: { color: qna.answer == idx ? green[500] : red[500] } };
    }
  };

  return (
    <Box sx={{ mt: 5, width: "100%", maxWidth: 640, mx: "auto" }}>
      {qnAnswers.map((item, indx) => (
        <Accordion
          disableGutters
          key={indx}
          expanded={expanded === indx}
          onChange={handleChange(indx)}
        >
          <AccordionSummary
            expandIcon={
              <ExpandCircleDownOutlinedIcon
                sx={{
                  color: item.answer == item.selected ? green[500] : red[500],
                }}
              />
            }
          >
            <Typography sx={{ width: "90%", flexShrink: 0 }}>
              {item.qnInWords}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: grey[900] }}>
            <List>
              {item.options.map((x, i) => (
                <ListItem key={i}>
                  <Typography {...markCorrectOrNot(item, i)}>
                    <b>{String.fromCharCode(65 + i) + ". "}</b>
                    {x}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default Answer;
