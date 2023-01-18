function syncCalendarEvents() {
  // Get the calendar ID
  var calendarId = "primary";

  // Set initial syncToken
  var syncToken = "";

  // Get the current time as a Date object
  var now = new Date();

  // Set the end time to 6 months from the current time
  var endTime = new Date(now.getTime() + (6 * 30 * 24 * 60 * 60 * 1000));

  var events = Calendar.Events.list(calendarId, {
      timeMin: now.toISOString(),
      timeMax: endTime.toISOString()
    });

  // Loop through all pages of events
  while (events.items) {
    
    if (events.nextPageToken) {

      pageToken = events.nextPageToken;
      events = Calendar.Events.list(calendarId, {
        pageToken: pageToken
    });

    } else {
        syncToken = events.nextSyncToken;
        events.items = null;
    }
    
  }

  updateSyncToken(syncToken);
}

function updateSyncToken(syncToken = 'CJDrz-nTkvwCEJDrz-nTkvwCGAUguues7AE=') {
  // Set the sync token for the next sync using the Properties Service API
    PropertiesService.getUserProperties().setProperty("syncToken", syncToken);
}
