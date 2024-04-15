let gameData = []
let selectedPriceNow = ""
let selectedGenreNow = ""
let gameContainerMetro = null
let filteredGames = [];
let showItemForm = {
    source: "",
    name: "",
    genre: "",
    price: "",
    addedOnDate: "",
    sourceHighlight: ""
}
document.addEventListener("DOMContentLoaded", function (){
  fetch('data.json')
  .then(response => response.json())
  .then(data => {

    gameData = data;
    gameContainerMetro = document.getElementById('game-container-metro');

    //tanchuang
    let modal = document.getElementById("modal")
    
    document.getElementById("close").onclick = function () {
        modal.style.display = "none";
    };
    // 点击其他领域(即弹窗背景)
    window.onclick = function(event){
        if(event.target ==modal){
            modal.style.display = "none"
        }
    }


    // const priceButtons = document.querySelectorAll('.tag-block2 .tag');
    // const genreButtons = document.querySelectorAll('.tag-block1 .tag');

    //   priceButtons.forEach(button => {
    //     button.addEventListener('click', () => {
    //         const selectedPrice = button.dataset.tag;
    //         const selectedGenre = getSelectedGenre();
    //         filterGames(selectedPrice, selectedGenre); // Call the filter function
    //         console.log("button clicked")
    //     });
    // });
    //         genreButtons.forEach(button => {
    //             button.addEventListener('click', () => {
    //               const selectedPrice = getSelectedPrice();
    //               const selectedGenre = button.dataset.tag;
    //                 filterGames(selectedPrice, selectedGenre); // Call the filter function
    //             });
    //         });

    // function getSelectedPrice() {
    //   const selectedPriceButton = document.querySelector('.tag-block2 .tag.active');
    //   return selectedPriceButton ? selectedPriceButton.dataset.tag : ''; // Return selected price tag
    // }
    // function getSelectedGenre() {
    //   const selectedGenreButton = document.querySelector('.tag-block1 .tag.active');
    //   return selectedGenreButton ? selectedGenreButton.dataset.tag : ''; // Return selected genre tag
    // }
    // filterGames(getSelectedPrice(), getSelectedGenre());
    filterGames(selectedPriceNow, selectedGenreNow)

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
  })
});
// 选中类型
function handleGenreChange(event) {
    if (event.target.value || event.target.value === 0) {
        let count = 0
        let radios = document.getElementsByName('genre-checkbox');
        for(let i = 0, length = radios.length; i < length; i++) {
            if(radios[i].checked && radios[i].value === selectedGenreNow) {
                radios[i].checked = false
                count ++
            }
        }
        selectedGenreNow = count > 0 ? "" : event.target.value;
        filterGames(selectedPriceNow, selectedGenreNow); // Call the filter function
    }
}
// 选中金额
function handlePriceChange(event) {
    if (event.target.value || event.target.value === 0) {
        let count = 0
        let radios = document.getElementsByName('price-checkbox');
        for(let i = 0, length = radios.length; i < length; i++) {
            if(radios[i].checked && radios[i].value === selectedPriceNow) {
                radios[i].checked = false
                count ++
            }
        }
        selectedPriceNow = count > 0 ? "" : event.target.value;
        filterGames(selectedPriceNow, selectedGenreNow); // Call the filter function
    }
}

// tanchuang:
function showDialog(gameNumber) {
    let dialogDiv =  document.getElementById('dialog-content');
    dialogDiv.innerHTML = ''
    showItemForm = {
        source: "",
        name: "",
        genre: "",
        price: "",
        addedOnDate: "",
        sourceHighlight: ""
    }
    gameData.forEach(item => {
        if (item.number === gameNumber) {
            let imgData = JSON.stringify(item)
            showItemForm = JSON.parse(imgData)
        }
    })
    if (showItemForm.name) {
        let modal = document.getElementById("modal")
        modal.style.display = "block";
        document.getElementById("dialog-title-text").innerHTML = showItemForm.name

        // tanchaung style
        const paddedNumber = String(showItemForm.number).padStart(2, '0');
        // const gameElement = document.createElement('div');
        dialogDiv.innerHTML = `
        <div class="image-container-new">
          <img src="./assets/${showItemForm.source}" class="original-img" style="object-fit: cover; object-position: center center;">
          <img src="./assets/${showItemForm.source.replace(/\.\w+$/, 'Y.jpg')}" class="filtered-img" style="object-fit: cover; object-position: center center;">
        </div>
        <div class="text-block-new">
          <h2>${paddedNumber} » ${showItemForm.name}</h2>
          <p>Genre: <i>${showItemForm.genre ? showItemForm.genre : ''}</i></p>
          <p>Price: <i>${showItemForm.price || showItemForm.price == 0 ? showItemForm.price : ''} RMB</i></p>
          <p>Added On Date: <i>${showItemForm.addedOnDate ? showItemForm.addedOnDate : ''}</i></p>
        </div>
      `;
        // dialogDiv.appendChild(gameElement);
    } else {
        alert("error")
    }
}

// 根据金额、类型筛选
function filterGames(selectedPrice, selectedGenre) {
  gameContainerMetro.innerHTML = ''
  let resultCount = 0
    filteredGames = gameData.forEach(game => {
        const gameElement = document.createElement('div');
        gameElement.classList.add('game');
        gameElement.dataset.tags = game.genre;
        gameElement.dataset.price = game.price;

        const paddedNumber = String(game.number).padStart(2, '0');
        const gamePrice = game.price;

        const gameGenre = game.genre
      
        //根据clicked price对比json里的数据，判断是否显示price
        const shouldShowPrice = (
          !selectedPrice || selectedPrice === "" ||
            (selectedPrice === '0' && gamePrice === 0) ||
            (selectedPrice === '100' && gamePrice <= 100) ||
            (selectedPrice === '200' && gamePrice <= 200) ||
            (selectedPrice === '300' && gamePrice <= 300) ||
            (selectedPrice === '400' && gamePrice <= 400) ||
            (selectedPrice === '500' && gamePrice > 400)
        );

        //这个是判断genre
      const shouldShowGenre = (!selectedGenre || selectedGenre === "" || gameGenre.includes(selectedGenre));


        if (shouldShowPrice && shouldShowGenre) {
            gameElement.style.display = 'flex';
        } else {
            gameElement.style.display = 'none';
        }
        // console.log(JSON.stringify(game), "-=-=JSON.stringify(game)")
        // let itemData = {
        //     number: game.number
        // }


        gameElement.innerHTML = `
        <div class="image-container" onclick="showDialog(${game.number})">
          <img src="./assets/${game.source}" class="original-img" style="object-fit: cover; object-position: center center;">
          <img src="./assets/${game.source.replace(/\.\w+$/, 'Y.jpg')}" class="filtered-img" style="object-fit: cover; object-position: center center;">
        </div>
        <div class="text-block">
          <h2>${paddedNumber} » ${game.name}</h2>
          <p>Genre: <i>${game.genre ? game.genre : ''}</i></p>
          <p>Price: <i>${game.price || game.price == 0 ? game.price : ''} RMB</i></p>
          <p>Added On Date: <i>${game.addedOnDate ? game.addedOnDate : ''}</i></p>
        </div>
      `;
        gameContainerMetro.appendChild(gameElement);
    });
    // 展示金额和类型
    const gamesAll = document.querySelectorAll('.game');
    gamesAll.forEach(game => {
      const gameTagsNew = game.dataset.tags.split(',');
      const gamePriceNew = game.dataset.price;
      const shouldShowGenreNew = gameTagsNew.includes(selectedGenre) || !selectedGenre || selectedGenre === "";
      const shouldShowPriceNew = (
        !selectedPrice || selectedPrice === "" ||
        (selectedPrice === '0' && gamePriceNew == 0) ||
        (selectedPrice === '100' && gamePriceNew <= 100) ||
        (selectedPrice === '200' && gamePriceNew <= 200) ||
        (selectedPrice === '300' && gamePriceNew <= 300) ||
        (selectedPrice === '400' && gamePriceNew <= 400) ||
        (selectedPrice === '500' && gamePriceNew > 400)
      );
      if (shouldShowPriceNew && shouldShowGenreNew) {
        game.style.display = 'flex';
        resultCount++
      } else {
        game.style.display = 'none';
      }
    });
  document.getElementById("searchResult").textContent =resultCount;
};




const tagGenre = document.querySelectorAll('.tagGenre');
const btnsPrice = document.querySelectorAll('.tagPrice');

//  function showGame(gameId) {
//     const games = document.querySelectorAll('.game');
//     games.forEach(game => {
//       const gameTags = game.dataset.tags.split(',');
//       if (gameTags.includes(gameId) || !gameId || gameId === "") {
//         game.style.display = 'flex';
//       } else {
//         game.style.display = 'none';
//       }
//     });
// }
btnsPrice.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // let currentTag = e.target.dataset.tag;
      // showGamePrice(selectedPriceNow);

        btnsPrice.forEach(otherBtn => {
            otherBtn.style.backgroundColor = '' ;
        });
        if (selectedPriceNow && selectedPriceNow !== "") {
            btn.style.backgroundColor = '#7530D9';
        }
    });
});

tagGenre.forEach(btn => {
   btn.addEventListener('click', (e) => {
        // let currentTag = e.target.dataset.tag;
        // showGame(selectedGenreNow);

       tagGenre.forEach(otherBtn => {
       otherBtn.style.backgroundColor = '' ;
       });
       if (selectedGenreNow && selectedGenreNow !== "") {
           btn.style.backgroundColor = '#7530D9';
       }
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
