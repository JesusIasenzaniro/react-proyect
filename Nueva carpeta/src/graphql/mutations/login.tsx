import { gql } from '@apollo/client';

export const LOGIN = gql`
    mutation Login($clientId: String!, $email: String!, $password: String!) {
        login(
            authenticateRequest: {
                clientId: $clientId
                email: $email
                password: $password
            }
        ) {
            id
            email
            token
            isCorrect
            azureAd {
                expirationDate
                token
            }
        }
    }
`;
