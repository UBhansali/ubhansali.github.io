/*
 * 
 *  Udit Bhansali
  /
/*
	I personally found this assignment pretty difficult as there were
	a lot of ideas to think of.
 */
var pieces = [
  {"letter":"A", "value":1,  "amount":9},
  {"letter":"B", "value":3,  "amount":2},
  {"letter":"C", "value":3,  "amount":2},
  {"letter":"D", "value":2,  "amount":4},
  {"letter":"E", "value":1,  "amount":12},
  {"letter":"F", "value":4,  "amount":2},
  {"letter":"G", "value":2,  "amount":3},
  {"letter":"H", "value":4,  "amount":2},
  {"letter":"I", "value":1,  "amount":9},
  {"letter":"J", "value":8,  "amount":1},
  {"letter":"K", "value":5,  "amount":1},
  {"letter":"L", "value":1,  "amount":4},
  {"letter":"M", "value":3,  "amount":2},
  {"letter":"N", "value":1,  "amount":6},
  {"letter":"O", "value":1,  "amount":8},
  {"letter":"P", "value":3,  "amount":2},
  {"letter":"Q", "value":10, "amount":1},
  {"letter":"R", "value":1,  "amount":6},
  {"letter":"S", "value":1,  "amount":4},
  {"letter":"T", "value":1,  "amount":6},
  {"letter":"U", "value":1,  "amount":4},
  {"letter":"V", "value":4,  "amount":2},
  {"letter":"W", "value":4,  "amount":2},
  {"letter":"X", "value":8,  "amount":1},
  {"letter":"Y", "value":4,  "amount":2},
  {"letter":"Z", "value":10, "amount":1},
  {"letter":"_", "value":0,  "amount":2}
];

/* This is a global variable but more really an array of objects */
var scrabble_tiles = [
  {"id": "piece0", "letter": "A"},
  {"id": "piece1", "letter": "B"},
  {"id": "piece2", "letter": "C"},
  {"id": "piece3", "letter": "D"},
  {"id": "piece4", "letter": "E"},
  {"id": "piece5", "letter": "F"},
  {"id": "piece6", "letter": "G"}
]

/* This was an object that kept track of my Scrabble Row and piece */ 
var scrabble_row = [
  {"id": "drop0",  "tile": "pieceX"},
  {"id": "drop1",  "tile": "pieceX"},
  {"id": "drop2",  "tile": "pieceX"},
  {"id": "drop3",  "tile": "pieceX"},
  {"id": "drop4",  "tile": "pieceX"},
  {"id": "drop5",  "tile": "pieceX"},
  {"id": "drop6",  "tile": "pieceX"},
  {"id": "drop7",  "tile": "pieceX"},
  {"id": "drop8",  "tile": "pieceX"},
  {"id": "drop9",  "tile": "pieceX"},
  {"id": "drop10", "tile": "pieceX"},
  {"id": "drop11", "tile": "pieceX"},
  {"id": "drop12", "tile": "pieceX"},
  {"id": "drop13", "tile": "pieceX"},
  {"id": "drop14", "tile": "pieceX"}
]

/* It also gets the score but by calling another function to actually
   calculate the score. */
function get_word() {
    var created_word = "";
    var user_score = 0;
    
    for(var i = 0; i < 15; i++) {
        if(scrabble_row[i].tile != "pieceX") {
            created_word += get_letter(scrabble_row[i].tile);
            user_score += calc_score(scrabble_row[i].tile);
        }
    }
    
    user_score += (user_score * scrabble_double());
    
    $("#user_score").html(user_score);
    
    if(created_word != "") {
        $("#created_word").html(created_word);
        return;
    }
    $("#created_word").html("_____")
}
/* This function does the actual calculation for the score */
function calc_score(passed_id) {
    var letter = get_letter(passed_id);
    var score = 0;
    
    /* a for loop to go through the array of objects pieces which contains all of the
       letters in the alphabet with their own score value. */
    for(var i = 0; i < 27;i++) {
        var object = pieces[i];
        
        if(object.letter == letter) {
            score = object.value;
            
            score += (score * double_letter(passed_id));
        
            return score;
        }

    }
    /* error code indicating something went wrong */
    return -1;
}

/* Double word function */
function scrabble_double(){
    if(scrabble_row[3].tile != "pieceX") {
        return 1;
    }
    if (scrabble_row[11].tile != "pieceX") {
        return 1;
    }
    
    return 0;
}

/* Double letter function */
function double_letter(passed_id) {
    var dropped_ID = find_tile_position(passed_id);
    
    if(dropped_ID == "drop0" || dropped_ID == "drop7" || dropped_ID == "drop14") {
        return 1
    }
    else {
        return 0;
    }
}
// This function was to get the letter by passing an ID and then return the letter
// 
function get_letter(passed_id) {
    // loop to iterate through the 7 pieces on the rack
    for(var i = 0; i < 7; i++) {
//        console.log("Passing; " + passed_id);
        // case to check if the letter was found
        if(scrabble_tiles[i].id == passed_id) {
            return scrabble_tiles[i].letter;
        }
    }
    // error to indicate if something went wrong.
        return -1;
}

/*Find the position the passed ID in the array and return it*/
function find_board_position(passed_id) {
    for(var i = 0; i < 15; i++) {
        if(scrabble_row[i].id == passed_id) {
            return i;
        }
    }
    return -1;
}
/* Find which dropped ID does the passed ID belongs to */
function find_tile_position(passed_id) {
    for(var i = 0; i < 15; i++) {
        if(scrabble_row[i].tile == passed_id) {
            return scrabble_row[i].id;
        }
    }
}

/* This function loads the seven pieces onto the rack which is just simply an image */
function load_pieces() {
    var img_location = "scrabbleimages/Scrabble_Tile_";
    var rand_num = 1;
	var scrabble_piece = "";
	var scrabblePieceID = "";
    
    console.log;
    for(var i = 0; i < 7; i++) {
        var temp = true;
        while(temp == true) {
            rand_num = generate_random_ints(0,26);
            if(pieces[rand_num].amount != 0) {
                temp = false;
                pieces[rand_num].amount--;
            }
        
        }
     
     scrabble_piece = "<img class='pieces' id='piece" + i + "'src='" + img_location + pieces[rand_num].letter + ".jpg"
                        + "'></img>"; 
     
    
     scrabblePieceID = "#piece" + i;
	 
     // placing the randomized letters into the scrabble_row object
     scrabble_row[i].letter = pieces[rand_num].letter;
	 
     // placing the randomized letters into the scrabble_tiles object
     scrabble_tiles[i].letter = pieces[rand_num].letter;
     
     // https://stackoverflow.com/questions/885144/how-to-get-current-position-of-an-image-in-jquery
     var position = $("#scrabble_board_row").position();
     
     var left_of_image = 50 + (20*i);
     var top_of_image = 78;
     
     // add the pieces onto the screen
     $("#rack").append(scrabble_piece);
     $(scrabblePieceID).css("left", left_of_image).css("top", top_of_image).css("position", "relative");
	//console.log("TEST");

    // I used http://api.jqueryui.com/draggable/#option-snap to make it snap
     $(scrabblePieceID).draggable({
         snap: true,
         snapMode:"inner",
         snapTolerance: 30
         
     }) ;
    }
}

// https://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
function generate_random_ints(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// This function is to make the Scrabble row droppable and let the program know where
// a piece is dropped.
function load_droppable_pieces() {
    var img_location = "scrabbleimages/scrabble_transparent.png"; // the image's location
    var drop = "";
    var scrabbleDropID = "#drop" + i;
    
    console.log("Load Droppable Function")
    for(var i = 0; i < 15; i++) {

        scrabbleDropID = "#drop" + i;

		//      Making the ID droppable
        $(scrabbleDropID).droppable ({
        // I used the https://jqueryui.com/droppable/#default to help me understand the whole droppable idea
            drop: function(event, ui) {
                var drag_scrabbleID = ui.draggable.attr("id");
                var drop_scrabbleID = $(this).attr("id");
                scrabble_row[find_board_position(drop_scrabbleID)].tile = drag_scrabbleID;
                get_word();
               console.log("Tile is: " + drag_scrabbleID + " - dropped on " + drop_scrabbleID);
            $(this).append($(ui.draggable));
            ui.draggable.css("top", $(this).css("top"));
            ui.draggable.css("left", $(this).css("left"));
            ui.draggable.css("position", "relative");
           get_word();
           
            },
            out: function(event, ui) {
                var drag_scrabbleID = ui.draggable.attr("id");
                var drop_scrabbleID = $(this).attr("id");
                
                if(drag_scrabbleID != scrabble_row[find_board_position(drop_scrabbleID)].tile) {
                    return;
                }
                scrabble_row[find_board_position(drop_scrabbleID)].tile = "pieceX";
                
                get_word();
            }
            
        });
    }
}