import { HeadContent, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { QueryClientProvider } from '@tanstack/react-query'
import Header from '../components/Header'
import { queryClient } from '@/utils/queryClient'

export const Route = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <HeadContent />
      <Header />
      <Outlet />
      <TanStackRouterDevtools />
    </QueryClientProvider>
  ),
})
