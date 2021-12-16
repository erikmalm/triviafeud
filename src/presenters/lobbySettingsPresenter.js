import { LobbySettingsShow, LobbySettingsEdit } from "../views/lobbySettingsView"
import { useSelector, useDispatch } from "react-redux"
import { updateSetting, revertSettings } from "../redux/reducers/settingsSlice"
import { settings as settingOptions } from "../util/settingsUtil"

import { containsBadWords } from "../util/util"
import { notifyError } from "../components/notification"

export default function LobbySettingsPresenter({ showSettings, setShowSettings }) {
	const dispatch = useDispatch()
	const settingsState = useSelector(state => state.settings)

	function update(setting, value) {
		if (containsBadWords("" + value)) return notifyError(setting + " contains a bad word")
		dispatch(updateSetting({ setting: setting, value: value }))
	}

	return (
		<>
			{showSettings && (
				<LobbySettingsEdit
					toggleSettings={setShowSettings}
					currentSettings={settingsState}
					settingOptions={settingOptions}
					applySetting={update}
					defaultAllSettings={() => dispatch(revertSettings())}
				/>
			)}
			<LobbySettingsShow currentSettings={settingsState} settingOptions={settingOptions} />
		</>
	)
}
