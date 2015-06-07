var FullNamesOnly = 0; 
var addDemocrats = 1; 
var addRepublicans = 1; 
var addOthers = 1; 

var SearchString = 'poop';

if (addRepublicans == 1)
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
		
		if ( FullNamesOnly != 1)
		{
			SearchString += "|Cruz|Carly|Carson|Graham|Pataki|Rand|Paul|Perry|Jeb";
		}
	}

if (addDemocrats == 1)
	{
		SearchString += '|Hillary Diane Rodham Clinton|Hillary Rodham Clinton|Hillary Rodham|Hillary Clinton';
		SearchString += '|Mrs. Clinton|Hillary Diane Rodham|Mrs. Bill Clinton|First Lady Clinton|Senator Clinton|Secretary of State Clinton|Secretary Clinton';
		SearchString += '|Bernie Sanders|Senator Sanders';
		SearchString += '|Lincoln Chafee|Governor Chafee|Senator Chafee';
		SearchString += "|Martin Joseph O'Malley|Martin O'Malley|Governor O'Malley";

		if ( FullNamesOnly != 1)
		{
			SearchString += "|Hillary|Bernie|Clinton|Sanders|Rodham";
		}
	}

/*

if (addOthers == 1)
	{
		// No "major" candidates... yet.
		
		if ( FullNamesOnly != 1)
			{}
		}
*/

var re = new RegExp(SearchString, "gi");
$("body *").replaceText( re, "<span class='poopy'>💩</span>" );
//This jQuery based search and replace is respectful of tags-- replaces only text. Links still work!

$("<style type='text/css'> .poopy{ font-style: normal !important;font-weight: normal !important ;font-family: serif !important;} </style>").appendTo("head");

