let uniqueGenres = []
let uniquePrices = []


document.addEventListener("DOMContentLoaded", function (){
   fetch('data.json')
   .then(response => response.json())
   .then(items => {

      items.forEach(item => {

         let game = document.createElement('div');
         game.classList.add('game');
         game.innerHTML =  `
         <div class="image-container">
           <img src="./assets/${game.source}" class="original-img" style="width: 21.4rem;height: 10rem; object-fit: cover; object-position: center center;">
           <img src="./assets/${game.source.replace(/\.\w+$/, 'Y.jpg')}" class="filtered-img" style="width: 21.4rem;height: 10rem; object-fit: cover; object-position: center center;">
       </div>
           <div class="text-block">
             <h2>${paddedNumber} » ${game.name}</h2>
             <p>Platform: <i>${game.platform ? game.platform : ''}</i></p>
             <p>Genre: <i>${game.genre ? game.genre : ''}</i></p>
             <p>Playtime: <i>${game.hrsPlayed ? game.hrsPlayed : ''} </i>Hours</p>
             <p>Comment: <i>${game.note ? game.note : ''}</i></p>
           </div>
         `;
         game.setAttribute('data-price',item.price)
         game.setAttribute('data-genre', item.genre)

         let gameContainer = document.querySelector('.game-container')
         gameContainer.append(game)
         

         if(!uniqueGenres.includes(item.genre) && item.genre){
               uniqueGenres.push(item.genre)
      }

      if(!uniquePrices.includes(item.price) && item.price){
         uniquePrices.push(item.price) //find new data exist skip, none exist push
      } 

      let priceContainer = document.querySelector('.price-container')
      priceContainer.append(game)

      });

     
      uniquePrices.sort((a,b) => b.length - a.length)

      uniquePrices.forEach(uniquePrice => {
 
         let price = document.querySelectorAll('.tag-block1 .tag');
         price.innerHTML = uniquePrice
         price.classList.add('button-price')

         let priceContainer = document.querySelector('.price-container')
         priceContainer.append(price)

         price.setAttribute('data-price',uniquePrice)


         //清除当前filter
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
});


