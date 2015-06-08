
/* We have deviated from the approach used in the original "The Cloud" to "My Butt" 
	( https://github.com/panicsteve/cloud-to-butt )
	
	* Main issue: Emoji do not display in certain font faces, styles, and weights.
	* To get around this, we need to wrap each "pile of poo" in a span that can be styled.
	
	To avoid breaking things, we search the document tree for text nodes, and only perform
	the search and replace operations within those text nodes.
	
	Using an approach closer to that of the jQuery highlight plugin -- where we 
	wrap the target text in a span by adding nodes around it -- is a better
	approach in principle, but still does not properly substitute the text 
	on a page of Google search results. 
	http://bartaz.github.io/sandbox.js/jquery.highlight.html
	
	
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
				
				// Note 2: For the more uncommon (e.g., Santorum, Huckabee) we do not include titles.
				// (Reasoning: "Senator 💩" is funnier than "💩" in most circumstances.)
				// For more common names (e.g., Clinton, Cruz), we need to include more titles.
				// The phrase "Senator Clinton" will (usually) identify Hillary but not Bill Clinton.
				
				SearchString += 'Rafael Edward "Ted" Cruz|Rafael Edward Cruz|Ted Cruz|Senator Cruz';
				SearchString += '|Carly Fiorina|Cara Carleton Sneed|Ms. Fiorina|Mrs. Fiorina|Fiorina';
				SearchString += '|Ben Carson|Benjamin Solomon';
				SearchString += '|Marco Rubio|Marco Antonio Rubio|Rubio';
				SearchString += '|Richard John "Rick" Santorum|Richard John Santorum|Rick Santorum|Santorum';
				SearchString += '|Lindsey Olin Graham|Lindsey Graham|Senator Graham';
				SearchString += '|George Elmer Pataki|George Pataki|Pataki';
				SearchString += '|Randal Howard "Rand" Paul|Randal Howard Paul|Rand Paul|Senator Paul';
				SearchString += '|Mike Huckabee|Michael Dale "Mike" Huckabee|Michael Dale Huckabee|Michael Huckabee|Huckabee';
				SearchString += '|Rick Perry|Governor Perry|James Richard "Rick" Perry|James Richard Perry';
				
				SearchString += '|John Ellis "Jeb" Bush|John Ellis Bush|Jeb Bush'; 
				
				if ( addShortNames == true)
				{
					SearchString += "|Cruz|Carly|Carson|Graham|Pataki|Perry|Jeb|Governor Bush|Paul";				
				}
			}
		
		if (addDemocrats == true)
			{
				if (SearchString != '')
					{SearchString += '|';}
				SearchString += 'Hillary Diane Rodham Clinton|Hillary Rodham Clinton|Hillary Rodham|Hillary Clinton';
				SearchString += '|Mrs. Clinton|Hillary Diane Rodham|Mrs. Bill Clinton|First Lady Clinton|Senator Clinton';
				SearchString += '|Secretary of State Clinton|Secretary Clinton|Bernie Sanders|Senator Sanders';
				SearchString += '|Lincoln Chafee|Governor Chafee|Senator Chafee|Chafee';
				SearchString += "|Martin Joseph O'Malley|Martin O'Malley|Governor O'Malley|O'Malley";
		
				if ( addShortNames == true)
				{
					SearchString += "|Hillary|Bernie|Clinton|Sanders";
				}
			}
	
		if (addOthers == true)
			{
				// No "major" candidates yet. That's what auto-updates are for, right? 
				if (SearchString != '')
					{SearchString += '|';}
				SearchString += 'Roseanne Cherrie Barr|Roseanne Barr|Zoltan Istvan|Vermin Supreme|Waka Flocka Flame|Juaquin James Malphurs'; 
				SearchString += '|Waka Flocka'; 
	
				if ( addShortNames == true)
				{
					SearchString += "|Roseanne|Zoltan|Flocka|Waka";
				}
			}
	
			$("body *").replaceText( RegExp(SearchString, "gi"), "<span class='poopy'>💩</span>" );
			//This jQuery based search and replace is respectful of tags-- replaces only text in text nodes. Links still work!

			if (( addShortNames == true) && (addRepublicans == true))
				{	
					$("body *").replaceText( /\bRand\b/gi, "<span class='poopy'>💩</span>"  );	// Use word boundaries to prevent false positives.
				}
			
			$("<style type='text/css'> .poopy{ font-style: normal !important;font-weight: normal !important ;font-family: serif !important;} </style>").appendTo("head");
			//Emoji will often not display in a CSS container that is specified to be in bold face, italic, or a specific font.
			//This CSS override will fix that in most (but not all) cases.
			
			}
			 
});

}

window.addEventListener ("load", myMain, false);
// Delay load for better compatibility with Google searches and other "slow" JS. Possibly not helping much....

function myMain (evt) {	
    poopify_page();
} 