import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "@/types/models";
import * as SecureStore from "expo-secure-store";

type Session = {
  user: User;
  accessToken: string;
};

const AuthContext = createContext<{
  signIn: (handle: string) => void;
  signOut: () => void;
  session?: Session | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});
const avatar =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/jeff.jpeg";

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadSession();
  }, []);

  const signIn = (handle: string) => {
    // signIn with a server
    const session = {
      user: {
        id: "1",
        handle: handle,
        name: "Jeff",
        avatar,
      },
      accessToken: "accessToken",
    };
    setSession(session);
    saveSession(session);
  };

  const signOut = () => {
    setSession(null);
    saveSession(null);
  };

  const saveSession = async (value: Session | null) => {
    if (value) {
      //save
      await SecureStore.setItemAsync("session", JSON.stringify(value));
    } else {
      //delete
      await SecureStore.deleteItemAsync("session");
    }
  };

  const loadSession = async () => {
    const sessionData = await SecureStore.getItemAsync("session");

    if (sessionData) {
      setSession(JSON.parse(sessionData));
    } else {
      setSession(null);
    }

    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
