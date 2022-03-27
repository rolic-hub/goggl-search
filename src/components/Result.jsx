import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import { useResultContext } from "../context/Resultprovider";
import Loading from "./Loading";
import { data } from "autoprefixer";

const Result = () => {
  const { results, isLoading, getResults, searchTerm, getNews } = useResultContext();
  const location = useLocation();

  useEffect(() => {
    if (searchTerm) {
      if (location.pathname === "/video") {
        getResults(`/search/q=${searchTerm} videos`);
      } else if (location.pathname === '/news'){
        getNews(
          `${location.pathname}/search?q=${searchTerm}&safeSearch=off&textFormat=Raw&freshness=Day&sortBy=date&count=40`
        );
      }else {
        getResults(`${location.pathname}/q=${searchTerm}`)
      }
    }
  }, [searchTerm, location.pathname]);

  

  if (isLoading) return <Loading />;

  switch (location.pathname) {
    case "/search":
      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56">
          {results?.results?.map(({ link, title }, index) => (
            <div key={index} className="md:w-2/5 w-full">
              <a href={link} target="_blank" rel="noreferrer">
                <p className="text-sm">
                  {link.length > 30 ? link.substring(0, 30) : link}
                </p>
                <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
                  {title}
                </p>
              </a>
            </div>
          ))}
        </div>
      );
    case "/image":
      return (
        <div className="flex flex-wrap justify-content items-center">
          {results?.image_results?.map(
            ({ image, link: { href, title } }, index) => (
              <a
                className="sm:p-3 p-5"
                href={href}
                key={index}
                target="_blank"
                rel="noreferrer"
              >
                <img src={image?.src} alt={title} loading="lazy" />
                <p className="w-36 break-words text-sm mt-2 ">
                  {title}
                </p>
              </a>
            )
          )}
        </div>
      );
    case "/news":
      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56 items-center">
          {results?.value?.map(
            ({ url, datePublished, description, name, provider }) => (
              <div key={datePublished} className="md:w-2/5 w-full">
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  <p className="text-lg dark:text-blue-300 text-blue-700">
                    {name}
                  </p>
                </a>
                <div className="flex gap-4">
                  <p>{provider?.[0].name}</p>
                </div>
              </div>
            )
          )}
        </div>
      );
    case "/video":
      return (
        <div className="flex flex-wrap">
          {results?.results?.map((video, index) => (
            <div key={index} className="p-2">
              {video?.additional_links?.[0]?.href && (
                <ReactPlayer
                  url={video.additional_links?.[0].href}
                  controls
                  width="355px"
                  height="200px"
                />
              )}
            </div>
          ))}
        </div>
      );

    default:
      return "ERROR!";
  }
};

export default Result;
