# BharatCity Explorer

BharatCity Explorer is a React-based AI city insight application that helps users explore Indian cities and understand key information about each city.

The application provides simple AI-powered insights such as city overview, famous places, culture, food, history, travel highlights, and best time to visit.

## Project Description

BharatCity Explorer is built using React and focuses on providing city insights for Indian cities.
Users can search for a city and get useful information in a clean and simple interface.

## Features

* Search Indian cities
* Get AI-powered city insights
* View famous places
* Learn about local food and culture
* Get travel highlights
* Simple and responsive React UI
* Clean city insight cards
* Easy to extend with more city data

## Tech Stack

* React.js
* JavaScript
* HTML
* CSS
* OpenAI API or any AI API, optional
* npm
* Git

## Project Structure

```text
bharatcity-explorer/
│
├── public/
│   └── index.html
│
├── src/
│   ├── components/
│   │   ├── CitySearch.jsx
│   │   ├── CityInsightCard.jsx
│   │   └── Header.jsx
│   │
│   ├── data/
│   │   └── cityData.js
│   │
│   ├── services/
│   │   └── aiService.js
│   │
│   ├── App.jsx
│   ├── App.css
│   └── index.js
│
├── package.json
└── README.md
```

## Prerequisites

Before running the project, install:

* Node.js
* npm
* Git

Check versions:

```bash
node -v
npm -v
git --version
```

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/bharatcity-explorer.git
```

Go to the project folder:

```bash
cd bharatcity-explorer
```

Install dependencies:

```bash
npm install
```

Start the React application:

```bash
npm start
```

The application will run on:

```text
http://localhost:3000
```

## Environment Setup

If you are using an AI API, create a `.env` file in the root folder.

```env
REACT_APP_OPENAI_API_KEY=your_api_key_here
```

Restart the application after adding the `.env` file.

```bash
npm start
```

## Usage

1. Open the app in the browser.
2. Search for an Indian city.
3. Click or submit the city name.
4. The app will show AI-powered city insights.
5. Explore city overview, famous places, food, culture, and travel highlights.

## Example City Insight Output

```text
City: Jaipur

Overview:
Jaipur is the capital city of Rajasthan and is popularly known as the Pink City.

Famous For:
Jaipur is famous for forts, palaces, traditional markets, jewelry, textiles, and Rajasthani culture.

Top Places:
- Amer Fort
- Hawa Mahal
- City Palace
- Jantar Mantar
- Nahargarh Fort

Food:
Popular foods include dal baati churma, ghewar, kachori, and laal maas.

Best Time to Visit:
October to March is considered the best time to visit Jaipur.
```

## Available Scripts

Start the development server:

```bash
npm start
```

Build the project for production:

```bash
npm run build
```

Run tests:

```bash
npm test
```

Install a new package:

```bash
npm install package-name
```

## Future Enhancements

* Add more Indian cities
* Add city images
* Add map integration
* Add Hindi language support
* Add voice search
* Add user favorite cities
* Add city comparison feature
* Add weather information
* Add local festival insights

## Project Goal

The goal of this project is to create a simple AI-powered React application that helps users quickly understand Indian cities and their key highlights.


## Demo Video

Watch the project demo here:

[Click here to watch the demo video](./India-city-explorer.mov)
## Author

Udit Sharma

## License

This project is open source and available under the MIT License.
