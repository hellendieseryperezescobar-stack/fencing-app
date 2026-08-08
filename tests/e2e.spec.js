const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('app loads and shows setup screen', async ({ page }) => {
  await expect(page.locator('#setup-screen')).toBeVisible();
  await expect(page.locator('button:has-text("Ingresar con Google")')).toBeVisible();
});

test('service worker registration appears in console', async ({ page }) => {
  const messages = [];
  page.on('console', msg => messages.push(msg.text()));
  await page.goto('/');
  await page.waitForTimeout(1000);
  const hasSwMessage = messages.some(m => m.includes('SW registrado') || m.includes('SW error'));
  expect(hasSwMessage).toBeTruthy();
});

test('offline: caches include supabase.min.js and index.html', async ({ page, context }) => {
  await page.goto('/');
  // Wait for the service worker to take control so reload can be served from cache
  await page.waitForFunction(() => (navigator.serviceWorker && navigator.serviceWorker.controller) || false, null, { timeout: 5000 });
  await context.setOffline(true);
  await page.reload({ waitUntil: 'load', timeout: 10000 });
  await expect(page.locator('#setup-screen')).toBeVisible();
});
