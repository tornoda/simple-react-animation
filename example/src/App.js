import React, { useState } from 'react';
import './App.css';
import Animation from './components/animation';

function App() {
    const [isShow, setIsShow] = useState(false);
    const handleClick = () => {
        setIsShow(!isShow);
    };
    return (
        <div className="wrapper">
            <button onClick={handleClick}>toggle</button>
            <Animation isShow={isShow} name="demo">
                <div className="demo">demo</div>
            </Animation>
        </div>
    );
}

export default App;
