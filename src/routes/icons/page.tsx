import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/icons/page')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/icons/page"!</div>
}
