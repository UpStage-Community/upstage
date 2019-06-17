import { Query } from './Query';
import { User } from './User';
import { Mutation, UserUpdateInput } from './Mutation';
import { AuthPayload } from './AuthPayload';
import { SignupInputType, LoginInputType } from './AuthInputTypes';

export const resolvers = {
    Query,
    User,
    Mutation,
    AuthPayload,
    SignupInputType,
    LoginInputType,
    UserUpdateInput,
};
