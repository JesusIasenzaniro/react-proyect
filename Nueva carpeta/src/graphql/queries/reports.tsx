import { gql } from '@apollo/client';

export const GET_GENERATED_REPORTS = gql`
    query GetGeneratedReports {
        reportGenerationResult {
            generationId
            generated
            dateFrom
            dateTo
            type
            status
            reportFormat
        }
    }
`;

export const GET_GENERATED_REPORT = gql`
    query GetGeneratedReport($generationId: String!) {
        reportGenerationItemResultByGenerationId(generationId: $generationId) {
            id
            generationId
            providerId
            reportType
            status
            message
            providerName
        }
    }
`;

export const GET_ITEM_URL = gql`
    query GetItemUrl($generationItemId: String!) {
        generationItemUrl(generationItemId: $generationItemId) {
            key
            value
        }
    }
`;