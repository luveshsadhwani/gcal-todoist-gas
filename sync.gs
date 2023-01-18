// Synchronize access to the calendar resource
function syncCalendarUpdates() {
  // Get the calendar ID
  var calendarId = "primary";
  // get initial next sync token
  var nextSyncToken = PropertiesService.getUserProperties().getProperty("syncToken");

  try {
    // Perform the sync operation
    var events = Calendar.Events.list(calendarId, {syncToken: nextSyncToken});

    updateSyncToken(events.nextSyncToken)
  
    if (events.items) {
      // add or create todoist task object
      console.log('Number of updates ', events.items.length);
      const eventUpdate = events.items[0];
      const eventId = eventUpdate.id;
      console.log('Event ID ', eventId);
      console.log('Summary', eventUpdate.summary);
      console.log('Start time', eventUpdate.start.dateTime);
      console.log('End time', eventUpdate.end.dateTime);
      console.log('Creator', eventUpdate.creator.email);
      console.log('Organizer', eventUpdate.organizer.email);
      console.log('Description', eventUpdate.description);

      // TODO: Only add event to todoist if the event is created by me, or if I have accepted an event invite

      // check if event ID has an associated task ID in todoist
      const integrationDocument = atlasFindOneByEventId(eventId);
      console.log('integrationDocument ', integrationDocument)
      const taskId = integrationDocument ? integrationDocument.task_id : '';
      
      const todoistTaskId = upsertTodoistTask(eventUpdate, taskId);

      atlasUpsertOne(eventId, todoistTaskId)

    } else {
      console.log('No updates');
    }

  } catch (error) {
  
    // Log the error
    console.error(error);
  } 
}

function upsertTodoistTask(
  eventUpdate = {
    summary: 'Test',
    start: {
      dateTime: '2022-12-28T04:00:00+08:00'
    }
  },
  taskId = '') {
  const newTodoistTask = {};

  newTodoistTask.content = eventUpdate.summary
  newTodoistTask.due_datetime = new Date(eventUpdate.start.dateTime)
  newTodoistTask.labels = ["GAS"];
  newTodoistTask.project_id = 2249403634 // Master Actions
  newTodoistTask.section_id = 31933741 // Office
  if (eventUpdate.description) newTodoistTask.description = eventUpdate.description

  return postTodoistTask(taskId, newTodoistTask);
  
}
