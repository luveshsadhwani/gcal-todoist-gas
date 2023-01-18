// Atlas Integration
const atlasBaseUrl = 'https://data.mongodb-api.com/app/data-xipls/endpoint/data/v1'
const atlasHeaders = {
  'api-key': PropertiesService.getUserProperties().getProperty("atlasApiKey"),
  'Content-Type': '	application/json'
}

// Database info
const atlasApiPayload = {
  dataSource: 'Cluster0',
  database: 'calendars',
  collection: 'todoist_gcal',
}

function  atlasFindOne(query) {
  const payload = {
    ...atlasApiPayload,    
    filter : query
  }

  const { document } = postToAtlas('findOne', payload)
  return document;
}

function atlasFindOneByEventId(eventId) {
  return atlasFindOne({ "event_id" : eventId})
}

function atlasUpsertOne(eventId, taskId) {
  const payload = {
    ...atlasApiPayload,    
    filter: { 
      "event_id": eventId,
      "task_id": taskId
    },
    update: {
      "$set": {
        "lastUpdated": { "$date": { "$numberLong": new Date().getTime().toString() } }
      }
    },
    upsert: true
  }
  
  postToAtlas('updateOne', payload)
}

function postToAtlas(endPointString, payload) {
  try {
    const response = UrlFetchApp.fetch(atlasBaseUrl + '/action/' + endPointString, {
      'method': 'POST',
      'contentType': 'application/json',
      'payload' : JSON.stringify(payload),
      'headers' : atlasHeaders
    });
    console.log(JSON.parse(response.getContentText()))
    return JSON.parse(response.getContentText());
  } catch(e) {
    console.log('postToAtlas ', e);
  }
}
