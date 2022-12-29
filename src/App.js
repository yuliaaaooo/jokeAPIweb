import "./App.css";
import Chuck from "./chuck.jpg";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [state, setState] = useState({
    joke: "",
    searchKeyword: "",
    searchUrl: "https://api.chucknorris.io/jokes/search?query=",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await axios.get("https://api.chucknorris.io/jokes/random");
    //问题2:这里老师用的{...state,joke: result.data.value} 不理解
    //直接写setState({ joke: result.data.value })行不行
    setState({ ...state, joke: result.data.value });
  };

  //输入立即更新
  const searchJoke = (e) => {
    setState({ ...state, searchKeyword: e.target.value });
  };

  //点击就fetch
  const fetchMyJoke = async () => {
    //问题1:console.log(state.searchrUrl + state.searchKeyword);为什么state.searchrUrl是undefined
    const result = await axios.get(
      "https://api.chucknorris.io/jokes/search?query=" + state.searchKeyword
    );
    console.log(result);
    const jokePosition = Math.floor(Math.random() * result.data.result.length);
    console.log(jokePosition);
    console.log(result.data.result);
    setState({ ...state, joke: result.data.result[jokePosition].value });
  };

  return (
    //问题3:为啥46行和50行写了col-6不起作用，不是应该左右排列吗，打开网页却是上下排列
    <div className="container">
      <div className="row">
        <div className="col-6">
          <h1 className="title">Chunk Norris Api</h1>
          <img src={Chuck} alt="Chunk Norris" />
        </div>
        <div className="col-6 searchJokeCol">
          <div className="card">
            <div className="card-header">Search for a word</div>
            <input type="text" className="searchOption" onChange={searchJoke} />
            <span>Search for a word</span>
          </div>
          <div>
            <button className="btn btn-warning btn-lg" onClick={fetchMyJoke}>
              Generate Joke
            </button>
          </div>
        </div>
      </div>
      <h2 className="subTitle">Here is the Joke</h2>
      <h4>{state.joke}</h4>
      <h4>{state.searchKeyword}</h4>
    </div>
  );
}

export default App;
