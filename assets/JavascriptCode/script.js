//////////////////////////////////////////////////////////////////
// accordion Hide and show code start ////////////////////////////
//////////////////////////////////////////////////////////////////

// // click function same as $(document).click(function(){}) in jQuery

// document.addEventListener('click',function(event) {

//     // only run if it is accordion-toggle class
//     if (!event.target.classList.contains('accordion-toggle')) return;

//     // get content area # to id call
//     var content = document.querySelector(event.target.hash);

//     if (!content) return;
//     // toggle = show and hide content
//     content.classList.toggle('active');

//     // prevent the default link behavior
//     event.preventDefault();


// }, false);




// listen for the click in browswer
document.addEventListener('click',function(event) {

  // only run if it is accordion-toggle class
  if (!event.target.classList.contains('accordion-toggle')) return;

  // get content area # to id call
  var content = document.querySelector(event.target.hash);

  if (!content) return;
  // toggle = show and hide content


  // prevent the default link behavior
  event.preventDefault();

  // check if content is area is already open

  if (content.classList.contains('active')){
      content.classList.remove('active');
      return;
  }

  // get all accordions using class
  var accordion = document.querySelectorAll('.accordion');

  for (var i = 0; i < accordion.length; i++) {
      accordion[i].classList.remove('active');
  }
  content.classList.add('active');


}, false);

//////////////////////////////////////////////////////////////////
// accordion Hide and show code end //////////////////////////////
//////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////
// Insert then select random  start ////////////////////////////
//////////////////////////////////////////////////////////////////

// variables
var names = document.querySelector('#names');
var enterName = document.querySelector('#enterName');
var addName = document.querySelector('#addName');
var chooseDriver = document.querySelector('#chooseDriver');
var theDriver = document.querySelector('#theDriver');
var clearDriver = document.querySelector('#clearDriver');

var drivers = [];

 //shuffle our array of drivers and pick one
  var shuffle = function(arr){
    // create a clone array so that we don't shuffle the original one
    var arrClone = arr.slice(0);
    // shuffle the arrayclone
    return arrClone.sort(function(){
      return Math.random() - 0.5;
    })
  }



// add driver to list then push to array
addName.addEventListener('click', function(event){
  if (enterName.value === '') return;
  names.innerHTML += '<li>' + enterName.value + '<a href=#" data-remove="'+ enterName.value +'"> &ndash; </a></li>';
  drivers.push(enterName.value);
  enterName.value = '';
  enterName.focus();
  // saved to local storage
  localStorage.setItem('whoShouldDrive',drivers.toString());
},false);



//select random driver
chooseDriver.addEventListener('click',function(event){
  // if array is empty
  if (drivers.length === 0) return;
  var randomize = shuffle(drivers);
  theDriver.innerHTML = randomize[0];
},false);


//remove specific drivers
document.addEventListener('click',function(event){

  if ( !event.target.hasAttribute('data-remove') ) return;

  var index = drivers.indexOf(event.target.getAttribute('data-remove'));

  if ( index > -1){
    drivers.splice(index, 1);
  }
  // update localstorage
  localStorage.setItem('whoShouldDrive',drivers.toString());
  //clear names list
  names.innerHTML = '';

  //place new
  for (let i = 0; i < drivers.length; i++) {
    names.innerHTML += '<li>' + drivers[i] + '<a href=#" data-remove="'+ drivers[i] +'"> &ndash; </a></li>';
  }

},false);


// get item from localStorage if saved
var savedDrivers = localStorage.getItem('whoShouldDrive');

if (savedDrivers) {

  drivers = savedDrivers.split(',');

  for (let i = 0; i < drivers.length; i++) {
    names.innerHTML += '<li>' + drivers[i] + '<a href=#" data-remove="'+ drivers[i] +'"> &ndash; </a></li>';
  }
}



//clear driver
clearDriver.addEventListener('click',function(event){
  // clear storage
  localStorage.removeItem('whoShouldDrive');
  //clear list inside ul
  names.innerHTML = '';

  // and the driver
  theDriver.innerHTML = '';
  // clearing input
  enterName.innerHTML = '';
  // and the array
  drivers = [];
},false);


//////////////////////////////////////////////////////////////////
// Insert then select random  end ////////////////////////////
//////////////////////////////////////////////////////////////////