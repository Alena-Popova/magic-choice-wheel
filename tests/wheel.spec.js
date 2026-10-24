const { test, expect } = require('@playwright/test');

const TEST_URL = '/Main-Page-Wheel.html?config=wheel-config-test.json';

function attachErrorCollectors(page) {
  const pageErrors = [];
  const consoleErrors = [];

  page.on('pageerror', (error) => {
    pageErrors.push(error.message);
  });

  page.on('console', (message) => {
    if (message.type() === 'error') {
      consoleErrors.push(message.text());
    }
  });

  return { pageErrors, consoleErrors };
}

function countParticipants(value) {
  return value
    .split('\n')
    .map((name) => name.trim())
    .filter(Boolean).length;
}

test('shows a gif when a winner is selected', async ({ page }) => {
  const errors = attachErrorCollectors(page);

  await page.goto(TEST_URL);
  await expect(page.locator('#spinBtn')).toHaveText('spin');

  await page.locator('#spinBtn').click();

  await expect.poll(async () => {
    const value = await page.locator('#nameInput').inputValue();
    return countParticipants(value);
  }).toBe(1);

  await expect(page.locator('#winnerModal')).toBeVisible();
  await expect(page.locator('#winnerGif')).toBeVisible();

  const winnerGifSrc = await page.locator('#winnerGif').getAttribute('src');
  expect(winnerGifSrc).toContain('/gifs/');
  expect(errors.pageErrors).toEqual([]);
  expect(errors.consoleErrors).toEqual([]);
});

test('does not throw errors after the wheel becomes empty', async ({ page }) => {
  const errors = attachErrorCollectors(page);

  await page.goto(TEST_URL);
  await expect(page.locator('#spinBtn')).toHaveText('spin');

  await page.locator('#spinBtn').click();
  await expect.poll(async () => {
    const value = await page.locator('#nameInput').inputValue();
    return countParticipants(value);
  }).toBe(1);
  await expect(page.locator('#winnerModal')).toBeHidden({ timeout: 1000 });

  await page.locator('#spinBtn').click();
  await expect.poll(async () => {
    const value = await page.locator('#nameInput').inputValue();
    return countParticipants(value);
  }).toBe(0);
  await expect(page.locator('#winnerModal')).toBeHidden({ timeout: 1000 });

  await page.locator('#spinBtn').click();
  await expect(page.locator('#emptyModal')).toBeVisible();
  await expect(page.locator('#emptyModal')).toBeHidden({ timeout: 1000 });

  expect(errors.pageErrors).toEqual([]);
  expect(errors.consoleErrors).toEqual([]);
});
