"use strict";




window.onload = function() {

   var shapeType = document.getElementById("shapeType");
   var sizeKey = document.getElementById("sizeKey");
   var sizeP = document.getElementById("sizeP");
   var sizeKeyword = document.getElementById("sizeKeyword");
   var hsizePerc = document.getElementById("hsizePerc"); 
   var vsizePerc = document.getElementById("vsizePerc");    
   var posKey = document.getElementById("posKey");
   var posP = document.getElementById("posP");
   var hKeyword = document.getElementById("hKeyword");
   var vKeyword = document.getElementById("vKeyword");
   var hPos = document.getElementById("hPos");
   var vPos = document.getElementById("vPos");   
    
   var outcomebox = document.getElementById("outcomebox");
   
   shapeType.onchange = applyRad;
   sizeKey.onclick = applyRad;
   sizeP.onclick = applyRad; 
   posKey.onclick = applyRad;  
   posP.onclick = applyRad;
   sizeKeyword.onchange = applyRad;
   hsizePerc.onchange = applyRad;
   vsizePerc.onchange = applyRad;   
   hKeyword.onchange = applyRad;
   vKeyword.onchange = applyRad;
   hPos.onchange = applyRad;
   vPos.onchange = applyRad;  
   

   var stopOptions = document.getElementsByClassName("stopOption");
   stopOptions[0].children[1].onchange = applyRad;
   stopOptions[0].children[3].onchange = applyRad;
   stopOptions[0].children[6].onchange = applyRad; 
   stopOptions[0].children[8].onclick = removeStop;
   stopOptions[1].children[1].onchange = applyRad;
   stopOptions[1].children[3].onchange = applyRad;
   stopOptions[1].children[6].onchange = applyRad; 
   stopOptions[1].children[8].onclick = removeStop; 
   stopOptions[2].children[1].onchange = applyRad;
   stopOptions[2].children[3].onchange = applyRad;
   stopOptions[2].children[6].onchange = applyRad; 
   stopOptions[2].children[8].onclick = removeStop;   
   
   applyRad();
    

   document.getElementById("addStop").onclick = function() {
      var newOption = stopOptions[stopOptions.length-1].cloneNode(true);
      newOption.children[1].onchange = applyRad;
      newOption.children[3].onchange = applyRad;
      newOption.children[6].onchange = applyRad; 
      newOption.children[8].onclick = removeStop;      
      stopOptions[0].parentElement.insertBefore(newOption, stopOptions[0].parentElement.lastElementChild);
   };
   
   function applyRad(e) {
      var radString = "repeating-radial-gradient(";
      var radString2 = "";
      
      if (e !== undefined) {
         if (e.target.id === "sizeKeyword") {
            sizeKey.checked = true;
         }
         if (e.target.id === "hsizePerc") {
            sizeP.checked = true;
         }
         if (e.target.id === "vsizePerc") {
            sizeP.checked = true;
         }         
         if ((e.target.id === "hKeyword")||(e.target.id === "vKeyword")) {
            posKey.checked = true;
         }  
         if ((e.target.id === "hPos")||(e.target.id === "vPos")) {
            posP.checked = true;
         }          
      }
      
      radString += shapeType.options[shapeType.selectedIndex].value;
      radString2 += shapeType.options[shapeType.selectedIndex].value;
      
      if ((shapeType.selectedIndex === 0) && ((sizeKey.checked && sizeKeyword.selectedIndex === 0) || (sizeP.checked && hsizePerc.value === "0" && vsizePerc.value === "0")) && (posKey.checked && hKeyword.selectedIndex === 0 && vKeyword.selectedIndex === 0)) {
      } else {
         if (((sizeKey.checked && sizeKeyword.selectedIndex === 0) || (sizeP.checked && hsizePerc.value === "0" && vsizePerc.value === "0")) && (posKey.checked && hKeyword.selectedIndex === 0 && vKeyword.selectedIndex === 0)) {
            radString += ",";
            radString2 += ", <br />";
         } else {
            if (sizeKey.checked) {
               if (sizeKeyword.selectedIndex !== 0) {
                  radString += " " + sizeKeyword.options[sizeKeyword.selectedIndex].value + " ";
                  radString2 += " " + sizeKeyword.options[sizeKeyword.selectedIndex].value + " ";
               }
            } else {
               var hSize = (hsizePerc.value === "0" ? "" : hsizePerc.value + "px ");
               var vSize = (vsizePerc.value === "0" ? "" : vsizePerc.value + "px ");
               radString += " " + hSize + " " + vSize + " ";
               radString2 += " " + hSize + " " + vSize + " ";
            }

            if (posKey.checked && hKeyword.selectedIndex === 0 && vKeyword.selectedIndex === 0) {
               radString += ",";
               radString2 += ", <br />";
            } else {
               if (posKey.checked) {
                  if ((hKeyword.selectedIndex !== 0) || (vKeyword.selectedIndex !==0)) {
                     radString += " at " + hKeyword.options[hKeyword.selectedIndex].value + " " + vKeyword.options[vKeyword.selectedIndex].value + ", ";
                     radString2 += " at " + hKeyword.options[hKeyword.selectedIndex].value + " " + vKeyword.options[vKeyword.selectedIndex].value + ",<br />";
                  }
               } else {
                     radString += " at " + hPos.value + "% " + vPos.value + "%, ";
                     radString2 += "  at " + hPos.value + "% " + vPos.value + "%, <br />";
               }
            }
         }
      }
      
      for (var i = 0; i < stopOptions.length; i++) {
         radString += hexToRGB(stopOptions[i].children[1].value, stopOptions[i].children[3].value); 
         radString2 += hexToRGB(stopOptions[i].children[1].value, stopOptions[i].children[3].value);          
         if (stopOptions[i].children[6].value !== "0") {
            radString += " " + stopOptions[i].children[6].value + "%";
            radString2 += " " + stopOptions[i].children[6].value + "%";            
         }       
         if (i < stopOptions.length-1) {
            radString += ", ";
            radString2 += ", <br />";            
         } else {
            radString += ")";
            radString2 += " );";            
         } 
      }

      outcomebox.style.background = radString;
      document.getElementById("gVal").innerHTML = radString2;
      
   }
   
   function removeStop(e) {
      var deadOption = e.target.parentElement;
      stopOptions[0].parentNode.removeChild(deadOption);
      applyRad();
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