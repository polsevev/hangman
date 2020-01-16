/*  Made by Rolf Martin Glomsrud from 13.01.2020 to 15.01.2020
    Example of a project that is feasable for a student that has
    had Informasjonsteknologi 2*/
var words = [
    "scarf", "elbow", "cactus", "society", "aftermath", "fang", "bushes",
    "furniture", "throat", "downtown", "rain", "soup", "regret", "tiger",
    "vest", "line", "smash", "screw", "plate", "plate", "stage", "test", "boy", 
    "nest", "cherries", "cakes", "meat", "dolls", "spoon", "pot", "kiss", "measure",
    "eyes", "shock", "smile", "scissors", "stomach", "ice", "root", "leather"

]


var randomNumber = Math.floor((Math.random()*40)+1);
var screenWidth = screen.width;
var screenHeight = screen.height;
var partsTracker = 0
var guessed = [];
var tries = 9;
var word = words[randomNumber];
var arrayWord = word.split("");
var whatTheUserSees = [];
var feil = [];

//makes an array of _ to show to the user
for (i=0; i < arrayWord.length; i++){
    whatTheUserSees.push("_");
}

//converts the array from above to a string, then puts it into the HTML
var whatTheUserSeesWord = whatTheUserSees.join("");
document.getElementById("ord").innerHTML = whatTheUserSeesWord;
get("tries").innerHTML = tries;

//check if word is guessed already
function sjekkOrd(){
    var guessOrd1 = get("myTextWord").value;
    guessOrd = guessOrd1.toLowerCase();
    get("myTextWord").innerHTML = "";
    if (guessOrd == get("ord").innerHTML){
        alert("The game is over!")
    }else{
        testWord();
    }
}


function testWord(){
    //check if user has more tries
    if (tries <= 0){
        alert("The game is over, please restart the page");
        get("myTextWord").value = "";
    }else if(get("ord").innerHTML==word){
        alert("The game is over, please restart the page")
        get("myTextWord").value="";
    }else{
        //grabs the guess from HTML
        var guessedWord1 = get("myTextWord").value;
        var guessedWord = guessedWord1.toLowerCase();
        //adds it to the array of guessed words
        guessed.push(guessedWord);
        //checks if it was correct
        if (word == guessedWord){
            get("result").innerHTML = "Congratulations you won! ";
            get("ord").innerHTML = word;
            get("myTextWord").value = "";
        //this plays if the guess was wrong
        }else{
            get("myTextWord").value = "";
            //removes a try
            tries -= 1;
            //adds it to wrong words guessed array
            feil.push(guessedWord);
            //shows user the wrong word was guessed
            var earlier = get("wrongLetters").innerHTML;
            var nyInner = earlier + " " + guessedWord;
            get("wrongLetters").innerHTML = nyInner;
            //updates the amount of tries
            get("tries").innerHTML = tries;
            //draws a piece of hangman
            draw();
        }
        if (tries == 0){
            get("result").innerHTML = "Sorry, you lost. The word was" + word;
        }else if(whatTheUserSeesWord == word){
            get("result").innerHTML = "Congratulations you guessed the word!";
        }
        //removes the guess from the text input, ready for new guess
        get("myText").value = "";
    }
}


//checks if it is guessed
function sjekkBokstav(){
    var guess1 = get("myText").value;
    var guess = guess1.toLowerCase();
    if (guessed.includes(guess)){
        alert("You have already gussed that letter, please guess another one!");
    }else{
        testLetter();
    }
}

function testLetter(){
    //checks if the user is out of tries or they are done guessing
    if (tries <= 0 || get("ord").innerHTML == word){
        alert("The game is over, please restart the page");
        get("myText").value = "";
    }else{
        //grabs the guess from HTML
        var guess1 = get("myText").value;
        var guess = guess1.toLowerCase();

        guessed.push(guess);
        //checks if the letter is in the word
        if (arrayWord.includes(guess)){
            //runs through the array of the word and changes the array of _ at the right position
            for (i=0; i < arrayWord.length; i++){
                if (guess == arrayWord[i]){
                    whatTheUserSees[i] = guess;
                }
            }
        //if it is wrong it does the same as a wrong word guess at line 48
        }else{
            tries -= 1;
            feil.push(guess);
            var earlier = get("wrongLetters").innerHTML;
            var nyInner = earlier + " " + guess;
            get("wrongLetters").innerHTML = nyInner;
            get("tries").innerHTML = tries;
            draw();
        }
        var whatTheUserSeesWord = whatTheUserSees.join("");
        document.getElementById("ord").innerHTML = whatTheUserSeesWord;
        //checks if the user lost
        if (tries == 0){
            get("result").innerHTML = "Sorry, you lost. The word was " + word;
        }else if(whatTheUserSeesWord == word){
            get("result").innerHTML = "Congratulations you guessed the word!";
        }
        //removes the guess from the text input, ready for new guess
        get("myText").value = "";
    }
    

}

//initializing canvas
var c = get("myCanvas");
var ctx = c.getContext("2d");
//defining canvas size
ctx.canvas.width = 0.25 * screenWidth;
ctx.canvas.height = 0.25 * screenHeight;
ctx.moveTo(0, 0);
ctx.stroke();


function draw(){
    if (partsTracker == 0){
        partsTracker += 1
        //draw platform
        ctx.moveTo(0, 0);
        ctx.moveTo(0.03*screenWidth, 0.23*screenHeight);
        ctx.lineTo(0.08*screenWidth, 0.23*screenHeight);
        ctx.stroke();
        
    }else if(partsTracker == 1){
        partsTracker += 1
        //draw pole
        ctx.moveTo(0.08*screenWidth, 0.23*screenHeight);
        ctx.moveTo(0.055*screenWidth, 0.23*screenHeight);
        ctx.lineTo(0.055*screenWidth, 0.05*screenHeight);
        ctx.stroke()
        
    }else if (partsTracker == 2){
        partsTracker += 1
        //draw linear pole
        ctx.moveTo(0.055*screenWidth, 0.05*screenHeight);
        ctx.lineTo(0.15*screenWidth, 0.05*screenHeight);
        ctx.stroke();
        
    }else if (partsTracker == 3){
        partsTracker +=1
        //draw rope
        ctx.moveTo(0.15*screenWidth, 0.05*screenHeight);
        ctx.lineTo(0.15*screenWidth, 0.1*screenHeight);
        ctx.stroke();
        
    }else if(partsTracker == 4){
        //draw head
        ctx.moveTo((0.15*screenWidth)+(0.012*screenWidth), 0.12*screenHeight);
        ctx.arc(0.15*screenWidth, 0.12*screenHeight, 0.012*screenWidth,0, 2*Math.PI)
        ctx.stroke();
        partsTracker += 1
    }else if(partsTracker == 5){
        //draw body
        ctx.moveTo(0.15*screenWidth, (0.12*screenHeight) + (0.021*screenHeight));
        ctx.lineTo(0.15*screenWidth, 0.184*screenHeight);
        ctx.stroke();
        partsTracker += 1
    }else if(partsTracker == 6){
        //draw left leg
        ctx.moveTo(0.15*screenWidth, 0.184*screenHeight);
        ctx.lineTo(0.16*screenWidth, 0.21*screenHeight);
        ctx.stroke();
        partsTracker += 1
    }else if(partsTracker == 7){
        //draw right leg
        ctx.moveTo(0.15*screenWidth, 0.184*screenHeight);
        ctx.lineTo(0.14*screenWidth, 0.21*screenHeight);
        ctx.stroke()
        partsTracker += 1
    }else if(partsTracker == 8){
        // draw arms
        ctx.moveTo(0.14*screenWidth, 0.16*screenHeight);
        ctx.lineTo(0.16*screenWidth, 0.16*screenHeight);
        ctx.stroke();
        partsTracker += 1
    }
}

//function to not write document.getElementById();
function get(a){
    return document.getElementById(a);
}

