import React from "react";

const Questions = ({ quiz }) => {
  // declare the function
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  return (
    <div>
      <h1>test</h1>
      <div>
        {quiz.map((quizQuestion) => {
          const { question, correct_answer, incorrect_answers } = quizQuestion;
          let answers = [...incorrect_answers, correct_answer];
          let randomizedAnswers = shuffle(answers);
          return (
            <div key={question}>
              <h3>{question}</h3>
              <div>
                <ul>
                  {randomizedAnswers.map((answer) => {
                    return <button key={answer}>{answer}</button>;
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Questions;
