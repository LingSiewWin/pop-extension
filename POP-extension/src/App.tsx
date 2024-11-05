import {userState} from "react";
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [ colour,setcolour]= usersa
  // Define the click handler function
  const onclick = async () => {
          let [tab] = await chrome.tabs.query({ active: true });
          chrome.scripting.executeScript({
            target: { tabId: tab.id! },
            func: () => {
              document.body.style.backgroundColor ='red';
        }
      });
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>POP Extension</h1>
      <div className="card">
        {/* Call onclick function on button click */}
        <button onClick={onclick}>
          Click Me
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
