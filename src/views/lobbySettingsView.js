import styles from "../styles/settingsView.module.css"

function createSetting (setting, applySetting, currentValue) {
		const label = (setting.label).replace(/\s/g, '_')
		switch (setting.type) {
			case "select":
				return (
					<div className={styles.select}>
						<label htmlFor={label}>{setting.label}</label>
						<select value={currentValue} id={label} onChange={(e) => applySetting(setting.name, e.target.value)}>
							{setting.options.map((option) => <option value={option} key={option}>{option}</option>)}
						</select>
					</div>
				)

			case "checkbox":
				return (
					<div className={styles.checkbox}>
						<label htmlFor={label}>{setting.label}</label>
						<input type="checkbox" id={label} checked={currentValue} onChange={(e) => applySetting(setting.name, !currentValue)} key={setting.name}></input>
					</div>
				)
			
			case "number":
				return (
					<div className={styles.number}>
						<button disabled={currentValue >= 30}onClick={() => applySetting(setting.name, currentValue + 1)}>+</button>
						<div>{currentValue}</div>
						<button disabled={currentValue <= 2} onClick={() => applySetting(setting.name, currentValue - 1)}>-</button>
					</div>
				)
			default:
				return (
					<div className={styles.textInput}>
						<label htmlFor={styles.setting}></label>
						<input type="text">{setting.label}</input>
					</div>
				)
		}
}


export function LobbySettingsEdit({ toggleSettings, currentSettings, renderSettings, applySetting, defaultSettings }) {
	return (
		<div className={styles.wrapper}>
			<button onClick={toggleSettings}>x</button>
			<div>
				{Object.entries(renderSettings).map((renderSetting) => createSetting(renderSetting[1], applySetting, currentSettings[renderSetting[0]]))}
			</div>
			<div>
				<button onClick={() => defaultSettings()}>Default Settings</button>
			</div>
		</div>
	)
}

export function LobbySettingsShow({currentSettings, renderSettings}) {
	return (
		<div className={styles.main}>
			<h3>Game settings</h3>
			{Object.keys(renderSettings).map(key => (
				<div><span className={styles.name}>{renderSettings[key].label}</span> <span className={styles.value}>{currentSettings[renderSettings[key].name].toString()}</span></div>
			))}
		</div>
	)
}