// Create a new ListWidget instance
let widget = new ListWidget();

// Set the background color of the widget
widget.backgroundColor = new Color("#1c1c1e");

// Get the current date and time
let now = new Date();

// Get the current hours and minutes
let hours = now.getHours();
let minutes = now.getMinutes();

// Convert the hours and minutes to binary
let binaryHours = hours.toString(2).padStart(4, "0");
let binaryMinutes = minutes.toString(2).padStart(6, "0");

// Create a new stack to hold the binary time
let timeStack = widget.addStack();
timeStack.layoutVertically();
timeStack.spacing = 8;

// Add the binary hours to the time stack
let hoursStack = timeStack.addStack();
hoursStack.layoutHorizontally();
hoursStack.spacing = 4;
for (let i = 0; i < binaryHours.length; i++) {
    let digit = hoursStack.addText(binaryHours[i]);
    digit.textColor = new Color("#ffffff");
    digit.font = Font.boldSystemFont(24);
}

// Add the binary minutes to the time stack
let minutesStack = timeStack.addStack();
minutesStack.layoutHorizontally();
minutesStack.spacing = 4;
for (let i = 0; i < binaryMinutes.length; i++) {
    let digit = minutesStack.addText(binaryMinutes[i]);
    digit.textColor = new Color("#ffffff");
    digit.font = Font.boldSystemFont(24);
}

// Refresh the widget every minute
widget.refreshAfterDate = new Date(Date.now() + 60000);

// Set the widget
Script.setWidget(widget);
