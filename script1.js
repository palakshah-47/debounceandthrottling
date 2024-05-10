const input = document.querySelector('input');
const textBox = document.getElementById('debouncTextbox');
const throttleTextBox = document.getElementById('throttleTextbox');

const debounce = (fn, delay = 1000) => {
  let timer;
  return function(...args) {    
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this,args)
    }, delay)
    
  }
}
const throttle = (fn, interval=1000) => {
  let isRunning = false;
  let waitingArgs;
  
  const timeOutFunc = () => {
      if(waitingArgs == null) {
	isRunning = false;
      } else {
	fn.apply(this, waitingArgs);
	waitingArgs = null;        
       }
   setTimeout(timeOutFunc,interval);
  }

  return function(...args) {
     if(isRunning) {
        waitingArgs = args;
 	return;
     }
     fn.apply(this, args);
     isRunning = true;
     setTimeout(timeOutFunc,interval);

   }
  
  
}
const updateDebounceText = debounce((text) => {
  textBox.textContent = text;
});

const updateThrottleText = throttle((text) => {
  throttleTextBox.textContent = text;
})

input.addEventListener('input', (e) => {
  updateDebounceText(e.target.value);
  updateThrottleText(e.target.value)
});