import { inputObjectType } from 'nexus';

export const SignUpInputType = inputObjectType({
    name: 'SignUpInputType',
    definition(t): void {
        t.string('firstName', { required: true });
        t.string('lastName', { required: true });
        t.string('email', { required: true });
        t.string('password', { required: true });
    },
});

export const LogInInputType = inputObjectType({
    name: 'LogInInputType',
    definition(t): void {
        t.string('email', { required: true });
        t.string('password', { required: true });
    },
});
