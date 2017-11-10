# Подсказки DaData.ru для InSales

Подсказки DaData.ru для Storeland — удобный способ ввести реквизиты организации и банка на форме заказа.

Инструкция по подключению подсказок DaData.ru к платформе [InSales](https://www.insales.ru/):

1. В админке магазина перейти в раздел *Настройки > Настройки магазина > Счётчики и коды*

2. В текстовое поле «javascript-код для вывода на всех страницах магазина» добавить:
```
<!-- dadata.ru -->
<script type="text/javascript">
  window.DADATA_TOKEN = "ВАШ_API_КЛЮЧ";
</script>
<script type="text/javascript" src="https://cdn.rawgit.com/hflabs/suggestions-insales/0.4.1/init.js"></script>
<!-- /dadata.ru -->
```
Вместо `ВАШ_API_КЛЮЧ` укажите ваш API-ключ на DaData.ru. Чтобы получить ключ,  [зарегистрируйтесь](https://dadata.ru/#registration_popup) и сгенерируйте ключ в [личном кабинете](https://dadata.ru/profile/#info).

После регистрации подтвердите e-mail адрес, иначе подсказки не будут работать.

3. Нажать на кнопку «Сохранить».
