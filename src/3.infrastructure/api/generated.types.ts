/* eslint-disable */
import type {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
import type { Context } from "./context";
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
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} & { [P in K]-?: NonNullable<T[P]> };
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
};

export type Review = {
  __typename?: "Review";
  comment: Scalars["String"];
  id: Scalars["ID"];
  rating: Scalars["Int"];
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

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AuthPayload: ResolverTypeWrapper<AuthPayload>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  CreateRestaurantInput: CreateRestaurantInput;
  Date: ResolverTypeWrapper<Scalars["Date"]>;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  ReplyToReviewInput: ReplyToReviewInput;
  ReplyToReviewOutput: ResolverTypeWrapper<ReplyToReviewOutput>;
  Restaurant: ResolverTypeWrapper<Restaurant>;
  Review: ResolverTypeWrapper<Review>;
  ReviewRestaurantInput: ReviewRestaurantInput;
  ReviewRestaurantOutput: ResolverTypeWrapper<ReviewRestaurantOutput>;
  Role: Role;
  SignUpInput: SignUpInput;
  SignUpOutput: ResolverTypeWrapper<SignUpOutput>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthPayload: AuthPayload;
  Boolean: Scalars["Boolean"];
  CreateRestaurantInput: CreateRestaurantInput;
  Date: Scalars["Date"];
  ID: Scalars["ID"];
  Int: Scalars["Int"];
  Mutation: {};
  Query: {};
  ReplyToReviewInput: ReplyToReviewInput;
  ReplyToReviewOutput: ReplyToReviewOutput;
  Restaurant: Restaurant;
  Review: Review;
  ReviewRestaurantInput: ReviewRestaurantInput;
  ReviewRestaurantOutput: ReviewRestaurantOutput;
  SignUpInput: SignUpInput;
  SignUpOutput: SignUpOutput;
  String: Scalars["String"];
  User: User;
};

export type AuthPayloadResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["AuthPayload"] = ResolversParentTypes["AuthPayload"]
> = {
  token?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Date"], any> {
  name: "Date";
}

export type MutationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  createRestaurant?: Resolver<
    ResolversTypes["Restaurant"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateRestaurantArgs, "input">
  >;
  login?: Resolver<
    Maybe<ResolversTypes["AuthPayload"]>,
    ParentType,
    ContextType,
    RequireFields<MutationLoginArgs, "email" | "password">
  >;
  replyToReview?: Resolver<
    ResolversTypes["ReplyToReviewOutput"],
    ParentType,
    ContextType,
    RequireFields<MutationReplyToReviewArgs, "input">
  >;
  reviewRestaurant?: Resolver<
    ResolversTypes["Review"],
    ParentType,
    ContextType,
    RequireFields<MutationReviewRestaurantArgs, "input">
  >;
  signUp?: Resolver<
    ResolversTypes["SignUpOutput"],
    ParentType,
    ContextType,
    RequireFields<MutationSignUpArgs, "input">
  >;
};

export type QueryResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  me?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  restaurant?: Resolver<
    Maybe<ResolversTypes["Restaurant"]>,
    ParentType,
    ContextType,
    RequireFields<QueryRestaurantArgs, "id">
  >;
  restaurants?: Resolver<
    Array<ResolversTypes["Restaurant"]>,
    ParentType,
    ContextType,
    RequireFields<QueryRestaurantsArgs, never>
  >;
};

export type ReplyToReviewOutputResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["ReplyToReviewOutput"] = ResolversParentTypes["ReplyToReviewOutput"]
> = {
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RestaurantResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["Restaurant"] = ResolversParentTypes["Restaurant"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  ownerId?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  rating?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReviewResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["Review"] = ResolversParentTypes["Review"]
> = {
  comment?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  restaurantId?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  visitedAt?: Resolver<ResolversTypes["Date"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReviewRestaurantOutputResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["ReviewRestaurantOutput"] = ResolversParentTypes["ReviewRestaurantOutput"]
> = {
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SignUpOutputResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["SignUpOutput"] = ResolversParentTypes["SignUpOutput"]
> = {
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = {
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes["Role"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ReplyToReviewOutput?: ReplyToReviewOutputResolvers<ContextType>;
  Restaurant?: RestaurantResolvers<ContextType>;
  Review?: ReviewResolvers<ContextType>;
  ReviewRestaurantOutput?: ReviewRestaurantOutputResolvers<ContextType>;
  SignUpOutput?: SignUpOutputResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};
