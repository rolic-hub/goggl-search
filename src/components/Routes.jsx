import React from 'react'
import {Routes, Route, Navigate, useRoutes} from 'react-router-dom'
import Result from './Result';

export const Path = () => {

  return (
    <div className="p-4">
      <Routes>
        <Route path="/" element={<Navigate replace to="/search" />} />
        <Route
          path="/search"         
          element={<Result />}
        />
         <Route
          path= "/image"
          element={<Result />}
        />
         <Route
          path= "/news"
          element={<Result />}
        />
         <Route
          path= "/video"
          element={<Result />}
        />
      </Routes>
    </div>
  );
}
