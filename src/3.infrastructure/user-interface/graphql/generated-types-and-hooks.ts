/* eslint-disable */
import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthPayload = {
  __typename?: "AuthPayload";
  token: Scalars["String"];
};

export type CreateRestaurantInput = {
  name: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  createRestaurant: Restaurant;
  login?: Maybe<AuthPayload>;
  signUp: SignUpOutput;
};

export type MutationCreateRestaurantArgs = {
  input: CreateRestaurantInput;
};

export type MutationLoginArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type MutationSignUpArgs = {
  input: SignUpInput;
};

export type Query = {
  __typename?: "Query";
  restaurants: Array<Restaurant>;
};

export type Restaurant = {
  __typename?: "Restaurant";
  id: Scalars["ID"];
  name: Scalars["String"];
  ownerId: Scalars["ID"];
};

export enum Role {
  Owner = "OWNER",
  User = "USER",
}

export type SignUpInput = {
  email: Scalars["String"];
  name?: Maybe<Scalars["String"]>;
  password: Scalars["String"];
  role?: Maybe<Role>;
};

export type SignUpOutput = {
  __typename?: "SignUpOutput";
  success: Scalars["Boolean"];
};

export type SignUpMutationVariables = Exact<{
  input: SignUpInput;
}>;

export type SignUpMutation = {
  __typename?: "Mutation";
  signUp: { __typename?: "SignUpOutput"; success: boolean };
};

export type LogInMutationVariables = Exact<{
  email: Scalars["String"];
  password: Scalars["String"];
}>;

export type LogInMutation = {
  __typename?: "Mutation";
  login?: Maybe<{ __typename?: "AuthPayload"; token: string }>;
};

export type CreateRestaurantMutationVariables = Exact<{
  input: CreateRestaurantInput;
}>;

export type CreateRestaurantMutation = {
  __typename?: "Mutation";
  createRestaurant: { __typename?: "Restaurant"; id: string };
};

export type ListRestaurantsQueryVariables = Exact<{ [key: string]: never }>;

export type ListRestaurantsQuery = {
  __typename?: "Query";
  restaurants: Array<{ __typename?: "Restaurant"; id: string; name: string }>;
};

export const SignUpDocument = gql`
  mutation signUp($input: SignUpInput!) {
    signUp(input: $input) {
      success
    }
  }
`;
export type SignUpMutationFn = Apollo.MutationFunction<
  SignUpMutation,
  SignUpMutationVariables
>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignUpMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignUpMutation,
    SignUpMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(
    SignUpDocument,
    options
  );
}
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<
  SignUpMutation,
  SignUpMutationVariables
>;
export const LogInDocument = gql`
  mutation logIn($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;
export type LogInMutationFn = Apollo.MutationFunction<
  LogInMutation,
  LogInMutationVariables
>;

/**
 * __useLogInMutation__
 *
 * To run a mutation, you first call `useLogInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logInMutation, { data, loading, error }] = useLogInMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLogInMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LogInMutation,
    LogInMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LogInMutation, LogInMutationVariables>(
    LogInDocument,
    options
  );
}
export type LogInMutationHookResult = ReturnType<typeof useLogInMutation>;
export type LogInMutationResult = Apollo.MutationResult<LogInMutation>;
export type LogInMutationOptions = Apollo.BaseMutationOptions<
  LogInMutation,
  LogInMutationVariables
>;
export const CreateRestaurantDocument = gql`
  mutation createRestaurant($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      id
    }
  }
`;
export type CreateRestaurantMutationFn = Apollo.MutationFunction<
  CreateRestaurantMutation,
  CreateRestaurantMutationVariables
>;

/**
 * __useCreateRestaurantMutation__
 *
 * To run a mutation, you first call `useCreateRestaurantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRestaurantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRestaurantMutation, { data, loading, error }] = useCreateRestaurantMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateRestaurantMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateRestaurantMutation,
    CreateRestaurantMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateRestaurantMutation,
    CreateRestaurantMutationVariables
  >(CreateRestaurantDocument, options);
}
export type CreateRestaurantMutationHookResult = ReturnType<
  typeof useCreateRestaurantMutation
>;
export type CreateRestaurantMutationResult =
  Apollo.MutationResult<CreateRestaurantMutation>;
export type CreateRestaurantMutationOptions = Apollo.BaseMutationOptions<
  CreateRestaurantMutation,
  CreateRestaurantMutationVariables
>;
export const ListRestaurantsDocument = gql`
  query listRestaurants {
    restaurants {
      id
      name
    }
  }
`;

/**
 * __useListRestaurantsQuery__
 *
 * To run a query within a React component, call `useListRestaurantsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListRestaurantsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListRestaurantsQuery({
 *   variables: {
 *   },
 * });
 */
export function useListRestaurantsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ListRestaurantsQuery,
    ListRestaurantsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ListRestaurantsQuery, ListRestaurantsQueryVariables>(
    ListRestaurantsDocument,
    options
  );
}
export function useListRestaurantsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ListRestaurantsQuery,
    ListRestaurantsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ListRestaurantsQuery,
    ListRestaurantsQueryVariables
  >(ListRestaurantsDocument, options);
}
export type ListRestaurantsQueryHookResult = ReturnType<
  typeof useListRestaurantsQuery
>;
export type ListRestaurantsLazyQueryHookResult = ReturnType<
  typeof useListRestaurantsLazyQuery
>;
export type ListRestaurantsQueryResult = Apollo.QueryResult<
  ListRestaurantsQuery,
  ListRestaurantsQueryVariables
>;
