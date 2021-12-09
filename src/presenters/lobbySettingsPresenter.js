import { LobbySettingsShow, LobbySettingsEdit} from "../views/lobbySettingsView"
import { useSelector, useDispatch } from "react-redux"
import { updateSetting, resetSettings } from "../redux/reducers/settingsSlice"
import { settings as renderSettings } from "../util/settingsUtil"
import { INITIAL_STATE } from "../redux/reducers/settingsSlice"

export default function LobbySettingsPresenter({ showSettings, setShowSettings }) {


    const dispatch = useDispatch()
    const settingsState = useSelector(state => state.settings)
    const serverState = useSelector(state => state.server)


    function applySetting(setting, value) {
        console.log("Setting: ", setting, "   ", "Value:  ", value)
        dispatch(
            updateSetting({
                setting: setting,
                value: value,
                serverId: serverState.id
            })
        )
    }

    function defaultSettings() {
        dispatch(
            resetSettings({
                settings: INITIAL_STATE,
                serverId: serverState.id
            })
        )
    }

    return (
        <>
            {showSettings && (
                <LobbySettingsEdit 
                    toggleSettings={setShowSettings} 
                    currentSettings={settingsState}
                    renderSettings={renderSettings} 
                    applySetting={applySetting} 
                    defaultSettings={defaultSettings}
                />
            )}
            <LobbySettingsShow 
                    currentSettings={settingsState}
                    renderSettings={renderSettings} 
            />
        </>
    )
    

}
