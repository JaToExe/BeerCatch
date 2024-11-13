game();

function game() {

    let heart = 3;
    let score = 0;

    function movement() {
        const hand = document.querySelector('.hand');
        let position = 0;
    
        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft' || event.key === 'a') {
                if (position > -90) {
                    position -= 5;
                    hand.style.marginLeft = position + '%';
                }
            } else if (event.key === 'ArrowRight' || event.key === 'd') {
                if (position < 90) {
                    position += 5;
                    hand.style.marginLeft = position + '%';
                }
            }
        })
    }
    
    function spawn() {
        const beer = document.querySelector('.beer');
        let positionX = Math.floor(Math.random() * 181) - 90;  
    
        beer.style.marginLeft = `calc(${positionX}% - 10px)`;
        beer.style.marginTop = `calc(20px + 2rem)`;
    
        gravity(beer);  
    }
    
    function gravity(beer) {
        let position = 0;  
        let fallSpeed = 4;
    
        if (beer.fallInterval) {
            clearInterval(beer.fallInterval);
        }
    
        beer.fallInterval = setInterval(() => {
            position += fallSpeed;
            beer.style.top = position + 'px';  
    
            checkColision(beer);  
        }, 10);
    }
    
    function checkColision(beer) {
        const hand = document.querySelector('.hand');
        const table = document.querySelector('.table');
    
        const handRect = hand.getBoundingClientRect();
        const beerRect = beer.getBoundingClientRect();
        const tableRect = table.getBoundingClientRect();
    
    
        if (beerRect.bottom >= tableRect.top) {
            lifes();
            spawn();  
        }
    
        if (beerRect.top < handRect.bottom && beerRect.bottom > handRect.top && beerRect.left < handRect.right && beerRect.right > handRect.left) {
            scoreAdd();
            spawn();  
        }
    }
    
    function lifes() {
        const heartBox = document.querySelector('.heart');
        
        if (heart > 0) {
            heart--;
            heartBox.textContent = heart;
        } else {
            const nav = document.querySelector('nav');
            const gameScreen = document.querySelector('.gameScreen');
            const result = document.querySelector('.result');
            const replay = document.querySelector('.replay');
            const scoreBox = document.querySelector('.result .score'); 

            nav.style.display = 'none';
            gameScreen.style.display = 'none';
            result.style.display = 'flex';
    
            scoreBox.textContent = score; 
    
            replay.addEventListener('click', () => {
                window.location.reload(); 
            });
        }
    }
    
    
    function scoreAdd() {
        score++; 
        const scoreBox = document.querySelector('.score');
        scoreBox.textContent = score; 
    }
    
    movement();
    spawn();
}