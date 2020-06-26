// URL base for all ao3 tag filtering and searchbar searches.
var pattern = 'https://archiveofourown.org/works*';
// URL base for all bookmark searches
var pattern1 = 'https://archiveofourown.org/bookmarks?*';
// URL base for all tag (and bookmark of tag) not-searches
var pattern2 = 'https://archiveofourown.org/tags/*';
// URL base for all user bookmarks and works
var pattern3 = 'https://archiveofourown.org/users/*';
// URL base for all collections
var pattern4 = 'https://archiveofourown.org/collections/*'
// base search query url, with no tags or exclusions - note that utf8= changes based on browser - is ✓ for opera and new edge
var baseWorkSearch = 'https://archiveofourown.org/tags/---/works?commit=Sort+and+Filter&page=&utf8=%E2%9C%93&work_search%5Bcomplete%5D=&work_search%5Bcrossover%5D=&work_search%5Bdate_from%5D=&work_search%5Bdate_to%5D=&work_search%5Bexcluded_tag_names%5D=&work_search%5Blanguage_id%5D=&work_search%5Bother_tag_names%5D=&work_search%5Bquery%5D=&work_search%5Bsort_column%5D=revised_at&work_search%5Bwords_from%5D=&work_search%5Bwords_to%5D='
var baseBookmarkSearch = 'https://archiveofourown.org/tags/---/bookmarks?bookmark_search%5Bbookmark_query%5D=&bookmark_search%5Bbookmarkable_query%5D=&bookmark_search%5Bexcluded_bookmark_tag_names%5D=&bookmark_search%5Bexcluded_tag_names%5D=&bookmark_search%5Blanguage_id%5D=&bookmark_search%5Bother_bookmark_tag_names%5D=&bookmark_search%5Bother_tag_names%5D=&bookmark_search%5Brec%5D=0&bookmark_search%5Bsort_column%5D=created_at&bookmark_search%5Bwith_notes%5D=0&commit=Sort+and+Filter&page=&utf8=%E2%9C%93';
// case where author only has one id
var baseUserBSearch = 'https://archiveofourown.org/users/---/bookmarks?bookmark_search%5Bbookmark_query%5D=&bookmark_search%5Bbookmarkable_query%5D=&bookmark_search%5Bexcluded_bookmark_tag_names%5D=&bookmark_search%5Bexcluded_tag_names%5D=&bookmark_search%5Blanguage_id%5D=&bookmark_search%5Bother_bookmark_tag_names%5D=&bookmark_search%5Bother_tag_names%5D=&bookmark_search%5Brec%5D=0&bookmark_search%5Bsort_column%5D=created_at&bookmark_search%5Bwith_notes%5D=0&commit=Sort+and+Filter&page=&utf8=%E2%9C%93'
var baseUserWSearch = 'https://archiveofourown.org/users/---/works?commit=Sort+and+Filter&page=&utf8=%E2%9C%93&work_search%5Bcomplete%5D=&work_search%5Bcrossover%5D=&work_search%5Bdate_from%5D=&work_search%5Bdate_to%5D=&work_search%5Bexcluded_tag_names%5D=&work_search%5Blanguage_id%5D=&work_search%5Bother_tag_names%5D=&work_search%5Bquery%5D=&work_search%5Bsort_column%5D=revised_at&work_search%5Bwords_from%5D=&work_search%5Bwords_to%5D='
// case where author has more than one id
var basePseudBSearch = '?bookmark_search%5Bbookmark_query%5D=&bookmark_search%5Bbookmarkable_query%5D=&bookmark_search%5Bexcluded_bookmark_tag_names%5D=&bookmark_search%5Bexcluded_tag_names%5D=&bookmark_search%5Blanguage_id%5D=&bookmark_search%5Bother_bookmark_tag_names%5D=&bookmark_search%5Bother_tag_names%5D=&bookmark_search%5Brec%5D=0&bookmark_search%5Bsort_column%5D=created_at&bookmark_search%5Bwith_notes%5D=0&commit=Sort+and+Filter&page=&utf8=%E2%9C%93'
var basePseudWSearch = '?commit=Sort+and+Filter&page=&utf8=%E2%9C%93&work_search%5Bcomplete%5D=&work_search%5Bcrossover%5D=&work_search%5Bdate_from%5D=&work_search%5Bdate_to%5D=&work_search%5Bexcluded_tag_names%5D=&work_search%5Blanguage_id%5D=&work_search%5Bother_tag_names%5D=&work_search%5Bquery%5D=&work_search%5Bsort_column%5D=revised_at&work_search%5Bwords_from%5D=&work_search%5Bwords_to%5D='
// collection base urls
var baseCollWSearch = 'https://archiveofourown.org/collections/---/works?commit=Sort+and+Filter&page=&utf8=%E2%9C%93&work_search%5Bcomplete%5D=&work_search%5Bcrossover%5D=&work_search%5Bdate_from%5D=&work_search%5Bdate_to%5D=&work_search%5Bexcluded_tag_names%5D=&work_search%5Blanguage_id%5D=&work_search%5Bother_tag_names%5D=&work_search%5Bquery%5D=&work_search%5Bsort_column%5D=revised_at&work_search%5Bwords_from%5D=&work_search%5Bwords_to%5D='
var baseCollBSearch = 'https://archiveofourown.org/collections/---/bookmarks?bookmark_search%5Bbookmark_query%5D=&bookmark_search%5Bbookmarkable_query%5D=&bookmark_search%5Bexcluded_bookmark_tag_names%5D=&bookmark_search%5Bexcluded_tag_names%5D=&bookmark_search%5Blanguage_id%5D=&bookmark_search%5Bother_bookmark_tag_names%5D=&bookmark_search%5Bother_tag_names%5D=&bookmark_search%5Brec%5D=0&bookmark_search%5Bsort_column%5D=created_at&bookmark_search%5Bwith_notes%5D=0&commit=Sort+and+Filter&page=&utf8=%E2%9C%93'
// Add excluded text tags to this for replacement, with %2C in between them
var textBase = 'excluded_tag_names%5D=';
// Categories for number tags - add number to these and concatenate - should look like rating + number + rating + number etc etc
var ratingBase = '&exclude_work_search%5Brating_ids%5D%5B%5D=';
var categoryBase = '&exclude_work_search%5Bcategory_ids%5D%5B%5D=';
var warningBase = '&exclude_work_search%5Barchive_warning_ids%5D%5B%5D=';
var fandomBase = '&exclude_work_search%5Bfandom_ids%5D%5B%5D=';
var relationshipBase = '&exclude_work_search%5Brelationship_ids%5D%5B%5D=';
var characterBase = '&exclude_work_search%5Bcharacter_ids%5D%5B%5D=';
var additionalBase = '&exclude_work_search%5Bfreeform_ids%5D%5B%5D=';
// Prevents url from constantly updating
var tabUpdated = 0;
var textSearch = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
// Storage variable for to access storage
var wTL = [];
var warnings = [];
var ratings = [];
var nTL = [[],[],[],[]]

// Fetches copy of existing tags and stores them in global variables, defined above - use sync for chrome and edge (and firefox), local for opera
document.addEventListener('DOMContentLoaded', function(){
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
		rating5: false,
		wordTagList : [],
		numTagList: [[],[],[],[]]
	//processes tags
	}, function(items) {
		wTL = items.wordTagList;
		warnings.push(items.warning1);
		warnings.push(items.warning2);
		warnings.push(items.warning3);
		warnings.push(items.warning4);
		warnings.push(items.warning5);
		ratings.push(items.rating1);
		ratings.push(items.rating2);
		ratings.push(items.rating3);
		ratings.push(items.rating4);
		ratings.push(items.rating5);
		// order of nTL = fandoms, characters, relationships, additional
		nTL = items.numTagList;
	})
})

// Swaps around tag storage upon someone adding a new tag and updates the url
chrome.storage.onChanged.addListener(function (){
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
		rating5: false,
		wordTagList : [],
		numTagList: [[],[],[],[]]
	//processes tags
	}, function(items) {
		wTL = items.wordTagList;
		warnings[0] = items.warning1;
		warnings[1] = items.warning2;
		warnings[2] = items.warning3;
		warnings[3] = items.warning4;
		warnings[4] = items.warning5;
		ratings[0] = items.rating1;
		ratings[1] = items.rating2;
		ratings[2] = items.rating3;
		ratings[3] = items.rating4;
		ratings[4] = items.rating5;
		// order of nTL = fandoms, characters, relationships, additional
		nTL = items.numTagList;
		// updateTags is the last function on the page, it handles putting all this in the url
		updateTags()
		
	});
})

// Deals with punctuation in searchbar searches
function processSearches(search){
	search = search.replace(/ /g,'%20').replace(/[+]/g,'%2B').replace(/[#]/g,'%23').replace(/[&]/g,'%26').replace(/[|]/g,'%7C').replace(/[?]/g,'%3F').replace(/[']/g,'%27').replace(/["]/g,'%22')
	//.replace(/[/]/g,'%2F'), .replace(/[:]/g,'%3A')
	return search
}

// Deals with numeric tags: warnings, ratings, and number tags
function processNumbers (url, wbSwitch) {
	//All numeric tags go after this, it's at the beginning in work searches and at the end in bookmark searches
	var searchTotal = 'commit=Sort+and+Filter';
	// order of operations = rating > warning > category (no option to block this - can't imagine it'd be useful) > fandom > character > relationship > freeform/additional
	
	// Deals with ratings - the list of ratings and the corresponding id have the same index
	var ratingIDs = ['9','10','11','12','13'];
	for (var i=0; i<ratings.length; i++) {
		if (ratings[i]) {
			searchTotal += ratingBase + ratingIDs[i]
		}
	}
	// Deals with warnings
	var warningIDs = ['14','17','18','20','19'];
	for (var i = 0; i < warnings.length; i++) {
		if (warnings[i]) {
			searchTotal += warningBase + warningIDs[i]
		}
	}
	// Handle numeric fandom tags
	fandoms = nTL[0];
	for (var i = 0; i < fandoms.length; i++){
		if (fandoms[i]) {
			searchTotal += fandomBase + fandoms[i]
		}
	}

	// Handle numeric character tags
	characters = nTL[1];
	for (var i = 0; i < characters.length; i++){
		if (!characters[i] == '') {
			searchTotal += characterBase + characters[i] 
		}
	}

	// Handle numeric relationship tags
	relationships = nTL[2];
	for (var i = 0; i < relationships.length; i++){
		if (!relationships[i] == '') {
			searchTotal += relationshipBase + relationships[i]
		}
	}

	// Handle numeric freeform tags
	additionals = nTL[3];
	for (var i = 0; i < additionals.length; i++){
		if (!additionals[i] == '') {
			searchTotal += additionalBase + additionals[i]
		}
	}
	
	if (wbSwitch == 'w') {
		return url.replace('commit=Sort+and+Filter',searchTotal)
	} else {
		return url.replace('commit=Sort+and+Filter',searchTotal).replace(/work_search/g,'bookmark_search')
	}
}

function createSearch() {
	//SEARCH BAR SEARCHING
	//prepares text tags for a searchbar search
	textSearch = ''
	fandomSearch = ' -fandom_ids: '
	characterSearch = ' -character_ids: '
	relationshipSearch = ' -relationship_ids: '
	additionalSearch = ' -freeform_ids: '
	for (var i = 0; i < wTL.length; i++){
		textSearch += '-"' + wTL[i] + '"'
	}
	
	// prepares ratings for a searchbar search
	var ratingIDs = ['Not Rated','Gen','Teen','Mature','Explicit'];
	for (var i=0; i<ratings.length; i++) {
		if (ratings[i]) {
			textSearch += '-"' + ratingIDs[i] + '"'
		}
	}
	
	// prepares warnings for a searchbar search
	var warningIDs = ['Creator Chose Not To Use Archive Warnings','Graphic Depictions Of Violence','Major Character Death','Underage','Rape/Non-Con'];
	for (var i = 0; i < warnings.length; i++) {
		if (warnings[i]) {
			textSearch += '-"' + warningIDs[i] + '"'
		}
	}
	
	// Handle numeric fandom tags
	fandoms = nTL[0];
	for (var i = 0; i < fandoms.length; i++){
		if (!fandoms[i] == '') {
			textSearch += fandomSearch + fandoms[i]
		}
	}

	// Handle numeric character tags
	characters = nTL[1];
	for (var i = 0; i < characters.length; i++){
		if (!characters[i] == '') {
			textSearch += characterSearch + characters[i]
		}
	}

	// Handle numeric relationship tags
	relationships = nTL[2];
	for (var i = 0; i < relationships.length; i++){
		if (!relationships[i] == '') {
			textSearch += relationshipSearch + relationships[i]
		}
	}

	// Handle numeric freeform tags
	additionals = nTL[3];
	for (var i = 0; i < additionals.length; i++){
		if (!additionals[i] == '') {
			textSearch += additionalSearch + additionals[i]
		}
	}
	
	return textSearch
}

// Fetches excluded tags from variable and converts them to the url
function createURL (url, scenario){
	// creates variables for use later on 
	var outputBase = '';
	var page = '';
	
	//HANDLING TEXT TAGS
	// prepares text tags for tag searches - wTL is defined when the very first function in this doc happens
	var tagsText = '';
	if (wTL.length == 0) {
		tagsText = textBase;
	}
	
	for (var i = 0; i < wTL.length; i++){
		// textBase is 'excluded_tag_names%5D='
		if (tagsText == '') {
			tagsText += textBase + wTL[i]
		} else {
			tagsText += '%2C' + wTL[i]
		}
	}

	
	//MODIFYING URL
	//Case where there's already a search query in the URL, and you're browsing works
	if (scenario == 1){
		outputBase = url.replace(textBase,tagsText);
		outputBase = processNumbers(outputBase,'w');
	//Case where there's already a search query in the URL ,and you're browsing bookmarks
	} else if (scenario == 1.5) {
		outputBase = url.replace(textBase,tagsText);
		outputBase = processNumbers(outputBase,'b');
	//Case for search from searchbar
	} else if (scenario == 2){
		outputBase = url + '+' + createSearch();
	// Case where you're searching works in a tag
	} else if (scenario == 3){
		outputBase =  baseWorkSearch.replace('excluded_tag_names%5D=',tagsText).replace('---',url.slice(33,url.search('/works')));
		outputBase = processNumbers(outputBase,'w');
	// Case where you're searching bookmarks in a tag
	} else if (scenario == 4) {
		outputBase = baseBookmarkSearch.replace('excluded_tag_names%5D=',tagsText).replace('---',url.slice(33,url.search('/bookmarks')));
		outputBase = processNumbers(outputBase,'b');
	// Case where you're browsing a user's bookmarks and they're not using an alternate pseud
	} else if (scenario == 5) {
		outputBase = baseUserBSearch.replace(textBase,tagsText).replace('---',url.slice(url.search('/users/')+7,url.search('/bookmarks')));
		outputBase = processNumbers(outputBase,'b');
	// Case where you're browsing a user's works and they're not using an alternate pseud
	} else if (scenario == 6) {
		outputBase = baseUserWSearch.replace(textBase,tagsText).replace('---',url.slice(url.search('/users/')+7,url.search('/works')));
		outputBase = processNumbers(outputBase,'w');
	// Case where you're browsing a user's bookmarks and they're using an alternate pseud
	} else if (scenario == 7) {
		outputBase = url + basePseudBSearch.replace(textBase,tagsText);
		outputBase = processNumbers(outputBase,'b');
	// Case where you're browsing a user's works and they're using an alternate pseud
	} else if (scenario == 8) {
		outputBase = url + basePseudWSearch.replace(textBase,tagsText);
		outputBase = processNumbers(outputBase,'w');
	// Case where you're browsing a collection's works
	} else if (scenario == 9) {
		outputBase = baseCollWSearch.replace(textBase,tagsText).replace('---',url.slice(40,url.search('/works')));
		outputBase = processNumbers(outputBase,'w');
	// Case where you're browsing a collection's bookmarks
	} else if (scenario == 10) {
		outputBase = baseCollBSearch.replace(textBase,tagsText).replace('---',url.slice(40,url.search('/bookmarks')));
		outputBase = processNumbers(outputBase,'b');
	}
	
	// Accounts for more than one page.
	if (url.includes('page=')) {
		outputBase.replace('page=','page='+url.slice(url.search('page=','&utf8=')))
	}
	
	
	//Allows for more than one update to occur (only after the function has finished)
	tabUpdated = 0;
	
	// because sometimes it hits the return statement before performing any operations and this makes the browser throw an error 
	if (outputBase == '') {
		return url
	} else {
		return outputBase
	}
};

 
// Adds excluded tags work searchbar searches - this works!
chrome.tabs.onUpdated.addListener(function() {
	chrome.tabs.query({
		'currentWindow': true,
		'url': pattern
	// This will match all tabs to the pattern we specified
	}, function(tab) {
		// Go through all tabs that match the URL pattern
		for (var i = 0; i < tab.length; i++){
			// Case for searches from the searchbar
			if (!tab[i].url.includes(processSearches(textSearch)) && tab[i].url.includes('/search?') && tabUpdated == 0) {
				// Changes the url to exclude selected tags
				tabUpdated = 1;
				chrome.tabs.update(
					// Adds excluded tags to url
					tab[i].id, {
						'url': createURL(tab[i].url,2)
					}
				)
			};
		};
	});
});

/*
// Adds excluded tags to bookmark searches - this generally just makes stuff worse
chrome.tabs.onUpdated.addListener(function() {
	chrome.tabs.query({
		'currentWindow': true,
		'url': pattern1
	// This will match all tabs to the pattern we specified
	}, function(tab) {
		// Go through all tabs that match the URL pattern
		for (var i = 0; i < tab.length; i++){
			// Case where you've already got a full query
			if (!tab[i].url.includes('Alpha%2FBeta%2FOmega+Dynamics') && tab[i].url.includes('excluded_tag_names%5D=')) {
				// Changes the url to exclude selected tags
				chrome.tabs.update(
					// Adds excluded tags to url
					tab[i].id, {
						'url': tab[i].url.replace('excluded_tag_names%5D=','excluded_tag_names%5D=Alpha%2FBeta%2FOmega+Dynamics')
					}
				)
			// Case where there's not already an excluded tag in the url
			} else if (!tab[i].url.includes('Alpha%2FBeta%2FOmega+Dynamics') && !tab[i].url.includes('excluded_tag_names%5D=')) {
				// Changes the url to exclude selected tags
				chrome.tabs.update(
					// Adds excluded tags to url
					tab[i].id, {
						'url': tab[i].url + '+-Alpha%2FBeta%2FOmega+Dynamics'
					}
				)
			};
		};
	});
});
*/

// Adds excluded tags to tags and bookmarks of tags which are not filtered or searched - by turning them into queries like the above - this partially works, tag is added twice for bookmarks
chrome.tabs.onUpdated.addListener(function() {
	chrome.tabs.query({
		'currentWindow': true,
		'url': pattern2
	// This will match all tabs to the pattern we specified
	}, function(tab) {
		// Go through all tabs that match the URL pattern
		for (var i = 0; i < tab.length; i++){
			// Case where you're searching works in a tag
			if (!tab[i].url.includes('/works?')&& tab[i].url.includes('works') && tabUpdated == 0) {
				// Changes the url to exclude selected tags
				tabUpdated = 1;
				chrome.tabs.update(
					// Changes tag filter to a search, adding tag name as well to base url
					tab[i].id, {
						'url' : createURL(tab[i].url,3)
					}
				)
			// Case where you're searching bookmarks in a tag
			} else if (!tab[i].url.includes('/bookmarks?') && tab[i].url.includes('bookmarks') && tabUpdated == 0) {
				// Changes the url to exclude selected tags
				tabUpdated = 1;
				chrome.tabs.update(
					// Changes url to a search, adding tag name as well to base url
					tab[i].id, {
						'url' : createURL(tab[i].url,4)
					}
				)
			};
		};
	});
});


// Adds excluded tags to user bookmarks - by making the url into a query as above - this partially works
chrome.tabs.onUpdated.addListener(function() {
	chrome.tabs.query({
		'currentWindow': true,
		'url': pattern3
	// This will match all tabs to the pattern we specified
	}, function(tab) {
		// Go through all tabs that match the URL pattern
		for (var i = 0; i < tab.length; i++){
			// Case where you're browsing a user's bookmarks and the user does NOT have more than one pseud
			if (!tab[i].url.includes('/bookmarks?') && tab[i].url.includes('bookmarks') && !tab[i].url.includes('pseuds') && tabUpdated == 0) {
				// Changes the url to exclude selected tags
				tabUpdated = 1;
				chrome.tabs.update(
					// Changes user bookmarks to a search, adding user_id to base url
					tab[i].id, {
						'url' : createURL(tab[i].url,5)
					}
				)
			// Case where you're browsing a user's works and the user does NOT have more than one pseud
			} else if ((!tab[i].url.includes('/works?') || !tab[i].url.includes('Sort+and+Filter')) && tab[i].url.includes('works') && !tab[i].url.includes('pseuds') && tabUpdated == 0) {
				// Changes the url to exclude selected tags
				tabUpdated = 1;
				chrome.tabs.update(
					// Changes user works to a search, adding user_id to base url
					tab[i].id, {
						'url' : createURL(tab[i].url,6)
					}
				)
			// Case where you're browsing a user's works and they have more than one pseud
			} else if (!tab[i].url.includes('/bookmarks?') && tab[i].url.includes('bookmarks') && tabUpdated == 0){
				tabUpdated = 1;
				chrome.tabs.update(
					// Changes user bookmarks to a search, adding user_id to base url
					tab[i].id, {
						'url' : createURL(tab[i].url,7)
					}
				)
			// Case where you're browsing a user's bookmarks and they have more than one pseud
			} else if (!tab[i].url.includes('/works?') && tab[i].url.includes('works') && tabUpdated == 0){
				tabUpdated = 1;
				chrome.tabs.update(
					// Changes user bookmarks to a search, adding user_id to base url
					tab[i].id, {
						'url' : createURL(tab[i].url,8)
					}
				)
			};
		};
	});
});


// Adds excluded tags to collection works and bookmarks which have not been filtered - this works!
chrome.tabs.onUpdated.addListener(function() {
	chrome.tabs.query({
		'currentWindow': true,
		'url': pattern4
	// This will match all tabs to the pattern we specified
	}, function(tab) {
		// Go through all tabs that match the URL pattern
		for (var i = 0; i < tab.length; i++){
			
			// Case where you're searching a collection's works
			if (!tab[i].url.includes('works?') && tab[i].url.includes('works') && tabUpdated == 0) {
				tabUpdated = 1;
				// Changes the url to exclude selected tags
				chrome.tabs.update(
					// Changes url to a search, adding the collection name as well
					tab[i].id, {
						'url' : createURL(tab[i].url,9)
					}
				)
			// Case where you're searching a collection's bookmarks
			} else if (!tab[i].url.includes('bookmarks?') && tab[i].url.includes('bookmarks') && tabUpdated == 0) {
				tabUpdated = 1;
				// Changes the url to exclude selected tags
				chrome.tabs.update(
					// Changes url to a search, adding collection name as well
					tab[i].id, {
						'url' : createURL(tab[i].url,10)
					}
				)
			};
		};
	});
});

// function to add and remove tags upon tags being changed by the user
function updateTags () {
	var updatedURL = '';
	chrome.tabs.query({
		'currentWindow': true,
		'url': 'https://archiveofourown.org/*'
	// This will match all tabs to the pattern after url
	}, function(tab) {
		for (var i = 0; i < tab.length; i++){
			var wb = 1;
			// get rid of everything after excluded_tag_names%5D= and before &work_search or &bookmark_search
			if (tab[i].url.includes('/works') && tabUpdated == 0) {
				updatedURL = tab[i].url.slice(0,tab[i].url.search(textBase)+textBase.length) + tab[i].url.slice(tab[i].url.search('&work_search%5Blanguage_id'),tab[i].url.length);
			} else if (tab[i].url.includes('/bookmarks') && tabUpdated == 0) {
				updatedURL = tab[i].url.slice(0,tab[i].url.search('excluded_tag_names%5D=')+22) + tab[i].url.slice(tab[i].url.search('&bookmark_search%5Blanguage_id'),tab[i].url.length);	
				wb = 1.5;
			}
			
			// get rid of everything after commit=Sort+and+Filter and before &page=, happens no matter if work or bookmark
			if (tabUpdated == 0 && tab[i].url.length > 28) {
				updatedURL = updatedURL.slice(0,updatedURL.search('Filter&')+7) + updatedURL.slice(updatedURL.search('&page='),updatedURL.length);
				tabUpdated = 1;
				
				chrome.tabs.update(
					// Adds excluded tags to url
					tab[i].id, {
						'url': createURL(updatedURL,wb)
					}
				)
			}
		}
	});
}

