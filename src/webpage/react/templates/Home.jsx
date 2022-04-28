import * as React from 'react';
import MainLayout from "../layouts/MainLayout.jsx";

export default function Home(props) {
	return (
		<MainLayout>
			<div>
				Hello Fucking World! {props.data} lol
			</div>
		</MainLayout>
	);
}
