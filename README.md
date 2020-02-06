# EarnUp Programming Challenge

## System Requirements
- Node.js 10 or later

## Instructions to run
1. Run `npm install`
2. Run `npm run dev`

## Instructions for using
1. Go to [localhost:3000](http://localhost:3000/)
2. Log in with a name and phone number (if you're logging in a second time, you can enter whatever for the name)

- Start a chat by clicking button, entering the receiver's phone number, entering a message, and clicking Submit.
- Respond to a chat by clicking a chat in the left sidebar, entering a message, and Clicking Submit.

- Unfortunately, you'll need to refresh the page and log back in if you wan't to see any new message. These issues are bolded in the TODOs section.

## Open source projects used
- Next.js
- Ant Design
- React
- See remaining ones in `package.json`

## TODOs
- Improve design
 - Sidebar margins
 - Float chat form to bottom of page
- **Store user session so that they stay logged-in on page refresh**
- Separate signup and login
- **Automatically display new messages instead of having to refresh page (GraphQL subscriptions would have worked here)**
- Allow username to be set for a an already created user who is logging in for the first time
- Use a database instead of a server cache
