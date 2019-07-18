import { objectType } from 'nexus';

export const AuthPayload = objectType({
    name: 'AuthPayload',
    definition(t): void {
        t.string('token');
        t.field('user', { type: 'User' });
    },
});

export const SignupPayload = objectType({
    name: 'SignupPayload',
    definition(t): void {
        t.field('user', { type: 'User' });
    },
});
