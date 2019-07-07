import React from 'react';
import './index.css';

export const ResultContainer = props => {
	return (
		<div className='results-container'>
			{props.filteredResult.map((el, index) => {
				return (
					<div
						className={`result-wrapper ${props.activeResult === index ? 'active' : ''}`}
						key={el.id}
						onMouseOver={() => {
							props.changeActiveResult(index);
						}}
						ref={activeElement => {
							if (activeElement && props.activeResult === index) {
								activeElement.scrollIntoView();
							}
						}}
					>
						<div className='id-wrapper'>ID: {searchedItem(el.id, props.searchKey)}</div>
						<div className='info-wrapper'>
							<div>Name: {searchedItem(el.name, props.searchKey)}</div>
							<div>Address: {searchedItem(el.address, props.searchKey)}</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

// Function to render the searched keyword by highlighting the text
const searchedItem = (element, searchKey) => {
	let highlightedText = element;
	if (element.indexOf(searchKey) !== -1) {
		highlightedText = element.split(searchKey).join(`<span class='searched-text'>${searchKey}</span>`);
	}
	return <div dangerouslySetInnerHTML={{ __html: highlightedText }} />;
};
