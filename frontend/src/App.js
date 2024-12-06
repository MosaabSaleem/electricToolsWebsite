import React from "react";
import './App.css';
import ProductPage from './Pages/ProductPage';

function App() {
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   fetch("/api")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));
  // }, []);

  return (
    <div>
      <ProductPage/>
    </div>
  );
}

export default App;
