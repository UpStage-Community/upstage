import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createRefetchContainer, graphql, RelayRefetchProp } from 'react-relay';
import { Header_currentUser } from './__generated__/Header_currentUser.graphql';
import loginHelpers from './pages/Login/loginHelpers';
import { Link } from './router';
import { colors } from './styles/colors';

const styles = StyleSheet.create({
    header: {
        height: 50,
        backgroundColor: colors.noir,
    },
    whiteFont: {
        color: colors.blanc,
    },
});

interface HeaderProps {
    currentUser: Header_currentUser;
    relay: RelayRefetchProp;
}

function Header(props: HeaderProps): JSX.Element {
    const { currentUser, relay } = props;
    const [shouldRefetch, setShouldRefetch] = React.useState(false);

    if (shouldRefetch) {
        relay.refetch({});
        setShouldRefetch(false);
    }

    async function logout(): Promise<void> {
        await loginHelpers.logout();
        setShouldRefetch(true);
    }
    return (
        <View style={styles.header}>
            <Text style={styles.whiteFont}>Logo</Text>
            {currentUser ? (
                <Text onPress={logout}>Log Out</Text>
            ) : (
                <Link
                    to={{
                        pathname: `/login`,
                        state: { loginModal: true, postLoginPath: '/' },
                    }}
                >
                    Log In
                </Link>
            )}
        </View>
    );
}

export default createRefetchContainer(
    Header,
    {
        currentUser: graphql`
            fragment Header_currentUser on User {
                id
            }
        `,
    },
    graphql`
        query HeaderRefetchQuery {
            currentUser {
                id
            }
        }
    `
);
