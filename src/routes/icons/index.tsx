import { createFileRoute } from '@tanstack/react-router'
import * as Icons from 'ctk-icons'

export const Route = createFileRoute('/icons/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-col gap-2 flex-wrap px-2">
      {Object.entries(Icons).map(([name, Icon]) => (
        <div className="flex  items-center gap-2">
          <div className="flex items-center justify-center w-4 h-4 ">
            <Icon className="text-sm text-gray-700" />
          </div>
          <div className="text-sm">{name}</div>
        </div>
      ))}
    </div>
  )
}
