import { Query } from './Query';
import { User } from './User';
import { LoginMutation, SignupMutation, EmailConfirmMutation } from './Mutation';
import { AuthPayload, SignupPayload } from './AuthPayload';
import { SignupInputType, LoginInputType, EmailConfirmInputType } from './AuthInputTypes';

export const resolvers = {
    Query,
    User,
    LoginMutation,
    SignupMutation,
    EmailConfirmMutation,
    AuthPayload,
    SignupPayload,
    SignupInputType,
    LoginInputType,
    EmailConfirmInputType,
};
