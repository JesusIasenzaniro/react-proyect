import { gql } from '@apollo/client';

export const GET_GROUPS = gql`
    query GetGroups {
        billingGroups {
            iBillingGroupCode
            sBillingGroupName
            sContactList
        }

        fundGroups {
            codFundGroup
            fundGroupName
            contact
        }
    }
`;