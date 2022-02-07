# Time Table (Scheduler) App Instructions

This project was created as a solution for a Frontend React task.

## Run the project
1. Clone the projet from the main branch.
2. run ``` npm install ```
3. run ``` npm start ```

# Project Insights & Features
## First Approach
In this approach, you will find the following features:
From left to right & from top to bottom
### Toolbar
- Custom Navigation button to toggle views.
- ***Today*** button to navigate you to the current day.
- ***Prev. & Next*** buttons to navigate you to next and previous weeks.
- ***Current Date*** button when on clicked opens a Calender to jump to a specific date.
- ***Week & Month*** selectbox to change the current view.
### Time Table
Week view consists of:
- Columns: week days (can be modified to have a specific start date or to hide weekends)
- Rows: time slots (30 mins each)

*You can add an all day event in the first row*

For each cell, you can: 
1. ****Double Click**** in an empty cell to add an event.
2. ****Click**** on an event to view it's info with the 2 buttons (****Edit & Delete****)
3. ****Double Click**** on an event to quickly edit it.
4. ****Drag & Drop**** any event from any time slot to another one OR from any day to another day.
5. ****Resize**** any event to increase/decrease it's duration.

****Month View**** has the same features except for resizing.
#### Creating/Editing event
You can specify an event title, starting date & time, ending date & time, event location and description
### Floating button 
Another way to easily add an event.


## Second Approach
In this approach, you will find the following features:
From left to right & from top to bottom
### Toolbar
- Custom Navigation button to toggle views.
- ***Prev. & Next*** buttons to navigate you to next and previous weeks.
- ***Current Date*** button when on clicked opens a Calender to jump to a specific date.
- ***Day, Week & Month*** buttons to change the current view.
### Time Table
Week view consists of:
- Columns: week days (can be modified to have a specific start date or to hide weekends)
- Rows: time slots (30 mins each)
- Passed hours/days from the week till the current day will be grayed out

*You can add an all day event in the first row*

For each cell, you can:
1. ****Double Click**** in an empty cell to add an event.
2. ****Click**** on an event to view it's info with the 2 buttons (****Edit & Delete****)
3. ****Double Click**** on an event to quickly edit it.
4. ****Drag & Drop**** any event from any time slot to another one OR from any day to another day.
5. ****Resize**** any event to increase/decrease it's duration.

****Day View**** shows all events for the current/selected date.

****Month View**** has the same features except for resizing.
#### Creating/Editing event
Double click on any cell/event or use the floating add button then fill in the following fields:
- Subject
- Starting Date & Time
- Select starting date's timezone (optional)
- Ending Date & Time
- Select ending date's timezone (can choose a different timezone) (optional)
- All day toggle switch (check if you want this event to be an all day event)
- ****Repeat**** toggle switch (when checked, another window will open with event ****repeating options****)
- Description

### A Toast appears for every action you make
**Note: Editing (from the form, drag and drop or resize) a repeating event will trigger a confirmation where you can select to edit only that appointment or edit the whole series**


## Hope you enjoy this simple Scheduler!