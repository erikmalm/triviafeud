import styles from "../styles/questionDraft.module.css"

export function QuestionDraftView({ drafter }) {
	return <div>{drafter} is drafting a question.</div>
}

export function QuestionDraftViewDrafter({ questions, selectQuestion }) {
	return (
		<>
			<h2>Select a question</h2>
			<div className={styles.options}>
				{questions.map((question, index) => (
					<div key={index} onClick={() => selectQuestion(index)}>
						{question}
					</div>
				))}
			</div>
		</>
	)
}
