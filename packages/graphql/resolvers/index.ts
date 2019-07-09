import { Query } from './Query';
import { User } from './User';
import { LoginMutation, SignupMutation } from './Mutation';
import { AuthPayload, SignupPayload } from './AuthPayload';
import { SignupInputType, LoginInputType } from './AuthInputTypes';

export const resolvers = {
    Query,
    User,
    LoginMutation,
    SignupMutation,
    AuthPayload,
    SignupPayload,
    SignupInputType,
    LoginInputType,
};
