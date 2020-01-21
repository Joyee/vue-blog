import defaultSettings from '../settings'

const title = defaultSettings.title || 'BLOG'

export function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle}-${title}`
  }
  return `${title}`
}