import "./App.css";
import React, { useState, useEffect } from "react";
import Loading from "./components/loading";
import News from "./components/News";

const API = "http://localhost:3333/news";
function App() {
  let initialArchived = JSON.parse(localStorage.getItem('archived'))
  if(!initialArchived){
    initialArchived = false
  }
  const [archived, setArchived] = useState(initialArchived);

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
 

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await fetch(API);
      const news = await response.json();
      setNews(news);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    localStorage.setItem('archived', archived)
  }, [archived])

  const removeNew = (id) => {
    setNews(news.filter((n) => n._id !== id));
  };

  const archiveNew = (id, archiveDate) => {
    console.log(archiveDate)
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("archiveDate", archiveDate===null?'': archiveDate);

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch(`${API}/${id}`, requestOptions)
    .then((response) => {
      if (response.ok) { 
       return response.json();
      }
      return Promise.reject(response); 
    })
    .then(() => {
      setNews(news.map((n) => (n._id === id ? { ...n, archiveDate } : n)));
    })
    .catch((error) => console.log("error", error));
    console.log("archiveNew", id + " " + archiveDate);
  };

  return (
    // {loading ? <button onClick={()=>{setArchived(!archived)}}>{}<button/>}
    <main>
      <button
        className="show-btn"
        style={{ visibility: loading ? "hidden" : "visible" }}
        onClick={() => {
          setArchived(!archived);
        }}
      >
        {archived ? "Show News" : "Show Archived"}
      </button>
      {loading ? (
        <Loading />
      ) : archived ? (
        <News news={news} removeNew={removeNew} archiveNew={archiveNew} />
      ) : (
        <News news={news} archiveNew={archiveNew} />
      )}
    </main>
  );
}

export default App;
