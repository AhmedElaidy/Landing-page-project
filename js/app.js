/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
 * 
 */
// the performance before making any thing that helps me know the performance at end
const startingTime = performance.now(); 
var li = document.querySelectorAll(".nav-menu__link");
var btn = document.querySelector(".top-btn");
var sec = document.querySelectorAll("Section");
var navBar = document.querySelector('#navbar__list');
var fragment = document.createDocumentFragment();



// build the nav - scroll to the section when clicking the link in the navbar.
// 1- added SectionDataNav to a const and created new li.
// 2- made a forLoop over sections and make innertext for every li equal it's data nav. 
// 3- added an event listener to li when click to scroll to it's section.
// 4- adding the li to the ul(mainli to navbar).
sec.forEach((secLoop)=>{
    const dataNav = secLoop.getAttribute("data-nav");
    const mainLi = document.createElement("li");
    mainLi.innerText = dataNav;
    mainLi.addEventListener("click", ()=>{
        secLoop.scrollIntoView({behavior:"smooth" , block:"end"});
    })
    fragment.appendChild(mainLi);
})
//1- adding fragment element to reduce the times of reflow. 
//2- if the page dosen't have to reflow many times it render faster which speeds up performance.
navBar.appendChild(fragment)

    // Add class 'active' to section when near top of viewport.
    // Selecting the active section with "isIntersecting".
    function callback(indexs){ // making a loop over the (index) elements.
        indexs.forEach((index)=>{
            if (index.isIntersecting){ 
                sec.forEach((section)=>{
                        section.classList.remove("your-active-class"); //made a loop over sections to remove active class from all the sections.
                });   
            index.target.classList.add("your-active-class");  //Adding the class ("your-active-class") to the class in the viewport.
        }}
        )}

    // Set sections as active.
    // options is specifies for the IntersectionObserver.
    let options = {
        root: document.querySelector('#scrollArea'),
        rootMargin: '0px',
        //threshold is specifying the space it should be visible within the element ,so the callback
        threshold: .7,
      }
      let observer = new IntersectionObserver(callback, options);
      sec.forEach( (section)=>{
        observer.observe(section);
    });
    
    // scroll to top button.
    // 1- add an event listener to the button when click.
    // 2- add the button data-link attribute to a const called (le).
    // 3- added scrollIntoView and the way it should behave while moving to the top of the page (le).
    btn.addEventListener('click' , ()=>{
        const le = document.getElementById(btn.getAttribute("data-link"));
        le.scrollIntoView({behavior:"smooth" , block:"start"});
    });
    
    // testing the performance.
    const endingTime = performance.now();
    console.log('This code took ' + (endingTime - startingTime) + ' milliseconds.');



