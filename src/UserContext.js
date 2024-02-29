import { createContext, useState } from "react";

export const userContext = createContext(null);

export function UsrerContextProvider({ children }) {
  let [user, setUser] = useState(null);
  let [login, setLogin] = useState(null);
  let [isOpen, setOpen] = useState(false);
  let [signUpToken, setSignUpToken] = useState(false);

  return (
    <userContext.Provider
      value={{
        user,
        setUser,
        login,
        setLogin,
        isOpen,
        setOpen,
        signUpToken,
        setSignUpToken,
      }}
    >
      {children}
    </userContext.Provider>
  );
}
