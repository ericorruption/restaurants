import { createContext, FunctionComponent, useContext } from "react";

import { Role, useGetUserQuery } from "./graphql/generated-types-and-hooks";

// TODO enrich if needed
type IUserContext = { role: Role } | undefined;

const UserContext = createContext<IUserContext>(undefined);

export const UserProvider: FunctionComponent = (props) => {
  const { data, loading, error } = useGetUserQuery();

  if (error) {
    return (
      <main>
        <p>Error: {error.message}</p>
      </main>
    );
  }

  if (loading) {
    return <>Loading...</>;
  }

  return <UserContext.Provider value={data?.me ?? undefined} {...props} />;
};

export const useUser = (): IUserContext => useContext(UserContext);
