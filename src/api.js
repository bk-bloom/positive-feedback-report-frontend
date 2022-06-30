import axios from "axios";
import { postivieQuestionChoices } from "./db";

export async function getData(name) {
  const response = await axios.get(`http://localhost:8080/report?name=${name}`);

  return response.data;
}
const positiveSurveyId = "506980571";
export const findCollector = async (title) => {
  const response = await axios.get(
    `https://api.surveymonkey.com/v3/surveys/506980571/collectors`,
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_SURVEY_MONKEY_ACCESS_TOKEN}`,
      },
    }
  );

  const collectors = response.data.data;

  const item = collectors.filter((c) => c.name.includes(title));
  if (item.length > 0) {
    return item;
  }

  return null;
};

export const getCollectorsResponseInBulkByCollectorId = async (collectorId) => {
  const response = await axios.get(
    `https://api.surveymonkey.com/v3/collectors/${collectorId}/responses/bulk`,
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_SURVEY_MONKEY_ACCESS_TOKEN}`,
      },
    }
  );

  const responses = response.data.data;
  const obj = {};
  for (let i = 0; i < responses.length; i++) {
    let name = responses[i].pages[0].questions[0].answers[0].text;
    const questions = responses[i].pages[0].questions;
    const appreciateComments = [];
    const expectComments = [];
    let strength = {};
    let values = {};
    for (let j = 0; j < questions.length; j++) {
      switch (questions[j].id) {
        case "78354997":
          if (!obj[name]) {
            obj[name] = {
              responseCount: 1,
            };
          } else {
            obj[name].responseCount += 1;
          }
          break;
        case "78354999":
          break;
        case "78355000":
        case "78355004":
        case "78355005":
          generateStrength(questions[j], strength);
          break;
        case "78355006":
        case "78355007":
          generateValue(questions[j], values);
          break;
        case "78355003":
          appreciateComments.push(questions[j].answers[0].text);
          break;
        case "78355002":
          expectComments.push(questions[j].answers[0].text);
          break;
        default:
          console.log("???");
          break;
      }
    }
    let strengthWords = [];
    for (const key in strength) {
      strengthWords.push([key, strength[key]]);
    }

    strengthWords.sort((a, b) => b[1] - a[1]);

    let valueWords = [];
    for (const key in values) {
      valueWords.push([key, values[key]]);
    }
    valueWords.sort((a, b) => b[1] - a[1]);

    obj[name].strengthWords = strengthWords;
    obj[name].valuesWords = valueWords;
    obj[name].appreciateComments = appreciateComments;
    obj[name].expectComments = expectComments;
  }
  if (Object.keys(obj).length > 0) {
    return obj;
  }
  return null;
};

function generateStrength(question, STRENGTH) {
  for (let i = 0; i < question.answers.length; i++) {
    const text = postivieQuestionChoices[question.answers[i].choice_id].text;

    if (STRENGTH[text] === undefined) {
      STRENGTH[text] = 1;
    } else {
      STRENGTH[text] += 1;
    }
  }
}

function generateValue(question, VALUES) {
  for (let i = 0; i < question.answers.length; i++) {
    const text = postivieQuestionChoices[question.answers[i].choice_id].text;

    if (VALUES[text] === undefined) {
      VALUES[text] = 1;
    } else {
      VALUES[text] += 1;
    }
  }
}
