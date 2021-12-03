// Function which returns depending on case:
// !promise -> no data
// error -> error
// !data -> spinner

export function promiseNoData(promise, data, error) {
	if (!promise) return <span>no data</span>

	if (error) return <span>{error}</span>

	if (!data)
		return {
			/* <Spinner color={"var(--cool-color)"} /> */
		}
}
