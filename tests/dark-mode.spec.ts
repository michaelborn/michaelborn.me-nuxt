import { expect, test } from '@playwright/test'

test('dark mode toggle applies .dark class and switches background', async ({ page }) => {
  // Force a known starting point (light) so assertions are deterministic.
  await page.emulateMedia({ colorScheme: 'light' })
  await page.goto('/')
  await expect(page.locator('html')).not.toHaveClass(/dark/)

  // Toggle to dark.
  await page.getByTitle('Toggle theme').click()
  await expect(page.locator('html')).toHaveClass(/dark/)

  // The dark background utility is now generated, so body should be dark.
  const darkBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor)
  expect(darkBg).not.toBe('rgba(0, 0, 0, 0)')
  expect(darkBg).not.toBe('rgb(255, 255, 255)')

  // Toggle back to light.
  await page.getByTitle('Toggle theme').click()
  await expect(page.locator('html')).not.toHaveClass(/dark/)
})
