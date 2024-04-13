document.addEventListener("DOMContentLoaded", function (){
  fetch('data.json')
  .then(response => response.json())
  .then(data => {

  const gameData = data;
  const gameContainerMetro = document.getElementById('game-container-metro');
  let filteredGames = []; 

  
  const priceButtons = document.querySelectorAll('.tag-block2 .tag');
  const genreButtons = document.querySelectorAll('.tag-block1 .tag');

  priceButtons.forEach(button => {
    button.addEventListener('click', () => {
        const selectedPrice = button.dataset.tag;
        const selectedGenre = getSelectedGenre();
        filterGames(selectedPrice, selectedGenre); // Call the filter function
        console.log("button clicked")
    });
});
        genreButtons.forEach(button => {
            button.addEventListener('click', () => {
              const selectedPrice = getSelectedPrice();
              const selectedGenre = button.dataset.tag;
                filterGames(selectedPrice, selectedGenre); // Call the filter function
            });
        });

        function getSelectedPrice() {
          const selectedPriceButton = document.querySelector('.tag-block2 .tag.active');
          return selectedPriceButton ? selectedPriceButton.dataset.tag : ''; // Return selected price tag
        }
    
        function getSelectedGenre() {
          const selectedGenreButton = document.querySelector('.tag-block1 .tag.active');
          return selectedGenreButton ? selectedGenreButton.dataset.tag : ''; // Return selected genre tag
        }

        
      function filterGames(selectedPrice, selectedGenre) {
  

        filteredGames = gameData.forEach(game => {
      const gameElement = document.createElement('div');
      gameElement.classList.add('game'); 
      gameElement.dataset.tags = game.genre;
    
            const paddedNumber = String(game.number).padStart(2, '0');
            const gamePrice = game.price;
    
          

            //根据clicked price对比json里的数据，判断是否显示price
            const shouldShowPrice = (
            !selectedPrice ||
            (selectedPrice === '0' && gamePrice === 0) ||
            (selectedPrice === '100' && gamePrice <= 100) ||
            (selectedPrice === '200' && gamePrice <= 200) ||
            (selectedPrice === '300' && gamePrice <= 300) ||
            (selectedPrice === '400' && gamePrice <= 400) ||
            (selectedPrice === '500' && gamePrice > 400)
          );
    
          //这个是判断genre
          const shouldShowGenre = (!selectedGenre || 
            gameGenre.includes(selectedGenre));
  
        

          if (shouldShowPrice && shouldShowGenre) {
            gameElement.style.display = 'flex';
          } else {
            gameElement.style.display = 'none';
          }
            
  
      gameElement.innerHTML = `
      <div class="image-container">
        <img src="./assets/${game.source}" class="original-img" style="width: 21.4rem;height: 10rem; object-fit: cover; object-position: center center;">
        <img src="./assets/${game.source.replace(/\.\w+$/, 'Y.jpg')}" class="filtered-img" style="width: 21.4rem;height: 10rem; object-fit: cover; object-position: center center;">
    </div>
        <div class="text-block">
          <h2>${paddedNumber} » ${game.name}</h2>
          <p>Genre: <i>${game.genre ? game.genre : ''}</i></p>
          <p>Price: <i>${game.price ? game.price : ''} RMB</i></p>
          <p>Added On Date: <i>${game.addedOnDate ? game.addedOnDate : ''}</i></p>
          <p>Comment: <i>${game.note ? game.note : ''}</i></p>
        </div>
      `;
      gameContainerMetro.appendChild(gameElement);
   
     
    });
  };
  filterGames(getSelectedPrice(), getSelectedGenre());
  price.addEventListener('click', (e) => {
    let currentPrice = e.target.dataset.price      
    let allgames = document.querySelectorAll('.game');
    let allPriceButtons = document.querySelectorAll('.button-price');

    allPriceButtons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
//url
    let activeGenreButton = document.querySelector('.button-genre.active')?.dataset?.genre

    allgames.forEach((game) => { 
       if(activeGenreButton) {
         console.log('currentPrice', currentPrice)
       if(
          currentPrice == game.dataset.price &&
          activeGenreButton.dataset.genre == game.dataset.genre
          ){
          game.classList.remove("hidden");
       }
       else{
          game.classList.add('hidden');
       }
    }else{
       if (currentPrice == game.dataset.price){
          game.classList.remove("hidden");
       }else{
          game.classList.add("hidden");
       }
    }
    });
    
   });
})
console.log('uniqueGenre', uniqueGenres);
console.log('uniquePrices',uniquePrices);


uniqueGenres.forEach(uniqueGenre => {

 let genre = document.createElement('button');
 genre.innerHTML = uniqueGenre

 let genreContainer = document.querySelector('.genre-container')
 genreContainer.append(genre)
})
price.addEventListener('click', (e) => {
 let currentPrice = e.target.dataset.price      
 let allgames = document.querySelectorAll('.game');
 let allGenreButtons = document.querySelectorAll('.button-genre');

 allGenreButtons.forEach(btn => btn.classList.remove('active'));
 e.target.classList.add('active');
//url
 let activePriceButton = document.querySelector('.button-price.active')?.dataset?.price

 allgames.forEach((game) => { 
    if(activePriceButton) {
      console.log('currentPrice', currentPrice)
    if(
       currentPrice == game.dataset.price &&
       activePriceButton.dataset.genre == game.dataset.genre
       ){
       game.classList.remove("hidden");
    }
    else{
       game.classList.add('hidden');
    }
 }else{
    if (currentPrice == game.dataset.price){
       game.classList.remove("hidden");
    }else{
       game.classList.add("hidden");
    }
 }
 });
 
});
  
});


 const btns = document.querySelectorAll('.tag');

 function showGame(gameId) {
  const games = document.querySelectorAll('.game');
  games.forEach(game => {
    const gameTags = game.dataset.tags.split(',');

    if (gameTags.includes(gameId)) {
      game.style.display = 'flex';
    } else {
      game.style.display = 'none';
    }
  });
}

 btns.forEach(btn => {
   btn.addEventListener('click', (e) => {
    let currentTag = e.target.dataset.tag;
    showGame(currentTag);

     btns.forEach(otherBtn => {
       otherBtn.style.backgroundColor = '' ;
     });
 
     btn.style.backgroundColor = '#7530D9';
   });
 });

 
 






  const screenWidth = window.innerWidth;


  function adjustSidenavPosition() {
    const screenWidth = window.innerWidth;
    const sidenav = document.getElementById("mySidenav");

    if (screenWidth <= 768) {
      sidenav.style.right = "-12rem";
    } else {
      sidenav.style.right = "-37.5rem";
    }
  }

  window.addEventListener("resize", adjustSidenavPosition);
  adjustSidenavPosition();
  
  function createTextCursor(event){
    let el = document.getElementById("hoveringText");
      el.style.top = event.clientY + "px";
      el.style.left = event.clientX + "px";
  }
  
  document.getElementById("main").addEventListener('mousemove', createTextCursor);


  function newwin() {              
    myWindow=window.open('https://ni0j.github.io/game-logs/entries/entry2/','myWin','width=400,height=650')
   }