!function(){"use strict";const e=document.querySelectorAll("a[href^='#']");for(let t of e)t.addEventListener("click",(function(e){e.preventDefault();const o=t.getAttribute("href");document.querySelector(o).scrollIntoView({behavior:"smooth",block:"start"})}));document.addEventListener("DOMContentLoaded",(function(){const e=document.querySelector(".mobile-menu"),t=document.querySelector(".welcome__nav-links");e.addEventListener("click",(function(){this.classList.toggle("active"),t.classList.toggle("active"),document.body.classList.toggle("no-scroll")})),document.querySelectorAll(".welcome__nav-link").forEach((o=>{o.addEventListener("click",(function(){e.classList.remove("active"),t.classList.remove("active"),document.body.classList.remove("no-scroll")}))}))})),console.log("module")}();