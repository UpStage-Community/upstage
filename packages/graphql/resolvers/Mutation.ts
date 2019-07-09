import { arg, extendType } from 'nexus';
import { hash, compare } from 'bcrypt';
import { APP_SECRET } from '../utils';
import { sign } from 'jsonwebtoken';

export const SignupMutation = extendType({
    type: 'Mutation',
    definition(t): void {
        t.field('signup', {
            type: 'SignupPayload',
            args: {
                input: arg({
                    type: 'SignupInputType',
                    required: true,
                }),
            },
            resolve: async (
                parent,
                { input: { firstName, lastName, email, password } },
                context
            ): Promise<any> => {
                const hashedPassword = await hash(password, 10);
                const user = await context.prisma.createUser({
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
    },
});

export const LoginMutation = extendType({
    type: 'Mutation',
    definition(t): void {
        t.field('login', {
            type: 'AuthPayload',
            args: {
                input: arg({
                    type: 'LoginInputType',
                    required: true,
                }),
            },
            resolve: async (parent, { input: { email, password } }, context): Promise<any> => {
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
