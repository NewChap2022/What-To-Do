import React from 'react';
import StickyNote from '../../assets/images/stickynote1.png'

export default function Task ({task}) {
    return (
        <div 
            className='pt-5'
            style={{
                backgroundImage: `url(${StickyNote})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                height: "200px",

        }}>
            {task.title}
        </div>
    )
}
