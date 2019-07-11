import { objectType } from 'nexus';

export const User = objectType({
    name: 'User',
    definition(t): void {
        t.id('id');
        t.string('firstName');
        t.string('lastName');
        t.string('email', (o): string => o.confirmedEmail);
        t.string('unconfirmedEmail');
        t.string('bio');
        t.string('signupUpdateCode');
        t.string('confirmedEmail');
        t.string('imageURL');
        t.string('resetPasswordSentAt');
        t.string('emailConfirmedAt');
        t.boolean('isActive');
    },
});
