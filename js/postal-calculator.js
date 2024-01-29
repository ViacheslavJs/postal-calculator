
(function() {
'use strict'

// or button:
const BTN = document.getElementById('btn'); 
const BTN_RESET = document.getElementById('btnRset'); 

const INPUT_1 = document.getElementById('length');
const INPUT_2 = document.getElementById('width');
const INPUT_3 = document.getElementById('height');
const INPUT_4 = document.getElementById('weight');
const INPUT_5 = document.getElementById('distance');  
//console.log(INPUT_1);
//console.log(typeof INPUT_1);

let INPUT_VALUE_1 = INPUT_1.value = '';
let INPUT_VALUE_2 = INPUT_2.value = '';
let INPUT_VALUE_3 = INPUT_3.value = '';
let INPUT_VALUE_4 = INPUT_4.value = '';
let INPUT_VALUE_5 = INPUT_5.value = '';
console.log(INPUT_VALUE_1, INPUT_VALUE_2, INPUT_VALUE_3, INPUT_VALUE_4, INPUT_VALUE_5);

function removingListenersInput() {
  INPUT_1.removeEventListener('input', handleChange);
  INPUT_2.removeEventListener('input', handleChange);
  INPUT_3.removeEventListener('input', handleChange);
  INPUT_4.removeEventListener('input', handleChange);
  INPUT_5.removeEventListener('input', handleChange);
}

function addedListenersInput() {
  INPUT_1.addEventListener('input', handleChange);
  INPUT_2.addEventListener('input', handleChange);
  INPUT_3.addEventListener('input', handleChange);
  INPUT_4.addEventListener('input', handleChange);
  INPUT_5.addEventListener('input', handleChange);
}

// auto calculation:
INPUT_1.addEventListener('input', handleChange);
INPUT_2.addEventListener('input', handleChange);
INPUT_3.addEventListener('input', handleChange);
INPUT_4.addEventListener('input', handleChange);
INPUT_5.addEventListener('input', handleChange);

//
function handleChange() {
  INPUT_VALUE_1 = INPUT_1.value;
  INPUT_VALUE_2 = INPUT_2.value;
  INPUT_VALUE_3 = INPUT_3.value;
  INPUT_VALUE_4 = INPUT_4.value;
  INPUT_VALUE_5 = INPUT_5.value;
  console.log(INPUT_VALUE_1, INPUT_VALUE_2, INPUT_VALUE_3, INPUT_VALUE_4, INPUT_VALUE_5);

  let param1 = Number(INPUT_VALUE_1);
  let param2 = Number(INPUT_VALUE_2);
  let param3 = Number(INPUT_VALUE_3);
  let param4 = Number(INPUT_VALUE_4);
  let param5 = Number(INPUT_VALUE_5);
  //console.log(isNaN(param1));
  //console.log(typeof param1);
 
  // Проверяем, все ли поля заполнены
  if (INPUT_VALUE_1 !== '' && INPUT_VALUE_2 !== '' && INPUT_VALUE_3 !== '' && 
  INPUT_VALUE_4 !== '' && INPUT_VALUE_5 !== '') {
    BTN.addEventListener('click', calc);
    BTN.style.color = '#ffffff';
    BTN.style.border = '1px solid #ffffff';
  } else {
    BTN.removeEventListener('click', calc);
    BTN.style.color = '#99d3ff';
    BTN.style.border = '1px solid #99d3ff';
  }  
  
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
  
  // validation/tooltips:
  if ( isNaN(param1) ) {    
    TOOLTIP_1.style.visibility = 'visible';
    BTN.removeEventListener('click', calc);
    BTN.style.color = '#99d3ff';
    BTN.style.border = '1px solid #99d3ff';     
  } else if ( isNaN(param1) === false ) {    
    TOOLTIP_1.style.visibility = 'hidden';   
  }
  
  if ( isNaN(param2) ) {    
    TOOLTIP_2.style.visibility = 'visible'; 
    BTN.removeEventListener('click', calc);
    BTN.style.color = '#99d3ff';
    BTN.style.border = '1px solid #99d3ff';     
  } else if ( isNaN(param2) === false ) {    
    TOOLTIP_2.style.visibility = 'hidden';      
  }
  
  if ( isNaN(param3) ) {    
    TOOLTIP_3.style.visibility = 'visible';
    BTN.removeEventListener('click', calc);
    BTN.style.color = '#99d3ff';
    BTN.style.border = '1px solid #99d3ff';    
  } else if ( isNaN(param3) === false ) {    
    TOOLTIP_3.style.visibility = 'hidden';     
  }
  
  if ( isNaN(param4) ) {    
    TOOLTIP_4.style.visibility = 'visible'; 
    BTN.removeEventListener('click', calc);
    BTN.style.color = '#99d3ff';
    BTN.style.border = '1px solid #99d3ff';     
  } else if ( isNaN(param4) === false ) {    
    TOOLTIP_4.style.visibility = 'hidden';     
  }
  
  if ( isNaN(param5) ) {    
    TOOLTIP_5.style.visibility = 'visible'; 
    BTN.removeEventListener('click', calc);
    BTN.style.color = '#99d3ff';
    BTN.style.border = '1px solid #99d3ff';     
  } else if ( isNaN(param5) === false ) {    
    TOOLTIP_5.style.visibility = 'hidden';     
  }

}

// calc     		    
function calc() {   
  const resultDisplayControl = document.getElementById('res-out');     			        
  let param1 = Number(INPUT_VALUE_1);
  let param2 = Number(INPUT_VALUE_2);
  let param3 = Number(INPUT_VALUE_3);
  let param4 = Number(INPUT_VALUE_4);
  let param5 = Number(INPUT_VALUE_5);
  //console.log(isNaN(param1));
  //console.log(typeof param1);
   
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
    //console.log(volStandard);
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

    if ( clientDistance <= STANDARD_DISTANCE ) {  
      result = price + surchargeVol;
    } else if ( clientDistance > STANDARD_DISTANCE  ) { 
      result = (price + surchargeVol) * 2;
    }    
        
    resultDisplayControl.innerHTML = `${result.toFixed(2)} ${unit}`;
        
    BTN.removeEventListener('click', calc);
    BTN_RESET.style.color = '#ffffff';
    BTN_RESET.style.border = '1px solid #ffffff';
    BTN.style.color = '#99d3ff';
    BTN.style.border = '1px solid #99d3ff';
    
    function reset() {
      BTN_RESET.removeEventListener('click', reset);
      INPUT_1.value = '';
      INPUT_2.value = '';
      INPUT_3.value = '';
      INPUT_4.value = '';
      INPUT_5.value = '';
      resultDisplayControl.innerHTML = '';
      BTN.removeEventListener('click', calc);
      BTN.style.color = '#99d3ff';
      BTN.style.border = '1px solid #99d3ff';
      BTN_RESET.style.color = '#99d3ff';
      BTN_RESET.style.border = '1px solid #99d3ff';
      addedListenersInput();
    }
    BTN_RESET.addEventListener('click', reset);
    removingListenersInput();
    
  }
  sum(param1, param2, param3, param4, param5);
  //
    		  				  	  
} // calc

// TODO - price show/hidden
const priceIcon = document.querySelector('.pc-form__price-icon');
priceIcon.addEventListener('click', showPrice);

function showPrice() {
  priceIcon.classList.toggle('fa-angle-up');
  const price = document.querySelector('.pc-price');
  const animSec = 0.5 * 1000;
  const valueAnim = price.style.animationDuration = `${animSec / 1000}s`;  
  const classIs = priceIcon.classList.contains('fa-angle-up'); 
  //console.log(classIs);      
  if (classIs == true) {
    price.style.display = 'block'; 
    price.classList.add('price-down');  
    price.classList.remove('price-up');
    //console.log(classIs, 'if');  
  } else if (classIs == false) { 
    //price.style.display = 'none';
    price.classList.remove('price-down'); 
    price.classList.add('price-up');    
    //console.log(classIs, 'else if');  
    
    let timer;
    //console.log(animSec);    
    timer = window.setTimeout( function() {
      price.style.display = 'none';
    }, animSec); 
    // сброс таймера:             
    priceIcon.addEventListener('click', 
      function() {
        clearTimeout(timer);
    });
    //
        
  }
   
  /*
  let style = window.getComputedStyle(price);
  console.log(style); 
  let valueDsp = window.getComputedStyle(price).getPropertyValue('display'); 
  console.log(valueDsp);
  let valueBg = window.getComputedStyle(price).getPropertyValue('background'); 
  console.log(valueBg);
  */
  let style = window.getComputedStyle(price); 
  let styleValueAnim = style.getPropertyValue('animation-duration'); 
  //console.log(styleValueAnim);
  //console.log(valueAnim); 
   
  // TODO - optional - hide menu when clicked anywhere
  document.addEventListener('click', (event) => {
    const priceIcon = document.querySelector('.pc-form__price-icon');
    const classIs = event.target.classList.contains('blind-click');
    const classIsIcon = priceIcon.classList.contains('fa-angle-up'); 
    const emptyСlass = event.target.className; 
    const clickedClass = event.target.className;
    //console.log(classIs); 
    //console.log(classIsIcon);
    //console.log(emptyСlass);    
    //console.log(clickedClass); 
    if (classIs == false && classIsIcon == true && emptyСlass !== '') { 
      priceIcon.classList.remove('fa-angle-up'); 
      price.classList.remove('price-down'); 
      price.classList.add('price-up'); 
      //console.log(classIs); 
      //console.log(classIsIcon);       
      //  
      let timer;    
      //console.log(animSec);
      timer = window.setTimeout( function() {
        price.style.display = 'none';
      }, animSec);              
      priceIcon.addEventListener('click', () => {
          clearTimeout(timer);
      });
      //                    
    }
  });  
    
}    

})(); // immediately invoked functions


