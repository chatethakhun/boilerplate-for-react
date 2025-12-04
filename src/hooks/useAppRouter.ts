import { useCallback, useMemo } from 'react'
import { useLocation, useRouter, useRouterState } from '@tanstack/react-router'

/** --------- Types --------- */
export type PathParams = Record<string, string | number | undefined>
export type SearchParamsLike = Record<string, unknown>
export type NavigateInput =
  | string
  | {
      to: string
      params?: PathParams
      search?: SearchParamsLike
      hash?: string
    }

export interface AppRouterAPI {
  push: (to: NavigateInput) => void
  replace: (to: NavigateInput) => void
  back: (fallbackPath?: string) => void
  forward: () => void
  pathname: string
  params: Record<string, string>
  query: Record<string, string>
  hash: string
  href: (to: NavigateInput) => string
  isActive: (path: string) => boolean
}

/** --------- Helpers --------- */
const buildSearchParams = (search?: SearchParamsLike): string => {
  if (!search || Object.keys(search).length === 0) return ''

  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(search)) {
    if (value != null) {
      params.set(key, String(value))
    }
  }
  return `?${params.toString()}`
}

const buildPath = (
  template: string,
  params?: PathParams,
  search?: SearchParamsLike,
  hash?: string,
): string => {
  const path = template.replace(/\$([A-Za-z0-9_]+)/g, (_, key: string) => {
    const value = params?.[key]
    if (value == null) {
      throw new Error(`Missing param '${key}' for path '${template}'`)
    }
    return encodeURIComponent(String(value))
  })

  const qs = buildSearchParams(search)
  const h = hash ? `#${hash.replace(/^#/, '')}` : ''

  return `${path}${qs}${h}`
}

const parseParams = (
  matches: { params: Record<string, unknown> }[],
): Record<string, string> => {
  const merged = Object.assign({}, ...matches.map((m) => m.params))
  const result: Record<string, string> = {}

  for (const [key, value] of Object.entries(merged)) {
    if (value != null) {
      result[key] = String(value)
    }
  }
  return result
}

const parseQuery = (search: Record<string, string>): Record<string, string> => {
  const result: Record<string, string> = {}
  for (const [key, value] of Object.entries(search)) {
    if (value != null) {
      result[key] = value
    }
  }
  return result
}

/** --------- Hook --------- */
export function useAppRouter(): AppRouterAPI {
  const router = useRouter()
  const location = useLocation()
  const { matches } = useRouterState()

  const params = useMemo(() => parseParams(matches), [matches])
  const query = useMemo(
    () => parseQuery(location.search as Record<string, string>),
    [location.search],
  )

  const href = useCallback((to: NavigateInput): string => {
    return typeof to === 'string'
      ? to
      : buildPath(to.to, to.params, to.search, to.hash)
  }, [])

  const navigate = useCallback(
    (to: NavigateInput, replaceMode: boolean) => {
      if (typeof to === 'string') {
        router.navigate({ to, replace: replaceMode })
      } else {
        const options: Parameters<typeof router.navigate>[0] = {
          to: to.to,
          replace: replaceMode,
        }

        if (to.params) {
          options.params = to.params as never
        }
        if (to.search) {
          options.search = to.search as never
        }
        if (to.hash) {
          options.hash = to.hash
        }

        router.navigate(options)
      }
    },
    [router],
  )

  const push = useCallback(
    (to: NavigateInput) => navigate(to, false),
    [navigate],
  )
  const replace = useCallback(
    (to: NavigateInput) => navigate(to, true),
    [navigate],
  )

  const back = useCallback(
    (fallbackPath = '/') => {
      if (window.history.length > 1) {
        router.history.go(-1)
      } else {
        router.navigate({ to: fallbackPath })
      }
    },
    [router],
  )

  const forward = useCallback(() => {
    router.history.go(1)
  }, [router])

  const isActive = useCallback(
    (path: string) =>
      location.pathname === path || location.pathname.startsWith(`${path}/`),
    [location.pathname],
  )

  return useMemo(
    () => ({
      push,
      replace,
      back,
      forward,
      pathname: location.pathname,
      params,
      query,
      hash: location.hash,
      href,
      isActive,
    }),
    [
      push,
      replace,
      back,
      forward,
      location.pathname,
      location.hash,
      params,
      query,
      href,
      isActive,
    ],
  )
}
