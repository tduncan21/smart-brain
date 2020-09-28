import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn, onToggleHistory, showHistory }) => {
	if(isSignedIn) {
		return (
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
				<p onClick={() => onToggleHistory({showHistory})} className='f3 link dim black underline pa3 pointer'>History</p>
			</nav>
		);		
	} else {
		return (
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign in</p>
				<p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
			</nav>
		);	
	}		
}

export default Navigation