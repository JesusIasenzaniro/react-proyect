import { ReactNode } from 'react';
import { MockedProvider } from "@apollo/client/testing";

export * from "@apollo/client";

type MockedApolloProps = {
    children: ReactNode;
    mocks: any[]; 
  };
  

export function MockedApollo({ children, mocks }: MockedApolloProps) {
  return (
    <MockedProvider mocks={mocks} addTypename={false}>
      {children}
    </MockedProvider>
  );
}

export { MockedApollo as ApolloProvider };
