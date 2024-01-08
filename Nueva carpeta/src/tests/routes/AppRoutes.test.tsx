import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import AppRoutes from '../../routes/AppRoutes';

describe('AppRoutes', () => {
    it('should render Dashboard with Bnp Report component for "/"', () => {
        //     const token = "some_token";
        //     const router = createBrowserRouter(
        //         createRoutesFromElements(
        //             <Route
        //                 path='/'
        //                 element={<Root />}
        //                 errorElement={<Error />}
        //             >
        //             {AppRoutes({ token })}
        //             </Route>
        //         )
        //     );
        //     render(
        //         <RouterProvider router={router} />
        //     );
        //     expect(screen.getByText('BNP Reporting App')).toBeInTheDocument();
        // });
        // it('should display the Not Found error component for an undefined route', () => {
        //     const router = createBrowserRouter(
        //       createRoutesFromElements(
        //         <Route path="*" element={<NotFound />} />
        //       )
        //     );
        //     render(<RouterProvider router={router} />);
        //     expect(screen.getByText('404')).toBeInTheDocument();
        //   });
    });
});
