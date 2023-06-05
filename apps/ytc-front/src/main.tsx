import * as ReactDOM from 'react-dom/client';

import WrappedApp from './app/app.js';
import './i18n.js';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<WrappedApp />);
