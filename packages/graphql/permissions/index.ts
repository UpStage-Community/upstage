import { rule, shield, allow } from 'graphql-shield';
import { getUserId } from '../utils';

const rules = {
    isAuthenticatedUser: rule()(
        (parent, args, context): boolean => {
            const userId = getUserId(context);
            return Boolean(userId);
        }
    ),
};

export const permissions = shield({
    Query: {
        currentUser: rules.isAuthenticatedUser,
        user: allow,
    },
});
