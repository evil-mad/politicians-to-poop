// Saves options to chrome.storage.sync.
function save_options() {
	
	var democratsCk = document.getElementById('democrats').checked;
	var republicansCk = document.getElementById('republicans').checked;
	var thirdpartyCk = document.getElementById('thirdparty').checked;
	var extendedCk = document.getElementById('extended').checked; 
	
	chrome.storage.sync.set({
		
		democrats: democratsCk,
		republicans: republicansCk,
		thirdparty: thirdpartyCk,
	    extended: extendedCk
    
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
	democrats: true,
	republicans: true,
	thirdparty: true,
    extended: false
  }, function(items) {
	document.getElementById('democrats').checked = items.democrats;
    document.getElementById('republicans').checked = items.republicans;
    document.getElementById('thirdparty').checked = items.thirdparty;    
     document.getElementById('extended').checked = items.extended;   
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',save_options);