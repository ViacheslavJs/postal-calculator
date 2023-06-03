
(function() {
'use strict'

// or button:
const BTN = document.getElementById('btn'); 
BTN.addEventListener('click', calc);
//
/*
// or auto calculation:
document.getElementById('length').addEventListener('input', calc);
document.getElementById('width').addEventListener('input', calc);
document.getElementById('height').addEventListener('input', calc);
document.getElementById('weight').addEventListener('input', calc);
document.getElementById('distance').addEventListener('input', calc);
*/

const LABEL_1 =  document.getElementsByClassName('pc-form__label')[0];
const LABEL_2 =  document.getElementsByClassName('pc-form__label')[1];
const LABEL_3 =  document.getElementsByClassName('pc-form__label')[2];
const LABEL_4 =  document.getElementsByClassName('pc-form__label')[3];
const LABEL_5 =  document.getElementsByClassName('pc-form__label')[4];

// TODO
LABEL_1.textContent = 'Package length, mm:';
LABEL_2.textContent = 'Packing width, mm:';
LABEL_3.textContent = 'Packing height, mm';
LABEL_4.textContent = 'Cargo weight, kg:';
LABEL_5.textContent = 'Distance, km';
        		    
function calc() {
   
  const resultDisplayControl = document.getElementById('res-out');
     			
  const INPUT_VALUE_1 = document.getElementById('length').value;
  const INPUT_VALUE_2 = document.getElementById('width').value;
  const INPUT_VALUE_3 = document.getElementById('height').value;
  const INPUT_VALUE_4 = document.getElementById('weight').value;
  const INPUT_VALUE_5 = document.getElementById('distance').value;
  //console.log(INPUT_VALUE_1);
  //console.log(typeof INPUT_VALUE_1);
      
  let param1 = Number(INPUT_VALUE_1);
  let param2 = Number(INPUT_VALUE_2);
  let param3 = Number(INPUT_VALUE_3);
  let param4 = Number(INPUT_VALUE_4);
  let param5 = Number(INPUT_VALUE_5);
  //console.log(isNaN(param1));
  //console.log(typeof param1);
  
  const INPUT_1 = document.getElementById('length');
  const INPUT_2 = document.getElementById('width');
  const INPUT_3 = document.getElementById('height');
  const INPUT_4 = document.getElementById('weight');
  const INPUT_5 = document.getElementById('distance');  
  //console.log(INPUT_1);
  //console.log(typeof INPUT_1);
  
  const TOOLTIP_1 = document.getElementsByClassName('pc-form__tooltip-text')[0];
  const TOOLTIP_2 = document.getElementsByClassName('pc-form__tooltip-text')[1];
  const TOOLTIP_3 = document.getElementsByClassName('pc-form__tooltip-text')[2];
  const TOOLTIP_4 = document.getElementsByClassName('pc-form__tooltip-text')[3];
  const TOOLTIP_5 = document.getElementsByClassName('pc-form__tooltip-text')[4];
  
  // reset tooltips:
  INPUT_1.addEventListener("focus", function() {
     TOOLTIP_1.style.visibility = 'hidden';
  }, true);

  INPUT_2.addEventListener("focus", function() {
     TOOLTIP_2.style.visibility = 'hidden';
  }, true);
  
  INPUT_3.addEventListener("focus", function() {
     TOOLTIP_3.style.visibility = 'hidden';
  }, true);
  
  INPUT_4.addEventListener("focus", function() {
     TOOLTIP_4.style.visibility = 'hidden';
  }, true);
  
  INPUT_5.addEventListener("focus", function() {
     TOOLTIP_5.style.visibility = 'hidden';
  }, true);
  //
  
  // TODO - basic calculation formula:
  // algorithm:
  function sum( length, width, height, weight, distance ) {
    //cost per weight:
    const MIN_TARIFF = 37.5;
    const STANDARD_WEIGHT = 1;
    const COST_KG = 3;
        
    let price;
    let clientWeight = weight;
    if ( clientWeight <= STANDARD_WEIGHT ) { 
      price = MIN_TARIFF; 
      //console.log(price);
    } else if ( clientWeight > STANDARD_WEIGHT ) {
      price = MIN_TARIFF + (clientWeight * COST_KG); 
      //console.log(price);
    }
    
    // distance payment calculation
    const STANDARD_DISTANCE = 800;   
    let clientDistance = distance;
    
    const PERCENT_DISTANCE = 100;    
    let surchargeDistance;
    
    if ( clientDistance <= STANDARD_DISTANCE ) {  
      surchargeDistance = 0; 
      //console.log(surchargeDistance);
      //console.log('if');
    } else if ( clientDistance > STANDARD_DISTANCE  ) { 
      surchargeDistance = (price / 100) * PERCENT_DISTANCE;
      //console.log(surchargeDistance);
      //console.log('else if');
    }
        
    // volume payment calculation:    
    const PERCENT_VOL = 12;    
    let surchargeVol;  
         
    // standard pack size:
    const STANDARD_LENGTH = 500;
    const STANDARD_WIDTH = 250;
    const STANDARD_HEIGHT = 150;
    
    let standardMM = STANDARD_LENGTH * STANDARD_WIDTH * STANDARD_HEIGHT;
    let standardMeter = standardMM / 1e+9;
    let standardLiter = standardMeter * 1000;
    let volStandard = standardLiter;
    let limit = volStandard * 2;
    //console.log(limit);
    
    // client volume:
    let clientMM = length * width * height;
    let clientMeter = clientMM / 1e+9;
    let clientLiter = clientMeter * 1000;
    let volClient = clientLiter;
    //console.log(volClient);

    /*
    Кубический миллиметр в кубический метр: 
    1 кубометр = 1 000 000 000 кубических миллиметров;
    Формула: куб. миллиметр / 1e+9 (или на 1 000 000 000);
    Кубический метр в кубический литр:
    1 м3 = 1000 литров;
    Формула: куб. метр * 1000;
    (перевод из метров в литры необходим для упаковки мелких и сыпучих грузов)
    */
        
    if ( volClient >= limit ) { 
      surchargeVol = (price / 100) * PERCENT_VOL;   
      //console.log(surchargeVol); 
      //console.log('if');
      
    } else { 
      surchargeVol = 0;
      //console.log(surchargeVol);  
      //console.log('else');  
    }
    
    // result output:
    let result;
    let unit = 'UAH';
    //console.log(price);
    result = price + surchargeVol + surchargeDistance;
    
    if ( result !== undefined ) {
      resultDisplayControl.innerHTML = `${result.toFixed(2)} ${unit}`;
    }
    
    // validation/tooltips:
    if ( isNaN(param1) ) {    
      TOOLTIP_1.style.visibility = 'visible';     
    } else if ( isNaN(param1) === false ) {    
      TOOLTIP_1.style.visibility = 'hidden';   
    }
  
    if ( isNaN(param2) ) {    
      TOOLTIP_2.style.visibility = 'visible';      
    } else if ( isNaN(param2) === false ) {    
      TOOLTIP_2.style.visibility = 'hidden';      
    }
  
    if ( isNaN(param3) ) {    
      TOOLTIP_3.style.visibility = 'visible';    
    } else if ( isNaN(param3) === false ) {    
      TOOLTIP_3.style.visibility = 'hidden';     
    }
  
    if ( isNaN(param4) ) {    
      TOOLTIP_4.style.visibility = 'visible';      
    } else if ( isNaN(param4) === false ) {    
      TOOLTIP_4.style.visibility = 'hidden';     
    }
  
    if ( isNaN(param5) ) {    
      TOOLTIP_5.style.visibility = 'visible';      
    } else if ( isNaN(param5) === false ) {    
      TOOLTIP_5.style.visibility = 'hidden';     
    }
  
    function emptyCheck() {    
      if ( isNaN(param1) || isNaN(param2) || isNaN(param3) || isNaN(param4) || isNaN(param5) 
           || param1 === 0 && param2 === 0 && param3 === 0 && param4 === 0 && param5 === 0 ) {
        resultDisplayControl.style.visibility = 'hidden'; 
      } else {
        resultDisplayControl.style.visibility = 'visible';
      }      
    }
    emptyCheck();
    //
    
  }
  sum(param1, param2, param3, param4, param5);
  //
    		  				  	  
} // calc

//
const pageScroll = document.getElementsByTagName('body')[0]; 
// page scroll disable function (body):
function disablePageScrolling () {
	 pageScroll.style.overflowY = "hidden";
}

// page scroll enable function (body):
function enablePageScrolling () {
	 pageScroll.style.overflowY = "visible"; // instead of visible - auto or ""
}

// TODO - price show/hidden
const priceIcon = document.querySelector('.pc-form__price-icon');
priceIcon.addEventListener('click', showPrice);

function showPrice() {
  priceIcon.classList.toggle('fa-angle-up');
  const price = document.querySelector('.pc-price');
  price.style.display = 'block';
  const classIs = priceIcon.classList.contains('fa-angle-up'); 
  //console.log(classIs);  
  if (classIs == true) {
    //disablePageScrolling();  
             
  } else if (classIs == false) {
    price.style.display = 'none';
    //enablePageScrolling();
  }
    
   
  // TODO - optional - hide menu when clicked anywhere
  document.addEventListener('click', (event) => {
    const priceIcon = document.querySelector('.pc-form__price-icon');
    const classIs = event.target.classList.contains('blind-click');
    const classIsIcon = priceIcon.classList.contains('fa-angle-up'); 
    const emptyСlass = event.target.className; 
    //console.log(classIs); 
    //console.log(classIsIcon);
    //console.log(emptyСlass);
    const clickedClass = event.target.className;
    //console.log(clickedClass); 
    if (classIs == false && classIsIcon == true && emptyСlass !== '') { 
      priceIcon.classList.remove('fa-angle-up'); 
      //console.log(classIs); 
      //console.log(classIsIcon);
      price.style.display = 'none'; 
      //enablePageScrolling();      
    }
  });  
    
}    

})(); // immediately invoked functions


