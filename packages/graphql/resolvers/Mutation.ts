import { arg, extendType } from 'nexus';
import { hash, compare } from 'bcrypt';
import { APP_SECRET } from '../utils';
import { sign } from 'jsonwebtoken';
import * as mailgun from 'mailgun-js';

const DOMAIN = 'upstagecommunity.com';
const mg = mailgun({ apiKey: 'key-9048ce7e167a6f875e4c0d19fc0df93e', domain: DOMAIN });

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
                {
                    input: {
                        firstName,
                        lastName,
                        bio,
                        email,
                        password,
                        signupTempCode,
                        agreementVersions,
                        identifiers,
                        imageURL,
                    },
                },
                context
            ): Promise<any> => {
                // check if user exists in our system already
                let user = await context.prisma.user({ confirmedEmail: email });
                if (user) {
                    throw new Error(`Existing user found for email: ${email}`);
                }

                const hashedPassword = await hash(password, 10);
                let emailConfirmationToken = Math.random()
                    .toString(36)
                    .substring(7);
                let newUserSignupTempCode = Math.random()
                    .toString(36)
                    .substring(7);

                // send confirm email to user
                const emailConfirmationUrl =
                    'http://localhost:3000/account/verify-email?e=' +
                    email +
                    '&c=' +
                    emailConfirmationToken;
                const data = {
                    from: 'Upstage <info@upstagecommunity.com>',
                    to: email,
                    subject: 'Confirm Your Email',
                    template: 'verify-email',
                    'h:X-Mailgun-Variables': JSON.stringify({
                        emailConfirmationUrl: emailConfirmationUrl,
                        user: { firstName: firstName, lastName: lastName },
                    }),
                };
                mg.messages().send(
                    data,
                    (error): void => {
                        if (error) {
                            console.log(error);
                        }
                    }
                );

                if (signupTempCode) {
                    // make sure it matches user
                    let users = await context.prisma.users({
                        where: { unconfirmedEmail: email, signupTempCode: signupTempCode },
                    });
                    if (users.length) {
                        let newUser = await context.prisma.updateUser({
                            data: {
                                firstName,
                                lastName,
                                unconfirmedEmail: email,
                                emailConfirmationToken: emailConfirmationToken,
                                signupTempCode: newUserSignupTempCode,
                                encryptedPassword: hashedPassword,
                                bio,
                                imageURL,
                                agreementVersions: { set: agreementVersions },
                                identifiers: { set: identifiers },
                            },
                            where: { id: users[0].id },
                        });

                        return { user: newUser };
                    }
                }

                let newUser = await context.prisma.createUser({
                    firstName,
                    lastName,
                    unconfirmedEmail: email,
                    emailConfirmationToken: emailConfirmationToken,
                    signupTempCode: newUserSignupTempCode,
                    encryptedPassword: hashedPassword,
                    bio,
                    imageURL,
                    agreementVersions: { set: agreementVersions },
                    identifiers: { set: identifiers },
                });

                return { user: newUser };
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
                const user = await context.prisma.user({ confirmedEmail: email });
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

export const EmailConfirmMutation = extendType({
    type: 'Mutation',
    definition(t): void {
        t.field('emailConfirm', {
            type: 'AuthPayload',
            args: {
                input: arg({
                    type: 'EmailConfirmInputType',
                    required: true,
                }),
            },
            resolve: async (
                parent,
                { input: { email, emailConfirmCode } },
                context
            ): Promise<any> => {
                // find user
                const users = await context.prisma.users({
                    where: {
                        unconfirmedEmail: email,
                        emailConfirmationToken: emailConfirmCode,
                    },
                });
                if (!users.length) {
                    throw new Error(`No user found for email: ${email}`);
                }

                // make email confirmed
                let user = await context.prisma.updateUser({
                    data: {
                        unconfirmedEmail: null,
                        confirmedEmail: email,
                        emailConfirmedDate: new Date().toISOString(),
                    },
                    where: { id: users[0].id },
                });

                return {
                    token: sign({ userId: user.id }, APP_SECRET),
                    user: user,
                };
            },
        });
    },
});
