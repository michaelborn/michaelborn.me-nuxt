import { renderRss } from '../../utils/rss'

export default defineEventHandler(event => renderRss(event))
