# Sample Quiz Application

## Overview
This is a simple quiz application built using HTML, CSS, and JavaScript. It leverages an Open API to fetch quiz questions dynamically, allowing users to test their knowledge interactively.

## Features
- Fetches quiz questions from an Open API
- Interactive multiple-choice quiz format
- Tracks user score and displays results
- Responsive design for mobile and desktop
- Lightweight and easy to customize

## Technologies Used
- **HTML**: Structure of the application
- **CSS**: Styling and layout
- **JavaScript**: Functionality and API integration
- **Open API**: Fetching quiz questions dynamically

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/adkaditya/quiz.git
   ```
2. Navigate to the project folder:
   ```sh
   cd quiz
   ```
3. Open `index.html` in a web browser.

## Usage
1. Load the application in a web browser.
2. Click "Start Quiz" to begin.
3. Answer multiple-choice questions fetched from the API.
4. View the final score after completing the quiz.

## API Integration
The application fetches quiz questions from an Open API. All questions will be based on **Computer Science** topics. The API endpoint used is:
```sh
https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple
```
The API returns a JSON response containing multiple-choice questions.

To configure the API endpoint, update the JavaScript file:
```javascript
const API_URL = "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple";
```

## Customization
- Modify `styles.css` to change the appearance.
- Update `script.js` to add custom logic or enhance functionality.
- Change the API endpoint to use a different quiz source.

## Contributing
Contributions are welcome! Feel free to fork the repository and submit pull requests.

## License
This project is licensed under the MIT License.

## Code Owner
Aditya Kumar (adk6535@gmail.com)

