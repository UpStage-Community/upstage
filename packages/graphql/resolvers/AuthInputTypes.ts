import { inputObjectType } from 'nexus';

export const SignupInputType = inputObjectType({
    name: 'SignupInputType',
    definition(t): void {
        t.string('firstName', { required: true });
        t.string('lastName', { required: true });
        t.string('unconfirmedEmail', { required: false });
        t.string('email', { required: true });
        t.string('password', { required: true });
        t.string('imageURL', { required: false });
    },
});

export const LoginInputType = inputObjectType({
    name: 'LoginInputType',
    definition(t): void {
        t.string('email', { required: true });
        t.string('password', { required: true });
    },
});
