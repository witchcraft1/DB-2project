# bd_simple_management
Лабораторка з баз даних
Виконують студенти групи іп-74: Симончук Богдан, Рабешко Олексій, Мещеряков Олександр, Муженко Дмитро, Чирко Ярослав, Кобрій Степан

Даний проект є реалізацією інтерфейсу управління базами даних всередині компанії/організації/команди. Додаток передбачає вхід у базу даних, використовуючи унікальне ім'я та пароль, наданий кожному працівнику(не реалізовано). Далі в залежності від займаємої посади, користувач може мати наступні можливості:

  -перегляд таблиці працівників компанії з деякими полями(ім'я, поточне завдання, особисті якості та кваліфікація);
  -перегляд таблиці завдань(назва, виконувач, поточний стан тощо);
  -операції над таблицею працівників(додавання нового працівника до бази, видалення працівника, надання завдання вільному працівникові, перевірка стану виконання завдання працівником);
  -операції над таблицею завдань(додавання нового завдання, зміна поточного виконавця завдання, зміна та перевірка стану завдання).

Проект реалізовано за допомогою наступних технологій: 
  -React для розмітки сторінки та написання скриптів;
  -Semantic-Ui для зовнішнього вигляду сторінки;
  -Redux для комунікації з сервером;
  -Express.js для написання серверу;
  -MySQL у якості бази даних.
