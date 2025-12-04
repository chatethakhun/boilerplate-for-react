import * as React from 'react'
import { useLocation, useRouter, useRouterState } from '@tanstack/react-router'

/** --------- types (คงสัญญาเดียว แม้เปลี่ยน lib ภายหลัง) --------- */
export type PathParams = Record<string, string | number | undefined>
export type SearchParamsLike = Record<string, any> | undefined

export type NavigateInput =
  | string
  | {
      to: string // e.g. "/flash/$couponId/active"
      params?: PathParams // { couponId: "123" }
      search?: SearchParamsLike // { tab: "info" }
      hash?: string // "top"
    }

export interface AppRouterAPI {
  push: (to: NavigateInput) => void
  replace: (to: NavigateInput) => void
  back: (fallbackPath?: string) => void

  pathname: string
  params: Record<string, string>
  query: Record<string, string>

  href: (to: NavigateInput) => string
}

/** --------- helpers --------- */
function buildPath(
  template: string,
  params?: PathParams,
  search?: SearchParamsLike,
  hash?: string,
) {
  const path = template.replace(/\$([A-Za-z0-9_]+)/g, (_, k) => {
    const v = params?.[k]
    if (v === undefined || !v) {
      throw new Error(`Missing param '${k}' for path '${template}'`)
    }
    return encodeURIComponent(String(v))
  })

  const qs =
    search && Object.keys(search).length
      ? `?${new URLSearchParams(
          Object.entries(search).reduce<Record<string, string>>(
            (acc, [k, v]) => {
              if (v === undefined || v === null) return acc
              acc[k] = String(v)
              return acc
            },
            {},
          ),
        ).toString()}`
      : ''

  const h = hash ? `#${hash.replace(/^#/, '')}` : ''
  return `${path}${qs}${h}`
}

/** --------- the hook (TanStack implementation today) --------- */
export function useAppRouter(): AppRouterAPI {
  const router = useRouter()
  const location = useLocation()
  const state = useRouterState()

  const params = React.useMemo(() => {
    // รวม params จากทุก match
    const merged = Object.assign({}, ...state.matches.map((m) => m.params))
    const out: Record<string, string> = {}
    for (const [k, v] of Object.entries(merged)) {
      if (v != null) out[k] = String(v)
    }
    return out
  }, [state.matches])

  const query = React.useMemo(() => {
    const sp = new URLSearchParams(location.search)
    const obj: Record<string, string> = {}
    sp.forEach((v, k) => (obj[k] = v))
    return obj
  }, [location.search])

  const href = React.useCallback((to: NavigateInput) => {
    if (typeof to === 'string') return to
    return buildPath(to.to, to.params, to.search, to.hash)
  }, [])

  const push = React.useCallback(
    (to: NavigateInput) => {
      if (typeof to === 'string') {
        router.navigate({ to, replace: false })
      } else {
        router.navigate({
          to: to.to,
          params: to.params as any,
          search: to.search as any,
          hash: to.hash,
          replace: false,
        })
      }
    },
    [router],
  )

  const replace = React.useCallback(
    (to: NavigateInput) => {
      if (typeof to === 'string') {
        router.navigate({ to, replace: true })
      } else {
        router.navigate({
          to: to.to,
          params: to.params as any,
          search: to.search as any,
          hash: to.hash,
          replace: true,
        })
      }
    },
    [router],
  )

  const back = React.useCallback(
    (fallbackPath = '/') => {
      // ถ้ามี referrer ใน state หรือมี history
      const canGoBack = window.history.length > 1

      if (canGoBack) {
        router.history.go(-1)
      } else {
        // ไม่มี history ให้ back -> ไปหน้า fallback
        router.navigate({ to: fallbackPath })
      }
    },
    [router],
  )

  return React.useMemo(
    () => ({
      push,
      replace,
      back,
      pathname: location.pathname,
      params,
      query,
      href,
    }),
    [push, replace, back, location.pathname, params, query, href],
  )
}
