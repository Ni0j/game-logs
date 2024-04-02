const fonts = [
  "vm74", "Times New Roman", "niagara", "peregroy-jf",
  "thrillers", "Tahoma", "miller-headline", "Impact",
  "Lucida Sans Unicode", "Trebuchet MS", "Palatino Linotype",
  "Book Antiqua", "p22-frenzy", "Garamond", "Consolas",
  'unknown', "responder-p", "Lucida Console", "new-science-extended",
  "Calibri", "Candara", "Geneva", "Optima", "t26-carbon"
];

const keyframes = document.createElement('style');
keyframes.textContent = `
    @keyframes fontChange {
        ${fonts.map((font, index) => `
            ${index * (100 / fonts.length)}% {
                font-family: ${font};
            }
        `).join('')}
    }
`;
document.head.appendChild(keyframes);


const textElement = document.querySelector('.text-animation');
textElement.classList.add('font-change-animation');

textElement.addEventListener('mouseover', function() {
  textElement.style.animationPlayState = 'paused';
});

// 添加鼠标移开事件监听器
textElement.addEventListener('mouseout', function() {
  textElement.style.animationPlayState = 'running';
});


document.addEventListener('click', function(event) {
  // 检查点击的目标是否为文本输入框或按钮，如果是则不执行跳转操作
  if (event.target.tagName.toLowerCase() === 'input' || 
      event.target.tagName.toLowerCase() === 'textarea' ||
      event.target.tagName.toLowerCase() === 'button') {
      return; // 如果点击的是文本输入框或按钮，则不执行跳转操作
  }

  // 跳转到指定页面
  window.location.href = 'https://ni0j.github.io/game-logs/entries/entry1/';
});



var music = document.getElementById("music");
    var myaudio = document.getElementById("myaudio");
    var pausedTime = 0;

    music.addEventListener("click", function() {
        // 如果音频正在播放，则暂停
        if (myaudio.paused) {
            myaudio.play();
            music.textContent = "⏸"; // 按钮文本改为暂停
        } else {
            myaudio.pause();
            pausedTime = myaudio.currentTime; // 记录暂停时的时间
            music.textContent = "♫"; // 按钮文本改为播放
        }
    });

    // 添加音频播放结束事件监听器
    myaudio.addEventListener("ended", function() {
        music.textContent = "♫"; // 按钮文本改为播放
    });