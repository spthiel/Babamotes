import * as React from 'react';
import Header from "../partials/Header.jsx";

export default function MainLayout(props) {
	return (
		<html>
			<head>
				<title>{props.title}</title>
				<meta name="viewport" content="width=device-width, initial-scale=1"/>
			</head>
			<body>
				<Header />
				{props.children}
			</body>
		</html>
	);
}
