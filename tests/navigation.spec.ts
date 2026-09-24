import { expect, test } from '@playwright/test'
import { readPosts } from '../lib/content'

const posts = readPosts().filter(post => post.published)

test('static site supports hydrated navigation between articles, tags, and archive', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => {
    if (/hydration/i.test(message.text())) errors.push(message.text())
  })
  await page.goto('/')
  await expect(page.locator('.post-list li')).toHaveCount(posts.length)
  await page.getByRole('link', { name: 'Basic Typescript', exact: true }).click()
  await expect(page).toHaveURL(/\/posts\/basic-typescript\/$/)
  await expect(page.locator('h1')).toHaveText('Basic Typescript')
  await expect(page).toHaveTitle('Basic Typescript — Developer Distinction')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://www.michaelborn.me/posts/basic-typescript/')
  await page.getByRole('link', { name: 'typescript', exact: true }).click()
  await expect(page.locator('.post-list li')).toHaveCount(posts.filter(post => post.tags.includes('typescript')).length)
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
