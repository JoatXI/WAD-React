import React from 'react';
import ReactDOM from 'react-dom/client';
import Greeter from './components/greeter.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Greeter firstname="Doyin" lastname="Adebanjo" age="21" />);
