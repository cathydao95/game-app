import { useState } from "react";
import Questions from "./components/Questions";
import QuizSettings from "./components/QuizSettings";

function App() {
  const [options, setOptions] = useState({
    category: "general",
    difficulty: "easy",
  });
  const [quiz, setQuiz] = useState();
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [startQuiz, setStartQuiz] = useState(false);

  // get code for categories
  const categories = {
    general: 9,
    television: 14,
    animals: 27,
    celebrities: 26,
    history: 23,
  };

  // set quiz option selections
  const selectOptions = (e) => {
    setOptions((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  console.log(options);
  // fetch quiz questions
  const getQuizQuestions = async (e) => {
    e.preventDefault();
    let url = `http://localhost:3000/api/trivia/?amount=5&difficulty=${options.difficulty}&type=multiple`;
    if (options.category !== "any") {
      url += `&category=${categories[options.category]}`;
    }

    const response = await fetch(url);
    const quizData = await response.json();
    // get correct answers from questions
    let correctArray = quizData.data.results.map(
      (question) => question.correct_answer
    );
    // set quiz and correct answers array
    setQuiz(quizData.data.results);
    setCorrectAnswers(correctArray);
    setStartQuiz(true);
  };

  return (
    <>
      <h1>Trivia</h1>
      {startQuiz ? (
        <Questions
          quiz={quiz}
          correctAnswers={correctAnswers}
          setStartQuiz={setStartQuiz}
        />
      ) : (
        <QuizSettings
          selectOptions={selectOptions}
          getQuizQuestions={getQuizQuestions}
        />
      )}
    </>
  );
}

export default App;
