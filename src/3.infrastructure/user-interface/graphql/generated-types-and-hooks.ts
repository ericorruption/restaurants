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
  /** ISO-8601 encoded UTC date string. Example value: `"2020-05-04T13:37:01.337Z"` */
  Date: any;
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
  replyToReview: ReplyToReviewOutput;
  reviewRestaurant: Review;
  signUp: SignUpOutput;
};

export type MutationCreateRestaurantArgs = {
  input: CreateRestaurantInput;
};

export type MutationLoginArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type MutationReplyToReviewArgs = {
  input: ReplyToReviewInput;
};

export type MutationReviewRestaurantArgs = {
  input: ReviewRestaurantInput;
};

export type MutationSignUpArgs = {
  input: SignUpInput;
};

export type Query = {
  __typename?: "Query";
  me?: Maybe<User>;
  restaurant?: Maybe<Restaurant>;
  restaurants: Array<Restaurant>;
};

export type QueryRestaurantArgs = {
  id: Scalars["ID"];
};

export type QueryRestaurantsArgs = {
  ownerId?: Maybe<Scalars["ID"]>;
};

export type ReplyToReviewInput = {
  reply: Scalars["String"];
  reviewId: Scalars["ID"];
};

export type ReplyToReviewOutput = {
  __typename?: "ReplyToReviewOutput";
  success: Scalars["Boolean"];
};

export type Restaurant = {
  __typename?: "Restaurant";
  id: Scalars["ID"];
  name: Scalars["String"];
  ownerId: Scalars["ID"];
  rating?: Maybe<Scalars["Int"]>;
  reviews: Array<Review>;
};

export type Review = {
  __typename?: "Review";
  comment: Scalars["String"];
  id: Scalars["ID"];
  rating: Scalars["Int"];
  reply?: Maybe<Scalars["String"]>;
  restaurantId: Scalars["ID"];
  visitedAt: Scalars["Date"];
};

export type ReviewRestaurantInput = {
  comment: Scalars["String"];
  rating: Scalars["Int"];
  restaurantId: Scalars["ID"];
  visitedAt: Scalars["Date"];
};

export type ReviewRestaurantOutput = {
  __typename?: "ReviewRestaurantOutput";
  success: Scalars["Boolean"];
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

export type User = {
  __typename?: "User";
  email: Scalars["String"];
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  role: Role;
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

export type GetUserQueryVariables = Exact<{ [key: string]: never }>;

export type GetUserQuery = {
  __typename?: "Query";
  me?: Maybe<{
    __typename?: "User";
    id: string;
    name?: Maybe<string>;
    email: string;
    role: Role;
  }>;
};

export type CreateRestaurantMutationVariables = Exact<{
  input: CreateRestaurantInput;
}>;

export type CreateRestaurantMutation = {
  __typename?: "Mutation";
  createRestaurant: { __typename?: "Restaurant"; id: string; name: string };
};

export type ReviewRestaurantMutationVariables = Exact<{
  input: ReviewRestaurantInput;
}>;

export type ReviewRestaurantMutation = {
  __typename?: "Mutation";
  reviewRestaurant: { __typename?: "Review"; id: string };
};

export type ReplyToReviewMutationVariables = Exact<{
  input: ReplyToReviewInput;
}>;

export type ReplyToReviewMutation = {
  __typename?: "Mutation";
  replyToReview: { __typename?: "ReplyToReviewOutput"; success: boolean };
};

export type ListRestaurantsQueryVariables = Exact<{ [key: string]: never }>;

export type ListRestaurantsQuery = {
  __typename?: "Query";
  restaurants: Array<{
    __typename?: "Restaurant";
    id: string;
    name: string;
    rating?: Maybe<number>;
  }>;
};

export type ListOwnerRestaurantsQueryVariables = Exact<{
  ownerId: Scalars["ID"];
}>;

export type ListOwnerRestaurantsQuery = {
  __typename?: "Query";
  restaurants: Array<{ __typename?: "Restaurant"; id: string; name: string }>;
};

export type GetRestaurantQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type GetRestaurantQuery = {
  __typename?: "Query";
  restaurant?: Maybe<{
    __typename?: "Restaurant";
    id: string;
    name: string;
    rating?: Maybe<number>;
    reviews: Array<{
      __typename?: "Review";
      id: string;
      rating: number;
      comment: string;
      visitedAt: any;
      reply?: Maybe<string>;
    }>;
  }>;
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
export const GetUserDocument = gql`
  query getUser {
    me {
      id
      name
      email
      role
    }
  }
`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserQuery(
  baseOptions?: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    options
  );
}
export function useGetUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    options
  );
}
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<
  GetUserQuery,
  GetUserQueryVariables
>;
export const CreateRestaurantDocument = gql`
  mutation createRestaurant($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      id
      name
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
export const ReviewRestaurantDocument = gql`
  mutation reviewRestaurant($input: ReviewRestaurantInput!) {
    reviewRestaurant(input: $input) {
      id
    }
  }
`;
export type ReviewRestaurantMutationFn = Apollo.MutationFunction<
  ReviewRestaurantMutation,
  ReviewRestaurantMutationVariables
>;

/**
 * __useReviewRestaurantMutation__
 *
 * To run a mutation, you first call `useReviewRestaurantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReviewRestaurantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reviewRestaurantMutation, { data, loading, error }] = useReviewRestaurantMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useReviewRestaurantMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ReviewRestaurantMutation,
    ReviewRestaurantMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ReviewRestaurantMutation,
    ReviewRestaurantMutationVariables
  >(ReviewRestaurantDocument, options);
}
export type ReviewRestaurantMutationHookResult = ReturnType<
  typeof useReviewRestaurantMutation
>;
export type ReviewRestaurantMutationResult =
  Apollo.MutationResult<ReviewRestaurantMutation>;
export type ReviewRestaurantMutationOptions = Apollo.BaseMutationOptions<
  ReviewRestaurantMutation,
  ReviewRestaurantMutationVariables
>;
export const ReplyToReviewDocument = gql`
  mutation replyToReview($input: ReplyToReviewInput!) {
    replyToReview(input: $input) {
      success
    }
  }
`;
export type ReplyToReviewMutationFn = Apollo.MutationFunction<
  ReplyToReviewMutation,
  ReplyToReviewMutationVariables
>;

/**
 * __useReplyToReviewMutation__
 *
 * To run a mutation, you first call `useReplyToReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReplyToReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [replyToReviewMutation, { data, loading, error }] = useReplyToReviewMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useReplyToReviewMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ReplyToReviewMutation,
    ReplyToReviewMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ReplyToReviewMutation,
    ReplyToReviewMutationVariables
  >(ReplyToReviewDocument, options);
}
export type ReplyToReviewMutationHookResult = ReturnType<
  typeof useReplyToReviewMutation
>;
export type ReplyToReviewMutationResult =
  Apollo.MutationResult<ReplyToReviewMutation>;
export type ReplyToReviewMutationOptions = Apollo.BaseMutationOptions<
  ReplyToReviewMutation,
  ReplyToReviewMutationVariables
>;
export const ListRestaurantsDocument = gql`
  query listRestaurants {
    restaurants {
      id
      name
      rating
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
export const ListOwnerRestaurantsDocument = gql`
  query listOwnerRestaurants($ownerId: ID!) {
    restaurants(ownerId: $ownerId) {
      id
      name
    }
  }
`;

/**
 * __useListOwnerRestaurantsQuery__
 *
 * To run a query within a React component, call `useListOwnerRestaurantsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListOwnerRestaurantsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListOwnerRestaurantsQuery({
 *   variables: {
 *      ownerId: // value for 'ownerId'
 *   },
 * });
 */
export function useListOwnerRestaurantsQuery(
  baseOptions: Apollo.QueryHookOptions<
    ListOwnerRestaurantsQuery,
    ListOwnerRestaurantsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    ListOwnerRestaurantsQuery,
    ListOwnerRestaurantsQueryVariables
  >(ListOwnerRestaurantsDocument, options);
}
export function useListOwnerRestaurantsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ListOwnerRestaurantsQuery,
    ListOwnerRestaurantsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ListOwnerRestaurantsQuery,
    ListOwnerRestaurantsQueryVariables
  >(ListOwnerRestaurantsDocument, options);
}
export type ListOwnerRestaurantsQueryHookResult = ReturnType<
  typeof useListOwnerRestaurantsQuery
>;
export type ListOwnerRestaurantsLazyQueryHookResult = ReturnType<
  typeof useListOwnerRestaurantsLazyQuery
>;
export type ListOwnerRestaurantsQueryResult = Apollo.QueryResult<
  ListOwnerRestaurantsQuery,
  ListOwnerRestaurantsQueryVariables
>;
export const GetRestaurantDocument = gql`
  query getRestaurant($id: ID!) {
    restaurant(id: $id) {
      id
      name
      rating
      reviews {
        id
        rating
        comment
        visitedAt
        reply
      }
    }
  }
`;

/**
 * __useGetRestaurantQuery__
 *
 * To run a query within a React component, call `useGetRestaurantQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRestaurantQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRestaurantQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetRestaurantQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetRestaurantQuery,
    GetRestaurantQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetRestaurantQuery, GetRestaurantQueryVariables>(
    GetRestaurantDocument,
    options
  );
}
export function useGetRestaurantLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetRestaurantQuery,
    GetRestaurantQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetRestaurantQuery, GetRestaurantQueryVariables>(
    GetRestaurantDocument,
    options
  );
}
export type GetRestaurantQueryHookResult = ReturnType<
  typeof useGetRestaurantQuery
>;
export type GetRestaurantLazyQueryHookResult = ReturnType<
  typeof useGetRestaurantLazyQuery
>;
export type GetRestaurantQueryResult = Apollo.QueryResult<
  GetRestaurantQuery,
  GetRestaurantQueryVariables
>;
