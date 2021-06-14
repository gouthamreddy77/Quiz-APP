import React, { useState ,useEffect ,useContext } from 'react';
import {Link} from 'react-router-dom'
import {AuthContext} from "../Pages/Home"

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
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [updating, setupdating] = useState(0);
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

useEffect(() => {

	const updateresponse = async ()=>{
		setupdating(1);
		console.log("updating...");
		try{

			await fetch("/user/attempted",{
				method:"POST",
				headers:{
					"Content-Type":"application/json"
				},
				body:JSON.stringify({
					_id,quizid:code,quiztitle:quiz.Title,questions:questions.length,score
				})
			})
			setupdating(2);
			console.log("addeded to response & attempted");
		}
		catch(err){
			console.log("Not updated");
			setupdating(0);
		}
	}

	if(showScore === true){
		updateresponse()
	}
	// eslint-disable-next-line
}, [showScore])
	return (
		<div className="Main-container">
		<div className="quiztitle">
				<h2>{quiz.Title}</h2>
			</div>

			<div className='conatiner Displayquiz '>
				{showScore ? (
					<div className='score-section'>
						<div>You scored {score} out of {questions.length}</div>
						<div>
							{
								updating === 2 ? <h2>updatated</h2> : (
									updating === 1 ? 
									<>
										<div class="d-flex justify-content-center ">
											<h2>Updating...</h2>
											<div class="spinner-border m-3" role="status">
												<span class="sr-only "></span>
											</div>
										</div>
									</>
									:
									<h2>Not updated:(!!</h2>
								)
							}
						</div>
						<div><Link to="/home"><button className="btn btn-sucess"> Home </button></Link></div>
						<div><Link to="/dashboard"><button className="btn btn-sucess"> Dashboard </button></Link></div>
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