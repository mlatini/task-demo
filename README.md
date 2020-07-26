# task-demo
This is a simple task managment application which I created mostly as a sampling of my development skills. 

The app is currently hosted at https://task-demo-app.herokuapp.com/

The idea originally started as a task management application that I could use around the house for my family chores. The idea is to create tasks which can be categorized and assigned to different individuals. 

When tasks are created the default state is "Not Started". As the person picks up the task they can move them to "In Progress" and eventually to "Completed" or "Deleted". Tasks can also be Paused. 

Tasks have due dates and can also be created as recurring. Recurring tasks will automatically create a follow-up task when completed. 

Unlimited color-coded categories can also be created, and all tasks are assigned a specific category. 

The interface is very simple and functional.

I chose to build the entire application mostly using vanilla JavaScript, using Handlebars for templating. I did that for a very simple reason which was to focus on JavaScript development and DOM manipulation. I'm currently re-building the front-end in React but this is still a work in progress. 

I created a previous version of this application which was a multi-tenant application backed by a mongo database. In order to create a simpler application for demonstration purposes, which didn't require registration and didn't persist changes long-term, I'm using a cookie to identify the session. The maxAge of this cookie is set to 24 hours. For storage, I'm using a json file named after the session id from the cookie which allows me to easily reference the file. 

What all of this means is that each session will have its own unique datastore so tasks can be created, modified, etc but only persist for 24 hours. The json file is stored in /tmp on the local filesystem. During development the files will get cleaned up with the regular operating system /tmp cleanup. I've been deploying the app on Heroku, and Heroku automatically cleans the /tmp dir every 24 hours so the deployed version stays clean. 

