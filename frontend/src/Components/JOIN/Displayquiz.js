import React, { useState , useContext } from 'react';
import {useHistory} from 'react-router-dom'
import {AuthContext} from "../Home"

export default function Displayquiz({quiz,code}) {
	
	var questions = [
		{
			questionText:"",
			answerOption:[
				{answerText:"",isCorrect:Boolean}
			]
		}
	];

	questions=quiz.Questions;

	const {_id} = useContext(AuthContext)
	const history = useHistory()
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

	const updateresponse = async ()=>{
		console.log("updating...");
		try{

			await fetch("/user/attempted",{
				method:"POST",
				headers:{
					"Content-Type":"application/json"
				},
				body:JSON.stringify({
					userid:_id,quizid:code,quiztitle:quiz.Title,questions:questions.length,score
				})
			})
			// await fetch("/user/updateresponse",{
			// 	method:"POST",
			// 	headers:{
			// 		"Content-Type":"application/json"
			// 	},
			// 	boody:JSON.stringify({
			// 		_id,code,score
			// 	})
			// })
		}
		catch(err){
			console.log("Not updated");
		}
		history.push("/home")
	}

	return (
		<div className="Main-container">
		<div className="quiztitle">
				<h2>{quiz.Title}</h2>
			</div>

			<div className='conatiner Displayquiz '>
				{showScore ? (
					<div className='score-section'>
						<div>You scored {score} out of {questions.length}</div>
						<div><button className="btn btn-sucess" onClick={updateresponse}>Home</button></div>
						<div><button className="btn btn-sucess" onClick={updateresponse}>Dashboard</button></div>
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
							{questions[currentQuestion].options.map((option,i) => (
								<button key={i} onClick={() => handleAnswerOptionClick(option.istrue)}>{option.option}</button>
							))}
						</div>
					</>
				)}
			</div>

		</div>
	);
}