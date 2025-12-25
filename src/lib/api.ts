import { z } from "astro/zod"
import { API_URL, GATEWAY_URL } from "astro:env/client"

const siteSchema = z.object({
  domain: z.string(),
  unicode: z.string(),
  address: z.string(),
  accessible: z.boolean(),
  inStorage: z.boolean(),
  checkedUtime: z.number(),
})

const statsResponseSchema = z.object({
  domains: z.number(),
  sites: z.number(),
  active: z.number(),
})

const sitesResponseSchema = z.object({
  sites: z.array(siteSchema),
  cursor: z.string().optional(),
})

export type StatsResponse = z.infer<typeof statsResponseSchema>
export type Site = z.infer<typeof siteSchema>
export type SitesResponse = z.infer<typeof sitesResponseSchema>

export const domainZones = [".ton", ".t.me"] as const
export type DomainZone = typeof domainZones[number]
export type SortField = "domain" | "checked_at"
export interface FilterOptions {
  sort?: SortField | null
  desc?: boolean
  inaccessible: boolean
  punycode?: boolean
  spam: boolean
  zone?: DomainZone
}
export type ListOptions = FilterOptions & {
  search?: string
}

export function wrapGateway(url: string): string {
  for (const zone of domainZones) {
    if (url.endsWith(zone)) {
      url = `${url.slice(0, -zone.length)}${zone.replaceAll(".", "-")}`
    }
  }
  const i = GATEWAY_URL.indexOf("://")
  if (i < 0)
    return `${url}.${GATEWAY_URL}`
  return `${GATEWAY_URL.slice(0, i)}://${url}.${GATEWAY_URL.slice(i + "://".length)}`
}

export async function fetchSiteStats(): Promise<StatsResponse> {
  const url = new URL(`${API_URL}/sites/stats`)

  const response = await fetch(url)
  if (!response.ok)
    throw new Error(`failed to fetch ${response.status} ${response.statusText}`)
  return statsResponseSchema.parse(await response.json())
}

export async function fetchRandomSite(): Promise<Site> {
  const url = new URL(`${API_URL}/sites/random`)

  const response = await fetch(url)
  if (!response.ok)
    throw new Error(`failed to fetch ${response.status} ${response.statusText}`)
  return siteSchema.parse(await response.json())
}

export async function fetchLatestSites(opts?: ListOptions, limit?: number, cursor?: string): Promise<SitesResponse> {
  const url = new URL(`${API_URL}/sites`)

  if (opts?.search)
    url.searchParams.set("search", opts.search)

  if (opts?.sort != null)
    url.searchParams.set("sort", opts.sort)
  if (opts?.desc)
    url.searchParams.set("desc", "1")

  if (opts?.inaccessible)
    url.searchParams.set("inaccessible", "1")
  if (opts?.punycode != null)
    url.searchParams.set("punycode", opts.punycode ? "1" : "0")
  if (opts?.spam) {
    url.searchParams.set("spam", "1")
  }
  if (opts?.zone)
    url.searchParams.set("zone", opts.zone)

  if (limit)
    url.searchParams.set("limit", limit.toString())
  if (cursor)
    url.searchParams.set("cursor", cursor)
  const response = await fetch(url)
  if (!response.ok)
    throw new Error(`failed to fetch ${response.status} ${response.statusText}`)
  return sitesResponseSchema.parse(await response.json())
}
