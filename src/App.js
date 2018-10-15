import React, { Component } from 'react';
import './App.css';
import gonzalez from './gonzalez.png';

function postKilled(amount) {
	return fetch(`http://165.227.237.182:3029/kill/${amount}`, { method: 'POST' });
}

class App extends Component {
	state = {
		end: Date.now() + 20900,
		interval: null,
		killed: '',
	};

	componentWillMount() {
		const interval = setInterval(
			() => this.update(),
			250,
		);
		this.setState({ interval });
	}

	update() {
		if (Date.now() > this.state.end) {
			clearInterval(this.state.interval);
			this.setState({ interval: null, killed: 'five' });
			postKilled('five');
			localStorage.setItem('killed', 'five');
		}

		this.forceUpdate();
	}

	click = () => {
		if (this.state.interval) {
			clearInterval(this.state.interval);
			this.setState({ interval: null, killed: 'one' });
			postKilled('one');
			localStorage.setItem('killed', 'one');
		}
	};

	render() {
		const { end, interval, killed } = this.state;
		const timeLeft = end - Date.now();
		const finishedText = killed === 'one' ? 'You killed one.' : 'You let five die.';
		const timeToDisplay = interval ? `${Math.floor(timeLeft / 1000)}s` : finishedText;

		/* eslint-disable jsx-a11y/alt-text */

		return (
			<div className='App'>
				<header>
					{timeToDisplay}
				</header>
				<main className='App-main'>
					<div className={`top ${killed === 'one' && 'killed'}`}>
						<img src={gonzalez} />
					</div>
					<p>
						Would you kill one <i>Speedy Gonzalez</i> to save five ?
					</p>
					<div className={`bottom ${killed === 'five' && 'killed'}`}>
						<img src={gonzalez} />
						<img src={gonzalez} />
						<img src={gonzalez} />
						<img src={gonzalez} />
						<img src={gonzalez} />
					</div>
				</main>
				<footer className={!interval && !!killed ? 'hidden' : ''}>
					<div className='center'>
						<div className='select-button' onClick={this.click} />
					</div>
					Let five die or kill one.
				</footer>
			</div>
		);
	}
}

export default App;
