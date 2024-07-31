# Survey Application

## Goal
The goal of this project is to have you work on a small project using the programming language of your choice, covering the following aspects:
1. **User Interface**: Develop an interface where users can input data.
2. **Data Storage**: Save the entered data into a database of your choosing.
3. **Data Analysis**: Utilize the database to compute or derive meaningful values.

The application you will build is intended for gathering survey data on people's lifestyle preferences. The app should be a desktop, web, or mobile application that can be placed in a public area for individuals to fill out a survey. The objective is to gather as many responses as possible for data analysis purposes. Please feel free to contact us for clarification on these requirements.

## Specifications

### User Interface
For the user interface, there are 2 screens that need to be created.

#### Screen 1: Fill Out Survey
When the application starts up, the user will be presented with the survey screen and navigation menu.

- The personal details section features text boxes for input, while the favorite food question utilizes checkboxes to allow users to select multiple options. 
- The final question about rating employs radio buttons, restricting the user to one choice. 
- The chosen response is translated into a number from 1 to 5. 
- When the user clicks submit, the entered data should be saved to a database of your choosing.

#### Screen 2: View Survey Result
When the "View Survey Results" menu link is clicked, the screen should display the survey results as below if there is data in the database; otherwise, it should show a message stating, "No Surveys Available."

The expected calculations are as follows:
- **Total number of surveys completed**: This is just a count of the total number of rows in the database.
- **Average age** of the people that participated in the survey.
- **Oldest person** that participated in the survey.
- **Youngest person** that participated in the survey.
- **Percentage of people who like Pizza**: Calculated by the number of people that like Pizza divided by the total number of surveys. Multiply by 100 to get the percentage. Present the result rounded off to 1 decimal place.
- **People like to eat out**: Calculated by working out the average of the rating. Present the result rounded off to 1 decimal place.

### Design and Validation
- Validate the fields. Check that the user has not left any of the text fields empty before they submit.
- The user may NOT enter a value for Age that is less than 5 and should not be more than 120.
- Ensure that the user has actually selected a rating for each of the four rating questions. They cannot submit a survey without selecting a rating.
- Design the screens to look like the ones shown above.
- Where the user is expected to enter the date, use a date picker.
