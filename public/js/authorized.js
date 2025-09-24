// JavaScript для страницы authorizedPage.html
// Указываем реальное количество фотографий в папке assets
const TOTAL_PHOTOS = 4; // Измени это число на количество ваших фотографий

document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('videoPlayer');
    const backBtn = document.getElementById('backBtn');
    const soundBtn = document.getElementById('soundBtn');
    
    // Создаем мозаичный фон
    createMosaicBackground();
    
    // Настраиваем видео
    setupVideo();
    
    // Настраиваем кнопки
    setupButtons();
    
    // Функция создания мозаичного фона
    function createMosaicBackground() {
        const mosaicContainer = document.getElementById('mosaicBackground');
        
        // Очищаем контейнер
        mosaicContainer.innerHTML = '';
        
        // Рассчитываем количество ячеек для заполнения экрана
        const cellSize = 80; // размер ячейки в пикселях
        const cols = Math.ceil(window.innerWidth / cellSize) + 2;
        const rows = Math.ceil(window.innerHeight / cellSize) + 2;
        const totalCells = cols * rows;
        
        console.log(`Создаем мозаику: ${cols}x${rows} = ${totalCells} ячеек, фото: ${TOTAL_PHOTOS}`);
        
        // Создаем массив с номерами фотографий в случайном порядке
        let photoNumbers = [];
        
        // Заполняем массив случайными номерами фотографий
        for (let i = 0; i < totalCells; i++) {
            // Генерируем случайный номер от 1 до TOTAL_PHOTOS
            const randomPhotoNum = Math.floor(Math.random() * TOTAL_PHOTOS) + 1;
            photoNumbers.push(randomPhotoNum);
        }
        
        // Создаем ячейки мозаики
        for (let i = 0; i < totalCells; i++) {
            const mosaicItem = document.createElement('div');
            mosaicItem.className = 'mosaic-item';
            
            // Пробуем разные расширения файлов
            const imageUrl = `assets/${photoNumbers[i]}.jpg`;
            mosaicItem.style.backgroundImage = `url('${imageUrl}')`;
            
            // Добавляем обработчик ошибки загрузки изображения
            mosaicItem.onerror = function() {
                console.error(`Ошибка загрузки изображения: ${imageUrl}`);
                // Если jpg не загрузилось, пробуем png
                this.style.backgroundImage = `url('assets/${photoNumbers[i]}.png')`;
            };
            
            mosaicContainer.appendChild(mosaicItem);
        }
        
        console.log('Мозаика создана');
    }
    
    // Функция настройки видео
    function setupVideo() {
        // Пытаемся включить автовоспроизведение со звуком
        video.muted = false;
        
        video.play().then(() => {
            console.log('Видео воспроизводится автоматически');
            if (soundBtn) {
                soundBtn.innerHTML = '<i class="fa fa-volume-up"></i> Выключить звук';
            }
        }).catch(error => {
            console.log('Автовоспроизведение заблокировано: ', error);
            // Если автовоспроизведение заблокировано, пробуем с muted
            video.muted = true;
            video.play().then(() => {
                if (soundBtn) {
                    soundBtn.innerHTML = '<i class="fa fa-volume-off"></i> Включить звук';
                }
            });
        });
        
        // Обработчик ошибок видео
        video.addEventListener('error', function() {
            console.error('Ошибка загрузки видео');
        });
        
        // Обработчик окончания видео (для цикла)
        video.addEventListener('ended', function() {
            video.currentTime = 0;
            video.play();
        });
    }
    
    // Функция настройки кнопок
    function setupButtons() {
        // Кнопка "Назад"
        if (backBtn) {
            backBtn.addEventListener('click', function() {
                window.location.href = 'index.html';
            });
        }
        
        // Кнопка звука
        if (soundBtn) {
            soundBtn.addEventListener('click', toggleSound);
        }
    }
    
    // Функция переключения звука
    function toggleSound() {
        if (video.muted) {
            video.muted = false;
            if (soundBtn) {
                soundBtn.innerHTML = '<i class="fa fa-volume-up"></i> Выключить звук';
            }
        } else {
            video.muted = true;
            if (soundBtn) {
                soundBtn.innerHTML = '<i class="fa fa-volume-off"></i> Включить звук';
            }
        }
    }
    
    // Обработчик изменения размера окна
    window.addEventListener('resize', function() {
        // Пересоздаем мозаику при изменении размера окна
        createMosaicBackground();
    });
});

// Глобальная функция для переключения звука
window.toggleSound = function() {
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
};