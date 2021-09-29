import { createContext, FunctionComponent, useContext } from "react";

import { useGetUserQuery, User } from "./graphql/generated-types-and-hooks";

type IUserContext = User | undefined;

const UserContext = createContext<IUserContext>(undefined);

export const UserProvider: FunctionComponent = (props) => {
  const { data, loading } = useGetUserQuery();

  if (loading) {
    return <>Loading...</>;
  }

  return <UserContext.Provider value={data?.me ?? undefined} {...props} />;
};

export const useUser = (): IUserContext => useContext(UserContext);
