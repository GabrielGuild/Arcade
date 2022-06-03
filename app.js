//gamestate here we have the inital game before data 
let gameState = {
    xAxis: 31, //these control the size of the board for easy sizing 
    yAxis: 30,
    gamestart: false,
    firstRun: true,
    playerName: '',
    //below is where tile data is stored and pushed too 
    tile: [
       
    ] ,


    //will hold snake data 
        snake: [],
        nextDirection: [0,1],
        apple: 0,

    // renders the board and adds appropriate data sets
    render(){
        //below creates a playspace to hold the created div for our playspace 
        this.gamestart = true;
        let board = document.querySelector('#board')
        board.innerHTML = ''
        let playspace = document.createElement('div')
        playspace.className = 'playspace'
        board.appendChild(playspace);
        
        //declarations for the render function data 
        let coordinate = {
            coordinateX: 0,
            coordinateY: 0,
        }
        let j = 0
        for(let y = 0; y < this.yAxis; y++){
            for(let x = 0; x < this.xAxis; x++){

                //creates the divs for the gameboard and assigns their x and y
                
                let square = document.createElement('div');
                square.className = "tile"
                square.dataset.tileNum = j +1;
                square.dataset.x = x + 1;
                square.dataset.y = y + 1;
                j++;
                playspace.appendChild(square);
                this.tile.push(coordinate);
                coordinate.coordinateX++;
            }
            coordinate.coordinateY++;
        }
        this.getApple(j);
    },
    menu(){
        //real simple just changes the menu layout based on the state of the game 
        let menuControls = document.querySelector('.menuControls')
        menuControls.innerHTML = ''
        let startText = ` `
        if(!this.gamestart){
            startText = `
            <input placeholder ='PlayerName' type = "text">
            <button type="button"  class = "play">Play</button>
            `
            }else if(this.gamestart){
                startText = `
                <button type = "button" class = "Reset">Reset</Reset>
                `
            }
        menuControls.innerHTML = startText;
    },

    tick(){
        //main game function moves snake and checks for loose condition 
        // or growth conditions
        //declares helper object to pass through 
        let body = {
            x: 0,
            y: 0,
        }
        let headIndex = document.querySelector(`[data-tile-num${this.apple}]`);
        let htmlApple
        //new event lsitener 

        //this if statement sets the head to the first or middle postion 
        if(this.firstRun){
            //the middle postion is calculated from the board size calculation 
            body.x = Math.round(this.xAxis/2) /1;
            body.y = Math.round(this.yAxis/2) /1;
            this.snake.push(body);

            let head = document.querySelector(`[data-x="${body.x}"][data-y="${body.y}"]`);
            head.classList.toggle('snake');
            this.firstRun = false;
            return;
          }else if(head){

          }
          else{
              //main loop that handles the change of any body postioins 
            for(let i = 0; i < this.snake.length; i++){
                body.x = this.snake[i].x
                body.y = this.snake[i].y

                let oldHead = document.querySelector('.snakeHead');
                oldHead.classList.toggle('snakeHead');

            
                body.y = this.snake[i].y + this.nextDirection[1];
                body.x = this.snake[i].x + this.nextDirection[0];
                this.snake[i].y = this.snake[i].y + this.nextDirection[1];
                this.snake[i].x  = this.snake[i].x + this.nextDirection[0];

                console.log('before addition y', this.snake[i].y);
                // this.snake.splice(0,1,body.x);
                let head = document.querySelector(`[data-x="${body.x}"][data-y="${body.y}"]`);
                console.log('x is ', body.x);
                console.log('y is ', body.y);
                head.classList.toggle('snakeHead');
            }
        }
        //get new apple


    },
    //nextDirection[0] = xaxis addition nextDirection[1] = y
    getNextDirectionRight(){
        let newDirection  = [];
        let oldDirection = [];
        oldDirection[0] = this.nextDirection[0];
        oldDirection[1] = this.nextDirection[1];

        (oldDirection[0] === 0 && oldDirection[1] === 1) //down case
        ? (newDirection[0] = -1, newDirection[1] = 0):
        (oldDirection[0] === 1 && oldDirection[1] === 0) //right case
        ? (newDirection[0] = 0, newDirection[1] = 1):
        (oldDirection[0] === -1 && oldDirection[1] === 0) //left case
        ? (newDirection[0] = 0, newDirection[1] = -1):
        (oldDirection[0] === 0 && oldDirection[1] === -1) //up case
        ? (newDirection[0] = 1, newDirection[1] = 0):

        console.log('old direction x', oldDirection[0]);
        console.log('old direction y', oldDirection[1]);

        this.nextDirection.splice(0,  1, newDirection[0])
        this.nextDirection.splice(1,  1, newDirection[1])

    },
    
    getNextDirectionLeft(){
        
        let newDirection = [];
        let oldDirection = [];
        oldDirection[0] = this.nextDirection[0];
        oldDirection[1] = this.nextDirection[1];

        (oldDirection[0] === 0 && oldDirection[1] === 1) //down case
        ? (newDirection[0] = 1, newDirection[1] = 0):
        (oldDirection[0] === 1 && oldDirection[1] === 0) //right case
        ? (newDirection[0] = 0, newDirection[1] = -1):
        (oldDirection[0] === -1 && oldDirection[1] === 0) //left case
        ? (newDirection[0] = 0, newDirection[1] = 1):
        (oldDirection[0] === 0 && oldDirection[1] === -1) //up case
        ? (newDirection[0] = -1, newDirection[1] = 0):

        console.log('old direction x', oldDirection[0]);
        console.log('old direction y', oldDirection[1]);

        this.nextDirection.splice(0,  1, newDirection[0])
        this.nextDirection.splice(1,  1, newDirection[1])
    },
    getApple(tileNum){
        if(this.apple !== 0){

            let oldApple = document.querySelector('.apple');
            oldApple.classList.toggle('apple');
        }
        
        //first get apple
        this.apple = 0;
        this.apple = Math.floor(Math.random() * (tileNum) + 1)
        let newApple =this.apple;
        let htmlApple = document.querySelector(`[data-tile-num="${newApple}"]`);
        htmlApple.classList.toggle('apple');
        
    }

}



//Game start here
gameState.menu();

let startGame = document.querySelector(".play");
startGame.addEventListener('click', function(event){

    //renders board 
    gameState.render();

    //tick needs to happen in interval to checks 
    //move growth and win conditions
    // let test = currentTiles.getAttribute('tileNum');



    setInterval(function(){
        gameState.tick();
    }, 200);

    gameState.menu();


});
let html = document.querySelector('html');
html.addEventListener('keydown', e => {

    if(e.key.toLowerCase() === "arrowright"){
        gameState.getNextDirectionRight();
        
    }else if(e.key.toLowerCase() === "arrowleft"){
        gameState.getNextDirectionLeft();
    }
});




