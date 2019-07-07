// Import Statements
import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { data } from '../DataFile';
import './index.css';
import { ResultContainer } from '../ResultContainer';

// Main Search Bar Component
export default class SearchBar extends PureComponent {
	state = {
		input: '', // input value in the search bar
		filteredResult: [], // filtered result for given input value
		activeResult: 0
	};

	// Function to perform the filter the data for this.state.input value
	filterSearch = e => {
		const value = e.target.value;
		this.setState({
			input: value,
			filteredResult: data.filter(el => {
				return el.id.indexOf(value) !== -1 || el.address.indexOf(value) !== -1 || el.name.indexOf(value) !== -1;
			})
		});
	};

	// Function to clear the input values
	clearInput = () => {
		let filteredResult = this.state.filteredResult;
		filteredResult.length = 0;
		this.setState({ input: '', filteredResult: filteredResult });
	};

	// Function to handle down/up arrow keys
	handleKeyDown = e => {
		const { activeResult, filteredResult } = this.state;
		// arrow up/down button should select next/previous list element
		if (e.keyCode === 38 && activeResult > 0) {
			this.setState(prevState => ({
				activeResult: prevState.activeResult - 1
			}));
		} else if (e.keyCode === 40 && activeResult < filteredResult.length - 1) {
			this.setState(prevState => ({
				activeResult: prevState.activeResult + 1
			}));
		}
	};

	// Function to change the active result on hovering
	changeActiveResult = index => {
		this.setState({ activeResult: index });
	};

	render() {
		return (
			<>
				<div className='search-bar-container'>
					<FontAwesomeIcon icon={faSearch} />
					<input
						type='text'
						className='text-container'
						placeholder={'Search users by ID, address, name...'}
						onChange={this.filterSearch}
						value={this.state.input}
						onKeyDown={this.handleKeyDown}
					/>
					<FontAwesomeIcon icon={faWindowClose} className='close-icon' onClick={this.clearInput} />
				</div>
				{this.state.input && this.state.filteredResult.length ? (
					<ResultContainer
						filteredResult={this.state.filteredResult}
						searchKey={this.state.input}
						activeResult={this.state.activeResult}
						changeActiveResult={this.changeActiveResult}
					/>
				) : this.state.input ? (
					<div className='results-container no-results'>No search resuls</div>
				) : null}
			</>
		);
	}
}
