import React from 'react';
import ReactDOM from 'react-dom';
import {SpeechProvider} from '@speechly/react-client'

import App from './App';
import './index.css';

import { Provider } from './context/context';

// Disable Speechly by default in development to avoid token fetch errors
// Set REACT_APP_ENABLE_SPEECHLY=true to enable it locally
const enableSpeechly = process.env.REACT_APP_ENABLE_SPEECHLY === 'true' && process.env.NODE_ENV !== 'test';

const AppTree = (
    <Provider>
        <App />
    </Provider>
);

ReactDOM.render(
    enableSpeechly
        ? (
            <SpeechProvider appId="7aa066e8-41d5-45c7-9f9b-0cfa0fef85ef" language="en-US">
                {AppTree}
            </SpeechProvider>
        )
        : AppTree,
    document.getElementById('root')
);