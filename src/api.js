import axios from "axios";
import { postivieQuestionChoices } from "./db";

export async function getData(name) {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_DOMAIN}/report?name=${name}`
  );

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
          // console.log(questions[j]);

          for (let k = 0; k < questions[j].answers.length; k++) {
            const text =
              postivieQuestionChoices[questions[j].answers[k].choice_id].text;
            if (!obj[name]["strength"]) {
              obj[name]["strength"] = {};
            }
            if (!obj[name]["strength"][text]) {
              obj[name]["strength"] = {
                ...obj[name]["strength"],
                [text]: 1,
              };
            } else {
              obj[name]["strength"] = {
                ...obj[name]["strength"],
                [text]: obj[name]["strength"][text] + 1,
              };
            }
          }
          // generateStrength(questions[j], strength);
          break;
        case "78355006":
        case "78355007":
          for (let k = 0; k < questions[j].answers.length; k++) {
            const text =
              postivieQuestionChoices[questions[j].answers[k].choice_id].text;
            if (!obj[name]["values"]) {
              obj[name]["values"] = {};
            }
            if (!obj[name]["values"][text]) {
              obj[name]["values"] = {
                ...obj[name]["values"],
                [text]: 1,
              };
            } else {
              obj[name]["values"] = {
                ...obj[name]["values"],
                [text]: obj[name]["values"][text] + 1,
              };
            }
          }
          // generateValue(questions[j], values);
          break;
        case "78355003":
          if (!obj[name]["appreciateComments"]) {
            obj[name]["appreciateComments"] = [];
          }
          obj[name]["appreciateComments"].push(questions[j].answers[0].text);
          // appreciateComments.push(questions[j].answers[0].text);
          break;
        case "78355002":
          if (!obj[name]["expectComments"]) {
            obj[name]["expectComments"] = [];
          }
          obj[name]["expectComments"].push(questions[j].answers[0].text);
          // expectComments.push(questions[j].answers[0].text);
          break;
        default:
          console.log("???");
          break;
      }
    }
  }

  for (const name in obj) {
    const s = [];
    for (const word in obj[name].strength) {
      s.push([word, obj[name].strength[word]]);
    }
    s.sort((a, b) => b[1] - a[1]);
    const v = [];
    for (const word in obj[name].values) {
      v.push([word, obj[name].values[word]]);
    }
    v.sort((a, b) => b[1] - a[1]);
    obj[name].strengthWords = s;
    obj[name].valuesWords = v;
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

export const getCollectorsBySurveyId = async (surveyId) => {
  const response = await axios.get(
    `https://api.surveymonkey.com/v3/surveys/${surveyId}/collectors`,
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_SURVEY_MONKEY_ACCESS_TOKEN}`,
      },
    }
  );
  console.log(response.data);

  return response.data.data;
};

export const getProjectsBySurveyId = async (surveyId) => {
  const collectors = await getCollectorsBySurveyId(surveyId);

  // TODO: get project ids from DB
  const projectIds = ["22146"];
  const projectTitles = ["도레이첨단소재"];
  const projectDuration = ["8/19 - 9/13"];
  const projectStatus = ["예정"];
  const dest = [];

  for (let i = 0; i < projectIds.length; i++) {
    const obj = {
      id: projectIds[i],
      title: projectTitles[i],
      duration: projectDuration[i],
      status: projectStatus[i],
      collectors: [],
    };
    for (let j = 0; j < collectors.length; j++) {
      if (collectors[j].name.includes(projectIds[i])) {
        obj.collectors.push(collectors[j]);
      }
    }
    dest.push(obj);
  }
  for (let i = 0; i < dest.length; i++) {
    dest[i].collectors.sort((a, b) => Number(a.id) - Number(b.id));
  }

  return dest;
};

export const getCollectorRecipientsByCollectorId = async (collectorId) => {
  const response = await axios.get(
    `https://api.surveymonkey.com/v3/collectors/${collectorId}/recipients`,
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_SURVEY_MONKEY_ACCESS_TOKEN}`,
      },
    }
  );

  return response.data.data;
};

export const getRecipients = async (id) => {
  const data = await getCollectorRecipientsByCollectorId(id);
  const dest = {};

  for (let i = 0; i < data.length; i++) {
    if (!dest[data[i].email]) {
      dest[data[i].email] = {};
    }
    dest[data[i].email][data[i].id] = [];
  }

  return dest;
  // return recipients;
};

export const getMaumCheckupResponses = async (collectorId) => {
  const response = await axios.get(
    `https://api.surveymonkey.com/v3/collectors/${collectorId}/responses/bulk`,
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_SURVEY_MONKEY_ACCESS_TOKEN}`,
      },
    }
  );
  //   console.log(response.data.data[0].pages[0].questions);
  const responses = response.data.data;
  const dest = [];
  for (let i = 0; i < responses.length; i++) {
    const obj = {};
    const recipientId = responses[i].recipient_id;
    obj[recipientId] = [];
    const questions = responses[i].pages[0].questions;
    for (let i = 0; i < questions.length; i++) {
      obj[recipientId].push(questions[i].answers[0].text);
      // console.log(questions[i].answers);
    }
    dest.push(obj);
  }
  return dest;
};

export const getMaumCheckupNameWithResponses = async (collectorIds) => {
  const endpoints = collectorIds.map(
    (collectorId) =>
      `https://api.surveymonkey.com/v3/collectors/${collectorId}/responses/bulk`
  );
  const allResponses = await axios
    .all(
      endpoints.map((endpoint) =>
        axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_SURVEY_MONKEY_ACCESS_TOKEN}`,
          },
        })
      )
    )
    .then((res) => {
      const data = [];

      for (let i = 0; i < res.length; i++) {
        const responses = res[i].data.data;
        const dest = {};
        for (let j = 0; j < responses.length; j++) {
          const questions = responses[j].pages[0].questions;
          const email = responses[j].pages[0].questions[1].answers[0].text;
          const answers = [];
          for (let k = 0; k < questions.length; k++) {
            answers.push(questions[k].answers[0].text);
          }
          console.log(answers);
          if (dest[email] === undefined) {
            dest[email] = [];
          }
          dest[email] = answers;
        }
        data.push(dest);
      }
      return data;
    });

  return allResponses;
};

export const saveResponsesToDB = async (responses, projectId) => {
  const obj = {};
  for (let i = 0; i < responses.length; i++) {
    for (const email of Object.keys(responses[i])) {
      if (obj[email] === undefined) {
        obj[email] = {};
      }
      // obj[email].push(responses[i][email]);
      obj[email][`week${i + 1}`] = responses[i][email];
    }
  }
  const checkups = [];

  for (const email of Object.keys(obj)) {
    let name;
    for (const week of Object.keys(obj[email])) {
      if (obj[email][week].length > 0) {
        name = obj[email][week][0];
      }
    }
    checkups.push({
      projectId,
      email,
      name,
      week1: obj[email].week1 ? obj[email].week1 : [],
      week2: obj[email].week2 ? obj[email].week2 : [],
      week3: obj[email].week3 ? obj[email].week3 : [],
      week4: obj[email].week4 ? obj[email].week4 : [],
    });
  }

  const response = await axios.post(
    `${process.env.REACT_APP_SERVER_DOMAIN}/checkup`,
    {
      data: checkups,
    }
  );

  return true;
};

export const loadResponsesFromDB = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_DOMAIN}/checkup/responses`
  );

  return response.data;
};

export const updateMailchimpStatus = async (
  checkupCollectorResponses,
  index,
  emails
) => {
  const emailResponse = await axios.post(
    `${process.env.REACT_APP_SERVER_DOMAIN}/checkup/email`,
    JSON.stringify({
      week: index + 1,
      data: Object.keys(checkupCollectorResponses[index]),
    }),
    {
      headers: { "Content-Type": "Application/json" },
    }
  );
  console.log(emailResponse);

  addMemberTagInMailchimp(emails, index);
};

const addMemberTagInMailchimp = async (emails, index) => {
  const response = await axios.post(
    `${process.env.REACT_APP_SERVER_DOMAIN}/checkup/tag`,
    {
      emails: emails,
      week: index + 1,
    }
  );
  return response.data;
};
