// JavaScript для страницы authorizedPage.html
const TOTAL_PHOTOS = 4; // Количество ваших фотографий

document.addEventListener('DOMContentLoaded', function() {
    console.log('Начало загрузки страницы');
    
    // Сначала создаем мозаичный фон
    createMosaicBackground();
    
    // Затем настраиваем остальные элементы
    setupVideo();
    setupButtons();
    
    function createMosaicBackground() {
        const mosaicContainer = document.getElementById('mosaicBackground');
        if (!mosaicContainer) {
            console.error('Контейнер мозаики не найден!');
            return;
        }
        
        // Очищаем контейнер
        mosaicContainer.innerHTML = '';
        
        // Размер квадратика мозаики
        const cellSize = 60; // маленькие квадратики
        
        // Рассчитываем количество ячеек для заполнения экрана
        const cols = Math.ceil(window.innerWidth / cellSize) + 1;
        const rows = Math.ceil(window.innerHeight / cellSize) + 1;
        const totalCells = cols * rows;
        
        console.log(`Создаем мозаику: ${cols}x${rows} = ${totalCells} ячеек`);
        
        // Создаем ячейки мозаики
        for (let i = 0; i < totalCells; i++) {
            const mosaicItem = document.createElement('div');
            mosaicItem.className = 'mosaic-item';
            
            // Случайный номер фото от 1 до TOTAL_PHOTOS
            const randomPhotoNum = Math.floor(Math.random() * TOTAL_PHOTOS) + 1;
            
            // Пробуем разные расширения файлов
            const imageUrl = `assets/${randomPhotoNum}.jpg`;
            mosaicItem.style.backgroundImage = `url('${imageUrl}')`;
            
            // Устанавливаем размер ячейки
            mosaicItem.style.width = cellSize + 'px';
            mosaicItem.style.height = cellSize + 'px';
            
            mosaicContainer.appendChild(mosaicItem);
        }
        
        console.log('Мозаика создана');
    }
    
    function setupVideo() {
        const video = document.getElementById('videoPlayer');
        const soundBtn = document.getElementById('soundBtn');
        
        if (!video) {
            console.error('Видео элемент не найден!');
            return;
        }
        
        // Автовоспроизведение с звуком
        video.muted = false;
        
        // Пытаемся воспроизвести видео
        const playVideo = () => {
            video.play().then(() => {
                console.log('Видео воспроизводится автоматически');
                if (soundBtn) {
                    soundBtn.innerHTML = '<i class="fa fa-volume-up"></i> Выключить звук';
                }
            }).catch(error => {
                console.log('Автовоспроизведение заблокировано: ', error);
                // Пробуем с выключенным звуком
                video.muted = true;
                video.play().then(() => {
                    if (soundBtn) {
                        soundBtn.innerHTML = '<i class="fa fa-volume-off"></i> Включить звук';
                    }
                });
            });
        };
        
        // Если видео уже загружено, воспроизводим сразу
        if (video.readyState >= 3) {
            playVideo();
        } else {
            // Иначе ждем загрузки
            video.addEventListener('loadeddata', playVideo);
        }
        
        // Зацикливаем видео
        video.addEventListener('ended', function() {
            video.currentTime = 0;
            video.play();
        });
    }
    
    function setupButtons() {
        const backBtn = document.getElementById('backBtn');
        const soundBtn = document.getElementById('soundBtn');
        
        if (backBtn) {
            backBtn.addEventListener('click', function() {
                window.location.href = 'index.html';
            });
        }
        
        if (soundBtn) {
            soundBtn.addEventListener('click', toggleSound);
        }
    }
    
    // Обработчик изменения размера окна - перестраиваем мозаику
    window.addEventListener('resize', function() {
        createMosaicBackground();
    });
});

function toggleSound() {
    const video = document.getElementById('videoPlayer');
    const soundBtn = document.getElementById('soundBtn');
    
    if (video && video.muted) {
        video.muted = false;
        if (soundBtn) {
            soundBtn.innerHTML = '<i class="fa fa-volume-up"></i> Выключить звук';
        }
    } else if (video) {
        video.muted = true;
        if (soundBtn) {
            soundBtn.innerHTML = '<i class="fa fa-volume-off"></i> Включить звук';
        }
    }
}