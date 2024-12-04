import React from "react";
import './App.css';
import LandingPage from './Pages/landingPage';

function App() {
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   fetch("/api")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));
  // }, []);

  return (
    <div>
      <LandingPage/>
    </div>
  );
}

export default App;
