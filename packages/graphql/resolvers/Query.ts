import { getUserId } from '../utils';
import { idArg, queryType } from 'nexus';

export const Query = queryType({
    definition(t): void {
        t.field('me', {
            type: 'User',
            resolve: (parent, args, ctx): object => {
                const userId = getUserId(ctx);
                return ctx.prisma.user({ id: userId });
            },
        });
        t.field('user', {
            type: 'User',
            nullable: true,
            args: { id: idArg() },
            resolve: (parent, { id }, ctx): object => {
                const fragment = `
                fragment PublicUser on User {
                  id
                  firstName
                  lastName
                  imageURL
                }
                `;
                return ctx.prisma.user({ id }).$fragment(fragment);
            },
        });
    },
});
