import { mutationType, arg } from 'nexus';
import { hash, compare } from 'bcrypt';
import { APP_SECRET } from '../utils';
import { sign } from 'jsonwebtoken';

export const Mutation = mutationType({
    definition(t): void {
        t.field('signup', {
            type: 'AuthPayload',
            args: {
                input: arg({
                    type: 'SignupInputType',
                }),
            },
            resolve: async (
                parent,
                { firstName, lastName, email, password },
                ctx
            ): Promise<any> => {
                const hashedPassword = await hash(password, 10);
                const user = await ctx.prisma.createUser({
                    firstName,
                    lastName,
                    email,
                    encryptedPassword: hashedPassword,
                });
                return {
                    token: sign({ userId: user.id }, APP_SECRET),
                    user,
                };
            },
        });

        t.field('login', {
            type: 'AuthPayload',
            args: {
                input: arg({
                    type: 'LoginInputType',
                }),
            },
            resolve: async (parent, { email, password }, context): Promise<any> => {
                const user = await context.prisma.user({ email });
                if (!user) {
                    throw new Error(`No user found for email: ${email}`);
                }
                const passwordValid = await compare(password, user.encryptedPassword);
                if (!passwordValid) {
                    throw new Error('Invalid password');
                }
                return {
                    token: sign({ userId: user.id }, APP_SECRET),
                    user,
                };
            },
        });
    },
});
