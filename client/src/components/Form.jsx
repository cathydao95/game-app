import React from "react";
import "./Form.css";

const Form = ({ selectOptions, getQuizQuestions }) => {
  return (
    <div>
      <form className="settingsForm">
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
  );
};

export default Form;
