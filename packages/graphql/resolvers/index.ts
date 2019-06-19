import { Query } from './Query';
import { User } from './User';
import { LoginMutation, SignupMutation } from './Mutation';
import { AuthPayload } from './AuthPayload';
import { SignupInputType, LoginInputType } from './AuthInputTypes';

export const resolvers = {
    Query,
    User,
    LoginMutation,
    SignupMutation,
    AuthPayload,
    SignupInputType,
    LoginInputType,
};
