// TODOIST INTEGRATION 
const baseUrl = 'https://api.todoist.com/rest/v2/tasks/'

const todoistApiOptions = {
  contentType: 'application/json',
  headers : {
    'Authorization': `Bearer ${PropertiesService.getUserProperties().getProperty("todoistApiToken")}`
  }
}

function getTaskById(taskId = '6447139415') {
  // Update URL
  const url = baseUrl + taskId;

  var options = {
    'method' : 'get',
    ...todoistApiOptions
  };
  try {
    var response = UrlFetchApp.fetch(url, options);
    if (response.getResponseCode() === 200) {
      console.log(response.getContentText());
      return response.getContentText();
    }
  } catch (e) {
    console.log('getTaskById', e);
  } 
}

function postTodoistTask(taskId, todoistTask) {
  // Update URL
  const url = baseUrl + taskId;

  var options = {
    'method' : 'POST',
    'payload' : JSON.stringify(todoistTask),
    ...todoistApiOptions
    
  };
  try {
    var response = UrlFetchApp.fetch(url, options);
    if (response.getResponseCode() === 200) {
      const responseText = response.getContentText();
      console.log(responseText);
      return JSON.parse(responseText).id;
    }
  } catch (e) {
    console.log('postTodoistTask ', e);
  } 
}
