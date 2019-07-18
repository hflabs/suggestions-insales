# Подсказки DaData.ru для InSales

Подсказки «[Дадаты](https://dadata.ru/suggestions/)» для [InSales](https://www.insales.ru/) — удобный способ ввести ФИО, адрес, email, реквизиты организации и банка на форме заказа.

Инструкция по подключению подсказок к платформе InSales:

1. В админке магазина перейти в раздел _Настройки > Настройки магазина > Счётчики и коды_

2. В текстовое поле «javascript-код для вывода на всех страницах магазина» добавить:

```
<!-- dadata.ru -->
<script>
  window.DADATA_TOKEN = "ВАШ_API_КЛЮЧ";
</script>
<script src="https://unpkg.com/suggestions-insales@0.6.0/init.js"></script>
<!-- /dadata.ru -->
```

Вместо `ВАШ_API_КЛЮЧ` укажите ваш API-ключ на DaData.ru. Чтобы получить ключ, [зарегистрируйтесь](https://dadata.ru/#registration_popup) и сгенерируйте ключ в [личном кабинете](https://dadata.ru/profile/#info).

После регистрации подтвердите e-mail адрес, иначе подсказки не будут работать.

3. Нажать на кнопку «Сохранить».
