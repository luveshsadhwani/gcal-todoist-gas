# gcal-todoist-gas
Google Calendar event sync to Todoist application using Google App Script

One way registration of Todoist tasks (using their rest API) from listening to event changes in Google Calendars
Utilized user properties to store important API keys

## Generic Flow:
1. Change in calendar event triggers script
2. Search for any existing todoist task for that event (via event id)
3. Update todoist app via todoist API
4. Upsert document that links event_id to todoist task_id
