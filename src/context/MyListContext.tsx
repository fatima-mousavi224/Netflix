/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface MyListContextType {
  myList: any[];
  addToMyList: (item: any) => void;
  removeFromMyList: (id: number) => void;
  isInList: (id: number) => boolean;
}

const MyListContext = createContext<MyListContextType | undefined>(undefined);

export const MyListProvider = ({ children }: { children: React.ReactNode }) => {
  const [myList, setMyList] = useState<any[]>(() => {
    if (typeof window !== "undefined") {
      const savedList = localStorage.getItem("netflix_my_list");
      return savedList ? JSON.parse(savedList) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("netflix_my_list", JSON.stringify(myList));
  }, [myList]);

  const addToMyList = (item: any) => {
    if (!isInList(item.id)) {
      setMyList((prevList) => [...prevList, item]);
    }
  };

  const removeFromMyList = (id: number) => {
    setMyList((prevList) => prevList.filter((item) => item.id !== id));
  };

  const isInList = (id: number) => myList.some((item) => item.id === id);

  return (
    <MyListContext.Provider value={{ myList, addToMyList, removeFromMyList, isInList }}>
      {children}
    </MyListContext.Provider>
  );
};

export const useMyList = () => {
  const context = useContext(MyListContext);
  if (!context) {
    throw new Error("useMyList must be used within a MyListProvider");
  }
  return context;
};