# Technology Used

- Angular
- TypeScript
- NGXS State Management
- RxJS
- HTML5 & CSS3
- Bootstrap

# Core Features

- User login session simulation using localStorage(Used Localstorage for testing purposes only)

- Create, edit, and delete comments

- Recursive comment reply rendering(Used recursive technique to handle nesting)

- Upvote and downvote system

- Centralized state management using NGXS

- Observable-based data flow

# Architecture Highlights

- State Management

- Comments are managed using NGXS centralized store.

- Components subscribe to observable streams.

- Actions are dispatched for state updates.

- Recursive Rendering

- Comment replies are rendered using recursive component structure.


# How to login

- Use the username of the users inside the data.json [yoda,vader,leiaskywalker,lukeskywalker ].

- Session data is temporarily stored in localStorage.

- Session state is restored on page reload.

- Note: localStorage is used to get the user only for development and testing but the persisdent data for the comments was handle using ngxs.


# How to run

- npm install
- ng serve


# Testing

Unit testing is planned as a next step. 
Due to time constraints, the current version focuses on architecture, state management, and core functionality.