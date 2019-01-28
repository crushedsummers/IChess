/*
finished tasks:
- generate board
  - tile coordinates
  - white and black tiles colors
- place initial pieces positions 
- activate click event every restart/move/everything
- append img to special tiles when clicked
- assign special class to pawn moves
- assign special class to rook moves
- assign special class to horse moves
- assign special class to bishop moves
- assign special class to queen moves
- assign special class to king moves
- have alternating turns for opponents
- opt: restart button
- let rivals eat each other
  - pawn eats sideways
- blocking function with other pieces (remove special class)
  - pawns blocked when something facing them
  - own side pieces blocks each other (exception: horse)

-comment everything
*/

/*name of all y Coordinates.*/
var yCoordinates = ["A", "B", "C", "D", "E", "F", "G", "H"];
function generateBoard() {
  /*the id number of the boxes at x=1 (or row 0 here)*/
  var columnStart = [0, 8, 16, 24, 32, 40, 48, 56]; 
  /*creating div with id numbers*/
  for (var i=0; i< 64; i++) {
    var box = document.createElement("div");
    $(box).attr("id", i);
    $(box).attr("class", "tile");
    $("#boxes").append(box);
  }
  /*i=columnStart (x-axis), z= all the boxes horizontlly in line with the specific columnStart (y-axis)*/
  for (var i=0; i<8; i++) {
    for (var z=0; z<8; z++){
      /*if i is an even number (dividable by 2) and z is a odd number, it's a black tile (draw it)*/
      if (i%2 == 0 && z%2 == 1){
        $("#" + (z+columnStart[i])).addClass(yCoordinates[i]+" "+z+" black");
    }
    /*if i is an even number (dividable by 2) and z is a odd number, it's a black tile (draw it)*/
      else if (i%2 == 1 && z%2 == 0){
      $("#" + (z+columnStart[i])).addClass(yCoordinates[i]+" "+z+" black");
    }
    /*theoretically, everything else should be white*/
      else {
      $("#" + (z+columnStart[i])).addClass(yCoordinates[i]+" "+z+" white");
    }
   }
  }}
function activateEventClick() {
  /*whenever a piece moves to another place (transfering inner htmls), the click function disappears. 
  therefore, this function runs everytime a piece moves.
  i tried putting the onclick function in the img itself, it doesn't work.
  i also tried doing this using a for loop and an array, but i got lazy because you'd have to constantly switch string to, i don't know what you call that.*/

  $(".pawn").click(pawnClicked);
  $(".rook").click(rookClicked);
  $(".horse").click(horseClicked);
  $(".bishop").click(bishopClicked);
  $(".queen").click(queenClicked);
  $(".king").click(kingClicked);
}
function emptyVars() {
  //a bunch of variables that refresh everytime it's used, jic
  var lastClicked = "";
  var classArray = "";
  var currentMoves = "";
  var currentMoves = [];
  var currentMovesY = [];
  var currentMovesX = [];
}
function placement(){
  /*all the images of the pieces, with classes on: 
  - piece type
  - color type
  - movable (on all white pieces)
  the movable class is toggled for all pieces after a piece moves, therefore this creates alternating "turns".
  i tried doing this on activateEventClick() through another method but it was too complicated*/

  /*pawn
  takes the entire row, therefore doesn't have to specify the amount of pawns*/
  {var wpawn = $("<img width='80px' height = '80px' class='whitePiece pawn movable' src='https://images.vexels.com/media/users/3/143290/isolated/preview/3dc0e132939ad9ebff880b64637ea820-pawn-chess-figure-white-by-vexels.png'>");
    var bpawn = $("<img width='80px' height = '80px' class='blackPiece pawn' src='https://images.vexels.com/media/users/3/143289/isolated/preview/759a1d9598eae60232ca7a56b19f5a7d-pawn-chess-figure-by-vexels.png'>");
    $(".B").append(bpawn);
    $(".G").append(wpawn);}
  
  /*rook
  faces opposition position, only the rows are different*/
  {var prook = ["0", "7"];
   for (i=0;i<2;i++) {
     var wrook = $("<img width='80px' height = '80px'  class='whitePiece rook movable' src='https://images.vexels.com/media/users/3/143224/isolated/preview/be2b821fd2c442cd1a7e26bc086ba091-rook-chess-figure-white-by-vexels.png'>");
    var brook = $("<img width='80px' height = '80px'  class='blackPiece rook'  src='https://images.vexels.com/media/users/3/143223/isolated/preview/2ac9bfd45b5f61c5425789214ce4ea4e-rook-chess-figure-by-vexels.png'>");
     $(".A."+prook[i]).append(brook);
     $(".H."+prook[i]).append(wrook);
  } 
 }
  /*horse
  faces opposition position, only the rows are different*/
  {var phorse = ["1", "6"];
   for (i=0;i<2;i++) {
     var whorse = $("<img width='80px' height = '80px'   class='whitePiece horse movable' src='https://images.vexels.com/media/users/3/143173/isolated/preview/b34a47b2a0e9d773aa199f7ae0f0a7ca-knight-chess-figure-by-vexels.png'>");
    var bhorse = $("<img width='80px' height = '80px'   class='blackPiece horse' src='https://images.vexels.com/media/users/3/143174/isolated/preview/34f1b2b61373f599d8f735e91ce37851-knight-chess-figure-black-by-vexels.png'>");
     $(".A."+phorse[i]).append(bhorse);
     $(".H."+phorse[i]).append(whorse);
  } 
 }
  /*bishop
  faces opposition position, only the rows are different*/
  {var pbishop = ["2", "5"];
   for (i=0;i<2;i++) {
     var wbishop = $("<img width='100px' height = '80px' class='whitePiece bishop movable' src='https://images.vexels.com/media/users/3/143272/isolated/preview/270aa40d920d040a999bc44d27a2e114-bishop-chess-figure-white-by-vexels.png'>");
    var bbishop = $("<img width='100px' height = '80px' class='blackPiece bishop' src='https://images.vexels.com/media/users/3/143271/isolated/preview/a787a26d69a5c257e7f05d7d416f9389-bishop-chess-figure-by-vexels.png'>");
     $(".A."+pbishop[i]).append(bbishop);
     $(".H."+pbishop[i]).append(wbishop);
  } 
 }
  /*queen
  doesn't face opposition position, specific coordinates*/
  {var wqueen = $("<img width='90px' height = '80px' class='whitePiece queen movable' src='https://images.vexels.com/media/users/3/143217/isolated/preview/b37faca0051e61f5f393c949c1f4907e-queen-chess-figure-white-by-vexels.png'>");
   var bqueen = $("<img width='90px' height = '80px' class='blackPiece queen' src='https://images.vexels.com/media/users/3/143216/isolated/preview/2ae1ced518237938f0aa487655a0362b-queen-chess-figure-black-by-vexels.png'>");
     $(".A.4").append(bqueen);
     $(".H.4").append(wqueen);
 }
  /*king
  doesn't face opposition position, specific coordinates*/
  {var wking = $("<img width='90px' height = '80px'  class='whitePiece king movable' src='https://images.vexels.com/media/users/3/143267/isolated/preview/80c9ad2648bc76689e7167cfd68306e4-king-chess-figure-by-vexels.png'>");
   var bking = $("<img width='90px' height = '80px'  class='blackPiece king' src='https://images.vexels.com/media/users/3/143268/isolated/preview/efccbb14ab51440300ce79d55dc23551-king-chess-figure-black-by-vexels.png'>");
     $(".A.3").append(bking);
     $(".H.3").append(wking);
 }}
// function allBlackMoves() {
//   /*this function analyses all black movable and eatable moves, even if there's nothing on the block now.
//   this is used to later analyse kings moves and initiate checkmate*/

//   /*checking all pawns...*/
//   if ($(".pawn.blackPiece").parent().hasClass("B")) {
//     console.log("test");
//     for (z=0;z<2;z++){
//       $("."+yCoordinates[z+2]+"."+classArray[2]).addClass("temp");
//     }
//   }

//   /*checking all rooks...*/
//   for (var i=0;i<$(".rook.blackPiece").length;i++){
//     console.log("rook");
//   }

//   /*checking all bishop...*/
//   for (var i=0;i<$(".bishop.blackPiece").length;i++){
//     console.log("bishop");
//   }

//   /*checking all horse...*/
//   for (var i=0;i<$(".horse.blackPiece").length;i++){
//     console.log("horse");
//   }

//   /*checking all queen...*/
//   for (var i=0;i<$(".queen.blackPiece").length;i++){
//     console.log("queen");
//   }

//   /*checking all king...*/
//   for (var i=0;i<$(".king.blackPiece").length;i++){
//     console.log("king");
//   }
// }
// function allWhiteMoves() {
//   /*this function analyses all black movable and eatable moves, even if there's nothing on the block now.
//   this is used to later analyse kings moves and initiate checkmate*/

//   /*checking all pawns...*/
//   for (var i=0;i<$(".pawn.whitePiece").length;i++){
//     $(".pawn.whitePiece").parent().addClass("temp");
//   }

//   /*checking all rooks...*/
//   for (var i=0;i<$(".rook.whitePiece").length;i++){
//     console.log("rook");
//   }

//   /*checking all bishop...*/
//   for (var i=0;i<$(".bishop.whitePiece").length;i++){
//     console.log("bishop");
//   }

//   /*checking all horse...*/
//   for (var i=0;i<$(".horse.whitePiece").length;i++){
//     console.log("horse");
//   }

//   /*checking all queen...*/
//   for (var i=0;i<$(".queen.whitePiece").length;i++){
//     console.log("queen");
//   }

//   /*checking all king...*/
//   for (var i=0;i<$(".king.whitePiece").length;i++){
//     console.log("king");
//   }
// }
function pieceClicked() {
  /*whenever a piece is clicked, and you want to change your mind- 
  it's necessary to get rid of th previous toggled classes 
  so it clears the board and doesn't let other pieces move any coordinates it shouldn't go.

  ~as seen, there are two classes~
  special: highlights where the specific piece can go
  eat: highlights the possibility to eat the oppositions pieces*/
  
  for (var i=0;i<64;i++){
    $("#"+i).removeClass("special");
    $("#"+i).removeClass("eat");
    $("#"+i).removeClass("temp");
  }
  
  /*classArray shows the classes of the image/tile clicked
  this makes identifying different type of pieces/tiles (e.g. a white rook, all pawns, any image at tile .A.4) easier 
  i use this to identify special cases (e.g.the pawns special two blocks moves only when they're at their starting position)
  to get all the classes of a piece/tile, i take the class of the clicked and split it so that i only get the words (aka their assigned classes)*/
  classArray = lastClicked.attr("class").split(" ");}
  
/*activating functions below at the start:
- making sure all variables are clear
- generate board
- putting pieces in their initial positions
this links to the restart button, making sure everything has restarted.
*/

emptyVars();
generateBoard();
placement();

/*whenever pawns are clicked*/
function pawnClicked(){
  /*making sure it's the corrent turn*/
  if ($(this).hasClass("movable")){
    /*lastClicked = tile
    as classArray = lastClicked classes, i get the coordinates of the image*/
    lastClicked = $(this).closest("div");
    console.log("pawn clicked!");
    /*go to pieceClicked for more info on this function*/
    pieceClicked();
    
    /*pawns bio:
    √ at the start, they have the opportunity to move two blocks instead of one
    √ other than that exception, they can only move one block at a time
    √ unlike other pieces, they can't eat the opposition piece when they're in the pawns path
      √ however, this gives them the special move to eat if the opposition piece is **diagonally in front of them**
    √ they can only move forward
      - however, once they reach to the other end of the board, they can get promoted to either a knight, rook or queen
    yeah, they have a lot of conditions.

    approach:
    since white pawns and black pawns goes the opposite direction:
    normalBPawn/normalWPawn = identifies the coordinates of the block they can move
    eatableBPawn/eatableWPawn = identifies the coordinates of the block they can eat
      - (normal/eatable)BPawn = exclusively for black pawns, vice versa*/
    var normalBPawn = "."+yCoordinates[yCoordinates.indexOf(classArray[1]) + 1]+"."+classArray[2];
    var normalWPawn = "."+yCoordinates[yCoordinates.indexOf(classArray[1]) - 1]+"."+classArray[2];
    var eatableBPawn = ["."+yCoordinates[yCoordinates.indexOf(classArray[1]) + 1]+"."+(parseInt(classArray[2])+1), "."+yCoordinates[yCoordinates.indexOf(classArray[1]) + 1]+"."+(parseInt(classArray[2])-1)];
    var eatableWPawn = ["."+yCoordinates[yCoordinates.indexOf(classArray[1]) - 1]+"."+(parseInt(classArray[2])+1), "."+yCoordinates[yCoordinates.indexOf(classArray[1]) - 1]+"."+(parseInt(classArray[2])-1)];
    
    /*SPECIAL INITIAL MOVES: black pawns
    if it's on row B and is a black piece... (see first point of pawn bio)*/
    if (classArray[1] == "B" && $(this).hasClass("blackPiece") ){
       for(var z=0;z<2;z++){
         currentMoves = $("."+yCoordinates[z+2]+"."+classArray[2]);
         /*approach: if they can't see another piece, they can move.
         this is so that they are restricted and can't mess the board by sharing one space with another piece. 
         (remember that this applies to white pieces too, check third point of pawns bio)*/
         if ($(currentMoves).find("img").length == 0){
         currentMoves.addClass("special");
          }
        }
    }
    /*SPECIAL MOVES: white pawns
    if it's on row G and is a white piece... (see first point of pawn bio)*/
    else if (classArray[1] == "G" && $(this).hasClass("whitePiece") ){
      for(var z=0;z<2;z++){
        /*in terms of board positions, they're on the 6th y-coordinate
        to move 2 steps forward, you have to target rows 4 and 5*/
        currentMoves = $("."+yCoordinates[z+4]+"."+ classArray[2]);
        /*approach: if they can't see another piece, they can move.
         this is so that they are restricted and can't mess the board by sharing one space with another piece. 
         (remember that this applies to white pieces too, check third point of pawns bio)*/
       if ($(currentMoves).find("img").length == 0){
         currentMoves.addClass("special");
        }
      }
    }
    /*NORMAL MOVES: black pawns
    if it's not on row B, is a black piece...*/
    else if($(this).hasClass("blackPiece")){
      /*and if there are no pieces blocking its path... highlight the coordinates it can move to*/
      if ($(normalBPawn).find('img').length==0){
        $(normalBPawn).addClass("special");
      }
    }
    /*NORMAL MOVES: white pawns
    if it's not on row G, is a white piece...*/
    else if ($(this).hasClass("whitePiece")){
      /*and if there are no pieces blocking its path... highlight the coordinates it can move to*/
      if ($(normalWPawn).find('img').length==0){
        $(normalWPawn).addClass("special");
      }
    }
      
    /*SPECIAL EATING MOVE
    since there are two possible coordinates that this condition can activate at once...*/
    for (var i=0;i<2;i++) {
      /*if it's a white pawn and spots a blackPiece class in an eatable condition from the white pawn*/
      if ($(this).hasClass("whitePiece") && $(eatableWPawn[i]).find(".blackPiece").length == 1) {
        $(eatableWPawn[i]).addClass("eat");
      }
      /*if it's a black pawn and spots a whitePiece class in an eatable condition from the black pawn*/
      else if ($(this).hasClass("blackPiece") && $(eatableBPawn[i]).find(".whitePiece").length == 1) {
        $(eatableBPawn[i]).addClass("eat");
      }
    }
    /*PROMOTION*/

    /*END*/
  }
}

/*whenever rooks are clicked*/
function rookClicked(){
  /*making sure it's the corrent turn*/
  if ($(this).hasClass("movable")){
    /*lastClicked = tile
    as classArray = lastClicked classes, i get the coordinates of the image*/
    lastClicked = $(this).closest("div");
    console.log("rook clicked!");
    /*go to pieceClicked for more info on this function*/
    pieceClicked();
    
    /*rooks bio:
    √ they move horizontally/vertically 
    √ the extent they can move depends whether there's a piece in the way of their path
      - if it's a black piece, they have the ability to eat it
      - if it's a white piece, they are just blocked.
    - they have a special move with the king called castling*/
    currentMoves = ["."+classArray[1], "."+classArray[2]];
    /*if they didn't have to mind pieces on their path:
    for (var i=0;i<2;i++){
      $(currentMoves[i]).toggleClass("special");}*/

    /*NORMAL MOVES:
    while loops were used here as i felt i had more control, see below for more.
    q = all four possible directions
    i = all blocks in that specific direction*/
    for (q=0;q<4;q++){
      var i=1
      while (i<8){
        /*this is kind of confusing to understand but basically these are the four directions, where...
        x=+ve, y=+ve, x=-ve and y=-ve
        to loop through all these directions, yet cover all blocks:
          - the q loop chooses which direction.
          - the i loop looks at all the blocks.
        the i loop breaks when the coordinate identifies a piece, but the q loop remains, so it changes the direction*/
        var anythingYpluscoords = "."+yCoordinates[yCoordinates.indexOf(classArray[1]) + i] + "."+classArray[2];
        var anythingXpluscoords = "."+classArray[1]+"."+(parseInt(classArray[2])+i);
        var anythingYnegcoords = "."+yCoordinates[yCoordinates.indexOf(classArray[1]) - i] + "."+classArray[2];
        var anythingXnegcoords = "."+classArray[1]+"."+(parseInt(classArray[2])-i);
        
        var anything = [anythingYpluscoords, anythingXpluscoords, anythingYnegcoords, anythingXnegcoords];

        /*if a img hasn't been identified at that coordinate...*/
        if ($(anything[q]).find("img").length==0){
          /*...highlight the coordinate and continue loop i*/
         $(anything[q]).addClass("special");
         i++;
        }

        /*if a img HAS been identified... 
        ...it's either an blocking piece or edible piece, depending whether it's a piece of opposition or not

        if the rook clicked a white piece...*/
        else if ($(this).hasClass("whitePiece")){
          /*...and a white piece blocks the way, it won't be able to get on that coordinate*/
          if ($(anything[q]).find(".whitePiece").length==1){
            break;
          }
          /*...and a black piece blocks the way, it can get on that coordinate by eating it
          but can't move any further*/
          else if ($(anything[q]).find(".blackPiece").length==1){
           $(anything[q]).addClass("eat");
           break;
          }
        }
        /*if the rook clicked a black piece...*/
        else if ($(this).hasClass("blackPiece")){
          /*...and a black piece blocks the way, it won't be able to get on that coordinate*/
          if ($(anything[q]).find(".blackPiece").length==1){
           break;
          }
          /*...and a white piece blocks the way, it can get on that coordinate by eating it
          but can't move any further*/
          else if ($(anything[q]).find(".whitePiece").length==1){
           $(anything[q]).addClass("eat");
           break;
          }
        }
      }
      console.log("checking next direction");
      /*once finishing all of i in this q loop, the q loop continues until it's done

      NORMAL MOVES: END*/
    }

    /*SPECIAL CASTLING MOVE:
      - only activated when clicking on king*/

    /*END*/
  }
}

/*√whenever horses are clicked*/
function horseClicked() {
  /*making sure it's the corrent turn*/
  if ($(this).hasClass("movable")){
    /*lastClicked = tile
    as classArray = lastClicked classes, i get the coordinates of the image*/
    lastClicked = $(this).closest("div");
    console.log("horse clicked!");
    /*go to pieceClicked for more info on this function*/
    pieceClicked();

    /*horse bio:
    √ they move in an L shape for all coordinates (8 in total)
    √ they DON'T get blocked by pieces*/
    
    /*because it's in an L shape, i decided to draw the coordinates and realised most of them where either in a difference of 1s or 2s on both axis 
    therefore, horsey and horsex (yes, it's intentional).
    there're no coordinates like (2,2), thus horsey and horsex have alternating 1s and 2s positions
    var ycoords is just there to read the code easier*/
    currentMoves = [];
    var ycoords = "";
    var horsey = [2, -2, 1, -1];
    var horsex = [1, -1, 2, -2];

    /*NORMAL MOVES: identifying them
    this gets complicated...
    since there are two types of L rotations, I use 4 for loops to go through each position in its original and reverse form*/
    for (var z=0;z<2;z++){
      for(var i=0;i<2;i++){
        ycoords = "."+yCoordinates[yCoordinates.indexOf(classArray[1]) + horsey[z]];
        /*those identified moves are then pushed into the currentMoves array*/
        currentMoves.push($(ycoords+"."+(parseInt(classArray[2])+horsex[i])));
      }
    }

    for (var z=2;z<5;z++){
      for(var i=2;i<5;i++){
        ycoords = "."+yCoordinates[yCoordinates.indexOf(classArray[1]) + horsey[z]];
        currentMoves.push($(ycoords+"."+(parseInt(classArray[2])+horsex[i])));
      }
    }
    /*NORMAL MOVES: adding special classes*/
    for (var i=0;i<9;i++){
      if ($(this).hasClass("whitePiece")) {
        if (currentMoves[i].find(".blackPiece").length==1){
          currentMoves[i].addClass("eat");
        }
        else if (currentMoves[i].find(".whitePiece").length==0){
        currentMoves[i].addClass("special");
        }
      }

      else if ($(this).hasClass("blackPiece")) {
        if (currentMoves[i].find(".whitePiece").length==1){
          currentMoves[i].addClass("eat");
        }
        else if (currentMoves[i].find(".blackPiece").length==0){
          currentMoves[i].addClass("special");
        }
      }
    }
  }
}

/*whenever bishops are clicked*/
function bishopClicked() {
  /*making sure it's the corrent turn*/
  if ($(this).hasClass("movable")){
    /*lastClicked = tile
    as classArray = lastClicked classes, i get the coordinates of the image*/
    lastClicked = $(this).closest("div");
    console.log("bishop clicked!");
    /*go to pieceClicked for more info on this function*/
    pieceClicked();

    /*bishop bio:
    √ they're like the rook, but move diagionally on all sides 
    √ the extent they can move depends whether there's a piece in the way of their path
      - if it's a black piece, they have the ability to eat it
      - if it's a white piece, they are just blocked.

      unlike the rooks, it's a little harder to find coordinates diagional from the piece
      however, it's pretty much the same tactic, i made it easier to read using currentMoves1, 2, 3 and 4, then pushing it all to the main currentMoves
      this is important since if i did it without this order, I wouldn't be able to explore all the coordinates in that one direction.*/
    currentMoves1 = [];
    currentMoves2 = [];
    currentMoves3 = [];
    currentMoves4 = [];

    for (var i=1;i<8;i++) {
      currentMoves1.push($("."+yCoordinates[yCoordinates.indexOf(classArray[1]) + i]+"."+(parseInt(classArray[2])+i)));
      currentMoves2.push($("."+yCoordinates[yCoordinates.indexOf(classArray[1]) - i]+"."+(parseInt(classArray[2])+i)));
      currentMoves3.push($("."+yCoordinates[yCoordinates.indexOf(classArray[1]) + i]+"."+(parseInt(classArray[2])-i)));
      currentMoves4.push($("."+yCoordinates[yCoordinates.indexOf(classArray[1]) - i]+"."+(parseInt(classArray[2])-i)));
    }
    currentMoves = [currentMoves1, currentMoves2, currentMoves3, currentMoves4];

    /*for more info, check rooks*/
    for (var q=0;q<4;q++){
      var i=0;
      while (i<8){

        /*movable coordinates*/
        if ($((currentMoves[q])[i]).find("img").length==0){
          console.log("found space! "+i);
          $((currentMoves[q])[i]).addClass("special");
          i++;
        }
        /*if it's a white piece*/
        else if ($(this).hasClass("whitePiece")){
          console.log("it's a white bishop!");

          if ($((currentMoves[q])[i]).find(".whitePiece").length==1){
            console.log("saw white piece! "+i);
            break;
          }
          /*edible coordinate*/
          else if ($((currentMoves[q])[i]).find(".blackPiece").length==1){
            console.log("saw black piece "+i);
            $((currentMoves[q])[i]).addClass("eat");
            break;
          }
        }
        /*if it's a black piece*/
        else if ($(this).hasClass("blackPiece")){
          console.log("it's a black bishop!");

          if ($((currentMoves[q])[i]).find(".blackPiece").length==1){
            console.log("saw black piece "+i);
            break;
          }
          /*edible coordinate*/
          else if ($((currentMoves[q])[i]).find(".whitePiece").length==1){
            console.log("saw white piece! "+i);
            $((currentMoves[q])[i]).addClass("eat");
            break;
          }
        }
        /*move onto next loop*/
        console.log("finding other moves conditions");
      }
    }
    /*END*/
  }
}

/*whenever queens are clicked*/
function queenClicked() {
  /*making sure it's the corrent turn*/
  if ($(this).hasClass("movable")){
    /*lastClicked = tile
    as classArray = lastClicked classes, i get the coordinates of the image*/
    lastClicked = $(this).closest("div");
    console.log("queen clicked!");
    /*go to pieceClicked for more info on this function*/
    pieceClicked();

    /*queen bio:
    √ has the most power as it travels diagionally, horizontally and vertically 
       - basically the power of rooks and bishops combined
    √ the extent they can move depends whether there's a piece in the way of their path
      - if it's a black piece, they have the ability to eat it
      - if it's a white piece, they are just blocked.
    because it's all copied and pasted code, I won't attach comments except for whether it's a rook or bishop section. 
    therefore, please go to those pieces for more info
    
    rook moves*/
    currentMoves = ["."+classArray[1], "."+classArray[2]];
    var q=0
    while (q<4){
      var i=1
      while (i<8){
        var anythingYpluscoords = "."+yCoordinates[yCoordinates.indexOf(classArray[1]) + i] + "."+classArray[2];
        var anythingXpluscoords = "."+classArray[1]+"."+(parseInt(classArray[2])+i);
        var anythingYnegcoords = "."+yCoordinates[yCoordinates.indexOf(classArray[1]) - i] + "."+classArray[2];
        var anythingXnegcoords = "."+classArray[1]+"."+(parseInt(classArray[2])-i);
        
        var anything = [anythingYpluscoords, anythingXpluscoords, anythingYnegcoords, anythingXnegcoords];

        if ($(anything[q]).find("img").length==0){
         $(anything[q]).addClass("special");
         i++;
        }
        else if ($(this).hasClass("whitePiece")){
          if ($(anything[q]).find(".whitePiece").length==1){
           break;
          }
          else if ($(anything[q]).find(".blackPiece").length==1){
           $(anything[q]).addClass("eat");
           break;
          }
        }
        else if ($(this).hasClass("blackPiece")){
          if ($(anything[q]).find(".blackPiece").length==1){
            break;
          }
          else if ($(anything[q]).find(".whitePiece").length==1){
           $(anything[q]).addClass("eat");
           break;
          }
        }
      }
      console.log("checking next direction");
      q++;
    }

    /*bishop moves*/
    currentMoves1 = [];
    currentMoves2 = [];
    currentMoves3 = [];
    currentMoves4 = [];

    for (var i=1;i<8;i++) {
      currentMoves1.push($("."+yCoordinates[yCoordinates.indexOf(classArray[1]) + i]+"."+(parseInt(classArray[2])+i)));
      currentMoves2.push($("."+yCoordinates[yCoordinates.indexOf(classArray[1]) - i]+"."+(parseInt(classArray[2])+i)));
      currentMoves3.push($("."+yCoordinates[yCoordinates.indexOf(classArray[1]) + i]+"."+(parseInt(classArray[2])-i)));
      currentMoves4.push($("."+yCoordinates[yCoordinates.indexOf(classArray[1]) - i]+"."+(parseInt(classArray[2])-i)));
    }
    currentMoves = [currentMoves1, currentMoves2, currentMoves3, currentMoves4]

    for (var q=0;q<4;q++){
      var i=0;
      while (i<8){
        if ($((currentMoves[q])[i]).find("img").length==0){
          console.log("found space! "+i);
          $((currentMoves[q])[i]).addClass("special");
          i++;
        }
        else if ($(this).hasClass("whitePiece")){
         console.log("it's a white bishop!");

         if ($((currentMoves[q])[i]).find(".whitePiece").length==1){
           console.log("saw white piece! "+i);
           break;
          }
          else if ($((currentMoves[q])[i]).find(".blackPiece").length==1){
            console.log("saw black piece "+i);
            $((currentMoves[q])[i]).addClass("eat");
            break;
          }
        }
        else if ($(this).hasClass("blackPiece")){
          console.log("it's a black bishop!");
          if ($((currentMoves[q])[i]).find(".blackPiece").length==1){
            console.log("saw black piece "+i);
            break;
          }
          else if ($((currentMoves[q])[i]).find(".whitePiece").length==1){
            console.log("saw white piece! "+i);
            $((currentMoves[q])[i]).addClass("eat");
            break;
          }
        }
        console.log("finding other moves conditions");
      }
    }
  }
}

/*whenever kings are clicked*/
function kingClicked() {
  /*making sure it's the corrent turn*/
  if ($(this).hasClass("movable")){
    /*lastClicked = tile
    as classArray = lastClicked classes, i get the coordinates of the image*/
    lastClicked = $(this).closest("div");
    console.log("king clicked!");
    /*go to pieceClicked for more info on this function*/
    pieceClicked();

    /*king bio:
    √ he's like the queen, but can only move one space at a time like a pawn
    - if a black piece has the ability to eat him in their next turn, check
    - if there are no pieces that can block the piece moves, the king can't go anywhere else and the piece has the ability to eat the king, checkmate.
      - this means we have to analyse whether the pieces eat moves touch the kings possible moves, at every turn.
      - this also means the king can't touch any pieces eat moves that will result in his end
    - castling, a combo move with the rook

    NORMAL MOVES:
    currentMoves are split again in terms of x and y axis. however, if x and y = 0, it gives the kings coordinate itself.
    therefore, to isolate this, i used two different loops:*/
    var currentMovesY = [yCoordinates[yCoordinates.indexOf(classArray[1])], yCoordinates[yCoordinates.indexOf(classArray[1]) - 1], yCoordinates[yCoordinates.indexOf(classArray[1]) + 1]];
    var currentMovesX = [parseInt(classArray[2]), (parseInt(classArray[2])-1), (parseInt(classArray[2])+1)];
    
    for (var x=1;x<3;x++) {
      if ($("."+currentMovesY[0]+ "."+currentMovesX[x]).find("img").length == 0) {
        console.log("see no pieces! "+x);
        $("."+currentMovesY[0]+ "."+currentMovesX[x]).addClass("special");
      }

      else if ($("."+currentMovesY[0]+ "."+currentMovesX[x]).find(".blackPiece").length == 1){
        console.log("see black pieces! "+x);
        $("."+currentMovesY[0]+ "."+currentMovesX[x]).addClass("eat");
      }
    }
    for (var x=0;x<3;x++) {
        for (var y=1;y<3;y++) {
          if ($("."+currentMovesY[y]+ "."+currentMovesX[x]).find("img").length == 0) {
          console.log("see no pieces! "+x+y);
          $("."+currentMovesY[y]+ "."+currentMovesX[x]).addClass("special");
        }

      else if ($("."+currentMovesY[y]+ "."+currentMovesX[x]).find(".blackPiece").length == 1){
        console.log("see black pieces! "+x+y);
        $("."+currentMovesY[y]+ "."+currentMovesX[x]).addClass("eat");
        }
      }
    }
    /*AVOIDING BLACK EAT MOVES:*/
    /*CASTLING MOVE:*/
    /*END*/
  }
}

/*after determining all the piece click functions, we can finally call the activateEventClick function*/
activateEventClick()

/*when clicking on a tile...*/
$(".tile").click(function(){
  /*reactivate all piece clicks*/
  activateEventClick();

  // if ($(".whitePiece").hasClass("movable")){
  //   allBlackMoves();
  // }

  // else if ($(".blackPiece").hasClass("movable")){
  //   allWhiteMoves();
  // }
  /*if the tile clicked is a movable coordinate activated by the piece clicked-
  this probably means that the player wants to move the piece to the movable coordinate clicked. therefore:*/
  if($(this).hasClass("special")){
    console.log("special tile clicked");
    /*toggle class movable to switch white/black turns*/
    $("img").toggleClass("movable");
    
    /*tl;dr: Fisher Yates algorihm case, except just use to save the img.
    more details: to move a piece, i saved the html of the div (img) onto variable currentImg and empty the div.
    then, I append the currentImg to "this" which is the div clicked.

    now that the img is there, we can't forget to reactivateEventClick.
    after confirming a move, we also need to deactivate all movable/edible boxes so the next pieces doesn't teleport there.*/
    var currentImg = $(lastClicked).html();
    $(lastClicked).html("");
    $(this).append($(currentImg));
    activateEventClick();
    emptyVars();
    pieceClicked();
  
    /*checking white kings moves
    class has been toggled, thus it should be white's turn.*/
    if ($(".whitePiece").hasClass("movable")){
      /*analyse whether a black piece has the ability to eat the king = check*/
      /*analyse whether a white piece can eat that black piece, if not = checkmate*/
    }
  }

  /*this if statement is similar to the previous if statement, refer there for more details.
  however, changes will be noted.*/
  else if($(this).hasClass("eat")){
    console.log("eating has commenced");
    $("img").toggleClass("movable");
    var currentImg = $(lastClicked).html();
    /*not only saving the piece eating, but also the piece being eaten.*/
    var eatenPiece = $(this).html();
    console.log(eatenPiece);
    $(lastClicked).html("");
    $(this).html("");
    $(this).append($(currentImg));

    /*the eaten piece is now directed to the billboard of RIP*/
    if ($(eatenPiece).hasClass("whitePiece")) {
      $("#RIPwhite").append($(eatenPiece));
    }

    else if ($(eatenPiece).hasClass("blackPiece")) {
      $("#RIPblack").append($(eatenPiece));
    }

    activateEventClick();
    emptyVars();
    pieceClicked();
  }
  /*END*/
});

/*function activated when pressing the restart button*/
function restart(){
  /*for all divs, remove everything*/
  for (var i=0;i<64;i++) {
    $("#"+i).html("");
    $("#"+i).removeClass("special");
    $("#"+i).removeClass("eat");
  }
  /*put pieces placements, activateEventClick and empty all vars == new state!*/
  placement()
  activateEventClick()
  emptyVars()
  /*END*/
}

/*
things left to do:
- analyse all king's possible moves, remove class if:
  - any rival piece possible moves able to start eating function on king
  - blocking own pieces (automatic)
- castling
- opt: null all pieces moves when king's checked
- opt: wining sign (e.g. C H E C K M A T E)
- opt: log
*/