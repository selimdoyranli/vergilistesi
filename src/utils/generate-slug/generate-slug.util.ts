import type { GenerateSlugTypes } from './generate-slug.util.types'

/**
 * Generate slug from string
 * @param value string
 * @returns string
 */
export const generateSlug: GenerateSlugTypes = value => {
  return value
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/Ğ/g, 'g')
    .replace(/Ü/g, 'u')
    .replace(/Ş/g, 's')
    .replace(/I/g, 'i')
    .replace(/İ/g, 'i')
    .replace(/Ö/g, 'o')
    .replace(/Ç/g, 'c')
    .replace(/[\s\W-]+/g, '-') // Replace spaces, non-word characters and dashes with a single dash
    .replace(/^-+|-+$/g, '') // Remove leading and trailing dashes
    .toLowerCase()
}
