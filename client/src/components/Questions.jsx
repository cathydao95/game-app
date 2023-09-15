import { useState, useEffect } from "react";
import "./Questions.css";

const Questions = ({ quiz, correctAnswers, setStartQuiz }) => {
  const [guesses, setGuesses] = useState(Array(quiz.length).fill(null));
  const [randomizedAnswers, setRandomizedAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // RANDOMIZE ANSWERS
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // REMOTE HTML ENTITY CODES
  function removeHtmlEntities(input) {
    // Define a regular expression pattern to match HTML entity codes
    const entityPattern = /&#[0-9]+;|&quot;/g;

    // Use the replace method to remove HTML entity codes and decode &quot;
    const cleanedText = input.replace(entityPattern, (match) => {
      if (match === "&quot;") {
        return '"';
      } else {
        // For other HTML entities, remove them
        return "";
      }
    });

    return cleanedText;
  }

  // WHEN QUIZ IS CHANGED, RANDOMIZE QUESTION ANSWERS
  useEffect(() => {
    let answers = quiz.map((quizQuestion) => {
      const { correct_answer, incorrect_answers } = quizQuestion;
      let answers = [...incorrect_answers, correct_answer];
      let randomAnswers = shuffle(answers);
      return randomAnswers;
    });
    setRandomizedAnswers(answers);
  }, [quiz]);

  // WHEN USER CLICKS ON AN ANSWER, RUN SELECTGUESS FUNCTION
  const selectGuess = (e, index) => {
    let guess = e.target.dataset.answer;
    !quizSubmitted &&
      setGuesses((prevGuesses) => {
        const newGuesses = [...prevGuesses];
        newGuesses[index] = { guess };
        return newGuesses;
      });
  };

  // WHEN USER SUBMITS QUIZ, CHECK ANSWERS
  const checkQuizAnswers = () => {
    if (guesses.every((guess) => guess !== null)) {
      const checkGuesses = guesses.map((guess, index) => {
        return { ...guess, isCorrect: guess.guess === correctAnswers[index] };
      });
      setGuesses(checkGuesses);
      setQuizSubmitted(true);
      setScore(
        guesses.reduce((acc, guess, index) => {
          if (guess.guess === correctAnswers[index]) {
            return acc + 1;
          }
          return acc;
        }, 0)
      );
    } else {
      alert("please answer every question");
    }
  };

  // RESET QUIZ
  const resetQuiz = () => {
    setStartQuiz(false);
  };

  return (
    <div>
      <div className="quizContainer">
        {/* USE INDEX TO SET CORRECT ANSWER FOR THAT QUESTION*/}
        {randomizedAnswers.map((answers, index) => {
          return (
            <div key={index}>
              <h3 className="question">
                {removeHtmlEntities(quiz[index].question)}
              </h3>
              {quizSubmitted && (
                <p className="correctAnswer">
                  Correct Answer:
                  {removeHtmlEntities(quiz[index].correct_answer)}
                </p>
              )}
              <div>
                <ul className="answersContainer">
                  {answers.map((answer) => {
                    // IF CURRENT ANSWER IS EQUAL TO ELEMENT IN GUESSSES ARRAY (INDEX), SET ISSELECTED TO TRUE -- to be used for class names
                    const isSelected = guesses[index]?.guess === answer;
                    // IF GUESS IS CORRECT AND CURRENT ANSWER IS EQUAL TO ELEMENT IN GUESSES ARRAY, SET ISCORRECT TO TRUE -- to be used for class names
                    const isCorrect =
                      guesses[index]?.isCorrect &&
                      guesses[index]?.guess === answer;

                    return (
                      <button
                        key={answer}
                        data-answer={answer}
                        // IF ISSELECTED IS TRUE, GIVE CLASS NAME OF "GUESS"
                        // IF IS CORRECT GIVE A CLASS NAME OF "CORRECT"
                        // IF QUIZ HAS BEEN SUBMITTED, IS SELECTED, AND IS NOT CORRECT< GIVE CLASS NAME OF 'INCORRECT"
                        className={`answerBtn ${isSelected ? "guess" : ""}  ${
                          isCorrect
                            ? "correct"
                            : quizSubmitted && isSelected && !isCorrect
                            ? "incorrect"
                            : null
                        }  `}
                        onClick={(event) => selectGuess(event, index)}
                      >
                        {removeHtmlEntities(answer)}
                      </button>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
      {quizSubmitted && (
        <div className="scoreContainer">
          <h3 className="score">Score: {score}/5</h3>
        </div>
      )}
      <div className="btnContainer">
        {quizSubmitted ? (
          <button className="btn" onClick={resetQuiz}>
            Play Again
          </button>
        ) : (
          <button
            className="btn"
            onClick={!quizSubmitted ? checkQuizAnswers : null}
          >
            Submit Answers
          </button>
        )}
      </div>
    </div>
  );
};

export default Questions;
