import React, { useState } from 'react';
import {Link} from 'react-router-dom'

export default function Displayquiz({quiz}) {
	
	var questions = [
		{
			questionText:"",
			answerOption:[
				{answerText:"",isCorrect:Boolean}
			]
		}
	];

	questions=quiz.Questions;

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);

	const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			setScore(score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}
	};

	return (
		<div className="Main-container">
		<div className="quiztitle">
				<h2>{quiz.Title}</h2>
			</div>

			<div className='conatiner Displayquiz '>
				{showScore ? (
					<div className='score-section'>
						<div>You scored {score} out of {questions.length}</div>
						<div><Link to="/home"><button className="btn btn-sucess">Home</button></Link></div>
					</div>
				) : (
					<>
						<div className='question-section'>

							<div className='question-count'>
								<span>Question {currentQuestion + 1}</span>/{questions.length}
							</div>

							<div className='question-text'>{questions[currentQuestion].question}</div>
						</div>

						<div className='answer-section p-3'>
							{questions[currentQuestion].options.map((option) => (
								<button key={option.id} onClick={() => handleAnswerOptionClick(option.istrue)}>{option.option}</button>
							))}
						</div>
					</>
				)}
			</div>

		</div>
	);
}