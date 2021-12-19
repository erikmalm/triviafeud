import styles from "../styles/settingsView.module.css"
import { capitalizeFirstLetter } from "../util/util"

import { CrossIcon, MinusIcon, PlusIcon, UndoIcon } from "../icons"

function createSetting(setting, applySetting, currentValue) {
	const label = setting.label.replace(/\s/g, "_")
	switch (setting.type) {
		case "select":
			return (
				<div className={styles.select} key={setting.label}>
					<label htmlFor={label}>{setting.label}</label>
					<select value={currentValue} id={label} onChange={e => applySetting(setting.name, e.target.value)}>
						{setting.options.map(option => (
							<option value={option} key={option}>
								{option}
							</option>
						))}
					</select>
				</div>
			)

		case "checkbox":
			return (
				<div className={styles.checkbox} key={setting.label}>
					<label htmlFor={label}>{setting.label}</label>
					<input
						type="checkbox"
						id={label}
						checked={currentValue === "on"}
						onChange={e => applySetting(setting.name, currentValue === "on" ? "off" : "on")}
					></input>
				</div>
			)

		case "text":
			return (
				<div className={styles.textInput} key={setting.label}>
					<label htmlFor={label}>{setting.label}</label>
					<input
						value={currentValue}
						type="text"
						id={label}
						onChange={e => applySetting(setting.name, e.target.value)}
					></input>
				</div>
			)

		case "number":
			return (
				<div className={styles.number} key={setting.label}>
					<label>{setting.label}</label>
					<div>
						<button
							disabled={currentValue <= 2}
							onClick={() => applySetting(setting.name, currentValue - 1)}
						>
							<MinusIcon width="20" />
						</button>
						<div>{currentValue}</div>
						<button
							disabled={currentValue >= 30}
							onClick={() => applySetting(setting.name, currentValue + 1)}
						>
							<PlusIcon width="20" />
						</button>
					</div>
				</div>
			)
		default:
			return (
				<div className={styles.textInput} key={setting.label}>
					<label htmlFor={styles.setting}></label>
					<input type="text">{setting.label}</input>
				</div>
			)
	}
}

export function LobbySettingsEdit({
	toggleSettings,
	currentSettings,
	settingOptions,
	applySetting,
	defaultAllSettings,
}) {
	return (
		<>
			<div className={styles.wrapper}>
				<button onClick={toggleSettings} className={styles.closeButton}>
					<CrossIcon />
				</button>
				<div className={styles.inputs}>
					{settingOptions.map(settingOption =>
						createSetting(settingOption, applySetting, currentSettings[settingOption.name])
					)}
				</div>
				<div>
					<button className={styles.defaultSettings} onClick={() => defaultAllSettings()}>
						Reset to default Settings
						<UndoIcon />
					</button>
				</div>
			</div>
			<div className={styles.backDrop} onClick={toggleSettings}></div>
		</>
	)
}

export function LobbySettingsShow({ currentSettings, settingOptions }) {
	return (
		<div className={styles.main}>
			<h3>Game settings</h3>
			{settingOptions.map(settingOption => (
				<div key={settingOption.name}>
					<span className={styles.name}>{settingOption.label}</span>{" "}
					<span className={styles.value}>
						{capitalizeFirstLetter(currentSettings[settingOption.name].toString())}
					</span>
				</div>
			))}
		</div>
	)
}
