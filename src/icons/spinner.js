export default function Spinner({ color = "#000", width = 24, ...props }) {
	return (
		<svg width={width} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g fill="none">
				<path d="M 2 12 C 2 7 6 2 12 2" id="Oval-2" stroke={color} strokeWidth="2" strokeLinecap="round">
					<animateTransform
						attributeName="transform"
						type="rotate"
						from="0 12 12"
						to="360 12 12"
						dur="1s"
						repeatCount="indefinite"
					/>
				</path>
			</g>
		</svg>
	)
}