import { HttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { config } from '../config';

export const indetityLink = new HttpLink({
    uri: process.env.REACT_APP_AFB_IDENTITY_API + config.graphqlPath,
});

export const bnpLink = new HttpLink({
    uri: process.env.REACT_APP_AFB_BNP_REPORT_API + config.graphqlPath,
    fetchOptions: {
        timeout: 3600000,
    },
});

export const CreateErrorLink = (handleLogOut: () => void) =>
    onError(({ graphQLErrors }) => {
        if (graphQLErrors) {
            graphQLErrors.forEach(({ message }) => {
                if (message.includes('The current user is not authorized')) {
                    handleLogOut();
                }
            });
        }
    });
