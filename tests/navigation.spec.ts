import { expect, test } from '@playwright/test'
import { readPosts } from '../lib/content'

const posts = readPosts().filter(post => post.published)
const latestPost = posts[0]

test('static site supports hydrated navigation between articles, tags, and archive', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => {
    if (/hydration/i.test(message.text())) errors.push(message.text())
  })
  await page.goto('/')
  await expect(page.locator('.post-list li')).toHaveCount(Math.min(posts.length, 5))
  await page.getByRole('link', { name: latestPost.title, exact: true }).click()
  await expect(page).toHaveURL(new URL(latestPost.path, 'http://localhost:4173').href)
  await expect(page.locator('h1')).toHaveText(latestPost.title)
  await expect(page).toHaveTitle(`${latestPost.title} — Developer Distinction`)
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://www.michaelborn.me${latestPost.path}`)
  const tag = latestPost.tags[0]
  await page.getByRole('link', { name: tag, exact: true }).click()
  await expect(page.locator('.post-list li')).toHaveCount(posts.filter(post => post.tags.includes(tag)).length)
  await page.getByRole('navigation').getByRole('link', { name: 'Posts', exact: true }).click()
  await expect(page.locator('h1')).toHaveText('All posts')
  await page.getByRole('link', { name: 'CFScript Gotchas and Syntax Guides' }).click()
  await expect(page.locator('h1')).toHaveText('CFScript Gotchas and Syntax Guides')
  await expect(page).toHaveTitle('CFScript Gotchas and Syntax Guides — Developer Distinction')
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', 'https://www.michaelborn.me/posts/cfscript-gotchas/')
  await expect(page.locator('pre').first()).toBeVisible()
  expect(errors).toEqual([])
})

test('mobile article remains readable without horizontal page overflow', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/posts/forms-3-sending-emails/')
  await expect(page.locator('h1')).toContainText('Sending Email Notifications')
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
})

test('unknown paths return the custom 404', async ({ page }) => {
  const response = await page.goto('/this-page-does-not-exist/')
  expect(response?.status()).toBe(404)
  await expect(page.locator('h1')).toHaveText('Page not found')
  await page.getByRole('link', { name: 'Return home' }).click()
  await expect(page.locator('h1')).toHaveText('Developer Distinction')
})
