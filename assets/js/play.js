
const playList = document.querySelector('.playlist');
const cd = document.querySelector('.cd');
const heading = document.querySelector('header h2');
const cdThumb = document.querySelector('.cd-thumb');
const audio = document.querySelector('#audio');
const playBtn = document.querySelector('.btn-toggle-play');
const player = document.querySelector('.player');
const timeBar = document.querySelector('#progress');
const btnNext = document.querySelector('.btn-next');
const btnPrev = document.querySelector('.btn-prev');
const btnRepeat = document.querySelector('.btn-repeat');
const btnRandom = document.querySelector('.btn-random');

const app = {
    songs: [
        {
            name: 'Ngày ấy bạn và tôi',
            singer: 'Link Lee',
            path: './assets/music/song1.mp3',
            image: './assets/img/song1.jpg',
        },
        {
            name: 'Mình cùng nhau đóng băng',
            singer: 'Thuỳ Chi',
            path: './assets/music/song2.mp3',
            image: './assets/img/song2.jpg',
        },
        {
            name: 'Giấc mơ thần tiên',
            singer: 'Miu Lê',
            path: './assets/music/song3.mp3',
            image: './assets/img/song3.jpg',
        },
        {
            name: 'Chẳng còn những ngày ấy',
            singer: 'Huy Hiếu ft Vinz',
            path: './assets/music/song4.mp3',
            image: './assets/img/song4.jpg',
        },
        {
            name: 'Tạm biệt nhé',
            singer: 'Link Lee ft Phúc Bằng',
            path: './assets/music/song5.mp3',
            image: './assets/img/song5.jpg',
        },
        {
            name: 'Xe đạp',
            singer: 'Thuỳ Chi',
            path: './assets/music/song6.mp3',
            image: './assets/img/song6.jpg',
        },
        {
            name: 'Mong ước kỷ niệm xưa',
            singer: 'Tam ca 3A',
            path: './assets/music/song7.mp3',
            image: './assets/img/song7.jpg',
        },
        {
            name: 'Tình bạn thân',
            singer: 'Akira Phan',
            path: './assets/music/song8.mp3',
            image: './assets/img/song8.jpg',
        }
    ],
    currentIndex: 0,
    isPlay: false,
    isRandom: true,
    isRepeat: true,
    defineproperties: function(){
        Object.defineProperty(this, 'currentSong', {
            get: function(){
                   return this.songs[this.currentIndex];
            }
        })
    },
    
    render: function () {
        const indexActive = this.currentIndex;
        const htmls = this.songs.map(function (song,index) {
            
            return `
            <div class="song song${index} ${index === indexActive ? 'active' : ''}" index="${index}">
            <div class="thumb"
                style="background-image: url('${song.image}')">
            </div>
            <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
            </div>
            <div class="option">
                <i class="fas fa-ellipsis-h"></i>
            </div>
            </div>`
        });
        playList.innerHTML = htmls.join('');
    },
    loadcurrentSong: function(){
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
    },
    nextSong: function(){
        this.currentIndex++;
        if(this.currentIndex > (this.songs.length - 1)){
            this.currentIndex = 0;
        }
        this.loadcurrentSong();
        this.scrollInto();
        if(this.currentIndex === 0){
            const songActive = document.querySelector(`.song${this.currentIndex}`);
            const songActived = document.querySelector(`.song${this.songs.length - 1}`);
            songActived.classList.remove('active');
            songActive.classList.add('active');
        }
        else{
            const songActive = document.querySelector(`.song${this.currentIndex}`);
            const songActived = document.querySelector(`.song${this.currentIndex - 1}`);
            songActived.classList.remove('active');
            songActive.classList.add('active');
        }
        
    },
    prevSong: function(){
        this.currentIndex--;
        if(this.currentIndex < 0){
            this.currentIndex = this.songs.length - 1;
        }
        this.loadcurrentSong();
        this.scrollInto();
        if(this.currentIndex === this.songs.length - 1){
            const songActive = document.querySelector(`.song${this.currentIndex}`);
            const songActived = document.querySelector('.song0');
            songActived.classList.remove('active');
            songActive.classList.add('active');
        }
        else{
            const songActive = document.querySelector(`.song${this.currentIndex}`);
            const songActived = document.querySelector(`.song${this.currentIndex + 1}`);
            songActived.classList.remove('active');
            songActive.classList.add('active');
        }
    },
    randomSong: function(){
        const indexOld = this.currentIndex;
        const songActived = document.querySelector(`.song${indexOld}`);
        songActived.classList.remove('active');
        let randomIndex = 0;
        do {
           randomIndex = Math.floor(Math.random() * (this.songs.length - 1));
        } while(randomIndex == this.currentIndex);
        this.currentIndex = randomIndex;
        const songActive = document.querySelector(`.song${this.currentIndex}`);
        songActive.classList.add('active');
        this.loadcurrentSong();
        this.scrollInto();
    },
    repeatSong: function(){
        this.loadcurrentSong();
    },
    scrollInto: function(){
        document.querySelector('.song.active').scrollIntoView({
            behavior: 'smooth',
            block: "center",
        })
    },

    handleEvents: function(){
        const _this = this;
        const cdWidth = cd.offsetWidth;
        const cdAnimation = cdThumb.animate([
            {transform: 'rotate(360deg)'}
        ], {
            duration: 10000,
            iterations: Infinity,
        });
        cdAnimation.pause();
        document.onscroll = function(){
            const scrolltop = window.scrollY || document.documentElement.scrollTop;
            const newcdWidth = cdWidth - scrolltop;
            cd.style.width = newcdWidth > 0 ? newcdWidth + 'px' : 0;
            cd.style.opacity = newcdWidth/cdWidth;
        }
        playBtn.onclick = function(){
            if(_this.isPlay){
                 audio.pause();
            }
            else{
                audio.play();
            }
        }
        btnNext.onclick = function(){
           if(_this.isRandom){
            _this.nextSong();
            audio.play();
           }
           else {
               _this.randomSong();
               audio.play();
           }
        }
        btnPrev.onclick = function(){
            if(_this.isRandom){
                _this.prevSong();
                audio.play();
               }
               else{
                   _this.randomSong();
                   audio.play();
               }
        }
        btnRandom.onclick = function(){
            if(_this.isRandom){
                btnRandom.classList.add('active');
                _this.isRandom = false;
            }
            else{
                btnRandom.classList.remove('active');
                _this.isRandom = true;
            }
        }
        btnRepeat.onclick = function(){
            if(_this.isRepeat){
                btnRepeat.classList.add('active');
                _this.isRepeat = false;
            }
            else{
                btnRepeat.classList.remove('active');
                _this.isRepeat = true;
            }
        }
        playList.onclick = function(e){
            const songClick = e.target.closest('.song:not(.active)')
            
            if(songClick || e.target.closest('.option')){
                if(songClick && !e.target.closest('.option')){
                    const indexOld = _this.currentIndex;
                    const songActived = document.querySelector(`.song${indexOld}`);
                    songActived.classList.remove('active');
                    _this.currentIndex = Number(songClick.getAttribute('index'));
                    songClick.classList.add('active');
                    _this.loadcurrentSong();
                    audio.play();
                }
                else{
                    
                }
            }
        }
        audio.onplay = function(){
            _this.isPlay = true;
            player.classList.add('playing');
            cdAnimation.play();
        }
        audio.onpause = function(){
            _this.isPlay = false;
            player.classList.remove('playing');
            cdAnimation.pause();
        }
        timeBar.oninput = function(){
            audio.currentTime = timeBar.value*audio.duration/100;
        }
        audio.ontimeupdate = function(){
            if(audio.duration){
                timeBar.value = audio.currentTime/audio.duration*100;
                if(audio.currentTime==audio.duration)
                {
                    if(_this.isRandom && _this.isRepeat){
                        _this.nextSong();
                        audio.play();
                       }
                       else if(!_this.isRandom && _this.isRepeat){
                           _this.randomSong();
                           audio.play();
                       }
                       else{
                           _this.repeatSong();
                           audio.play();
                       }
                }
            }
            
        }
       
    },

    start: function () {
        this.defineproperties();
        this.handleEvents();
        this.render();
        this.loadcurrentSong();
    },
}