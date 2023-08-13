import { useState} from "react";
import NewsBlock from "./components/NewsBlock";
import classes from "./App.module.css";
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.REACT_APP_NEWS,
});
const openai = new OpenAIApi(configuration);

function App() {
  const [url, setUrl] = useState(
    `${process.env.REACT_APP_URL}`
  );
  const [displaynews, setDisplayNews] = useState([]);
  const [isfetch, setFetch] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const finishedSummary = [];
  // A function to handle the openAI api endpoints
  const getSummaryHandler = async () => {
    setButtonClicked(true);
    try {
      const response = await fetch(url)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          return data.results.map((newData) => {
            return {
              title: newData.title,
              content: newData.content,
            };
          });
        })
        .then((array) => {
          return array.slice(0, 1);
        });
      console.log(response);
      for await (let index of response) {
        console.log(index.content);
        const aiAsk = `Title:${index.title},description:${index.content}, summarize this news and return in format of Title:... Content:..., please do not have any spaces at beginning of response`;
        console.log(aiAsk);
        const chatResponse = await openai
          .createCompletion({
            model: "text-davinci-003",
            prompt: `${aiAsk}`,
            max_tokens: 1000,
            temperature: 0,
          })
          .then((res) => finishedSummary.push(res.data.choices[0].text));
      }
      console.log(finishedSummary)

    } catch (e) {
      console.log(e);
    }
    const filteredArray = finishedSummary.map((summary) => {
      try {
        const split = summary.split("\n");
        console.log(split);
        return {
          title: split[2].replace("Title: ", ""),
          content: split[3].replace("Content: ", ""),
        };
      } catch {
        const contentIndex = summary.indexOf("Content:");
        const cleanTitle = summary
          .slice(0, contentIndex)
          .trim()
          .replace("Title: ", "");
        return {
          title: cleanTitle,
          content: summary.slice(contentIndex + "Content:".length).trim(),
        };
      }
    });
    setDisplayNews(filteredArray);
    setFetch(true);
  };
  return (
    <div className={`${classes.card} mx-7 my-5  `}>
      <div className={`${classes.cardinner} flex-col mx-auto`}>
        <h1 className="font-mono font-extrabold text-5xl">Brief-Buzz</h1>
        {!isfetch && buttonClicked && (
          <h2 className="font-mono font-bold text-3xl">Fetching News...</h2>
        )}
        {isfetch && <NewsBlock collectionNews={displaynews}></NewsBlock>}
        <button
          className={`my-4 ${classes.button} font-mono`}
          onClick={getSummaryHandler}
        >
          Today's News
        </button>
      </div>
    </div>
  );
}

export default App;
