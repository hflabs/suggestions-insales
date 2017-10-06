# Подсказки DaData.ru для InSales

Подсказки DaData.ru для Storeland — удобный способ ввести реквизита организации и банка на форме заказа.

Инструкция по подключению подсказок DaData.ru к платформе [InSales](https://www.insales.ru/):

1. В админке магазина перейти в раздел *Настройки > Настройки магазина > Счётчики и коды*

2. В текстовое поле «javascript-код для вывода на всех страницах магазина» добавить:
```
<!-- dadata.ru -->
<link href="https://cdn.jsdelivr.net/npm/suggestions-jquery@17.10.0/dist/css/suggestions.min.css" type="text/css" rel="stylesheet" />

<!--[if lt IE 10]>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery-ajaxtransport-xdomainrequest/1.0.1/jquery.xdomainrequest.min.js"></script>
<![endif]-->

<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/suggestions-jquery@17.5.0/dist/js/jquery.suggestions.min.js"></script>

<script type="text/javascript">
  window.DADATA_TOKEN = "ВАШ_API_КЛЮЧ";
</script>

<script type="text/javascript" src="https://cdn.rawgit.com/hflabs/suggestions-insales/0.1.0/init.js"></script>
<!-- /dadata.ru -->
```
Вместо `ВАШ_API_КЛЮЧ` укажите ваш API-ключ на DaData.ru. Чтобы получить ключ,  [зарегистрируйтесь](https://dadata.ru/#registration_popup) и сгенерируйте ключ в [личном кабинете](https://dadata.ru/profile/#info).

После регистрации подтвердите e-mail адрес, иначе подсказки не будут работать.
