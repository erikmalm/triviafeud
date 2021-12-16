export default function Login({ color = "#000", width = 24, ...props }) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={width} fill={color} {...props}>
			<g>
				<path d="M0,0h24v24H0V0z" fill="none" />
			</g>
			<g>
				<g>
					<path d="M11,7L9.6,8.4l2.6,2.6H2v2h10.2l-2.6,2.6L11,17l5-5L11,7z M20,19h-8v2h8c1.1,0,2-0.9,2-2V5c0-1.1-0.9-2-2-2h-8v2h8V19z" />
				</g>
			</g>
		</svg>
	)
}
