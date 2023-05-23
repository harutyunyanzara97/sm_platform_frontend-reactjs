// import {StrictMode} from 'react';
// import {createRoot} from 'react-dom/client';

// import App from './App';

// // 👇️ IMPORTANT: div ID has to match with index.html
// const rootElement = document.getElementById('root');
// const root = createRoot(rootElement);

// // 👇️ if you use TypeScript, add non-null (!) assertion operator
// // const root = createRoot(rootElement!);

// root.render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// );

import React from 'react';
import ReactDOM from 'react-dom';

import AppRouter from './approuter';
// import * as serviceWorker from './client/serviceWorker';

ReactDOM.render(<AppRouter/>, document.getElementById('root'));

if (module.hot) { // enables hot module replacement if plugin is installed
 module.hot.accept();
}