import React from 'react';
import Image from './Image/Image';
import './Loader.css'

const Loader = ({name, entries}) => {
	return (
		<div class="loader" id="loader">
			<Image/>
		</div>
	);
}

export default Loader