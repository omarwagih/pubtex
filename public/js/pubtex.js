

// GLOBAL VARIABLES
VERSION = "1.0.0";
INPUT_LATEX = '#input-latex';
OUTPUT_LATEX = '#output-latex';
OUTPUT_BIBTEX = '#output-bibtex';
ERROR_TEXT = '#error-text';
INPUT_PANEL = '#input-panel';
OUTPUT_PANEL = '#output-panel';

KEY_STYLE = '#key-style';
BRACKET_STYLE = "#bracket-style"
JOURNAL_STYLE = '#journal-style';

SPINNER = '.spinner';

CITE_BTN = '#cite-button';
RESET_BTN = '#reset-button';
EXAMPLE_BTN = '#example-btn';
//var p = /\d{8}/g;
//$('textarea').val().match(p);
// var re = /\d{8}/g;


// str = $('textarea').val();
// while ((match = re.exec(str)) != null) {
//     console.log("match found at " + match.index);
// }

// String.prototype.insertAt=function(index, string) { 
//   return this.substr(0, index) + string + this.substr(index);
// }


// function uniqueAddChar(i){
//   a = 'abcdefghijklmnopqrstuvwxyz';
//   m = i % 26;
//   r = Math.floor(i/26) + 1;
//   for(var j = 0; j < r; j++) 
// }

function setStatus(m){
  if($('#status').is(":visible")) return;
  $('.status').empty();
  if(m['error'] != undefined) $('.status#error').html(m['error']);
  if(m['success'] != undefined) $('.status#success').html(m['success']);
  if(m['neutral'] != undefined) $('.status#neutral').html(m['neutral']);
  $('#status').show(200).delay(3500).slideUp(200);
}

function asLatex(s){
  if(s == undefined) return s;
  var regex = /[^a-zA-Z0-9\-!@%*\)\(+=._-\s]+/g;
  m = s.match(regex);
  if(m == null) return s;
  m =  unique( m.join('').split('') );

  z = []
  for(var c=0; c<s.length; c++){
    if(jQuery.inArray(s[c], m) != -1){
      t = tolatex[getCharAsDecimalUTF8(s[c])];

      if(t == undefined) t = s[c];
      else if(t[0] == "\\" & t[t.length-1] != "}") t = t + "{}";
    }else{
      t = s[c];
    }
    z.push(t);
  }

  return z.join('');
}



function getCharAsDecimalUTF8(char){
    var getUTF8 = escape(char);
    return parseInt(getUTF8.substring(getUTF8.match(/\%u/) !== null ? 2 : 1), 16);
}

function HTMLDecode(s){
	return jQuery('<div></div>').html(s).text();
}

window.pmids = null;
window.arr=null;

function processTextarea(){
  id = INPUT_LATEX
  // Regular expression

  bs = $(BRACKET_STYLE).find(":selected");
  left =  bs.attr('left');
  right = bs.attr('right');
  //var re = new RegExp("\\[(\\d{8})([,|;]\\s*\\d{8})*\\]", "g");
  var re = new RegExp(left + "(\\d{4,8})([,|;]\\s*\\d{4,8})*" + right, "g");

  // Get html, replace &nbsp;
  var c = $(id).text();
  if(c.length == 0){
    console.log("No citations found!");
    setStatus({error:"Doh! You cant have no text! Try hitting example and try again!"});
    doneProcessing(-1);
    return;
  }

  // Find cites
  var z = c.match(re);
  
  // No citations found
  if(z == null){
    console.log("No matches found!");
    setStatus({error:"Oops! No pubmed IDs were found. Make sure you've selected the right bracket style!"});
    doneProcessing(-1);
    return;
  }

  $(SPINNER).show();

  z = unique(z);

  left = left.replace('\\', '');
  right = right.replace('\\', '');
  // Add inline tag for cites
  $.each(z, function(j, inline){
    x = new RegExp(inline.replace(left, "\\" + left).replace(right, "\\" + right), 'g')
    c = c.replace(x, "<inline>"+inline+"</inline>");
  });
  // Reset html
  $(id).html(c);

  var re2 = new RegExp("\\d{4,8}", 'g');

  pmids = [];

  // Loop cites again and add anchor links
  inlines = $(id + " inline")
  $.each(inlines, function(j, il){
    il = $(il)
    t = il.html();
    z = unique( t.match(re2) );

    $.each(z, function(j, pm){
      pmids.push(pm);
      link = "http://www.ncbi.nlm.nih.gov/pubmed/" + pm;
      t = t.replace(new RegExp(pm, 'g'), "<a target='_blank' href='"+link+"' class='pmid'>" + pm + "</a>");
    });
    il.html( t );
  });

  pmids = unique( pmids );

  $(id).attr('contentEditable', 'false');
  fetchData(pmids);
}

window.arg = [];
function fetchData(pmids) {
    var requests = [];
    for (var i = 0; i < pmids.length; i++) {
        //requests.push($.get("http://www.ncbi.nlm.nih.gov/pubmed/"+pmids[i]+"?report=xml&format=text"));
        requests.push($.ajax({
          type: "GET",
          url: "/fetch/"+pmids[i]
        }));
    }

    $.when.apply($, requests).then(function () {
        var array = $.map(requests, function (arg) {
            window.arg = arg;
            xml = $("<div/>").html(arg.responseText).text();
            // xml = html.replace(/&amp;/g, '&')
            //           .replace(/&gt;/g, '>')
            //           .replace(/&lt;/g, '<')
            //           .replace(/&quot;/g, '"')
            //           .replace(/&apos;/g, "'")
            //           .replace(/<\/?pre>/g, "").trim();
            return new PubmedEntry(xml);
        });
        fetchDataCallback(array, pmids);
    });
}

function makeBibTeX(cs, abbr){
  if(!(cs instanceof Array)) cs = [cs];

  bib = ["% This file was generated using pubtex "+VERSION +"\n"];
  for(var i = 0; i<cs.length; i++){
      c = cs[i];
      key = c.Key;//replace any spaces or dashes
      x = ["@article{", key, ','];
      a = [];
      for(var j=0; j<c.Authors.length; j++){
        z = c.Authors[j];
        a.push(z.LastName + ", " + z.FirstName);
      }
      authors = a.join(' and ');

      abbr ? JournalName = c.JournalAbbreviation: JournalName = c.JournalLong ;

      /\d-\d/.test(c.Pages) ? pages = c.Pages.replace('-', '--') : pages = c.Pages; 

      x.push('\n\tauthor = {' + asLatex(authors) + '},');
      x.push('\n\ttitle = {{' + asLatex(c.ArticleTitle) + '}},');
      x.push('\n\tjournal = {' + asLatex(JournalName)  + '},');
      x.push('\n\tyear = {' + c.Year  + '},');
      if(c.Month) x.push('\n\tmonth = {' + c.Month  + '},');
      if(c.Volume) x.push('\n\tvolume = {' + c.Volume  + '},');
      if(c.Issue) x.push('\n\tnumber = {' + c.Issue  + '},');
      if(c.Pages) x.push('\n\tpages = {' + pages  + '},');
      if(c.DOI) x.push('\n\tdoi = {' + c.DOI  + '},');
      x.push('\n\tpmid = {' + c.PMID  + '}');
      x.push('\n}');

      bib.push( x.join(''));
  }
  return(bib.join('\n'));
}

function fetchDataCallback(cs, pmids) {
    //do something with array
    arr = cs;

    // Invalid pubmed ids: were not successfully processed
    invalid = [];
    invalidHtml = [];
    // Valid pubmed ids
    valid = [];
    // Citation map pubmed id to citation object
    cmap = {};
    // Order of appearance of citations 
    Index = 1;

    // Find invalid pmids, generate citation map
    for(var i=0; i<pmids.length; i++){
      if(!cs[i].valid){
        invalid.push(pmids[i]);
        link = "http://www.ncbi.nlm.nih.gov/pubmed/" + pmids[i];
        invalidHtml.push("<a target='blank_' id='failed' href='"+link+"'>" + pmids[i] + "</a>");
      }else{
        valid.push(pmids[i]);
        cs[i].Index = Index;
        cmap[pmids[i]] = cs[i];
        Index++;
      }
    }

    // We have no valid ids
    if(valid.length == 0){
      console.log("No valid matches found!");
      setStatus({error:"Oops! All entered pubmed IDs are invalid!"});
      doneProcessing(-1);
      return;
    }

    stat = {}
    if(invalid.length > 0){
      stat['error'] = "Failed to retrieve " + invalid.length + " pubmed entries";
      console.log(invalidHtml.join(', '));
      $(ERROR_TEXT +" .content").html("The following IDs could not be retrieved and were excluded:<br>" + invalidHtml.join(', '));
      $(ERROR_TEXT).show();
    }else{
      $(ERROR_TEXT).hide();
    }

    
    stat['success'] = "Successfully retrieved " + valid.length + " pubmed entries";

    // Get key type 
    keyStyle = $(KEY_STYLE).find(":selected").val();
    // Get journal name type 
    journalAbbr = $(JOURNAL_STYLE).find(":selected").val() == "abbr";

    umap = {};

    // Generate keys
    for(var i = 0; i<valid.length; i++){
      c = cmap[valid[i]];
      if(keyStyle == "pmid"){
        c.Key = "pmid" + c.PMID;
      } else if(keyStyle == "authoryear"){
        key = (c.Authors[0].LastName + c.Year).latinize().replace(/\s|-/g,"");
        if(umap[key] == undefined){
          umap[key] = 0;
        }else{
          umap[key]++;
          key = key + "_" + (umap[key]);
        }
        c.Key = key;
      } else{ 
        c.Key = "InvalidKeyStyle";
      }
      cmap[valid[i]] = c;
    }

    // Generate inline stuff
    $(OUTPUT_LATEX).html($(INPUT_LATEX).html());
    inlines = $(OUTPUT_LATEX + " inline");
    $.each(inlines, function(j, il){
      il = $(il);
      pa = il.find(".pmid");
      ilc = [];
      $.each(pa, function(i, p){
          pmid = $(p).text();
          
          if(jQuery.inArray(pmid, invalid) == -1){
            key = cmap[pmid].Key;
            ilc.push(key);
          }
      });
      ilc.length > 0 ? il.html( "\\cite{" + ilc.join(', ') + "}" ) : il.html("");
    });

    // Generate bibtex
    p = [];
    for(var i = 0; i<valid.length; i++) p.push(cmap[valid[i]]);
    bibtex = makeBibTeX(p, journalAbbr);
    $(OUTPUT_BIBTEX).html(bibtex);
    
    // Generate download links
    latex = $(OUTPUT_LATEX).text();
    latex = unescape(encodeURIComponent(latex));
    bibtex = unescape(encodeURIComponent(bibtex));
    $('#download-latex').attr('href','data:application/octet-stream;base64,' + btoa(latex));
    $('#download-bibtex').attr('href','data:application/octet-stream;base64,' + btoa(bibtex));

    doneProcessing(1);
    setStatus(stat);
}

function doneProcessing(e){
  if(e > 0){
    $(INPUT_PANEL).switchClass( "col-xs-12", "col-xs-6", 300, "easeInOutQuad" );
    $(OUTPUT_PANEL).show(100);
    STATE = 1;
    $(RESET_BTN).show(100);
  }

  // Restore button
  $(CITE_BTN).prop('disabled', false);
  $('html').removeClass('wait');
  $(SPINNER).slideUp();
  
}


function unique(arr) {
    var hash = {}, result = [];
    for ( var i = 0, l = arr.length; i < l; ++i ) {
        if ( !hash.hasOwnProperty(arr[i]) ) { //it works with objects! in FF, at least
            hash[ arr[i] ] = true;
            result.push(arr[i]);
        }
    }
    return result;
}


function arrayToText(a) { 
  return a.map(function() { return $(this).text(); }).get(); 
}

function PubmedEntry(xml) {
  try{
    // Parse XML
    doc = $.parseXML( xml );
    $xml = $( doc );
    
    // Authors
    fn = arrayToText($xml.find("Author ForeName"));
    ln = arrayToText($xml.find("Author LastName"));
    a = [];
    jQuery.each( fn, function( i, val ) {
      a.push( { FirstName:fn[i], LastName:ln[i] } );
    });
    this.Authors = a;
    
    // Journal name
    this.JournalLong = $xml.find("Journal Title").text();
    this.JournalAbbreviation = $xml.find("Journal ISOAbbreviation").text();
    
    // Publication date 
    d = $($xml.find("PubDate")[0]);
    OldDate = d.find("MedlineDate").text();
    if(!OldDate){
      this.Year = d.find("Year").text();
      this.Month = d.find("Month").text();
      this.Day = d.find("Day").text();
    }else{
      this.Year = OldDate.substring(0,4);
    }
   
    
    // Title of article
    this.ArticleTitle = $xml.find("ArticleTitle").text();
    
    // Volume
    this.Volume = $xml.find("Volume").text();
    
    // Issue
    this.Issue = $xml.find("Issue").text();
    
    // Page
    this.Pages = $xml.find("MedlinePgn").text();
    
    // Pubmed ID
    this.PMID = arrayToText($xml.find("PMID"))[0];
    
    this.DOI = $xml.find("ArticleId[IdType='doi']").text();
    
    this.valid = true;

  }catch(err){
    
    this.valid = false;
  }

}
    