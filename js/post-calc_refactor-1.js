(function() {
'use strict'

const btnCalc = document.getElementById('btnCalc'); 
const btnReset = document.getElementById('btnRset'); 
const resultDisplayControl = document.getElementById('res-out');  

// объект стилей:
const buttonStyle = {
  active: {
    color: '#ffffff',
    border: '1px solid #ffffff',
  },
  inactive: {
    color: '#99d3ff',
    border: '1px solid #99d3ff',
  },
};
//console.log(buttonStyle.active);

const INPUT_1 = document.getElementById('length');
const INPUT_2 = document.getElementById('width');
const INPUT_3 = document.getElementById('height');
const INPUT_4 = document.getElementById('weight');
const INPUT_5 = document.getElementById('distance');  
//console.log(INPUT_1);
//console.log(typeof INPUT_1);

let inputValue1 = INPUT_1.value = '';
let inputValue2 = INPUT_2.value = '';
let inputValue3 = INPUT_3.value = '';
let inputValue4 = INPUT_4.value = '';
let inputValue5 = INPUT_5.value = '';
console.log(inputValue1, inputValue2, inputValue3, inputValue4, inputValue5);

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

function activeCalculateBtn() {
  btnCalc.addEventListener('click', calculateButtonHandler);
  Object.assign(btnCalc.style, buttonStyle.active);
  //btnCalc.style.color = buttonStyle.active.color;
  //btnCalc.style.border = buttonStyle.active.border;
}

function deactiveCalculateBtn() {
  btnCalc.removeEventListener('click', calculateButtonHandler);
  Object.assign(btnCalc.style, buttonStyle.inactive);
  //btnCalc.style.color = buttonStyle.inactive.color;
  //btnCalc.style.border = buttonStyle.inactive.border;
}

function activeResetBtn() {
  btnReset.addEventListener('click', reset);
  Object.assign(btnReset.style, buttonStyle.active);
  //btnReset.style.color = buttonStyle.active.color;
  //btnReset.style.border = buttonStyle.active.border;
}

function deactiveResetBtn() {
  btnReset.removeEventListener('click', reset);
  Object.assign(btnReset.style, buttonStyle.inactive);
  //btnReset.style.color = buttonStyle.inactive.color;
  //btnReset.style.border = buttonStyle.inactive.border;
}

function reset() {
  deactiveResetBtn();
  deactiveCalculateBtn(); 
  INPUT_1.value = '';
  INPUT_2.value = '';
  INPUT_3.value = '';
  INPUT_4.value = '';
  INPUT_5.value = '';
  resultDisplayControl.innerHTML = '';            
  addedListenersInput();
}


// auto calculation:
INPUT_1.addEventListener('input', handleChange);
INPUT_2.addEventListener('input', handleChange);
INPUT_3.addEventListener('input', handleChange);
INPUT_4.addEventListener('input', handleChange);
INPUT_5.addEventListener('input', handleChange);

//
function handleChange() {
  inputValue1 = INPUT_1.value;
  inputValue2 = INPUT_2.value;
  inputValue3 = INPUT_3.value;
  inputValue4 = INPUT_4.value;
  inputValue5 = INPUT_5.value;
  console.log(inputValue1, inputValue2, inputValue3, inputValue4, inputValue5);

  let param1 = Number(inputValue1);
  let param2 = Number(inputValue2);
  let param3 = Number(inputValue3);
  let param4 = Number(inputValue4);
  let param5 = Number(inputValue5);
  //console.log(isNaN(param1));
  //console.log(typeof param1);
 
  // Проверяем, все ли поля заполнены
  if (inputValue1 !== '' && inputValue2 !== '' && inputValue3 !== '' && 
  inputValue4 !== '' && inputValue5 !== '') {
    activeCalculateBtn();
  } else {
    deactiveCalculateBtn();
  }  
  
  // tooltips:
  const tooltips = document.getElementsByClassName('pc-form__tooltip-text');
  //const inputs = [INPUT_1, INPUT_2, INPUT_3, INPUT_4, INPUT_5]; // or
  const inputs = document.getElementsByClassName('input'); // or

  // reset tooltips:
  for (let i = 0; i < tooltips.length; i++) {
    inputs[i].addEventListener("focus", function() {
      tooltips[i].style.visibility = 'hidden';
    }, true);
  }

  // validation/tooltips:
  for (let i = 0; i < inputs.length; i++) {
    const inputValue = Number(inputs[i].value);
    if (isNaN(inputValue)) {
      tooltips[i].style.visibility = 'visible';
      deactiveCalculateBtn();
    } else if (!isNaN(inputValue)) {
      tooltips[i].style.visibility = 'hidden';
    }
  }

}

// обработчик кнопки расчета    		    
function calculateButtonHandler() {        			        
  let param1 = Number(inputValue1);
  let param2 = Number(inputValue2);
  let param3 = Number(inputValue3);
  let param4 = Number(inputValue4);
  let param5 = Number(inputValue5);
  //console.log(isNaN(param1));
  //console.log(typeof param1);

  let result = calc(param1, param2, param3, param4, param5);    
  let unit = 'UAH';
  resultDisplayControl.innerHTML = `${result.toFixed(2)} ${unit}`;
  
  deactiveCalculateBtn();     
  activeResetBtn();      
  removingListenersInput();    		  				  	  
} // calculateButtonHandler

// TODO - basic calculation formula:
// algorithm:
function calc( length, width, height, weight, distance ) {
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
  if ( clientDistance <= STANDARD_DISTANCE ) {  
   result = price + surchargeVol;
  } else if ( clientDistance > STANDARD_DISTANCE  ) { 
    result = (price + surchargeVol) * 2;
  }            
  return result;
    
}  
// calc

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


