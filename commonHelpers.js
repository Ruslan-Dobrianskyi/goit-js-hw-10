import"./assets/modulepreload-polyfill-3cfb730f.js";import{f,i as S}from"./assets/vendor-77e16229.js";const a=document.querySelector(".timer"),o=document.querySelector("[data-start]"),h=document.querySelector("#datetime-picker");o.addEventListener("click",p);let d,i=null;const y={enableTime:!0,time_24hr:!0,defaultDate:Date.now(),minuteIncrement:1,onClose(t){const e=t[0];e<Date.now()?(S.error({title:"Error",message:"Please choose a date in the future",position:"topRight",timeout:3e3}),o.disabled=!0):(o.disabled=!1,d=e)}};f(h,y);function p(){o.disabled=!0,i=setInterval(()=>{const t=d-Date.now();if(t<=0){clearInterval(i),o.disabled=!1;return}const{days:e,hours:n,minutes:r,seconds:s}=q(t);g(e,n,r,s)},1e3)}function g(t,e,n,r){a.querySelector("[data-days]").textContent=String(t).padStart(2,"0"),a.querySelector("[data-hours]").textContent=String(e).padStart(2,"0"),a.querySelector("[data-minutes]").textContent=String(n).padStart(2,"0"),a.querySelector("[data-seconds]").textContent=String(r).padStart(2,"0")}function q(t){const c=Math.floor(t/864e5),u=Math.floor(t%864e5/36e5),l=Math.floor(t%864e5%36e5/6e4),m=Math.floor(t%864e5%36e5%6e4/1e3);return{days:c,hours:u,minutes:l,seconds:m}}
//# sourceMappingURL=commonHelpers.js.map
