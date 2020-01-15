var screenWidth = screen.width;
var screenHeight = screen.height;
var partsTracker = 0

var guessed = [];
var tries = 9;
var word = "babaganoush";
var arrayWord = word.split("");
var whatTheUserSees = [];
var feil = [];


for (i=0; i < arrayWord.length; i++){
    whatTheUserSees.push("_");
}

var whatTheUserSeesWord = whatTheUserSees.join("");
document.getElementById("ord").innerHTML = whatTheUserSeesWord;
get("tries").innerHTML = tries;


function sjekkOrd(){
    var guessOrd = get("myTextWord").value;
    get("myTextWord").innerHTML = "";
    if (guessOrd == get("ord").innerHTML){
        alert("Spillet er over")
    }else if(guessed.includes(guessOrd)){
        alert("Du har allerede gjettet det ordet!")
    }else{
        testWord();
    }
}

function testWord(){
    if (tries <= 0){
        alert("Spillet er ferdig, venligst restart siden for å prøve igjen");
        get("myText").value = "";
    }else{
        var guessedWord = get("myTextWord").value;
        guessed.push(guessedWord);
        if (word == guessedWord){
            get("result").innerHTML = "Gratulerer, du gjettet ordet!";
            get("ord").innerHTML = word;
        }
    }
}

function sjekkBokstav(){
    var guess = get("myText").value;
    console.log(guess);
    if (guessed.includes(guess)){
        alert("Du har allerede gjettet den bokstaven, venligst gjett en ny!");
    }else{
        testLetter();
    }
}

function testLetter(){
    
    if (tries <= 0 || get("ord").innerHTML == word){
        alert("Spillet er ferdig, venligst restart siden for å prøve igjen");
        get("myText").value = "";
    }else{
        console.log(guessed);
        var guess = get("myText").value;
        guessed.push(guess);
        if (arrayWord.includes(guess)){
            for (i=0; i < arrayWord.length; i++){
                if (guess == arrayWord[i]){
                    whatTheUserSees[i] = guess;
                }
            }
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
        if (tries == 0){
            get("result").innerHTML = "Beklager, du tapte";
        }else if(whatTheUserSeesWord == word){
            get("result").innerHTML = "Gratulerer, du gjettet ordet!";
        }
        get("myText").value = "";
    }
    

}

var c = get("myCanvas");
var ctx = c.getContext("2d");
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
function get(a){
    return document.getElementById(a);
}

