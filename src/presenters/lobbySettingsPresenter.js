import LobbySettingsView from "../views/lobbySettingsView"
import { useSelector, useDispatch } from "react-redux"
//import { useNavigate } from "react-router";
import { DEFAULT_SETTINGS } from "../util/serverUtil"
import { updateSettings } from "../redux/reducers/serverSlice"

export default function lobbySettingsPresenter() {
/*
    const dispatch = useDispatch
    //const navigate = useNavigate

    const serverState = useSelector(state => state.server)
    const settingState = useSelector(state => state.settings)

    function closeSettings() {
        
        return null;
    }

    function applySettings() {
        dispatch(
            updateSettings({
                settings: settingState,
                serverId: serverState.id
            })
        )
        closeSettings();
    }

    function defaultSettings() {
        dispatch(
            updateSettings({
                settings: DEFAULT_SETTINGS,
                serverId: serverState.id
            })
        )
    }
*/
    return null;
    return (
        <LobbySettingsView
        categoryList={[]}
        closeSettings={"closeSettings"}
        applySettings={"applySettings"}
        defaultSettings={"defaultSettings"}
        />
    )


}

/** CATEGORY https://opentdb.com/api_category.php
 {"id":9,"name":"General Knowledge"},
 {"id":10,"name":"Entertainment: Books"},
 {"id":11,"name":"Entertainment: Film"},
 {"id":12,"name":"Entertainment: Music"},
 {"id":13,"name":"Entertainment: Musicals & Theatres"},
 {"id":14,"name":"Entertainment: Television"},
 {"id":15,"name":"Entertainment: Video Games"},
 {"id":16,"name":"Entertainment: Board Games"},
 {"id":17,"name":"Science & Nature"},
 {"id":18,"name":"Science: Computers"},
 {"id":19,"name":"Science: Mathematics"},
 {"id":20,"name":"Mythology"},
 {"id":21,"name":"Sports"},
 {"id":22,"name":"Geography"},
 {"id":23,"name":"History"},
 {"id":24,"name":"Politics"},
 {"id":25,"name":"Art"},
 {"id":26,"name":"Celebrities"},
 {"id":27,"name":"Animals"},
 {"id":28,"name":"Vehicles"},
 {"id":29,"name":"Entertainment: Comics"},
 {"id":30,"name":"Science: Gadgets"},
 {"id":31,"name":"Entertainment: Japanese Anime & Manga"},
 {"id":32,"name":"Entertainment: Cartoon & Animations"}
 */
