export interface GlobalContextType {
  userObject: {
    user: undefined;
    setUser: React.Dispatch<React.SetStateAction<undefined>>;
    isAuthUser: boolean | undefined;
    setIsAuthUser: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  };
}
