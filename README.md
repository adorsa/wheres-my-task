# Where's my task

Where's my task is a web app that manages the user's tasks. The core logic is centered around the task's **time** and **geographical location**. These information allow to provide a focused view of the tasks that are **currently relevant** based on the time and user's current distance from the task.

This project is intentionally designed as a **proof of concept**. The scope is deliberately limited in order to focus on the core logic, state management and overall structure rather than on feature completeness.

Ideas for further improvements that were left out for these reasons can be found in the [Future roadmap](#future-roadmap) section.

## Core concepts

### Task relevance

In this application, a task is considered relevant when, based on its time and location constraints relative to the current time and location of the user, it is reasonable for the user to act on it in the immediate future.

### Time-based relevance

For a time-based task, relevance is determined by how close the current time is to the task's defined time frame. Tasks already within the time frame are considered of top relevance.

Tasks whose time frame is outside a predefined relevance window are not considered relevant.

Tasks remain however relevant after the end of their time frame and are marked as overdue.

### Location-based relevance

For a location-based task, relevance is determined by the geographical proximity of the user to the task's location. Tasks closer to the user are of higher relevance.

Tasks outside a predefined radius are not considered relevant.

### Combined relevance

For a task based on both time and location, relevance is determined by translating geographical distance into an equivalent time interval.

In this proof-of-concept version, this translation is performed using a predefined heuristic, allowing combined relevance tasks to be evaluated consistently with time-based tasks.

## Design decisions

In order to keep the project easy to evaluate, the scope was intentionally kept limited to a few core features. The focus is on providing an interesting experience for the user while keeping the code simple and clear enough for an easy evaluation.

## Future roadmap

While the focus of this project is to showcase a proof of concept, I have a direction in mind for this app in the future. Here is what I plan to implement:

* Integration with Maps APIs for a more accurate estimate of the time distance from each task's location
* Background updates and push notifications