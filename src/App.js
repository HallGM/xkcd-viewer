import ComicContainer from "./containers/ComicContainer.js";
import Menu from "./components/Menu.js";
import { useState, useEffect } from "react";
import dataFetcher from "./helpers/dataFetcher";

function App() {
  const [loading, setLoading] = useState(false);
  const [currentIssueNum, setCurrentIssueNum] = useState(1);
  const [comicData, setComicData] = useState(null);

  useEffect(() => {
    setLoading(true);
    dataFetcher.getTenComics(currentIssueNum, (data) => {
      setComicData(data);
      setLoading(false);
    });
  }, [currentIssueNum]);

  function handleIssueChange(num) {
    if (num > 0)
    setCurrentIssueNum(currentIssueNum + num);
  }

  function handleRandom() {
    setLoading(true)
    dataFetcher.getTenRandomComics((data) => {
      setComicData(data)
      setLoading(false)
    });
  }

  return (
    <div className="App">
      <h1>XKCD Comics</h1>
      <Menu
        onIssueChange={(num) => handleIssueChange(num)}
        onRandom={handleRandom}
      />
      <ComicContainer comicData={comicData} loading={loading} />
      <Menu
        onIssueChange={(num) => handleIssueChange(num)}
        onRandom={handleRandom}
      />
    </div>
  );
}

export default App;
