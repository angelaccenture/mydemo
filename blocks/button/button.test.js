import {
  describe, it, expect, beforeEach, beforeAll, afterAll, vi,
} from 'vitest';
import { JSDOM } from 'jsdom';
import decorate from './button.js';

let document;
let window;

beforeAll(() => {
  const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
    url: 'http://localhost/',
  });
  window = dom.window;
  document = window.document;

  global.document = document;
  global.window = window;
  global.HTMLElement = window.HTMLElement;
  global.Node = window.Node;
  global.Event = window.Event;
  global.CustomEvent = window.CustomEvent;
  global.getComputedStyle = window.getComputedStyle;
  global.DOMParser = window.DOMParser;
  global.fetch = vi.fn();
});

afterAll(() => {
  delete global.document;
  delete global.window;
  delete global.HTMLElement;
  delete global.Node;
  delete global.Event;
  delete global.CustomEvent;
  delete global.getComputedStyle;
  delete global.DOMParser;
  delete global.fetch;
});

beforeEach(() => {
  document.body.innerHTML = '';
  vi.resetAllMocks();
});

// Helper to create test block
function createMockBlock({
  buttonStyle = 'primary',
  addIcon = 'true',
  iconPosition = 'leading',
  iconSize = 'large',
  iconUrl = 'https://example.com/icon.svg',
  inverseStyle = 'true',
  openInNewTab = 'true',
  id = 'test-id',
}) {
  const block = document.createElement('div');

  const createDiv = (text) => {
    const div = document.createElement('div');
    div.textContent = text;
    return div;
  };

  const btn = document.createElement('div');
  const buttonStyleDiv = createDiv(buttonStyle);
  const addIconDiv = createDiv(addIcon);
  const iconPositionDiv = createDiv(iconPosition);
  const iconLogoDiv = document.createElement('div');
  const span = document.createElement('span');
  const img = document.createElement('img');
  img.src = iconUrl;
  span.appendChild(img);
  iconLogoDiv.appendChild(span);
  const inverseStyleDiv = createDiv(inverseStyle);
  const iconSizeDiv = createDiv(iconSize);
  const openInNewTabDiv = createDiv(openInNewTab);
  const idDiv = createDiv(id);

  const a = document.createElement('a');
  a.href = '#';
  a.className = 'button';
  a.textContent = 'Click me';

  block.append(
    btn,
    buttonStyleDiv,
    addIconDiv,
    iconPositionDiv,
    iconLogoDiv,
    inverseStyleDiv,
    iconSizeDiv,
    openInNewTabDiv,
    idDiv,
  );
  block.appendChild(a);

  return block;
}

describe('decorate()', () => {
  it('applies correct button style, size, and classes', async () => {
    const block = createMockBlock({});

    fetch.mockResolvedValueOnce({
      text: () => Promise.resolve('<svg><path d="M0 0h24v24H0z"/></svg>'),
    });

    await decorate(block);

    // Wait for async SVG fetch and DOM update
    await new Promise((r) => setTimeout(r, 0));

    const cta = block.querySelector('a');

    const svg = cta.querySelector('svg');
    expect(svg).toBeTruthy();
    expect(svg.getAttribute('aria-hidden')).toBe('true');

    expect(cta.classList.contains('primary')).toBe(true);
    expect(cta.classList.contains('iblack')).toBe(true);
    expect(block.classList.contains('large')).toBe(true);
    expect(block.classList.contains('leading')).toBe(true);
    expect(cta.getAttribute('target')).toBe('_blank');
    expect(cta.getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('removes config elements after decorate', async () => {
    const block = createMockBlock({});

    fetch.mockResolvedValueOnce({
      text: () => Promise.resolve('<svg><path d="M0 0h24v24H0z"/></svg>'),
    });

    await decorate(block);
    await new Promise((r) => setTimeout(r, 0));

    const remainingDivs = Array.from(block.children).filter((el) => el.tagName === 'DIV');
    expect(remainingDivs.length).toBe(1); // Only <a> should remain
  });

  it('handles when addIcon is false', async () => {
    const block = createMockBlock({ addIcon: 'false' });

    await decorate(block);
    await new Promise((r) => setTimeout(r, 0));

    const svg = block.querySelector('svg');
    expect(svg).toBeFalsy();
  });

  it('does not add iblack if inverseStyle is false', async () => {
    const block = createMockBlock({ inverseStyle: 'false' });

    fetch.mockResolvedValueOnce({
      text: () => Promise.resolve('<svg><path d="M0 0h24v24H0z"/></svg>'),
    });

    await decorate(block);
    await new Promise((r) => setTimeout(r, 0));

    const cta = block.querySelector('a');
    expect(cta.classList.contains('iblack')).toBe(false);
  });

  it('adds trailing icon correctly', async () => {
    const block = createMockBlock({ iconPosition: 'trailing' });

    fetch.mockResolvedValueOnce({
      text: () => Promise.resolve('<svg><path d="M0 0h24v24H0z"/></svg>'),
    });

    await decorate(block);
    await new Promise((r) => setTimeout(r, 0));

    const cta = block.querySelector('a');
    const svg = cta.querySelector('svg');

    expect(svg).toBeTruthy();
    expect(cta.lastElementChild.tagName).toBe('svg');
    expect(block.classList.contains('trailing')).toBe(true);
  });
});
