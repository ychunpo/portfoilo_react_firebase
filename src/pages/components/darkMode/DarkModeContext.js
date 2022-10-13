import React, { createContext, useReducer } from 'react'

const initialState = {
  darkMode: false,
};

export const DarkModeContext = createContext(initialState);

export const DarkModeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DarkModeContext, initialState);


  return (
    <DarkModeContextProvider value={{ darkMode: state.darkMode, dispatch }}>
      {children}
    </DarkModeContextProvider>
  )
}


