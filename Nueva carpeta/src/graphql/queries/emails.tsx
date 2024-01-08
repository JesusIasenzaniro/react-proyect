import { gql } from '@apollo/client';

export const GET_EMAILS = gql`
    query GetEmails {
        reportEmailStatus {
            id
            generationId
            status
            message
            providerName
            generationType
        }
    }
`;

export const GET_PROVIDER_EMAILS = gql`
    query GetProviderEmails(
        $generationItemId: String!
        $generationTypeId: Int!
    ) {
        providerEmails(
            generationItemId: $generationItemId
            generationTypeId: $generationTypeId
        ) {
            groupName
            emailList
        }
    }
`;