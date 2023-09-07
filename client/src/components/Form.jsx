import React from "react";
import "./Form.css";

const Form = ({ selectOptions, getQuizQuestions }) => {
  return (
    <div className="formContainer">
      <form className="settingsForm">
        <label className="categoryTitle" htmlFor="category">
          Select a Category:
        </label>
        <select
          className="quizOption"
          id="category"
          name="category"
          onChange={selectOptions}
        >
          <option value="general">General Knowledge</option>
          <option value="television">Entertainment: Television</option>
          <option value="animals">Animals</option>
          <option value="celebrities">Celebrities</option>
          <option value="history">History</option>
          <option value="any">Any Category</option>
        </select>
        <label className="categoryTitle" htmlFor="difficulty">
          Select Difficulty:
        </label>
        <select
          className="quizOption"
          id="difficulty"
          name="difficulty"
          onChange={selectOptions}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button className="startBtn btn" onClick={getQuizQuestions}>
          Start Playing
        </button>
      </form>
    </div>
  );
};

export default Form;
