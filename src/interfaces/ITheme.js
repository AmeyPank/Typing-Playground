/**
 * @typedef {Object} ITheme
 * @property {string} label - Theme display name
 * @property {string} background - Background color or gradient
 * @property {string} title - Primary accent color for title and active text
 * @property {string} typeBoxText - Secondary color for text and buttons
 * @property {string} [textColor] - Cursor and highlight color
 * @property {string} [stats] - Stats accent color
 */

export const DefaultThemeFallback = {
  label: 'Super User',
  background: '#262A33',
  title: '#43FFAF',
  typeBoxText: '#526777',
  textColor: '#43FFAF',
  stats: '#43FFAF'
};

export const ThemeSchema = {
  validate: (theme) => {
    return Boolean(
      theme &&
      typeof theme.background === 'string' &&
      typeof theme.title === 'string' &&
      typeof theme.typeBoxText === 'string'
    );
  }
};

