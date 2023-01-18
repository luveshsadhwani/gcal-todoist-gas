# gcal-todoist-gas
Google Calendar event sync to Todoist application using Google App Script

One way registration of Todoist tasks (using their rest API) from listening to event changes in Google Calendars
Utilized user properties to store important API keys

Motivation: Todoist only does integration with one email (which is my personal email), so adding work calendar events as tasks is a nice-to-have. Plus, IFTTT was unreliable  :') and further from real-time (i assume they use google and todoist sync APIs) :')

## Generic Flow:
1. Change in calendar event triggers script
2. Search for any existing todoist task for that event (via event id)
3. Update todoist app via todoist API
4. Upsert document that links event_id to todoist task_id
