import { LobbySettingsShow, LobbySettingsEdit } from "../views/lobbySettingsView"
import { useSelector, useDispatch } from "react-redux"
import { updateSetting, revertSettings } from "../redux/reducers/settingsSlice"
import { settings as settingOptions } from "../util/settingsUtil"

export default function LobbySettingsPresenter({ showSettings, setShowSettings }) {
	const dispatch = useDispatch()
	const settingsState = useSelector(state => state.settings)

	return (
		<>
			{showSettings && (
				<LobbySettingsEdit
					toggleSettings={setShowSettings}
					currentSettings={settingsState}
					settingOptions={settingOptions}
					applySetting={(setting, value) => dispatch(updateSetting({ setting: setting, value: value }))}
					defaultAllSettings={() => dispatch(revertSettings())}
				/>
			)}
			<LobbySettingsShow currentSettings={settingsState} settingOptions={settingOptions} />
		</>
	)
}
