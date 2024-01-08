import AppRoutes from './routes/AppRoutes';
import {
    ApolloClient,
    ApolloLink,
    ApolloProvider,
    InMemoryCache,
} from '@apollo/client';
import { useStore } from './store';
import { CreateErrorLink, bnpLink, indetityLink } from './apollo/links';
import { useMemo } from 'react';
import { useUIControlContext } from './context/ui-control-context';

function App() {
    const [accessToken, azureToken, bnpUserRol, setAzureToken, dqrUserRol] = useStore(
        (state) => [
            state.accessToken,
            state.azureToken,
            state.bnpUserRol,
            state.setAzureToken,
            state.dqrUserRol,
        ]
    );

    const { handleLogOut } = useUIControlContext();

    const authLink = useMemo(() => {
        return new ApolloLink((operation, forward) => {
            operation.setContext({
                headers: {
                    Authorization: accessToken ? `Bearer ${accessToken}` : '',
                },
            });
            return forward(operation);
        });
    }, [accessToken]);

    const client = useMemo(() => {
        return new ApolloClient({
            cache: new InMemoryCache(),
            link: ApolloLink.from([
                authLink,
                CreateErrorLink(handleLogOut),
                accessToken ? bnpLink : indetityLink,
            ]),
        });
    }, [authLink, handleLogOut, accessToken, CreateErrorLink]);

    return (
        <ApolloProvider client={client}>
            <AppRoutes
                accessToken={accessToken}
                azureToken={azureToken}
                bnpUserRol={bnpUserRol}
                setAzureToken={setAzureToken}
                dqrUserRol={dqrUserRol}
            />
        </ApolloProvider>
    );
}

export default App;
