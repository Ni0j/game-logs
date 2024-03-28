document.addEventListener("DOMContentLoaded", function (){
  fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const gameData = data;
    
    const groupedGames = groupGamesByFirstLetter(data); // 分组游戏数据

    for (const letter in groupedGames) {
      if (groupedGames.hasOwnProperty(letter)) {
        createCarouselForGroup(letter, groupedGames[letter]); // 为每个分组创建轮播图
      }
    }
  });
});

function createCarouselForGroup(letter, games) {
  const groupContainer = document.createElement('div');
groupContainer.classList.add('group-container');
  const mainCarousel = document.createElement('div');
  const content = document.getElementById('content');
  // content.appendChild(mainCarousel);
  mainCarousel.classList.add('main-carousel');
  mainCarousel.id = `carousel-${letter}`; // 根据分组字母设置轮播图的 ID
  const screenWidth = window.innerWidth;

if (screenWidth >= 768) {
  mainCarousel.style.width = '90%';
} else {
  mainCarousel.style.width = '19.375rem';
}

  
  games.forEach(game => {
    const carouselCell = document.createElement('div');
    carouselCell.classList.add('carousel-cell');
    if (screenWidth >= 768) {
    carouselCell.style.width = '100%';
    // carouselCell.style.paddingLeft = '1rem';

    }else{
      carouselCell.style.width = null ;
    }
 


    const img = document.createElement('img-container');

    img.innerHTML = `
    <div class="image-container">
      <img src="./assets/${game.source}" class="original-img" object-fit: cover; object-position: center center;">
      <img src="./assets/${game.source.replace(/\.\w+$/, 'G.JPG')}" class="filtered-img" object-fit: cover; object-position: center center;">
  </div>
  `



    if (screenWidth >= 768) {
      img.style.width = '38.75rem';
      img.style.height = '21.772rem';
      img.style.paddingRight = '0rem';
    }
    else{
      img.style.width = '19.375rem';
      img.style.height = '10.886rem';
    }

    let pElement = document.getElementById(`number-${letter}`);
    if (!pElement) {
        pElement = document.createElement('p');
        pElement.id = `number-${letter}`; // 根据分组字母设置对应的 ID
        pElement.style.color = '#7530D9';
        pElement.style.display = 'flex';
pElement.style.alignItems = 'center';
pElement.style.justifyContent = 'flex-start'; 
pElement.style.borderTop = '1px solid #0CBF07'; 
if (screenWidth >= 768) {
  pElement.style.width = '91.5%'; 
}
else{
  pElement.style.width = '20.575rem'; 
   pElement.style.marginTop = '21.95px';
}

pElement.style.marginLeft = '2rem'; 
pElement.style.paddingTop = '0.75rem';






        document.body.appendChild(pElement);
    }
    pElement.textContent = `${letter} - 1/${games.length}`;
    pElement.style.fontFamily = 'Unknown';
    
    

    carouselCell.innerHTML = ` 
    <div class="text-block">
        <span class="game-title">${game.name}</span>
        <p>Platform: <i>${game.platform ? game.platform : ''}</i></p>
        <p>Playtime: <i>${game.hrsPlayed ? game.hrsPlayed : ''} </i>Hours</p>
        <p>Comment: <i>${game.note ? game.note : ''}</i></p>
      </div>
    `

    carouselCell.appendChild(img);
    mainCarousel.appendChild(carouselCell);
  });

  document.body.appendChild(mainCarousel); 
  document.body.appendChild(mainCarousel); 
  document.body.appendChild(groupContainer);
console.log(document.querySelector('groupContainer'))


  
  


  

  // 初始化轮播图效果
  new Flickity(mainCarousel, {
    cellAlign: 'center', 
    contain: true,
    // 其他轮播图设置
  });

  //样式
  // 获取需要操作的按钮元素




  // 监听轮播图切换事件
  const flkty = new Flickity(mainCarousel);

  flkty.on('change', function(index) {
    document.getElementById(`number-${letter}`).textContent = `${letter} - ${(index + 1)}/${flkty.slides.length}`;
    console.log('Slide changed to' + index);
  });



}

// 根据游戏名称的首字母将游戏分组
function groupGamesByFirstLetter(games) {
  const groupedGames = {};

  games.forEach(game => {
    const firstLetter = game.name.charAt(0).toUpperCase(); // 获取首字母并转为大写

    if (!groupedGames[firstLetter]) {
      groupedGames[firstLetter] = [];
    }

    groupedGames[firstLetter].push(game);
  });

  return groupedGames;
}





// function resetHtmlFontSize(){
//  document.documentElement.style.fontSize = screen.width / 52.5 + 'px';
// }

// resetHtmlFontSize();
// window.onresize = resetHtmlFontSize;