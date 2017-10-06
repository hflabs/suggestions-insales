"use strict";

(function($, TOKEN) {

  // do not change below this line
  var PARTNER = "INSALES.DADATA";

  function clearParty() {
    $("#client_juridical_address").val("");
    $("#client_inn").val("");
    $("#client_kpp").val("");
    $("#client_ogrn").val("");
  }
  
  function showParty(suggestion) {
    var party = suggestion.data;
    var address = party.address.data ? 
        party.address.data.postal_code + ", " + party.address.value :
        party.address.value;
    $("#client_juridical_address").val(address);
    $("#client_inn").val(party.inn);
    $("#client_kpp").val(party.kpp);
    $("#client_ogrn").val(party.ogrn);
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
    $("#client_bik").val("");
    $("#client_correspondent_account").val("");
  }
  
  function showBank(suggestion) {
    var bank = suggestion.data;
    $("#client_bik").val(bank.bic);
    $("#client_correspondent_account").val(bank.correspondent_account);
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
