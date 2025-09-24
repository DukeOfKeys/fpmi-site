// JavaScript для страницы authorizedPage.html

document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('videoPlayer');
    const loader = document.getElementById('videoLoader');
    const backBtn = document.getElementById('backBtn');
    
    // Показываем индикатор загрузки
    loader.style.display = 'block';
    
    // Автоматически начинаем загрузку и воспроизведение видео
    video.addEventListener('canplay', function() {
        loader.style.display = 'none';
        video.style.display = 'block';
        video.play().catch(function(error) {
            console.log('Автовоспроизведение заблокировано: ', error);
            // Показываем кнопку для ручного запуска
            const playBtn = document.createElement('button');
            playBtn.className = 'btn';
            playBtn.textContent = 'Начать просмотр';
            playBtn.onclick = function() {
                video.play();
                playBtn.style.display = 'none';
            };
            video.parentNode.appendChild(playBtn);
        });
    });
    
    // Обработчик ошибок видео
    video.addEventListener('error', function() {
        loader.style.display = 'none';
        const errorMsg = document.createElement('p');
        errorMsg.textContent = 'Ошибка загрузки видео. Пожалуйста, проверьте подключение к интернету.';
        errorMsg.style.color = '#ff6b6b';
        video.parentNode.appendChild(errorMsg);
    });
    
    // Кнопка "Назад" возвращает на главную страницу
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
    
    // Добавляем информацию о прогрессе загрузки
    video.addEventListener('progress', function() {
        const buffered = video.buffered;
        if (buffered.length > 0) {
            const loaded = (buffered.end(0) / video.duration) * 100;
            if (!isNaN(loaded)) {
                console.log('Загружено: ' + loaded.toFixed(1) + '%');
            }
        }
    });
});