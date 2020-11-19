"use strict";




window.onload = function() {

   var imgSizeH = document.getElementById("imgSizeH");
   var imgSizeV = document.getElementById("imgSizeV");
   var imgRepeat = document.getElementById("imgRepeat");
   var keywordOpt = document.getElementById("keywordOpt");
   var degreeOpt = document.getElementById("degreeOpt");
   var directionKeyword = document.getElementById("directionKeyword");
   var directionDegree = document.getElementById("directionDegree");
    
   var outcomebox = document.getElementById("outcomebox");
   
   imgSizeH.onchange = applyGrad;
   imgSizeV.onchange = applyGrad;
   imgRepeat.onchange = applyGrad;
   keywordOpt.onclick = applyGrad;
   degreeOpt.onclick = applyGrad;
   directionKeyword.onchange = applyGrad;
   directionDegree.onchange = applyGrad;
   

   var stopOptions = document.getElementsByClassName("stopOption");
   stopOptions[0].children[1].onchange = applyGrad;
   stopOptions[0].children[3].onchange = applyGrad;
   stopOptions[0].children[6].onchange = applyGrad; 
   stopOptions[0].children[8].onclick = removeStop;
   stopOptions[1].children[1].onchange = applyGrad;
   stopOptions[1].children[3].onchange = applyGrad;
   stopOptions[1].children[6].onchange = applyGrad; 
   stopOptions[1].children[8].onclick = removeStop; 
   stopOptions[2].children[1].onchange = applyGrad;
   stopOptions[2].children[3].onchange = applyGrad;
   stopOptions[2].children[6].onchange = applyGrad; 
   stopOptions[2].children[8].onclick = removeStop;    
   
   applyGrad();
    

   document.getElementById("addStop").onclick = function() {
      var newOption = stopOptions[stopOptions.length-1].cloneNode(true);
      newOption.children[1].onchange = applyGrad;
      newOption.children[3].onchange = applyGrad;
      newOption.children[6].onchange = applyGrad; 
      newOption.children[8].onclick = removeStop;      
      stopOptions[0].parentElement.insertBefore(newOption, stopOptions[0].parentElement.lastElementChild);
   };
   
   function applyGrad(e) {
      var gradString = "linear-gradient(";
      var gradString2 = "";
      
      if (e !== undefined) {
         if (e.target.id === "directionKeyword") {
            keywordOpt.checked = true;
         }
         if (e.target.id === "directionDegree") {
            degreeOpt.checked = true;
         }
      }
      
      if (keywordOpt.checked) {
         if (directionKeyword.selectedIndex !== 0) {
            gradString += "to " + directionKeyword.options[directionKeyword.selectedIndex].value + ", ";
            gradString2 += "to " + directionKeyword.options[directionKeyword.selectedIndex].value + ", <br />";
         }
      } else {
         gradString += directionDegree.value + "deg, ";
         gradString2 += directionDegree.value + "deg, <br />";
      }

      for (var i = 0; i < stopOptions.length; i++) {
         gradString += hexToRGB(stopOptions[i].children[1].value, stopOptions[i].children[3].value); 
         gradString2 += hexToRGB(stopOptions[i].children[1].value, stopOptions[i].children[3].value);          
         if (stopOptions[i].children[6].value !== "0") {
            gradString += " " + stopOptions[i].children[6].value + "%";
            gradString2 += " " + stopOptions[i].children[6].value + "%";            
         }       
         if (i < stopOptions.length-1) {
            gradString += ", ";
            gradString2 += ", <br />";            
         } else {
            gradString += ")";
            gradString2 += " );";            
         } 
      }

      outcomebox.style.backgroundImage = gradString;
      outcomebox.style.backgroundSize = imgSizeH.value + "% " + imgSizeV.value + "%";
      outcomebox.style.backgroundRepeat = imgRepeat.options[imgRepeat.selectedIndex].value;
      document.getElementById("sVal").innerHTML = imgSizeH.value + "% " + imgSizeV.value + "%;";
      document.getElementById("rVal").innerHTML = imgRepeat.options[imgRepeat.selectedIndex].value + ";";
      document.getElementById("gVal").innerHTML = gradString2;
      
   }
   
   function removeStop(e) {
      var deadOption = e.target.parentElement;
      stopOptions[0].parentNode.removeChild(deadOption);
      applyGrad();
   }
   
   function hexToRGB(hexc, alpha){
    var h = "0123456789ABCDEF";
    var hex = hexc.toUpperCase();
    var r = h.indexOf(hex[1])*16+h.indexOf(hex[2]);
    var g = h.indexOf(hex[3])*16+h.indexOf(hex[4]);
    var b = h.indexOf(hex[5])*16+h.indexOf(hex[6]);
    if (alpha==="1") {
      return "rgb("+r+", "+g+", "+b+")";
    } else {
      return "rgba("+r+", "+g+", "+b+","+alpha+")"; 
    }
   }   
};