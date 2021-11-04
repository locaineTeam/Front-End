import React, { useState } from "react";

const localToken = localStorage.getItem("IETItoken");
const localUser = JSON.parse(localStorage.getItem("IETIuser"));

export const token = localToken ? localToken : "";
export const user = localUser ? localUser: {};

const initialData = { token, user };

const DataContext = React.createContext(initialData);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(initialData);

  const value = { data, setData };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = React.useContext(DataContext);

  return context;
};