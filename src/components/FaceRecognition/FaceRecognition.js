import React from 'react';
import './FaceRecognition.css'


const FaceRecognition = ({ box, imageUrl }) => {
	return (
		<div className="center ma">
			<div className='absolute mt2'>
				<img id='input-image' src={imageUrl} alt={'face_detect'} width='500px' height='auto'/>
				{Object.values(box).map((face) => {
					return <div key={face.topRow} className='bounding-box' style={{
						top: face.topRow,
						right: face.rightCol,
						bottom: face.bottomRow,
						left: face.leftCol}}>
						</div>})
				}
			</div>
		</div>
	);
}

export default FaceRecognition
