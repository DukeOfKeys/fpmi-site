// JavaScript для страницы authorizedPage.html
// Количество фотографий для мозаики - измени это число в зависимости от количества файлов
const TOTAL_PHOTOS = 4; // Укажи здесь общее количество фотографий в папке assets

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
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Рассчитываем количество ячеек для заполнения экрана
        const cellSize = 80; // размер ячейки в пикселях
        const cols = Math.ceil(viewportWidth / cellSize) + 2;
        const rows = Math.ceil(viewportHeight / cellSize) + 2;
        const totalCells = cols * rows;
        
        // Создаем массив с номерами фотографий в случайном порядке
        let photoNumbers = [];
        for (let i = 0; i < totalCells; i++) {
            // Используем модуль для циклического повторения фотографий
            photoNumbers.push((i % TOTAL_PHOTOS) + 1);
        }
        
        // Перемешиваем массив для случайного порядка
        photoNumbers = shuffleArray(photoNumbers);
        
        // Создаем ячейки мозаики
        for (let i = 0; i < totalCells; i++) {
            const mosaicItem = document.createElement('div');
            mosaicItem.className = 'mosaic-item';
            mosaicItem.style.backgroundImage = `url('assets/${photoNumbers[i]}.jpg')`;
            mosaicContainer.appendChild(mosaicItem);
        }
    }
    
    // Функция перемешивания массива
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    // Функция настройки видео
    function setupVideo() {
        // Пытаемся включить автовоспроизведение со звуком
        video.muted = false;
        
        video.play().then(() => {
            console.log('Видео воспроизводится автоматически');
            soundBtn.innerHTML = '<i class="fa fa-volume-up"></i> Выключить звук';
        }).catch(error => {
            console.log('Автовоспроизведение заблокировано: ', error);
            // Если автовоспроизведение заблокировано, пробуем с muted
            video.muted = true;
            video.play();
            soundBtn.innerHTML = '<i class="fa fa-volume-off"></i> Включить звук';
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
            soundBtn.innerHTML = '<i class="fa fa-volume-up"></i> Выключить звук';
        } else {
            video.muted = true;
            soundBtn.innerHTML = '<i class="fa fa-volume-off"></i> Включить звук';
        }
    }
    
    // Обработчик изменения размера окна
    window.addEventListener('resize', function() {
        // При изменении размера окна можно пересоздать мозаику
        // Но для производительности лучше этого не делать часто
        // Можно добавить debounce при необходимости
    });
});

// Глобальная функция для переключения звука (если нужна извне)
window.toggleSound = function() {
    const video = document.getElementById('videoPlayer');
    const soundBtn = document.getElementById('soundBtn');
    
    if (video.muted) {
        video.muted = false;
        soundBtn.innerHTML = '<i class="fa fa-volume-up"></i> Выключить звук';
    } else {
        video.muted = true;
        soundBtn.innerHTML = '<i class="fa fa-volume-off"></i> Включить звук';
    }
};