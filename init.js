"use strict";

(function($, TOKEN) {

  // do not change below this line
  var PARTNER = "INSALES.DADATA";
  
  function clearField(id) {
    var $field = $("#" + id);
    $field.val("");
    $field.parent().addClass("co-input--empty_nested");
  }
  
  function showField(id, value) {
    var $field = $("#" + id);
    $field.val(value);
    $field.parent().removeClass("co-input--empty_nested");
  }

  function clearParty() {
    clearField("client_juridical_address");
    clearField("client_inn");
    clearField("client_kpp");
    clearField("client_ogrn");
  }
  
  function showParty(suggestion) {
    var party = suggestion.data;
    var address = party.address.data ? 
        party.address.data.postal_code + ", " + party.address.value :
        party.address.value;
    showField("client_juridical_address", address);
    showField("client_inn", party.inn);
    showField("client_kpp", party.kpp);
    showField("client_ogrn", party.ogrn);
  }

  function initParty() {
    $("#client_name").suggestions({
      token: TOKEN,
      partner: PARTNER,
      type: "PARTY",
      onSelect: showParty,
      onSelectNothing: clearParty
    });
  }
  
  function clearBank() {
    clearField("client_bik");
    clearField("client_correspondent_account");
  }
  
  function showBank(suggestion) {
    var bank = suggestion.data;
    showField("client_bik", bank.bic);
    showField("client_correspondent_account", bank.correspondent_account);
  }

  function initBank() {
    $("#client_bank_name").suggestions({
      token: TOKEN,
      partner: PARTNER,
      type: "BANK",
      onSelect: showBank,
      onSelectNothing: clearBank
    });
  }
  
  $(function () {
    initParty();
    initBank();
  });
    
}(window.jQuery, window.DADATA_TOKEN))
