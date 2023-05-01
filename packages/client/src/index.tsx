import ReactDOM from 'react-dom/client';
import App from './App';

const mountElement = document.querySelector('#app-root')!;
const root = ReactDOM.createRoot(mountElement);
root.render(<App />);
