/* rules:
 * After each player takes her/his turn, their name and score is entered into the text input in the format `name, score`.
 * Clicking `Add to Rankings` parses the contents of the form field and adds the output to the rankings.
 * The rankings should be appended to `ul#rankings` and formatted to meet the example output below.
 * Players with the same score are 'tied', and should have the same rank.
 * Players can take any number of turns. The results of multiple turns are added to the players' score.
 */

// GLOBAL VARIABLES:
var myRankings = [];

// -> Bool
function sanitaryInput(myInput, mySplitInputArr) {
    var myBool = false;

    // name will always be a string, so check if score is an integer
    if (myInput.indexOf(", ") < 0) {
        alert("Please input the correct format `name, string`.");
    } else if (isNaN(Number(mySplitInputArr[1]))) {
        // not a number
        alert("Please enter a valid integer for the second argument.");
    } else {
        myBool = true;
    }

    return myBool;
}

function addToRankings() {
    var myInput = document.getElementById("text_input").value;
    var mySplitInputArr = myInput.split(", ");

    if (sanitaryInput(myInput, mySplitInputArr)) {
        // if format is 'name, score' then output to rankings
        var myName = mySplitInputArr[0];
        var myScore = Number(mySplitInputArr[1]);

        // first we want to populate our list or rankings
        if (myRankings.length == 0) {
            // handle base case
            myRankings.push({
                "name": myName,
                "score": myScore
            });
        } else {
            // myRankings is populated:

            // if name exists already we want to update the score and sort
            var NEArray = nameExists(myName);
            var doesNameExist = NEArray[0];
            var nameIndex = NEArray[1];
            if (doesNameExist) {
                // update score and sort
                myRankings[nameIndex].score += myScore;
                for (var x = 0; x < myRankings.length; x++) {
                    sortRankings(x);
                }
            } else {
                // else we know that the list is already populated and our name does not already exist
                // we want to insert the new name, score to the correct place in the rankings
                var pre_mutation_length = myRankings.length
                for (var x = 0; x < pre_mutation_length; x++) {
                    if (myScore > myRankings[x].score && x == 0) {
                        //alert("insert x==0");
                        myRankings.splice(x, 0, {
                            "name": myName,
                            "score": myScore
                        });
                        break;
                    } else if (myScore <= myRankings[pre_mutation_length - 1].score) {
                        //alert("insert end");
                        myRankings.push({
                            "name": myName,
                            "score": myScore
                        });
                        break;
                    } else if (myScore < myRankings[x].score && myScore >= myRankings[x + 1].score) {
                        //alert("insert middle");
                        myRankings.splice(x + 1, 0, {
                            "name": myName,
                            "score": myScore
                        });
                        break;
                    }
                }
            }
        }
    }

    // update ul#rankings
    var listElements = "";
    var placeCounter = 1;
    //alert(JSON.stringify(myRankings));
    for (var x = 0; x < myRankings.length; x++) {
        var placement = placeCounter;
        listElements += "<li>" + placement + ". " + myRankings[x].name + ", " + myRankings[x].score + "</li>";
        if (x != myRankings.length - 1 && myRankings[x].score == myRankings[x + 1].score) {
            // do nothing
        } else {
            placeCounter++;
        }
    }

    document.getElementById("rankings").innerHTML = listElements;
}

// name:String -> [Bool, index:Int]
// given a name return if the name exists in myRankings, if it does also return the index where it exists
function nameExists(myName) {
    var reBool = false;
    var index = 0;
    for (var x = 0; x < myRankings.length; x++) {
        if (myName === myRankings[x].name) {
            reBool = true;
            index = x;
        }
    }

    return [reBool, index];
}

// mutate myRankings
// sort list by highest score first
function sortRankings(base) {
    var highest = base;
    for (var x = base; x < myRankings.length; x++) {
        if (myRankings[x].score > myRankings[highest].score) {
            swapRankings(x, highest);
            highest = x;
        }
    }
}

// sortRankings helper function
function swapRankings(x, y) {
    var b = myRankings[x];
    myRankings[x] = myRankings[y];
    myRankings[y] = b;
}

function clearRankings() {
    myRankings = [];
    document.getElementById("rankings").innerHTML = "";
}