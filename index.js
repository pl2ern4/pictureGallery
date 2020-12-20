var obj ;
(function(){
    obj = new Gallery([], 1);
    document.getElementById("search").addEventListener("input", debounce(callService));
    document.getElementById("search").addEventListener("submit", function(e){
        e.preventDefault();
        callService(e)
    });
}(window))

function callService(e){
    obj.onSearch(e.target.value);    
}

function debounce(callback) {
    let timerId;
    return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        callback(...args);
      }, 1000);
    };
}

function closeDiv() {
    document.getElementsByClassName("modal")[0].style.display = "none";
}
