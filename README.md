# webapp-busETA

This is a repo that mimics KMB Bus ETA partical function

## Installation

clone the repo from Github

```js
git clone https://github.com/shumhoyin-dev/web-app-KMB.git
```

cd to the target folder and use the package manager to install package

```js
cd webapp-busETA
npm install
```

## Execution

Run the repo

```js
npm run dev
```

## Assumptions - ETA for Selected Stops

1. The ETA of selected 2 bus stops will trigger independently. Which means clicking one Stop only display the ETA of that stop at once.

2. After clicking one of the route in ETA list, it will direct to a page and display the full ETA list of that bus route

## Assumptions - Routes Search

1. The Web app will first fetch all the routes from API first, so it may be a long list.

2. It filters the result by combining the destination input

## Assumptions - Destination Search

1. The Web app only search destination using the route final destination. If the destination is within the route, it will not be counted as one of the result.

2. It filters the result by combining the route input

## Choice of solutions and justification

The Web App is using ReactJS as the major framework.

1. React Leaflet - React library for Generating Map and MArker using Leaflet

2. heroicons - Free SVG ICON

3. axios - For API handling

4. geolib - Getting a center point among a group of latitude and longtitude object

5. i18next - For multi-lang usage

6. react-simple-pull-to-refresh - For the pull down refresh implementation

7. TailwindCSS - For efficient CSS writing, responsive design, Dark mode

8. eslint - Find and fix problems with code

9. lodash - implement debounce function for input
