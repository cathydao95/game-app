import { useState, useEffect } from "react";
import "./Questions.css";

const Questions = ({ quiz, correctAnswers, setIsPlaying }) => {
  const [guesses, setGuesses] = useState(Array(quiz.length).fill(null));
  const [randomizedAnswers, setRandomizedAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  console.log(quiz);
  // RANDOMIZE ANSWERS
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

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
        newGuesses[index] = { guess: guess };
        return newGuesses;
      });
  };

  // WHEN USER SUBMITS QUIZ, CHECK ANSWERS
  const checkQuizAnswers = () => {
    if (guesses.every((guess) => guess !== null)) {
      console.log(guesses);
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
    setIsPlaying(false);
  };
  return (
    <div>
      <div className="quizContainer">
        {/* get index of question to set correct answer index */}
        {randomizedAnswers.map((answers, index) => {
          return (
            <div key={index}>
              <h3 className="question">{quiz[index].question}</h3>
              {quizSubmitted && (
                <p className="correctAnswer">
                  Correct Answer: {quiz[index].correct_answer}
                </p>
              )}
              <div>
                <ul className="answersContainer">
                  {answers.map((answer) => {
                    // if answer is equal to index in guess array, isSelected is true -- to use for classNames
                    const isSelected = guesses[index]?.guess === answer;
                    const isCorrect =
                      guesses[index]?.isCorrect &&
                      guesses[index]?.guess === answer;

                    return (
                      <button
                        key={answer}
                        data-answer={answer}
                        className={`answerBtn ${isSelected ? "guess" : ""}  ${
                          isCorrect
                            ? "correct"
                            : quizSubmitted && isSelected && !isCorrect
                            ? "incorrect"
                            : ""
                        }  `}
                        onClick={(event) => selectGuess(event, index)}
                      >
                        {answer}
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
