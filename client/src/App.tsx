// import './App.css';
import bread from './assets/img/bug.png';

function App() {
  return (
    <div >
      <header className="App-header">
        <img src={bread} style={{width: '80px', height:'80px'}} alt='logo' />
        <p>
          <code>BugTracker</code>
        </p>
      </header>
    </div>
  );
}

export default App;