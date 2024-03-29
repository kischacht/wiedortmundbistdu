/* Endergebnis einblenden, wenn alle Fragen beantwortet sind */
done = function(){
  console.log(user_percent, user_maxpercent, user_answers, Math.round(1.23456));
  $score = $('#score');
  $notyet = $('#notyet');
  $done = $('#done');
  if(!($results1.hasClass('hide')) && !($results2.hasClass('hide')) &&
     !($results3.hasClass('hide')) && !($results4.hasClass('hide')) &&
     !($results5.hasClass('hide')) && !($results6.hasClass('hide')) ) {
    /* zusammenfassung berechnen: gewichtetes mittel der prozentangaben */
    base_sum = 0;
    for(var i = 0; i < user_base.length; i++){ if(user_answers[i] !== "NA") base_sum += user_base[i] }
    summary = 0;
    //user_percent/user_maxpercent = anteil von 100, der erreicht wurde pro frage
    //gewichtung der fragen:
    for(var i = 0; i < user_percent.length; i++){ if(user_answers[i] !== "NA") summary += Math.round((user_percent[i]/user_maxpercent[i])*10)}
    //summary = summary / base_sum;
    /* ergebnis und zugehörigen spruch einblenden */
    $("#endscore").html(Math.round(summary) + '/100').hide().fadeIn();
    if(Math.round(summary)>=0 && Math.round(summary)<=33) { $('#score_low').removeClass("hide").hide().fadeIn(); };
    if(Math.round(summary)>33 && Math.round(summary)<=66) { $('#score_middle').removeClass("hide").hide().fadeIn(); };
    if(Math.round(summary)>66 && Math.round(summary)<=100) { $('#score_high').removeClass("hide").hide().fadeIn(); };
    /* text für die social media shares generieren */
    $("#twitter-result").attr("href",
      "https://twitter.com/intent/tweet?source=https%3A%2F%2Fkischacht.github.io%2Fwiedortmundbistdu%2F&" +
      "text=Ich%20bin%20zu%20"+ Math.round(summary) +
      "%20Prozent%20ein%20typischer%20Dortmunder%20%E2%80%93%20und%20du?%20https%3A%2F%2Fkischacht.github.io%2Fwiedortmundbistdu%2F");
    $("#mail-result").attr("href",
      "mailto:?&subject=Wie Dortmund bist du?&body=Ich%20bin%20zu%20"+ Math.round(summary) + 
      "%20Prozent%20ein%20typischer%20Dortmunder%20%E2%80%93%20und%20du?%0Ahttps%3A%2F%2Fkischacht.github.io%2Fwiedortmundbistdu%2F")
    $notyet.fadeOut("slow", function(){
      $done.removeClass("hide").hide().fadeIn();
      $('#okscore').addClass('underlay').hide().fadeIn();
    });
  }
}

/* buttons gedrückt lassen */
$(".btn-group > .btn").click(function(){
    $(this).addClass("active").siblings().removeClass("active");
});


/* score für gesamtpuntzahl initialisieren */
//answers: antwort string; user_percent: prozentscore der antwort
user_answers = []; user_percent = [];
user_base = [463,463,248,286,413,400,144,188,191,107];
user_maxpercent = [55.2526695087805,36.334019949665,78.4331177923922,30.616767078222,42.4645241070739,33.3917386482494,49.0196559550938,70.1401883668068,23.586283153156,50.1530591272287];

/* Block 1: Demographie */

/*Geschlecht*/
var geschlecht;
$('#w,#m,#geschlechtNA').on("click", function () {
    if (this.id == 'w')       {geschlecht ="weiblich"}
    else if (this.id == 'm')  {geschlecht ="männlich"}
    else if (this.id == 'geschlechtNA') {geschlecht = "NA"}
});

/*Alter*/
var alter;
$('#alter1,#alter2,#alter3,#alter4,#alterNA').on("click", function () {
    if (this.id == 'alter1')      {alter ="18-29 Jahre"}
    else if (this.id == 'alter2') {alter="30-44 Jahre"}
    else if (this.id == 'alter3') {alter="45-54 Jahre"}
    else if (this.id == 'alter4') {alter="55 Jahre und älter"}
    else if (this.id == 'alterNA') {alter= "NA"}
});

/*Sexuelle Orientierung*/
var so;
$("input[name='sexuality']").on("click", function(){
  so = $("input[name='sexuality']:checked").val()
})


/*Religion*/
var religion;
$("input[name='religion']").on("click", function(){
 religion = $("input[name='religion']:checked").val()
})

/*Schulabschluss*/
var schulabschluss;
$("input[name='schulabschluss']").on("click", function(){
  schulabschluss = $("input[name='schulabschluss']:checked").val()
})

var summary1;
var $block1 = $('#block1');
var $abschicken1 = $("#abschicken1");
var $frage1 = $("#frage1");
var $results1 = $("#results1");
var $antwort1 = $("#antwort1");
var $ok1 = $("#ok1");


$abschicken1.on("click", function() {

  dem = [geschlecht,alter,so,religion,schulabschluss];
  varnames = ["Geschlecht","Alter","Sexuelle Orientierung","Glaube","Schulabschluss"];
  /* checken, ob alles beantwortet wurde */
  okay=true;
  for(var i=0;i<dem.length;i++){if(dem[i] === undefined) okay=false};
  if(okay) {
    /* Prozentangaben und Anzahl Antworter suchen, als Array speichern */
    var dem_perc = []; dem_base = [];
    for(var j = 0; j < dem.length; j++){
      // Antworten des Users für den finalen Array speichern
      user_answers[j] = dem[j];
      // wenn keine Antwort gegeben wurde, NA speichern
      if(dem[j] == "NA"){
        dem_perc.push("NA"); dem_base.push("NA"); user_percent[j] = "NA";
      }
      // ansonsten: daten-array durchgehen, percent und base der gegebenen antwort speichern
      else{
       for(var i = 0; i < data.length; i++){
        if(data[i].answer === dem[j] && data[i].variable === varnames[j]){
         dem_perc.push(data[i].target_percent);
         dem_base.push(data[i].target_base);
         //für endscore prozent der gegebenen antwort speichern:
         user_percent[j] = data[i].target_percent;
        }
       }
      };
    };
    /* zusammenfassung berechnen: gewichtetes mittel der prozentangaben */
    dem_base_sum = 0;
    for(var i = 0; i < dem.length; i++){ if(dem[i] !== "NA") dem_base_sum += dem_base[i] }
    summary1 = 0;
    for(var i = 0; i < dem.length; i++){ if(dem[i] !== "NA") summary1 += dem_perc[i]*dem_base[i] }
    summary1 = summary1 / dem_base_sum
    /* html für den Antwortsatz */
    antwort1_content = "<p>Im Durchschnitt teilen <strong>" + Math.round(summary1*10)/10 +"%</strong> der befragten Dortmunder deine demographischen Merkmale.</p>";
    $antwort1.html(antwort1_content);
    $("#antwort11").html(
      "<p>Geschlecht:<strong><br>" + Math.round(dem_perc[0]*10)/10 + "%</strong> " + dem[0]);// + "<br>"<strong style='font-size:70%;'>("+Math.round((dem_perc[0] / 55.2526695087805)*10) + "/10 Punkte)</strong>
    if(dem[0]=="NA") $("#antwort11").html("<p>Geschlecht:<br><strong>keine Daten vorhanden</strong>");
    $("#antwort12").html(
      "<p>Alter:<strong><br>" + Math.round(dem_perc[1]*10)/10 + "%</strong> " + dem[1]);//  + "<br>"<strong style='font-size:70%;'>("+Math.round((dem_perc[1] / 36.334019949665)*10) + "/10 Punkte)</strong>
    if(dem[1]=="NA") $("#antwort12").html("<p>Alter:<br><strong>keine Daten vorhanden</strong>");
    $("#antwort14").html(
      "<p>Sexualität:<br><strong>" + Math.round(dem_perc[2]*10)/10 + "%</strong> " + dem[2]); // + "<br><strong style='font-size:70%;'>("+Math.round((dem_perc[2] / 78.4331177923922)*10) + "/10 Punkte)</strong>"
    $("#antwort15").html(
      "<p>Schulabschluss:<br><strong>" + Math.round(dem_perc[4]*10)/10 + "%</strong> " + dem[4]); // + "<br><strong style='font-size:70%;'>("+Math.round((dem_perc[4] / 42.4645241070739)*10) + "/10 Punkte)</strong>"
    $("#antwort16").html(
      "<p>Glaube:<br><strong>" + Math.round(dem_perc[3]*10)/10 + "%</strong> " + dem[3]); // + "<br><strong style='font-size:70%;'>("+Math.round((dem_perc[3] / 30.616767078222)*10) + "/10 Punkte)</strong>"
    $('html, body').animate({
      scrollTop: ($block1.offset().top)
    },500);
   	$frage1.fadeOut("slow", function(){
      /* mit klassen und ids gucken, dass die results eingeblendet werden*/
    $results1.removeClass("hide").hide().fadeIn();
    $("#chart11").highcharts().reflow(); $("#chart12").highcharts().reflow();
    $("#chart14").highcharts().reflow(); $("#chart15").highcharts().reflow();
    $("#chart16").highcharts().reflow();
    $ok1.css('visibility','visible').hide().fadeIn();
    done();
    });
  }
  else {
    $("#alert1").removeClass("hide").hide().fadeIn('slow');
  }
});


/* Block 2: Parteineigung */

//vergleichswerte
var partei = null;
var partei_perc = null;
$("input[name='partei']").on("click", function(){
 partei = $("input[name='partei']:checked").val();
 for(var i = 0; i < data.length; i++) {
  if(data[i].answer === partei && data[i].variable === "Parteineigung"){
      partei_perc = data[i].target_percent;
  }
};
})

var $block2 = $("#block2");
var $abschicken2 = $("#abschicken2");
var $frage2 = $("#frage2");
var $results2 = $("#results2");
var $antwort2 = $("#antwort2");
var $ok2 = $("#ok2");

$abschicken2.on("click", function() {
  if(partei !== null) {
    user_answers[5] = partei; user_percent[5]=partei_perc;
    $antwort2.html("<p>Etwa <strong>" + Math.round(partei_perc*10)/10 + "%</strong> der Dortmunder neigen auch <strong>" +
      partei + "</strong> zu.</p>");
    if(partei == "Ich neige keiner Partei zu"){
      $antwort2.html("<p>Etwa <strong>" + Math.round(partei_perc*10)/10 + "%</strong> der Dortmunder haben auch angegeben: <strong>" + partei + "</strong>.</p>");
    }
    $('html, body').animate({
      scrollTop: ($block2.offset().top)
    },500);
    $frage2.fadeOut("slow", function(){
    $results2.removeClass("hide").hide().fadeIn();
    $("#chart2").highcharts().reflow();
    $ok2.css('visibility','visible').hide().fadeIn();
    //$("#p2").append(' <span>('+Math.round((partei_perc / 33.3917386482494)*10) + '/10 Punkte)</span>').hide().fadeIn();
    done();
    });
  }
  else {
    $("#alert2").removeClass("hide").hide().fadeIn('slow');
  }
});

/* Block 3: Biermarke */

/* Checkbox Limit auf 3 setzen */
$("input[name='bier'][type='checkbox']").on("click", function(){
 $("input[name='bier'][type='radio']:checked").removeAttr('checked');
 if($("input[name='bier'][type='checkbox']:checked").length > 3){
  this.checked=false;
 }
})
$("input[name='bier'][type='radio']").on("click", function(){
  $("input[name='bier'][type='checkbox']:checked").removeAttr('checked');
})

var $block3 = $("#block3");
var $abschicken3 = $("#abschicken3");
var $frage3 = $("#frage3");
var $results3 = $("#results3");
var $antwort3 = $("#antwort3");
var $ok3 = $("#ok3");

$abschicken3.on("click", function() {
  /* angeklickte werte einsammeln */
  bier = $("input[name='bier']:checked").map(function () {
    return this.value;
  }).get();
  /*prüfen, ob etwas angeklickt wurde*/
  if(bier.length > 0) {
    /* Prozentangabem für Input suchen, als Array speichern */
    var bier_perc = [];
    for(var j = 0; j < bier.length; j++){
      for(var i = 0; i < data.length; i++) {
       if(data[i].answer === bier[j] && data[i].variable === "Biersorten"){
           bier_perc[j] = data[i].target_percent;
       }
      };
    };
    /* durchschnitt der prozentsätze */
    let biersum = 0;
    for(var i = 0; i < bier_perc.length; i++) {
        if(bier_perc[i] == Math.max.apply(null, bier_perc)) bier_max = bier[i];
    };
    if(bier.length > 1){ biername = [bier.slice(0,bier.length-1).join("</strong>, <strong>"),bier[bier.length-1]].join("</strong> und <strong>") };
    if(bier.length == 1) {biername = bier};
    user_percent[6] = Math.max.apply(null, bier_perc);
    user_answers[6] = biername;
    /* html für den Antwortsatz */
    antwort3_content = "<p>Du trinkst des Öfteren <strong>" + biername +
                       ( bier.length > 1 ?  "</strong>.<br> Am beliebtesten ist davon <strong>" + bier_max : "" ) +
                       "</strong>. Dieses Bier trinken etwa <strong>" +
                       Math.round((Math.max.apply(null, bier_perc))*10)/10 + "%</strong> der Dortmunder ebenfalls häufig.</p>";
    if(bier == "keine Angabe" || bier == "weiß nicht" || bier == "trifft nicht zu" || bier == "Sonstige Biersorten"){
      antwort3_content = "<p>Etwa <strong>" + Math.round((Math.max.apply(null, bier_perc))*10)/10 + "%</strong> der Dortmunder haben auch angegeben: <strong>" + bier + "</strong>.</p>";
    }
    $antwort3.html(antwort3_content);
    /*hochscrollen, results einblenden */
    $('html, body').animate({
      scrollTop: ($block3.offset().top)
    },500);
    $frage3.fadeOut("slow", function(){
    $results3.removeClass("hide").hide().fadeIn();
    $("#chart3").highcharts().reflow();
    $ok3.css('visibility','visible').hide().fadeIn();
    //$("#p3").append(' <span>('+Math.round(((Math.max.apply(null, bier_perc)) / 49.0196559550938)*10) + '/10 Punkte)</span>').hide().fadeIn();
    done();
    });
  }
  else {
    $("#alert3").removeClass("hide").hide().fadeIn('slow');
  }
});

/* Block 4: Fußballteam */

/* autocomplete */
/* array filtern */
fussballdata = $.grep(data, function (data) {
  return data.variable === "Fußballteam";
});
/* html zusammenfügen */
teams = [];
for(var i = 0; i < fussballdata.length; i++) {
    fussballdata[i] = fussballdata[i].answer;
    if(fussballdata[i] !== "keine Angabe" && fussballdata[i] !== "weiß nicht" && fussballdata[i] !== "Andere/kein Fußballfan"){
      teams.push("<option value='" + fussballdata[i] + "'>" + fussballdata[i] + "</option>")
    }
};
$("#block4_list").html(teams.join('\n'));

var $block4 = $("#block4");
var $abschicken4 = $("#abschicken4");
var $input4 = $("#input4");
var $frage4 = $("#frage4");
var $results4 = $("#results4");
var $antwort4 = $("#antwort4");
var $ok4 = $("#ok4");

$("input[name='fussball']").on("click", function(){
  $input4.val($("input[name='fussball']:checked").val());
})

$abschicken4.on("click", function() {
  if($input4.val() !== "" && fussballdata.indexOf($input4.val()) !== -1) {
    /* Prozentangabe für Input suchen */
    for(var i = 0; i < data.length; i++) {
     if(data[i].answer === $input4.val() && data[i].variable === "Fußballteam"){
         input4_perc = data[i].target_percent;
       }
     };
     user_answers[7] = $input4.val(); user_percent[7] = input4_perc;
     /* html für den Antwortsatz */
    antwort4_content = "<p>Etwa <strong>" + Math.round(input4_perc*10)/10 + "%</strong> der Dortmunder sind auch Fan von <strong>" + $input4.val() +"</strong>.</p>";
    if($input4.val() == "keine Angabe" || $input4.val() == "weiß nicht" || $input4.val() == "Andere/kein Fußballfan"){
      antwort4_content = "<p>Etwa <strong>" + Math.round(input4_perc*10)/10 + "%</strong> der Dortmunder haben auch angegeben: <strong>" + $input4.val() +"</strong>.</p>";
    }
    $antwort4.html(antwort4_content);
    /*hochscrollen, results einblenden */
    $('html, body').animate({
      scrollTop: ($block4.offset().top)
    },500);
    $frage4.fadeOut("slow", function(){
    $results4.removeClass("hide").hide().fadeIn();
    $("#chart4").highcharts().reflow();
    $ok4.css('visibility','visible').hide().fadeIn();
    //$("#p4").append(' <span>('+Math.round((input4_perc / 70.1401883668068)*10) + '/10 Punkte)</span>').hide().fadeIn();
    done();
    });
  }
  else {
    $("#alert4").removeClass("hide").hide().fadeIn('slow');
  }
});

/* Block 5: Automarke */

/* autocomplete */
/* array filtern */
autodata = $.grep(data, function (data) {
  return data.variable === "Automarke";
});
/* html zusammenfügen */
marken = [];
for(var i = 0; i < autodata.length; i++) {
    autodata[i] = autodata[i].answer;
    if(autodata[i] !== "keine Angabe" && autodata[i] !== "weiß nicht" &&
       autodata[i] !== "trifft nicht zu" && autodata[i] !== "Sonstige"){
      marken.push("<option value='" + autodata[i] + "'>" + autodata[i] + "</option>")
  }
};
$("#block5_list").html(marken.join('\n'));

var $block5 = $("#block5");
var $abschicken5 = $("#abschicken5");
var $input5 = $("#input5");
var $frage5 = $("#frage5");
var $results5 = $("#results5");
var $antwort5 = $("#antwort5");
var $ok5 = $("#ok5");

$("input[name='auto']").on("click", function(){
  $input5.val($("input[name='auto']:checked").val());
})

$abschicken5.on("click", function() {
  if($input5.val() !== "" && autodata.indexOf($input5.val()) !== -1) {
    /* Prozentangabe für Input suchen */
    for(var i = 0; i < data.length; i++) {
     if(data[i].answer === $input5.val() && data[i].variable === "Automarke"){
         input5_perc = data[i].target_percent;
       }
     };
     /* html für den Antwortsatz */
    antwort5_content = "<p>Etwa <strong>" + Math.round(input5_perc*10)/10 + "%</strong> der Dortmunder fahren auch hauptsächlich einen <strong>" + $input5.val() +"</strong>.</p>";
    if($input5.val() == "keine Angabe" || $input5.val() == "weiß nicht" || $input5.val() == "ich fahre kein Auto" || $input5.val() == "Sonstige"){
      antwort5_content = "<p>Etwa <strong>" + Math.round(input5_perc*10)/10 + "%</strong> der Dortmunder haben auch angegeben: <strong>" + $input5.val() +"</strong>.</p>";
    }
    user_answers[8] = $input5.val(); user_percent[8] = input5_perc;
    $antwort5.html(antwort5_content);
    /*hochscrollen, results einblenden */
    $('html, body').animate({
      scrollTop: ($block5.offset().top)
    },500);
    $frage5.fadeOut("slow", function(){
    $results5.removeClass("hide").hide().fadeIn();
    $("#chart5").highcharts().reflow();
    $ok5.css('visibility','visible').hide().fadeIn();
    //$("#p5").append(' <span>('+Math.round((input5_perc / 23.586283153156)*10) + '/10 Punkte)</span>').hide().fadeIn();
    done();
  });
  }
  else {
    $("#alert5").removeClass("hide").hide().fadeIn('slow');
  }
});

/* Block 6: Lieblingstier */

var hundkatze = null;
var hundkatze_perc = null;
$("input[name='hundkatze']").on("click", function(){
 hundkatze = $("input[name='hundkatze']:checked").val();
 for(var i = 0; i < data.length; i++) {
  if(data[i].answer === hundkatze && data[i].variable === "Hunde- oder Katzenfreund"){
      hundkatze_perc = data[i].target_percent;
  }
};
})

var $block6 = $("#block6")
var $abschicken6 = $("#abschicken6");
//var $input6 = $("#input6");
var $frage6 = $("#frage6");
var $results6 = $("#results6");
var $antwort6 = $("#antwort6");
var $ok6 = $("#ok6");

$abschicken6.on("click", function() {
  if(hundkatze !== null) {
    /* html für den Antwortsatz */
    user_answers[9] = hundkatze;user_percent[9] = hundkatze_perc;
    antwort6_content = "<p>Etwa <strong>" + Math.round(hundkatze_perc*10)/10 + "%</strong> der befragten Dortmunder bezeichnen sich auch als <strong>" + hundkatze + ".</strong></p>";
    if(hundkatze == "Weder noch" || hundkatze == "Weiß nicht/Keine Angabe"){
      antwort6_content = "<p>Etwa <strong>" + Math.round(hundkatze_perc*10)/10 + "%</strong> der befragten Dortmunder haben auch angegeben: <strong>" + hundkatze + ".</strong></p>";
    }
    $antwort6.html(antwort6_content);
    /*hochscrollen, results einblenden */
    $('html, body').animate({
      scrollTop: ($block6.offset().top)
    },500);
    $frage6.fadeOut("slow", function(){
    $results6.removeClass("hide").hide().fadeIn();
    $("#chart6").highcharts().reflow();
    $ok6.css('visibility','visible').hide().fadeIn();
    //$("#p6").append(' <span>('+Math.round((hundkatze_perc / 50.1530591272287)*10) + '/10 Punkte)</span>').hide().fadeIn();
    done();
    });
  }
  else {
    $("#alert6").removeClass("hide").hide().fadeIn('slow');
  }
});

// Get the modal
var modal = document.getElementById('myModal');
//Get the button that opens the modal
var btn = document.getElementById("info-btn");
//Get the link that opens the modal
var link = document.getElementById("info-link");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button or the link, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}
link.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}