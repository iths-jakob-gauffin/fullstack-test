import React, { useState } from 'react';
import './App.css';

function App() {
	const [ hamsters, setHamsters ] = useState(null);

	const handleClick = async () => {
		let result = await getHamsters();
		console.log('OUTPUT ÄR: handleClick -> result', result);
		result && setHamsters(result);
	};

	return (
		<div className="App">
			<header className="App-header">
				<h1>Hejhejhej</h1>
				<button onClick={handleClick}>Hämta hamsterdata</button>
			</header>
			<main>
				<ul>
					{hamsters &&
						hamsters.hamsterObjects.map(hamster => (
							<li key={hamster.id}>{hamster.name}</li>
						))}
				</ul>
			</main>
		</div>
	);
}

const getHamsters = async () => {
	/////// DETTA UTAN PROXY
	// let baseUrl;
	// if (process.env.NODE_ENV === 'production') {
	// 	// Vi behöver inte ange HTTP eftersom AJAX stannar kvar på samma server
	// 	baseUrl = '/api';
	// } else {
	// 	// 'development'
	// 	// Använd portnumret från din serverfil, steg 3a
	// 	baseUrl = 'http://localhost:1234/api';
	// }

	////////// MED PROXY
	let baseUrl = '/api';

	try {
		const response = await fetch(baseUrl + '/hamsters');
		const hamsterArray = await response.json();
		return hamsterArray;
	} catch (e) {
		console.error('Dä bläv fäl', e);
		return null;
	}
};

export default App;
