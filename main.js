//Constructor function
const TypeWriter = function(txtElem,words,wait = 3000) {

    this.txtElem = txtElem;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;

}

TypeWriter.prototype.type = function(){

    //Init Type Speed
    let typeSpeed = 300;

    //Current index
    const curr = this.wordIndex % this.words.length;
    
    //Full text of current word
    const currWord = this.words[curr];

    //Check delete state
    if(this.isDeleting){
        //Remove char
        this.txt = currWord.substring(0, this.txt.length - 1)
        typeSpeed /= 2;
    }else{
        //Add char
        this.txt = currWord.substring(0, this.txt.length + 1)
    }


    //Insert txt into element
    this.txtElem.innerHTML = `<span class="txt">${this.txt}</span>`

    //See if word is complete
    if(!this.isDeleting && this.txt === currWord){
        typeSpeed = this.wait;
        this.isDeleting = true;
    }else if(this.isDeleting && this.txt === ''){
        this.isDeleting = false;
        //Next word
        this.wordIndex++;
        //Pause
        typeSpeed = 500;
        }



    setTimeout(() => this.type(), typeSpeed);
}

//Init on DOM load
document.addEventListener('DOMContentLoaded',init);

//Init App
function init () {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');

    new TypeWriter(txtElement,words,wait);

}
/*
ES6 Class

class TypeWriter {

    constructor(txtElem,words,wait = 3000) {

        this.txtElem = txtElem;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;

    }

    type() {

    //Init Type Speed
    let typeSpeed = 300;

    //Current index
    const curr = this.wordIndex % this.words.length;
    
    //Full text of current word
    const currWord = this.words[curr];

    //Check delete state
    if(this.isDeleting){
        //Remove char
        this.txt = currWord.substring(0, this.txt.length - 1)
        typeSpeed /= 2;
    }else{
        //Add char
        this.txt = currWord.substring(0, this.txt.length + 1)
    }


    //Insert txt into element
    this.txtElem.innerHTML = `<span class="txt">${this.txt}</span>`

    //See if word is complete
    if(!this.isDeleting && this.txt === currWord){
        typeSpeed = this.wait;
        this.isDeleting = true;
    }else if(this.isDeleting && this.txt === ''){
        this.isDeleting = false;
        //Next word
        this.wordIndex++;
        //Pause
        typeSpeed = 500;
        }



    setTimeout(() => this.type(), typeSpeed);

    }

}

*/