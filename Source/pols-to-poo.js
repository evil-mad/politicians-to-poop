/* We have deviated from the approach used in the original "The Cloud" to "My Butt" 
	( https://github.com/panicsteve/cloud-to-butt )
	
	* Main issue: Emoji do not display in certain font faces, styles, and weights.
	* To get around this, we need to wrap each "pile of poo" in a span that can be styled.
	
	To avoid breaking things, we search the document tree for text nodes, and only perform
	the search and replace operations within those text nodes. 
*/	

function poopify_page() {
chrome.storage.sync.get({
	democrats: true,
	republicans: true,
	thirdparty: true,
    extended: false
  }, function(items) { 
	
	var addDemocrats = true; 
	var addRepublicans = true; 
	var addOthers = true; 
	var addShortNames = false; 

	var SearchString = '';
	addDemocrats = items.democrats;
    addRepublicans = items.republicans;
    addOthers = items.thirdparty;    
    addShortNames = items.extended;   
    
    if ( (addRepublicans == true) || (addDemocrats == true) || (addOthers == true)) 	
    {
		if (addRepublicans == true)
			{
				// Note 1: Search terms must be listed in order from most specific to least specific.
				
				// Note 2: For the more uncommon names (e.g., Santorum, Huckabee) we do not include titles.
				// (Reasoning: "Senator 💩" is funnier than "💩" in most circumstances.)
				// For more common names (e.g., Clinton, Cruz), we need to include more titles.
				// The phrase "Senator Clinton" will identify Hillary but not Bill Clinton.
				
				SearchString += 'Rafael Edward "Ted" Cruz|Rafael Edward Cruz|Ted Cruz|Senator Cruz|TedCruz';
				SearchString += '|Carly Fiorina|Cara Carleton Sneed|Ms. Fiorina|Mrs. Fiorina|CarlyFiorina|Fiorina';
				SearchString += '|Ben Carson|BenCarson|Benjamin Solomon Carson|RealBenCarson';
				SearchString += '|Marco Rubio|Marco Antonio Rubio|MarcoRubio|Rubio';
				SearchString += '|Richard John "Rick" Santorum|Richard John Santorum|Rick Santorum|RickSantorum|Santorum';
				SearchString += '|Lindsey Olin Graham|Lindsey Graham|LindseyGraham|Senator Graham';
				SearchString += '|George Elmer Pataki|George Pataki|GeorgePataki|Pataki';
				SearchString += '|Randal Howard "Rand" Paul|Randal Howard Paul|Rand Paul|Senator Paul|RandPaul';
				SearchString += '|Mike Huckabee|MikeHuckabee|Michael Dale "Mike" Huckabee|Michael Dale Huckabee|Michael Huckabee|Huckabee';
				SearchString += '|Rick Perry|Governor Perry|James Richard "Rick" Perry|James Richard Perry|RickPerry';
				SearchString += '|John Ellis "Jeb" Bush|John Ellis Bush|Jeb Bush|JebBush'; 
				SearchString += '|Donald John Trump Sr.|Donald John Trump|Donald Trump'; 
				SearchString += '|Piyush "Bobby" Jindal|Bobby Jindal|Piyush Jindal|Jindal'; 
				
				
				
				
				
				if ( addShortNames == true)
				{
					SearchString += "|Cruz|Carly|Carson|Graham|Pataki|Perry|Jeb|Governor Bush|The Donald";				
				}
			}
		
		if (addDemocrats == true)
			{
				if (SearchString != '')
					{SearchString += '|';}
				SearchString += 'Hillary Diane Rodham Clinton|Hillary Rodham Clinton|Hillary Rodham|Hillary Clinton|HillaryClinton';
				SearchString += '|Mrs. Clinton|Hillary Diane Rodham|Mrs. Bill Clinton|First Lady Clinton|Senator Clinton';
				SearchString += '|Secretary of State Clinton|Secretary Clinton';
				SearchString += '|Bernard "Bernie" Sanders|Bernard Sanders|Bernie Sanders|Senator Sanders|BernieSanders';
				SearchString += '|Lincoln Chafee|Governor Chafee|Senator Chafee|LincolnChafee|Chafee';
				SearchString += "|Martin Joseph O'Malley|Martin O'Malley|Governor O'Malley|martinomalley|O'Malley";
		
				if ( addShortNames == true)
				{
					SearchString += "|Hillary|Rodham|Clinton|Bernie|Sanders";
				}
			}
	
		if (addOthers == true)
			{
				// No "major" candidates yet. That's what auto-updates are for, right? 
				if (SearchString != '')
					{SearchString += '|';}
				SearchString += 'Roseanne Cherrie Barr|Roseanne Barr|Zoltan Istvan|Vermin Supreme|Waka Flocka Flame|Juaquin James Malphurs'; 
				SearchString += '|Waka Flocka|Robert David Steele|Robert D. Steele|Robert Steele|Jill Ellen Stein|Jill Stein'; 
	
				if ( addShortNames == true)
				{
					SearchString += "|Roseanne|Zoltan|Flocka|Waka";
				}
			}
	
			$("body *").replaceText( RegExp(SearchString, "gi"), "<span class='poopy'>💩</span>" );
			//This jQuery based search and replace is respectful of tags-- replaces only text in text nodes. Links still work!

			if (( addShortNames == true) && (addRepublicans == true))
				{	
					$("body *").replaceText( /\bRand\b|\bBush\b|\bPaul\b|\bTrump\b/gi, "<span class='poopy'>💩</span>"  );// Use word boundaries to prevent false positives.
				}
			
			if($("style:contains('.poopy')").length < 1)
			{
				$("<style type='text/css'>.poopy{ font-style: normal !important;font-weight: normal !important ;font-family: serif !important;} </style>").appendTo("head"); 
			}
			
			//Emoji will often not display in a CSS container that is specified to be in bold face, italic, or a specific font.
			//This CSS override will fix that in most (but not all) cases.
			
			} 
	});

}

var timeout = null;
document.addEventListener("DOMSubtreeModified", function() {
    if(timeout) {
        clearTimeout(timeout);
    }
    timeout = setTimeout(poopify_page, 500);	// Update every 500 ms -- allows searches of dynamically loaded content.
}, false);

