chrome.storage.sync.get({
	democrats: true,
	republicans: true,
	thirdparty: true,
    extended: false
  }, function(items) {
	  
	  var addShortNames = false; 
	var addDemocrats = true; 
	var addRepublicans = true; 
	var addOthers = true; 

	var SearchString = 'poop';
// 	    console.log(addDemocrats);
	addDemocrats = items.democrats;
    addRepublicans = items.republicans;
    addOthers = items.thirdparty;    
    addShortNames = items.extended;   

if (addRepublicans == true)
	{
		SearchString += '|Rafael Edward "Ted" Cruz|Rafael Edward Cruz|Ted Cruz';
		SearchString += '|Carly Fiorina|Cara Carleton Sneed|Ms. Fiorina|Mrs. Fiorina|Fiorina';
		SearchString += '|Ben Carson|Benjamin Solomon';
		SearchString += '|Marco Rubio|Marco Antonio Rubio|Rubio';
		SearchString += '|Richard John "Rick" Santorum|Richard John Santorum|Rick Santorum|Santorum';
		SearchString += '|Lindsey Olin Graham|Lindsey Graham|Senator Graham';
		SearchString += '|George Elmer Pataki|George Pataki|Pataki';
		SearchString += '|Randal Howard "Rand" Paul|Randal Howard Paul|Rand Paul|Senator Paul';
		SearchString += '|Mike Huckabee|Michael Dale "Mike" Huckabee|Michael Dale Huckabee|Michael Huckabee|Governor Huckabee|Huckabee';
		SearchString += '|Rick Perry|Governor Perry|James Richard "Rick" Perry|James Richard Perry';
		
		SearchString += '|John Ellis "Jeb" Bush|John Ellis Bush|Jeb Bush'; 
		
		if ( addShortNames == true)
		{
			SearchString += "|Cruz|Carly|Carson|Graham|Pataki|Rand|Paul|Perry|Jeb";
		}
	}

if (addDemocrats == true)
	{
		SearchString += '|Hillary Diane Rodham Clinton|Hillary Rodham Clinton|Hillary Rodham|Hillary Clinton';
		SearchString += '|Mrs. Clinton|Hillary Diane Rodham|Mrs. Bill Clinton|First Lady Clinton|Senator Clinton|Secretary of State Clinton|Secretary Clinton';
		SearchString += '|Bernie Sanders|Senator Sanders';
		SearchString += '|Lincoln Chafee|Governor Chafee|Senator Chafee|Chafee';
		SearchString += "|Martin Joseph O'Malley|Martin O'Malley|Governor O'Malley|O'Malley";

		if ( addShortNames == true)
		{
			SearchString += "|Hillary|Bernie|Clinton|Sanders|Rodham";
		}
	}

	var re = new RegExp(SearchString, "gi");
	$("body *").replaceText( re, "<span class='poopy'>💩</span>" );
	//This jQuery based search and replace is respectful of tags-- replaces only text. Links still work!
	
	$("<style type='text/css'> .poopy{ font-style: normal !important;font-weight: normal !important ;font-family: serif !important;} </style>").appendTo("head");

});

