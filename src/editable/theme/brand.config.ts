import { siteIdentity } from '@/config/site.identity'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'

const { recipe } = getFactoryState()
const productKind = getProductKind(recipe)

export const slot4BrandConfig = {
  siteName: siteIdentity.name,
  tagline: 'Upload, share, and revisit polished PDF resources.',
  domain: siteIdentity.domain,
  baseUrl: siteIdentity.url,
  productKind,
  ogImage: siteIdentity.ogImage,
  accents: {
    primary: '#0b65d8',
    secondary: '#81A6C6',
    soft: '#AACDDC',
    warm: '#F3E3D0',
    neutral: '#D2C4B4',
    surface: '#ffffff',
    ink: '#10233d',
  },
} as const
