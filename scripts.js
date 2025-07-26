// Скрипт динамической загрузки контента проектов
document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.project-card');
    const content = document.getElementById('project-content');
    let activeCard = null;

    cards.forEach(card => {
        card.addEventListener('click', async () => {
            // если нажали на уже открытую карточку — свернуть
            if (card === activeCard) {
                card.classList.remove('active');
                content.style.display = 'none';
                content.innerHTML = '';
                activeCard = null;
                return;
            }
            // свернуть предыдущую
            if (activeCard) activeCard.classList.remove('active');
            card.classList.add('active');
            activeCard = card;

            const file = card.getAttribute('data-file');
            try {
                const resp = await fetch(file);
                if (!resp.ok) throw new Error('Network response was not ok');
                const html = await resp.text();
                content.innerHTML = html;
                content.style.display = 'block';
            } catch (e) {
                content.innerHTML = '<p>Ошибка загрузки файла.</p>';
                content.style.display = 'block';
            }
        });
    });
});