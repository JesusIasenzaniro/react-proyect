import { gql } from '@apollo/client';

export const GENERATE_BY_BILLING_GROUP = gql`
    mutation GenerateByBillingGroup(
        $request: GenerateReportsFileFormatDtoInput!
    ) {
        generateByBillingGroup(request: $request) {
            dateFrom
            dateTo
            fileFormat
            ids
        }
    }
`;

export const GENERATE_BY_FUND_GROUP = gql`
    mutation GenerateByFundGroup($request: GenerateReportsFileFormatDtoInput!) {
        generateByFundGroup(request: $request) {
            dateFrom
            dateTo
            fileFormat
            ids
        }
    }
`;

export const SEND_GENERATION = gql`
    mutation SendGeneration($generationId: String!, $emailRecipients: String) {
        sendGeneration(
            request: {
                generationId: $generationId
                emailRecipients: $emailRecipients
            }
        ) {
            id
            providerId
            status
        }
    }
`;

export const SEND_GENERATION_ITEM = gql`
    mutation SendGenerationItem(
        $generationId: String!
        $emailRecipients: String
    ) {
        sendGenerationItem(
            request: {
                generationId: $generationId
                emailRecipients: $emailRecipients
            }
        ) {
            id
            providerId
            status
        }
    }
`;
