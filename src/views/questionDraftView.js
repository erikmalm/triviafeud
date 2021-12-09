import styles from "../styles/questionDraft.module.css"

import { QuestionIcon } from "../icons"

export function QuestionDraftView({ drafter }) {
	return (
        <div className={styles.view} >
            <QuestionIcon width={200} color="var(--pink)" />
            <h2>{drafter}</h2>
            <p>is drafting a question</p>
        </div>
    )
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
