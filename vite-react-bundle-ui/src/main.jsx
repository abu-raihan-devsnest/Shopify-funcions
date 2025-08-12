import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const root = document.getElementById('bundle-ui-root');
const product = JSON.parse(root.getAttribute('data-product'));


if (root) {
  createRoot(root).render(<App product={product} />);
}


// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
