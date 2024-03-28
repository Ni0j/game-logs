document.addEventListener("DOMContentLoaded", function (){
  fetch('data.json')
  .then(response => response.json())
  .then(data => {

  const gameData = data;
  const gameContainerMetro = document.getElementById('game-container-metro');


  gameData.forEach(game => {
    const gameElement = document.createElement('div');
    gameElement.classList.add('game'); 
    gameElement.dataset.tags = game.genre;
          const paddedNumber = String(game.number).padStart(2, '0');

    gameElement.innerHTML = `
    <div class="image-container">
      <img src="./assets/${game.source}" class="original-img" style="width: 19.375rem;height: 10.886rem; object-fit: cover; object-position: center center;">
      <img src="./assets/${game.source.replace(/\.\w+$/, 'G.JPG')}" class="filtered-img" style="width: 19.375rem;height: 10.886rem; object-fit: cover; object-position: center center;">
  </div>
      <div class="text-block">
        <h2>${paddedNumber} » ${game.name}</h2>
        <p>Platform: <i>${game.platform ? game.platform : ''}</i></p>
        <p>Playtime: <i>${game.hrsPlayed ? game.hrsPlayed : ''} </i>Hours</p>
        <p>Comment: <i>${game.note ? game.note : ''}</i></p>
      </div>
    `;
    gameContainerMetro.appendChild(gameElement);

    
  });



function showGame(gameId) {

  console.log('show game');




  var games = document.querySelectorAll('.game')
  games.forEach((game) => {
    var gameTags = game.dataset.tags.split(',')

    Array.isArray(game.genre)
   
    if(gameTags.includes(gameId)){
      game.style.display = 'flex';
    } else{
      game.style.display = 'none';
    }
  });


 }
 

 const btns = document.querySelectorAll('.tag');

 btns.forEach(btn => {
   btn.addEventListener('click', (e) => {
    let currentTag = e.target.dataset.tag;
    showGame(currentTag);

     btns.forEach(otherBtn => {
       otherBtn.style.backgroundColor = '' ;
     });
 
    //  btn.style.backgroundColor = '#7530D9';
   });
 });

 
 
  })})

  const screenWidth = window.innerWidth;

  function openNav() {
    if (screenWidth <= 768) {
    document.getElementById("mySidenav").style.right = "-12rem";
    }
    else{
      document.getElementById("mySidenav").style.right = "-37.5rem";
    }
  }
  
  function closeNav() {
    if (screenWidth <= 768) {
    document.getElementById("mySidenav").style.right = "-21.5rem";
  }
  else{
    document.getElementById("mySidenav").style.right = "-40.5rem";
  }
  }

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
  
