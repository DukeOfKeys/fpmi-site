// Теперь этот файл содержит только базовые функции для index.html

document.addEventListener('DOMContentLoaded', function() {
    // Запрещаем выделение текста в полях ввода
    const inputs = document.querySelectorAll('input[readonly]');
    inputs.forEach(input => {
        input.addEventListener('mousedown', function(e) {
            e.preventDefault();
        });
        
        input.addEventListener('focus', function(e) {
            this.blur();
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