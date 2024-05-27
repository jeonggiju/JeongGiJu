import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

interface ISetAuthTokenContext {
  setAuthToken: Dispatch<SetStateAction<string>>;
}

interface IAuthTokenContext {
  authToken: string;
}

const AuthTokenContext = createContext<IAuthTokenContext | null>(null);
const SetAuthTokenContext = createContext<ISetAuthTokenContext | null>(null);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string>("");

  return (
    <AuthTokenContext.Provider value={{ authToken }}>
      <SetAuthTokenContext.Provider value={{ setAuthToken }}>
        {children}
      </SetAuthTokenContext.Provider>
    </AuthTokenContext.Provider>
  );
};

export { AuthProvider, AuthTokenContext, SetAuthTokenContext };
