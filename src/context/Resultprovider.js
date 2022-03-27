import React, { createContext, useContext, useState } from "react";

const ResultContext = createContext();
const baseUrl = "https://google-search3.p.rapidapi.com/api/v1";
const newsUrl = 'https://bing-news-search1.p.rapidapi.com'

export const Resultprovider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("Elon Musk");

  const getResults = async (type) => {
    setIsLoading(true);

    const response = await fetch(`${baseUrl}${type}`, {
      method: "GET",
      headers: {
        "X-User-Agent": "desktop",
        "X-Proxy-Location": "EU",
        "X-RapidAPI-Host": "google-search3.p.rapidapi.com",
        "X-RapidAPI-Key": "dffdb0b6d3mshac33ba299638d43p12944bjsn1343ef7264f7",
      },
    });

    const data = await response.json();

    
    setResults(data);
    console.log(data)
  };

  const getNews = async (type) => {
    setIsLoading(true);

    const res = await fetch(`${newsUrl}${type}`, {
      method: "GET",
     headers: {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
    'X-RapidAPI-Key': 'dffdb0b6d3mshac33ba299638d43p12944bjsn1343ef7264f7'
     },
    });

    const newsdata = await res.json();

     type.includes('/news') && setResults(newsdata);
     
    
  };


  return (
    <ResultContext.Provider
      value={{
        getNews,
        getResults,
        results,
        searchTerm,
        setIsLoading,
        isLoading,
        setSearchTerm,
      }}
    >
      {children}
    </ResultContext.Provider>
  );
};

export const useResultContext = () => useContext(ResultContext);
