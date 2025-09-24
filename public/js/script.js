// JavaScript для страницы index.html

document.addEventListener('DOMContentLoaded', function() {
    // Разрешаем выделение текста в полях ввода, но запрещаем изменение
    const inputs = document.querySelectorAll('input[readonly]');
    
    inputs.forEach(input => {
        // Разрешаем все события мыши для выделения текста
        input.addEventListener('mousedown', function(e) {
            // Разрешаем стандартное поведение для выделения текста
        });
        
        input.addEventListener('click', function(e) {
            // Выделяем весь текст при клике для удобства копирования
            this.select();
        });
        
        input.addEventListener('focus', function(e) {
            // При фокусе выделяем весь текст
            this.select();
        });
        
        // Запрещаем ввод текста
        input.addEventListener('keydown', function(e) {
            e.preventDefault();
        });
        
        input.addEventListener('paste', function(e) {
            e.preventDefault();
        });
        
        input.addEventListener('cut', function(e) {
            e.preventDefault();
        });
        
        input.addEventListener('dragstart', function(e) {
            e.preventDefault();
        });
    });
});

// Функции для других кнопок
function openGuestPage() {
    alert('Гостевой вход временно недоступен');
}

function openForgotPasswordPage() {
    alert('Функция восстановления пароля временно недоступна');
}

function openPoliciesPage() {
    alert('Страница с политиками временно недоступна');
}