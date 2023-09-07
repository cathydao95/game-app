import { useState } from "react";
import Questions from "./components/Questions";

function App() {
  const [options, setOptions] = useState({
    category: "general",
    difficulty: "easy",
  });
  const [quiz, setQuiz] = useState();
  const [correctAnswers, setCorrectAnswers] = useState([]);

  const categories = {
    general: 9,
    television: 14,
    animals: 27,
    celebrities: 26,
    history: 23,
  };

  const selectOptions = (e) => {
    setOptions((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const getQuizQuestions = async (e) => {
    e.preventDefault();
    let url;
    if (options.category === "any") {
      url = `http://localhost:3000/api/trivia/?amount=5&difficulty=${options.difficulty}&type=multiple`;
    } else {
      url = `http://localhost:3000/api/trivia/?amount=5&category=${
        categories[options.category]
      }&difficulty=${options.difficulty}&type=multiple`;
    }
    console.log(url);
    const response = await fetch(url);
    const quizData = await response.json();
    console.log("quizData", quizData);
    console.log(quizData.data.results);
    // get correct answers from questions
    let correctArray = [];
    quizData.data.results.map((question) =>
      correctArray.push(question.correct_answer)
    );
    // set quiz and correct answers array
    setQuiz(quizData.data.results);
    setCorrectAnswers(correctArray);
  };

  console.log("quiz", quiz, "correct", correctAnswers);
  return (
    <>
      <h1>Trivia</h1>
      <div>
        <form>
          <label htmlFor="category">Select a Category:</label>
          <select id="category" name="category" onChange={selectOptions}>
            <option value="general">General Knowledge</option>
            <option value="television">Entertainment: Television</option>
            <option value="animals">Animals</option>
            <option value="celebrities">Celebrities</option>
            <option value="history">History</option>
            <option value="any">Any Category</option>
          </select>
          <label htmlFor="difficulty">Select Difficulty</label>
          <select id="difficulty" name="difficulty" onChange={selectOptions}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <button onClick={getQuizQuestions}>Start Playing</button>
        </form>
      </div>
      {quiz && <Questions quiz={quiz} correctAnswers={correctAnswers} />}
    </>
  );
}

export default App;
