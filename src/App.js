import "./App.css";
import React, { useState, useEffect } from "react";
import Loading from "./components/loading";
import News from "./components/News";

const API = "http://localhost:3333/news";
function App() {
  let initialArchived = JSON.parse(localStorage.getItem("archived"));
  const myHeaders = new Headers();

  if (!initialArchived) {
    initialArchived = false;
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
    localStorage.setItem("archived", archived);
  }, [archived]);

  const removeNew = (id) => {
    var urlencoded = new URLSearchParams();

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };
    fetch(`${API}/${id}`, requestOptions)
      .then((response) => {
        if (response.ok) {
          return response;
        }
        return Promise.reject(response);
      })
      .then(() => {
        setNews(news.filter((n) => n._id !== id));
      })
      .catch((error) => console.log("error", error));
  };

  const archiveNew = (id, archiveDate) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("archiveDate", archiveDate === null ? "" : archiveDate);

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
  };

  return (
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
