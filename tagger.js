//Scripts to interact with the html elements of the extension

// Try and make the collapsible menus collapsible -- obsolete
/*
function moveMenus(){
	
	var coll = document.getElementsByClassName("collapsible");
	var i;

	for (i = 0; i < coll.length; i++) {
		var content = this.nextElementSibling;
		if (content.style.display === 'block'){
			content.style.display = 'none';
		} else {
			content.style.display = 'block';
		} 
	};
	
}
*/



//Save user preferences for ratings and warnings - use sync for chrome, sync otherwise
function save_options() {
  // get current user preferences
  var warning1 = document.getElementById('warning1').checked;
  var warning2 = document.getElementById('warning2').checked;
  var warning3 = document.getElementById('warning3').checked;
  var warning4 = document.getElementById('warning4').checked;
  var warning5 = document.getElementById('warning5').checked;
  var rating1 = document.getElementById('rating1').checked;
  var rating2 = document.getElementById('rating2').checked;
  var rating3 = document.getElementById('rating3').checked;
  var rating4 = document.getElementById('rating4').checked;
  var rating5 = document.getElementById('rating5').checked;
  //store current user preferences
  chrome.storage.sync.set({
    warning1: warning1,
    warning2: warning2,
	warning3: warning3,
	warning4: warning4,
	warning5: warning5,
	rating1: rating1,
    rating2: rating2,
	rating3: rating3,
	rating4: rating4,
	rating5: rating5
  });
}

// Put user data back in the form for ratings and warnings
function restore_options() {
  // not sure what this does but apparently it's necessary
  chrome.storage.sync.get({
    warning1: false,
    warning2: false,
	warning3: false,
	warning4: false,
	warning5: false,
	rating1: false,
    rating2: false,
	rating3: false,
	rating4: false,
	rating5: false
  }, function(items) {
	// loads and sets user preferences
	document.getElementById('warning1').checked = items.warning1;
	document.getElementById('warning2').checked = items.warning2;
	document.getElementById('warning3').checked = items.warning3;
	document.getElementById('warning4').checked = items.warning4;
	document.getElementById('warning5').checked = items.warning5;
	document.getElementById('rating1').checked = items.rating1;
	document.getElementById('rating2').checked = items.rating2;
	document.getElementById('rating3').checked = items.rating3;
	document.getElementById('rating4').checked = items.rating4;
	document.getElementById('rating5').checked = items.rating5;
  });
}


//Retrieve and store data for text tags.
//Add new text tags
function add_text_tags(){
	//gets new tag to store
	var added = 0;
	var tag2Add = document.getElementById('addTagWord').value;
	// retrieves currently stored tags from chrome storage
	chrome.storage.sync.get({
		wordTagList : []
	}, function(items) {
		// sets currently stored tags in the variable currentTags
		var currentTags = items.wordTagList;
		
		if (currentTags.includes(tag2Add) && !tag2Add=='') {
			alert('You have already blocked this tag.')
			added = 1;
		} else {
			//adds the new tag to that list and puts that list in the display
			currentTags.push(tag2Add);
			document.getElementById('addedTagsWord').innerHTML = currentTags;
		
			//stores the new tag list in chrome storage
			chrome.storage.sync.set({
				wordTagList: currentTags
			})
		}
	})
	
	if (added == 1) {
		updateTags(tag2Add,'tt')
		//updates list of tags in removeTagsWord
		//in order, grabs the current dropdown object, creates a new option with the properties tag2Add, and then attaches that to the dropdown
		var tagDropdown = document.getElementById('removeTagsWord')
		var newTagOption = document.createElement('option')
		newTagOption.text = tag2Add
		newTagOption.value = tag2Add
		tagDropdown.add(newTagOption)
	}
	
	//resets input area
	document.getElementById('addTagWord').value = ''
}

//Remove text tags
function remove_text_tags(){
	// removes tag from dropdown
	var removeDropdown = document.getElementById('removeTagsWord');
	var tag2Remove = document.getElementById('removeTagsWord').value
	removeDropdown.remove(removeDropdown.selectedIndex);
	
	// removes tag from tag list in display
	chrome.storage.sync.get({
		wordTagList : []
	}, function(items) {
		// sets currently stored tags in the variable currentTags
		var currentTags = items.wordTagList;
		var deleteLocation = currentTags.indexOf(tag2Remove);
	
		//removes tag2Remove from currentTags
		currentTags.splice(deleteLocation,deleteLocation+1);
		
		//updates the displayed values
		document.getElementById('addedTagsWord').innerHTML = currentTags
		
		//stores the new tag list in chrome storage
		chrome.storage.sync.set({
			wordTagList: currentTags
		})
	})
}

// Retrieve tags from chrome storage and sets them in the interface
function restore_text_tags(){
	// sets current tags html to current tags
	chrome.storage.sync.get({
		wordTagList : []
	}, function(items) {
		document.getElementById('addedTagsWord').innerHTML = items.wordTagList;
		
		/*
		// Hides tag box when there's no tags 
		if (document.getElementById('addedTagsWord').innerHTML == '') {
			document.getElementById('addedTagsWord').style.display = 'none'
			document.getElementById('wordBlockedLabel').style.display = 'none'
		}
		*/
		
	})
	
}

// Adds current tags to the delete dropdown menu
function restore_text_deletes(){
	//gets the dropdown
	var tagDropdown = document.getElementById('removeTagsWord');
	
	//retreives the stored tags and adds them to the dropdown
	chrome.storage.sync.get({
		wordTagList : []
	}, function(items) {
		var currentTags = items.wordTagList;
		for (var i = 0; i < currentTags.length; i++){
			var newTagOption = document.createElement('option')
			newTagOption.text = currentTags[i]
			newTagOption.value = currentTags[i]
			tagDropdown.add(newTagOption)
		}
	})
	
}

// Store tags that are numbers
function add_number_tags(){
	// Gets new tag(s)
	var newFandom = document.getElementById('addNumFandom').value;
	var newCharacter = document.getElementById('addNumChar').value;
	var newRelationship = document.getElementById('addNumR').value;
	var newAdditional = document.getElementById('addNumAddi').value;
	// gets deletion dropdown
	var tagDropdown = document.getElementById('removeTagsNum')
	// Gets current tag(s)
	chrome.storage.sync.get({
		numTagList: []
	}, function(items) {
		var currentTagsNum = items.numTagList;
		
		if (document.getElementById('addedTagsNum').innerHTML == ''){
			currentTagsNum = [[],[],[],[]]
		}
		
		// Updates fandom tags
		if (newFandom != '' && !currentTagsNum[0].includes(newFandom)) {
			currentTagsNum[0].push(newFandom)
			// adds tag to dropdown
			var newTagOption = document.createElement('option')
			newTagOption.text = newFandom
			newTagOption.value = newFandom
			tagDropdown.add(newTagOption)
		} else if (newFandom != '') {
			alert('You have already added this tag.')
		}
		
		// Updates character tags
		if (newCharacter != '' && !currentTagsNum[1].includes(newCharacter)){
			currentTagsNum[1].push(newCharacter)
			// adds tag to dropdown
			var newTagOption = document.createElement('option')
			newTagOption.text = newCharacter
			newTagOption.value = newCharacter
			tagDropdown.add(newTagOption)
		} else if (newCharacter != '') {
			alert('You have already added this tag.')
		}
	
		// Updates relationship tags
		if (newRelationship != '' && !currentTagsNum[2].includes(newRelationship)){
			currentTagsNum[2].push(newRelationship)
			// adds tag to dropdown
			var newTagOption = document.createElement('option')
			newTagOption.text = newRelationship
			newTagOption.value = newRelationship
			tagDropdown.add(newTagOption)
		} else if (newRelationship != '') {
			alert('You have already added this tag.')
		}
	
		// Updates additional tags
		if (newAdditional != '' && !currentTagsNum[3].includes(newAdditional)){
			currentTagsNum[3].push(newAdditional)
			// adds tag to dropdown
			var newTagOption = document.createElement('option')
			newTagOption.text = newAdditional
			newTagOption.value = newAdditional
			tagDropdown.add(newTagOption)
		} else if (newAdditional != '') {
			alert('You have already added this tag.')
		}
		
		
		// Adds tags to display -- the commas were bugging me, so this prevents empty arrays from being displayed
		var displayTags = []
		for (var i = 0; i<currentTagsNum.length; i++) {
			if (currentTagsNum[i].length > 0) {
				displayTags.push(currentTagsNum[i]);
			}
		}
		
		document.getElementById('addedTagsNum').innerHTML = displayTags;
		//stores the new tag list in chrome storage
		chrome.storage.sync.set({
			numTagList: currentTagsNum
		})
		
		//resets input area
		document.getElementById('addNumFandom').value = ''
		document.getElementById('addNumChar').value = ''
		document.getElementById('addNumR').value = ''
		document.getElementById('addNumAddi').value = ''
	})
	
}

// Uses delete dropdown menu to remove number tags
function remove_num_tags(){
	// removes tag from dropdown
	var removeDropdown = document.getElementById('removeTagsNum');
	var tag2Remove = document.getElementById('removeTagsNum').value
	removeDropdown.remove(removeDropdown.selectedIndex);
	
	// removes tag from tag list in display
	chrome.storage.sync.get({
		numTagList : [[],[],[],[]]
	}, function(items) {
		// sets currently stored tags in the variable currentTags
		var currentTags = items.numTagList;
		var deleteLocation = 0
		
		// removes tag2Remove from current tags - since this is a list of lists, we have to search each one individually
		if (!(currentTags[0].indexOf(tag2Remove) == -1)){
			deleteLocation = currentTags[0].indexOf(tag2Remove)
			currentTags[0].splice(deleteLocation,deleteLocation+1);
			
		} else if (!(currentTags[1].indexOf(tag2Remove) == -1)){
			deleteLocation = currentTags[1].indexOf(tag2Remove)
			currentTags[1].splice(deleteLocation,deleteLocation+1);
			
		} else if (!(currentTags[2].indexOf(tag2Remove) == -1)){
			deleteLocation = currentTags[2].indexOf(tag2Remove)
			currentTags[2].splice(deleteLocation,deleteLocation+1);
			
		} else if (!(currentTags[3].indexOf(tag2Remove) == -1)){
			deleteLocation = currentTags[3].indexOf(tag2Remove)
			currentTags[3].splice(deleteLocation,deleteLocation+1);
		}
		
		//updates the displayed values
		var displayTags = []
		for (var i = 0; i<currentTags.length; i++) {
			if (currentTags[i].length > 0) {
				displayTags.push(currentTags[i]);
			}
		}
		
		document.getElementById('addedTagsNum').innerHTML = displayTags;
		
		//stores the new tag list in chrome storage
		chrome.storage.sync.set({
			numTagList: currentTags
		})
	})
}

// Adds number tags to their delete dropdown menu
function restore_num_deletes(){
	//gets the dropdown
	var tagDropdown = document.getElementById('removeTagsNum');
	
	//retreives the stored tags and adds them to the dropdown
	chrome.storage.sync.get({
		numTagList : []
	}, function(items) {
		var currentTagsNum = items.numTagList;
		for (var i = 0; i < currentTagsNum.length; i++){
			for (var j = 0; j < currentTagsNum[i].length; j++){
				var newTagOption = document.createElement('option')
				newTagOption.text = currentTagsNum[i][j]
				newTagOption.value = currentTagsNum[i][j]
				tagDropdown.add(newTagOption)
			}
		}
	})
}

// Restores number tags to their display
function restore_num_tags(){
	// sets current tags html to current tags
	chrome.storage.sync.get({
		numTagList : []
	}, function(items) {
		var currentTagsNum = items.numTagList;
		
		// this prevents empty arrays from being displayed
		var displayTags = []
		for (var i = 0; i<currentTagsNum.length; i++) {
			if (currentTagsNum[i].length > 0) {
				displayTags.push(currentTagsNum[i]);
			}
		}
		document.getElementById('addedTagsNum').innerHTML = displayTags;
	})
	
	// adds current tags to deletion menu
	restore_num_deletes()
}


// the if statement is here because it tries to run this code before the html document has loaded otherwise
if (!(document.getElementById('nameButton')==null)) {

// Automatically updates the form on load to reflect user preferences
document.addEventListener('DOMContentLoaded', restore_options);
document.addEventListener('DOMContentLoaded', restore_text_tags);
document.addEventListener('DOMContentLoaded',restore_text_deletes);
document.addEventListener('DOMContentLoaded',restore_num_tags);

// Opens and closes the accordion menus for archive tags -- NOTE: This throws errors because it tries to load before the user makes the popup
document.getElementById('nameButton').addEventListener('click', function() {
	var content = document.getElementById('nameContent')
	
	if (content.style.display === 'block'){
		content.style.display = 'none';
	} else {
		content.style.display = 'block';
	}
});

document.getElementById('warningButton').addEventListener('click', function() {
	var content = document.getElementById('warningContent')

	if (content.style.display === 'block'){
		content.style.display = 'none';
	} else {
		content.style.display = 'block';
	}
});

document.getElementById('ratingButton').addEventListener('click', function() {
	var content = document.getElementById('ratingContent')
	
	if (content.style.display === 'block'){
		content.style.display = 'none';
	} else {
		content.style.display = 'block';
	}
});

document.getElementById('numButton').addEventListener('click', function() {
	var content = document.getElementById('numContent')
	
	if (content.style.display === 'block'){
		content.style.display = 'none';
	} else {
		content.style.display = 'block';
	}
});



// Opens and closes the accordion menus with enter key
document.getElementById('nameButton').addEventListener('keyup',function(event) {
	if (event.keyCode === 13) {
		event.preventDefault();
		document.getElementById("nameButton").click();
	}
});
document.getElementById('warningButton').addEventListener('keyup',function(event) {
	if (event.keyCode === 13) {
		event.preventDefault();
		document.getElementById("warningButton").click();
	}
});
document.getElementById('ratingButton').addEventListener('keyup',function(event) {
	if (event.keyCode === 13) {
		event.preventDefault();
		document.getElementById("ratingButton").click();
	}
});
document.getElementById('numButton').addEventListener('keyup',function(event) {
	if (event.keyCode === 13) {
		event.preventDefault();
		document.getElementById("numButton").click();
	}
});


//Store data for warnings and ratings
document.getElementById('warning1').addEventListener('click', save_options);
document.getElementById('warning2').addEventListener('click', save_options);
document.getElementById('warning3').addEventListener('click', save_options);
document.getElementById('warning4').addEventListener('click', save_options);
document.getElementById('warning5').addEventListener('click', save_options);
document.getElementById('rating1').addEventListener('click', save_options);
document.getElementById('rating2').addEventListener('click', save_options);
document.getElementById('rating3').addEventListener('click', save_options);
document.getElementById('rating4').addEventListener('click', save_options);
document.getElementById('rating5').addEventListener('click', save_options);

// Store data for text tags
document.getElementById('stupidButton').addEventListener('click',add_text_tags);
document.getElementById('addTagWord').addEventListener('keyup',function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("stupidButton").click();
  }
});

//Remove a tag from the list of text tags
document.getElementById('removeTagsWordButton').addEventListener('click',remove_text_tags);
document.getElementById('removeTagsWord').addEventListener('keyup',function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("removeTagsWordButton").click();
  }
});

//Remove a tag from the list of number tags
document.getElementById('removeTagsNumButton').addEventListener('click',remove_num_tags);
document.getElementById('removeTagsNum').addEventListener('keyup',function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("removeTagsNumButton").click();
  }
});


// Store data for number tags by clicking button
document.getElementById('addTagsNum').addEventListener('click',add_number_tags);

// Store data for number tags by pressing enter
document.getElementById('addNumFandom').addEventListener('keyup',function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("addTagsNum").click();
  }
});
document.getElementById('addNumChar').addEventListener('keyup',function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("addTagsNum").click();
  }
});
document.getElementById('addNumR').addEventListener('keyup',function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("addTagsNum").click();
  }
});
document.getElementById('addNumAddi').addEventListener('keyup',function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("addTagsNum").click();
  }
});


// Store data for warnings and ratings by pressing enter - it's down here because it's loooong
document.getElementById('warning1').addEventListener('keyup',function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("warning1").click();
  }
});
document.getElementById('warning2').addEventListener('keyup',function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("warning2").click();
  }
});
document.getElementById('warning3').addEventListener('keyup',function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("warning3").click();
  }
});
document.getElementById('warning4').addEventListener('keyup',function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("warning4").click();
  }
});
document.getElementById('warning5').addEventListener('keyup',function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("warning5").click();
  }
});
document.getElementById('rating1').addEventListener('keyup',function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("rating1").click();
  }
});
document.getElementById('rating2').addEventListener('keyup',function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("rating2").click();
  }
});
document.getElementById('rating3').addEventListener('keyup',function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("rating3").click();
  }
});
document.getElementById('rating4').addEventListener('keyup',function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("rating4").click();
  }
});
document.getElementById('rating5').addEventListener('keyup',function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("rating5").click();
  }
});
}