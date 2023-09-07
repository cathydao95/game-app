import { useState, useEffect } from "react";

const Questions = ({ quiz, correctAnswers }) => {
  const [guesses, setGuesses] = useState(Array(quiz.length).fill(null));
  const [randomizedAnswers, setRandomizedAnswers] = useState([]);
  const [score, setScore] = useState(0);

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

  console.log("randomAnswers", randomizedAnswers);

  // WHEN USER CLICKS ON AN ANSWER, RUN SELECTGUESS FUNCTION
  const selectGuess = (e, index) => {
    // console.log(e.target.dataset.answer);
    let guess = e.target.dataset.answer;
    // console.log(index);
    // setGuesses((prevGuesses) => {
    //   const newGuesses = [...prevGuesses];
    //   newGuesses[index] = guess;
    //   return newGuesses;
    // });
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
        console.log(
          "tdoes this work",
          guess,
          correctAnswers[index],
          guess === correctAnswers[index]
        );
        return { ...guess, isCorrect: guess.guess === correctAnswers[index] };
      });
      setGuesses(checkGuesses);
      setScore(
        guesses.reduce((acc, guess, index) => {
          if (guess.guess === correctAnswers[index]) {
            return acc + 1;
          }
          return acc;
        }, 0)
      );
    } else {
      console.log("please answer every question");
    }
  };

  console.log("GUESSES", guesses);
  return (
    <div>
      <div>
        {/* get index of question to set correct answer index */}
        {randomizedAnswers.map((answers, index) => {
          return (
            <div key={index}>
              <h3>{quiz[index].question}</h3>
              <div>
                <ul>
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
                        className={`${isSelected ? "gold" : ""} ${
                          isCorrect ? "green" : ""
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
      <button onClick={checkQuizAnswers}>Submit Answers</button>
      <h3>Score: {score}</h3>
    </div>
  );
};

export default Questions;
