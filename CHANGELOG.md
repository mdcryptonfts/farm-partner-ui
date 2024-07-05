# v1.0.0 (July 5th, 2024)

- First official public release
- Added `useGetGlobal` hook
- Show max reward length and vesting length dynamically
- Show daily reward on farms instead of "reward pool"

# v1.0.0-beta.5 (June 28, 2024)

- Introduced new API logic
- Added staked only section
- Slight modifications to styles
- Updated capitalizeFirstLetter to handle multiple words
- Fixed case where reward id is 0 and was evaluated as false
- Remove deprecated custom hooks
- Added individual farm pages
- Break API loop if rows are empty

---
# v1.0.0-beta.4 (June 25, 2024)

- Added CHANGELOG.md
- Added build process info to README
- Added support for light and dark themes, which are in `config.json` and managed with `localStorage`, wrapped in `ThemeContext`
- Fixed bug with ManageTab and ClaimTab when user is not logged in
- Removed RedirectDiscord component
- Removed unused components from Styles.jsx
- Removed App.css
- Fixed favicon location
- roundDownAndFormat to display reward pools and total staked in a more human readable manner


---
# v1.0.0-beta.3 (June 24, 2024)

Initial public beta release