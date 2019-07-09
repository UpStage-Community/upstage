import { inputObjectType } from 'nexus';

export const SignupInputType = inputObjectType({
    name: 'SignupInputType',
    definition(t): void {
        t.string('firstName', { required: true });
        t.string('lastName', { required: true });
        t.string('unconfirmedEmail');
        t.list.string('agreementVersions', { required: true });
        t.list.string('identifiers', { required: true });
        t.string('bio');
        t.string('email', { required: true });
        t.string('password', { required: true });
        t.string('imageURL');
    },
});

export const LoginInputType = inputObjectType({
    name: 'LoginInputType',
    definition(t): void {
        t.string('email', { required: true });
        t.string('password', { required: true });
    },
});
