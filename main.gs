var botId = "Your bot ID here"; //https://dev.groupme.com/bots from this website 

function doPost(e){ 
//this function is based off of code from https://github.com/wreed12345/GroupMe-Bots-With-Google-Apps-Script
  var response = "Hello World";
  var unparsed = e.postData.getDataAsString();
  var post = JSON.parse(e.postData.getDataAsString()); //when a message is sent groupme sends an info packet in JSON format. This line parses it and creates an object for it
  var message = post.text; //contains the message a person sent
  var name = post.name; //contains the name of the person who sent the corresponding message
  var item = "undefined";
  response = name + ": " + message;
  if(name !== "Grocery Management System"){
  
    if(message.substring(0,4) === "!buy"){
      // when the user includes !buy as the first four characters in the message everything after that will be added to the list in the "wanted items" section
      item = message.substring(5, message.length);
      addProduct('D', item, name);
      sendText("Adding " + item + " to the want list for " + name + ".");
  
    }

    else if(message.substring(0,4) === "!out"){
     // when the user includes !out as the first four characters in the message everything after that will be added to the list in the "Ran out of:" section
      item = message.substring(5, message.length);
      addProduct('C', item, name);
      sendText("Adding " + item + " to the need list for " + name + ".");
  
    }
    
    else if(message.substring(0,5) === "!meal"){
     // when the user includes !meal as the first five characters in the message everything after that will be added to the list in the "Suggested Meals" section
      item = message.substring(5, message.length);
      addProduct('B', item, name);
      sendText("Adding " + item + " to the suggested meals list for " + name + ".");
  
    }
    
    else if(message.substring(0,5) === "!help"){
// when the user includes !help as the first five characters in the message these tutorial messages will appear
      sendText("If you want to request something, type '!buy yourItemHere' to add your item to the want list" );
      sendText("If we have run out of something we need, type '!out yourItemHere' to add your item to the need list" );
      sendText("If you have an idea for a family meal, type '!meal yourItemHere' to add your item to the want list" );
  
    }
    
    else{
      //this is optional, can be disabled. If it is enabled then the bot will reply this message if it does not detect any of the above commands
     sendText("Could not understand '" + message + "'. Type '!help' to view commands.");  
      
    }
    
  }
}

function sendText(text){
//This function used from https://github.com/wreed12345/GroupMe-Bots-With-Google-Apps-Script
  if(text == undefined){text = "Communication Succesful"} //Run this function to test the connection to the group
  UrlFetchApp.fetch("https://api.groupme.com/v3/bots/post", {"method":"post", "payload":'{"bot_id":"' + botId + '","text":"' + text + '"}'});
}

function addProduct(column, item, name) {
  var sheetUrl = "YOUR URL HERE!";
  var ss = SpreadsheetApp.openByUrl(sheetUrl);
  var sheet = ss.getActiveSheet();
  //var data = sheet.getDataRange().getValues(); //gets spreadsheet data
  var str = "Hello World";
  var lastRow = findLastRow(sheet) + 1;
  var itemRange = column + lastRow;
  var nameRange = 'A' + lastRow;
  sheet.getRange(itemRange).setValue(item);
  sheet.getRange(nameRange).setValue(name);
}

function findLastRow(sheet) {
range = sheet.getLastRow();
return range;
}
