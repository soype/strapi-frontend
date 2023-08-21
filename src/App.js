import './App.css';

import Home from './Pages/Home';
import { Header } from './Components/Header';
import Search from './Pages/Search';

function App() {
  return (
    <div className="App">
      <Header></Header>
      
      <Search></Search>
    </div>
  );
}

export default App;
