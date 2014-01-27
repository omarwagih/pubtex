

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

MAX_IDS = 250;


$(document).ready(function() {
  $('select').selectpicker();

  $(EXAMPLE_BTN).click(function(){
    
    $(INPUT_LATEX).html('\\documentclass[12pt]{article}\n\\begin{document}\n\nThis is a latex document that cites one pubmed article using its ID [23340850] and a bunch of others [23340847, 23340848, 23340841]. You can separate IDs with a comma or a semi-colon [23340851;24312911].\n\n\\bibliographystyle{plain}\n\\bibliography{bibtex}\n\n\\end{document}');
  });

  $(INPUT_LATEX).bind("paste", function(){
  	setTimeout(function() {
  		invisible = /[\x7F-\x9F\xAD\u0378\u0379\u037F-\u0383\u038B\u038D\u03A2\u0528-\u0530\u0557\u0558\u0560\u0588\u058B-\u058E\u0590\u05C8-\u05CF\u05EB-\u05EF\u05F5-\u0605\u061C\u061D\u06DD\u070E\u070F\u074B\u074C\u07B2-\u07BF\u07FB-\u07FF\u082E\u082F\u083F\u085C\u085D\u085F-\u089F\u08A1\u08AD-\u08E3\u08FF\u0978\u0980\u0984\u098D\u098E\u0991\u0992\u09A9\u09B1\u09B3-\u09B5\u09BA\u09BB\u09C5\u09C6\u09C9\u09CA\u09CF-\u09D6\u09D8-\u09DB\u09DE\u09E4\u09E5\u09FC-\u0A00\u0A04\u0A0B-\u0A0E\u0A11\u0A12\u0A29\u0A31\u0A34\u0A37\u0A3A\u0A3B\u0A3D\u0A43-\u0A46\u0A49\u0A4A\u0A4E-\u0A50\u0A52-\u0A58\u0A5D\u0A5F-\u0A65\u0A76-\u0A80\u0A84\u0A8E\u0A92\u0AA9\u0AB1\u0AB4\u0ABA\u0ABB\u0AC6\u0ACA\u0ACE\u0ACF\u0AD1-\u0ADF\u0AE4\u0AE5\u0AF2-\u0B00\u0B04\u0B0D\u0B0E\u0B11\u0B12\u0B29\u0B31\u0B34\u0B3A\u0B3B\u0B45\u0B46\u0B49\u0B4A\u0B4E-\u0B55\u0B58-\u0B5B\u0B5E\u0B64\u0B65\u0B78-\u0B81\u0B84\u0B8B-\u0B8D\u0B91\u0B96-\u0B98\u0B9B\u0B9D\u0BA0-\u0BA2\u0BA5-\u0BA7\u0BAB-\u0BAD\u0BBA-\u0BBD\u0BC3-\u0BC5\u0BC9\u0BCE\u0BCF\u0BD1-\u0BD6\u0BD8-\u0BE5\u0BFB-\u0C00\u0C04\u0C0D\u0C11\u0C29\u0C34\u0C3A-\u0C3C\u0C45\u0C49\u0C4E-\u0C54\u0C57\u0C5A-\u0C5F\u0C64\u0C65\u0C70-\u0C77\u0C80\u0C81\u0C84\u0C8D\u0C91\u0CA9\u0CB4\u0CBA\u0CBB\u0CC5\u0CC9\u0CCE-\u0CD4\u0CD7-\u0CDD\u0CDF\u0CE4\u0CE5\u0CF0\u0CF3-\u0D01\u0D04\u0D0D\u0D11\u0D3B\u0D3C\u0D45\u0D49\u0D4F-\u0D56\u0D58-\u0D5F\u0D64\u0D65\u0D76-\u0D78\u0D80\u0D81\u0D84\u0D97-\u0D99\u0DB2\u0DBC\u0DBE\u0DBF\u0DC7-\u0DC9\u0DCB-\u0DCE\u0DD5\u0DD7\u0DE0-\u0DF1\u0DF5-\u0E00\u0E3B-\u0E3E\u0E5C-\u0E80\u0E83\u0E85\u0E86\u0E89\u0E8B\u0E8C\u0E8E-\u0E93\u0E98\u0EA0\u0EA4\u0EA6\u0EA8\u0EA9\u0EAC\u0EBA\u0EBE\u0EBF\u0EC5\u0EC7\u0ECE\u0ECF\u0EDA\u0EDB\u0EE0-\u0EFF\u0F48\u0F6D-\u0F70\u0F98\u0FBD\u0FCD\u0FDB-\u0FFF\u10C6\u10C8-\u10CC\u10CE\u10CF\u1249\u124E\u124F\u1257\u1259\u125E\u125F\u1289\u128E\u128F\u12B1\u12B6\u12B7\u12BF\u12C1\u12C6\u12C7\u12D7\u1311\u1316\u1317\u135B\u135C\u137D-\u137F\u139A-\u139F\u13F5-\u13FF\u169D-\u169F\u16F1-\u16FF\u170D\u1715-\u171F\u1737-\u173F\u1754-\u175F\u176D\u1771\u1774-\u177F\u17DE\u17DF\u17EA-\u17EF\u17FA-\u17FF\u180F\u181A-\u181F\u1878-\u187F\u18AB-\u18AF\u18F6-\u18FF\u191D-\u191F\u192C-\u192F\u193C-\u193F\u1941-\u1943\u196E\u196F\u1975-\u197F\u19AC-\u19AF\u19CA-\u19CF\u19DB-\u19DD\u1A1C\u1A1D\u1A5F\u1A7D\u1A7E\u1A8A-\u1A8F\u1A9A-\u1A9F\u1AAE-\u1AFF\u1B4C-\u1B4F\u1B7D-\u1B7F\u1BF4-\u1BFB\u1C38-\u1C3A\u1C4A-\u1C4C\u1C80-\u1CBF\u1CC8-\u1CCF\u1CF7-\u1CFF\u1DE7-\u1DFB\u1F16\u1F17\u1F1E\u1F1F\u1F46\u1F47\u1F4E\u1F4F\u1F58\u1F5A\u1F5C\u1F5E\u1F7E\u1F7F\u1FB5\u1FC5\u1FD4\u1FD5\u1FDC\u1FF0\u1FF1\u1FF5\u1FFF\u200B-\u200F\u202A-\u202E\u2060-\u206F\u2072\u2073\u208F\u209D-\u209F\u20BB-\u20CF\u20F1-\u20FF\u218A-\u218F\u23F4-\u23FF\u2427-\u243F\u244B-\u245F\u2700\u2B4D-\u2B4F\u2B5A-\u2BFF\u2C2F\u2C5F\u2CF4-\u2CF8\u2D26\u2D28-\u2D2C\u2D2E\u2D2F\u2D68-\u2D6E\u2D71-\u2D7E\u2D97-\u2D9F\u2DA7\u2DAF\u2DB7\u2DBF\u2DC7\u2DCF\u2DD7\u2DDF\u2E3C-\u2E7F\u2E9A\u2EF4-\u2EFF\u2FD6-\u2FEF\u2FFC-\u2FFF\u3040\u3097\u3098\u3100-\u3104\u312E-\u3130\u318F\u31BB-\u31BF\u31E4-\u31EF\u321F\u32FF\u4DB6-\u4DBF\u9FCD-\u9FFF\uA48D-\uA48F\uA4C7-\uA4CF\uA62C-\uA63F\uA698-\uA69E\uA6F8-\uA6FF\uA78F\uA794-\uA79F\uA7AB-\uA7F7\uA82C-\uA82F\uA83A-\uA83F\uA878-\uA87F\uA8C5-\uA8CD\uA8DA-\uA8DF\uA8FC-\uA8FF\uA954-\uA95E\uA97D-\uA97F\uA9CE\uA9DA-\uA9DD\uA9E0-\uA9FF\uAA37-\uAA3F\uAA4E\uAA4F\uAA5A\uAA5B\uAA7C-\uAA7F\uAAC3-\uAADA\uAAF7-\uAB00\uAB07\uAB08\uAB0F\uAB10\uAB17-\uAB1F\uAB27\uAB2F-\uABBF\uABEE\uABEF\uABFA-\uABFF\uD7A4-\uD7AF\uD7C7-\uD7CA\uD7FC-\uF8FF\uFA6E\uFA6F\uFADA-\uFAFF\uFB07-\uFB12\uFB18-\uFB1C\uFB37\uFB3D\uFB3F\uFB42\uFB45\uFBC2-\uFBD2\uFD40-\uFD4F\uFD90\uFD91\uFDC8-\uFDEF\uFDFE\uFDFF\uFE1A-\uFE1F\uFE27-\uFE2F\uFE53\uFE67\uFE6C-\uFE6F\uFE75\uFEFD-\uFF00\uFFBF-\uFFC1\uFFC8\uFFC9\uFFD0\uFFD1\uFFD8\uFFD9\uFFDD-\uFFDF\uFFE7\uFFEF-\uFFFB\uFFFE\uFFFF]/g;
  		var c = $(INPUT_LATEX).text().replace(invisible, "").trim();
  		$(INPUT_LATEX).html(c);

  	}, 0.1);
  });

  $(RESET_BTN).click(function(){
    $(OUTPUT_PANEL).hide(100);
    $(INPUT_PANEL).switchClass( "col-xs-6", "col-xs-12", 300, "easeInOutQuad" );
    $(INPUT_LATEX).empty();
    $(INPUT_LATEX).attr('contentEditable', 'true');
    $(CITE_BTN).text("Cite it!");
    $(this).hide(100);
  });

  // executes when HTML-Document is loaded and DOM is ready
  //$('#test').html(parse(formats.find("FootStyle"), c));
  $(CITE_BTN).click(function(){
    console.log("GENERATING CITATIIONS");
    $(CITE_BTN).prop('disabled', true);
    $('html').addClass('wait');
    processTextarea(INPUT_LATEX);
  });


  $('.modal-btn').click(function(){
    $('#modalTitle').html($(this).attr('title'));
    $('.modal-section').hide();
    $('.modal-section#' + $(this).attr('div-target')).show();
    $('#myModal').modal();
  });

  
  
  $("a.download-btn").attr('href','data:application/octet-stream;base64,')
  .attr("download", "pubtex_bibtex.txt");
  $("a.download-btn").click(function(){
      t = $(this).parents('.form-group').find('.content').text();
      f = $(this).attr('file-name');
      $(this)
  });


}); 

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
  var regex = /[^a-zA-Z0-9!@%*\)\(+=._\s-]+/g;
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
  type = bs.attr('type');

  var re = new RegExp(left + "\\d{3,10}([\\,\\;]\\s*\\d{3,10})*" + right, "g");

  // Get html, replace &nbsp;

  invisible = /[\x7F-\x9F\xAD\u0378\u0379\u037F-\u0383\u038B\u038D\u03A2\u0528-\u0530\u0557\u0558\u0560\u0588\u058B-\u058E\u0590\u05C8-\u05CF\u05EB-\u05EF\u05F5-\u0605\u061C\u061D\u06DD\u070E\u070F\u074B\u074C\u07B2-\u07BF\u07FB-\u07FF\u082E\u082F\u083F\u085C\u085D\u085F-\u089F\u08A1\u08AD-\u08E3\u08FF\u0978\u0980\u0984\u098D\u098E\u0991\u0992\u09A9\u09B1\u09B3-\u09B5\u09BA\u09BB\u09C5\u09C6\u09C9\u09CA\u09CF-\u09D6\u09D8-\u09DB\u09DE\u09E4\u09E5\u09FC-\u0A00\u0A04\u0A0B-\u0A0E\u0A11\u0A12\u0A29\u0A31\u0A34\u0A37\u0A3A\u0A3B\u0A3D\u0A43-\u0A46\u0A49\u0A4A\u0A4E-\u0A50\u0A52-\u0A58\u0A5D\u0A5F-\u0A65\u0A76-\u0A80\u0A84\u0A8E\u0A92\u0AA9\u0AB1\u0AB4\u0ABA\u0ABB\u0AC6\u0ACA\u0ACE\u0ACF\u0AD1-\u0ADF\u0AE4\u0AE5\u0AF2-\u0B00\u0B04\u0B0D\u0B0E\u0B11\u0B12\u0B29\u0B31\u0B34\u0B3A\u0B3B\u0B45\u0B46\u0B49\u0B4A\u0B4E-\u0B55\u0B58-\u0B5B\u0B5E\u0B64\u0B65\u0B78-\u0B81\u0B84\u0B8B-\u0B8D\u0B91\u0B96-\u0B98\u0B9B\u0B9D\u0BA0-\u0BA2\u0BA5-\u0BA7\u0BAB-\u0BAD\u0BBA-\u0BBD\u0BC3-\u0BC5\u0BC9\u0BCE\u0BCF\u0BD1-\u0BD6\u0BD8-\u0BE5\u0BFB-\u0C00\u0C04\u0C0D\u0C11\u0C29\u0C34\u0C3A-\u0C3C\u0C45\u0C49\u0C4E-\u0C54\u0C57\u0C5A-\u0C5F\u0C64\u0C65\u0C70-\u0C77\u0C80\u0C81\u0C84\u0C8D\u0C91\u0CA9\u0CB4\u0CBA\u0CBB\u0CC5\u0CC9\u0CCE-\u0CD4\u0CD7-\u0CDD\u0CDF\u0CE4\u0CE5\u0CF0\u0CF3-\u0D01\u0D04\u0D0D\u0D11\u0D3B\u0D3C\u0D45\u0D49\u0D4F-\u0D56\u0D58-\u0D5F\u0D64\u0D65\u0D76-\u0D78\u0D80\u0D81\u0D84\u0D97-\u0D99\u0DB2\u0DBC\u0DBE\u0DBF\u0DC7-\u0DC9\u0DCB-\u0DCE\u0DD5\u0DD7\u0DE0-\u0DF1\u0DF5-\u0E00\u0E3B-\u0E3E\u0E5C-\u0E80\u0E83\u0E85\u0E86\u0E89\u0E8B\u0E8C\u0E8E-\u0E93\u0E98\u0EA0\u0EA4\u0EA6\u0EA8\u0EA9\u0EAC\u0EBA\u0EBE\u0EBF\u0EC5\u0EC7\u0ECE\u0ECF\u0EDA\u0EDB\u0EE0-\u0EFF\u0F48\u0F6D-\u0F70\u0F98\u0FBD\u0FCD\u0FDB-\u0FFF\u10C6\u10C8-\u10CC\u10CE\u10CF\u1249\u124E\u124F\u1257\u1259\u125E\u125F\u1289\u128E\u128F\u12B1\u12B6\u12B7\u12BF\u12C1\u12C6\u12C7\u12D7\u1311\u1316\u1317\u135B\u135C\u137D-\u137F\u139A-\u139F\u13F5-\u13FF\u169D-\u169F\u16F1-\u16FF\u170D\u1715-\u171F\u1737-\u173F\u1754-\u175F\u176D\u1771\u1774-\u177F\u17DE\u17DF\u17EA-\u17EF\u17FA-\u17FF\u180F\u181A-\u181F\u1878-\u187F\u18AB-\u18AF\u18F6-\u18FF\u191D-\u191F\u192C-\u192F\u193C-\u193F\u1941-\u1943\u196E\u196F\u1975-\u197F\u19AC-\u19AF\u19CA-\u19CF\u19DB-\u19DD\u1A1C\u1A1D\u1A5F\u1A7D\u1A7E\u1A8A-\u1A8F\u1A9A-\u1A9F\u1AAE-\u1AFF\u1B4C-\u1B4F\u1B7D-\u1B7F\u1BF4-\u1BFB\u1C38-\u1C3A\u1C4A-\u1C4C\u1C80-\u1CBF\u1CC8-\u1CCF\u1CF7-\u1CFF\u1DE7-\u1DFB\u1F16\u1F17\u1F1E\u1F1F\u1F46\u1F47\u1F4E\u1F4F\u1F58\u1F5A\u1F5C\u1F5E\u1F7E\u1F7F\u1FB5\u1FC5\u1FD4\u1FD5\u1FDC\u1FF0\u1FF1\u1FF5\u1FFF\u200B-\u200F\u202A-\u202E\u2060-\u206F\u2072\u2073\u208F\u209D-\u209F\u20BB-\u20CF\u20F1-\u20FF\u218A-\u218F\u23F4-\u23FF\u2427-\u243F\u244B-\u245F\u2700\u2B4D-\u2B4F\u2B5A-\u2BFF\u2C2F\u2C5F\u2CF4-\u2CF8\u2D26\u2D28-\u2D2C\u2D2E\u2D2F\u2D68-\u2D6E\u2D71-\u2D7E\u2D97-\u2D9F\u2DA7\u2DAF\u2DB7\u2DBF\u2DC7\u2DCF\u2DD7\u2DDF\u2E3C-\u2E7F\u2E9A\u2EF4-\u2EFF\u2FD6-\u2FEF\u2FFC-\u2FFF\u3040\u3097\u3098\u3100-\u3104\u312E-\u3130\u318F\u31BB-\u31BF\u31E4-\u31EF\u321F\u32FF\u4DB6-\u4DBF\u9FCD-\u9FFF\uA48D-\uA48F\uA4C7-\uA4CF\uA62C-\uA63F\uA698-\uA69E\uA6F8-\uA6FF\uA78F\uA794-\uA79F\uA7AB-\uA7F7\uA82C-\uA82F\uA83A-\uA83F\uA878-\uA87F\uA8C5-\uA8CD\uA8DA-\uA8DF\uA8FC-\uA8FF\uA954-\uA95E\uA97D-\uA97F\uA9CE\uA9DA-\uA9DD\uA9E0-\uA9FF\uAA37-\uAA3F\uAA4E\uAA4F\uAA5A\uAA5B\uAA7C-\uAA7F\uAAC3-\uAADA\uAAF7-\uAB00\uAB07\uAB08\uAB0F\uAB10\uAB17-\uAB1F\uAB27\uAB2F-\uABBF\uABEE\uABEF\uABFA-\uABFF\uD7A4-\uD7AF\uD7C7-\uD7CA\uD7FC-\uF8FF\uFA6E\uFA6F\uFADA-\uFAFF\uFB07-\uFB12\uFB18-\uFB1C\uFB37\uFB3D\uFB3F\uFB42\uFB45\uFBC2-\uFBD2\uFD40-\uFD4F\uFD90\uFD91\uFDC8-\uFDEF\uFDFE\uFDFF\uFE1A-\uFE1F\uFE27-\uFE2F\uFE53\uFE67\uFE6C-\uFE6F\uFE75\uFEFD-\uFF00\uFFBF-\uFFC1\uFFC8\uFFC9\uFFD0\uFFD1\uFFD8\uFFD9\uFFDD-\uFFDF\uFFE7\uFFEF-\uFFFB\uFFFE\uFFFF]/g;
  var c = $(id).text().replace(invisible, "");
  $(id).html(c);

  c = $(id).text();
  //c = c.replace(/(\r\n|\n|\r)/gm,"");
  
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

  z = unique(z);

  if(z.length > MAX_IDS){
    console.log("Too many pubmed IDs!");
    setStatus({error:"Oops! You can't have more than "+ MAX_IDS + " pubmed IDs!"});
    doneProcessing(-1);
    return;
  }

  $(SPINNER).show();

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
    