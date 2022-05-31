import React, { useState } from "react";
import QuestionCard from "./QuestionCard";
import gellAllQuestions from "./ApiCalls";
import "./styles.css";

export default function App() {
  const [ques, setQues] = useState([]);
  gellAllQuestions().then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      setQues(data);
    }
  });

  return (
    <div>
      {ques.map((q, index) => {
        return <QuestionCard quesprop={q} key={index} />;
      })}
    </div>
  );
}
