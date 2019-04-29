import { prismaObjectType } from 'nexus-prisma';

export const User = prismaObjectType({
    name: 'User',
    definition(t): void {
        t.prismaFields([
            'id',
            'firstName',
            'lastName',
            'email',
            'imageURL',
            'resetPasswordToken',
            'resetPasswordSentAt',
            'emailConfirmationToken',
            'emailConfirmedAt',
            'unconfirmedEmail',
        ]);
    },
});
