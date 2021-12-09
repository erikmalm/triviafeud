import FinalResultsView from "../views/finalResultsView"

import { useSelector } from "react-redux"

export default function FinalResultsPresenter() {

    
    const playersState = useSelector(state => state.server.players)

    return (
        <FinalResultsView participants={playersState}/>
    )
}

// participants={playersState}