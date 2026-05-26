import { 
  createRootRoute, 
  createRoute, 
  createRouter, 
  RouterProvider, 
  Outlet 
} from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './routes/Home';
import Services from './routes/Services';
import About from './routes/About';
import Booking from './routes/Booking';

// Create a new TanStack Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Configure standard root layout for TanStack Router
const rootRoute = createRootRoute({
  component: () => (
    <div className="flex flex-col min-h-screen bg-black text-white selection:bg-white selection:text-black antialiased">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  ),
});

// Define core child routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/services',
  component: Services,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: About,
});

const bookingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/booking',
  component: Booking,
  validateSearch: (search: Record<string, unknown>): { preselect?: string } => {
    return {
      preselect: (search.preselect as string) || undefined,
    };
  },
});

// Build standard router tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  servicesRoute,
  aboutRoute,
  bookingRoute,
]);

const router = createRouter({ 
  routeTree,
  defaultPreload: 'intent',
});

// Register router typings for global autocomplete and type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
