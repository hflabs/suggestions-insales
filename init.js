"use strict";

(function($, TOKEN) {

  // do not change below this line
  var PARTNER = "INSALES.DADATA";
  var VERSION = "17.10.1";
  var BASE_PATH = "https://cdn.jsdelivr.net/npm/suggestions-jquery@";
  var CSS_PATH = BASE_PATH + VERSION +"/dist/css/suggestions.min.css";
  var JS_PATH = BASE_PATH + VERSION +"/dist/js/jquery.suggestions.min.js";

  var utils = {
    loadJS: function (path, callback) {
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = path;
      if (callback) { 
          script.addEventListener("load", function (e) { 
              callback(null, e); 
          }, false); 
      }
      var s = document.getElementsByTagName('script')[0];    
      s.parentNode.insertBefore(script, s);
    },

    loadCSS: function (path) {
      var css = document.createElement("link");
      css.setAttribute("rel", "stylesheet");
      css.setAttribute("type", "text/css");
      css.setAttribute("href", path);
      document.getElementsByTagName("head")[0].appendChild(css);
    },

    pass: function () {}
  };1

  var suggestions = {
    init: function (selector, type, showFunc, clearFunc, options) {
      var plugin = $(selector).suggestions({
        token: TOKEN,
        partner: PARTNER,
        type: type,
        onSelect: showFunc,
        onSelectNothing: clearFunc
      }).suggestions();
      if (plugin && options) {
        plugin.setOptions(options);
      }
    },

    clearField: function (selector) {
      var $field = $(selector);
      $field.val("");
      $field.parent().addClass("co-input--empty_nested");
    },
    
    showField: function (selector, value) {
      var $field = $(selector);
      $field.val(value);
      $field.parent().removeClass("co-input--empty_nested");
    },

    setLocations: function (sgt, kladr_id) {
      sgt.setOptions({
        constraints: {
          locations: { kladr_id: kladr_id }
        },
        restrict_value: true
      });
    },
    
    clearLocations: function (sgt) {
      sgt.setOptions({
        constraints: {
          locations: null
        },
        restrict_value: false
      });
    }
  };

  var name = {
    init: function (selector) {
      if ($("#client_surname").length) {
        // granular
        name.initGranular(
          $("#client_surname"),
          $(selector),
          $("#client_middlename")
        );
      } else {
        // single field
        suggestions.init(selector, "NAME", utils.pass, utils.pass);
      }
    },
    
    initGranular: function($surname, $name, $patronymic) {
      var fioParts = ["SURNAME", "NAME", "PATRONYMIC"];
      var self = {
        "$surname": $surname,
        "$name": $name,
        "$patronymic": $patronymic,
        gender: "UNKNOWN"
      };
      $.each([$surname, $name, $patronymic], function(index, $el) {
        var sgt = $el.suggestions({
          token: TOKEN,
          partner: PARTNER,
          type: "NAME",
          triggerSelectOnSpace: false,
          hint: "",
          noCache: true,
          params: {
              parts: [fioParts[index]]
          },
          onSearchStart: function(params) {
              params.gender = name.isGenderKnown.call(self, $el) ? self.gender : "UNKNOWN";
          },
          onSelect: function(suggestion) {
              self.gender = suggestion.data.gender;
          }
        });
      });
    },
            
    isGenderKnown: function ($el) {
      var self = this;
      var surname = self.$surname.val(),
          name = self.$name.val(),
          patronymic = self.$patronymic.val();
      if (($el.attr('id') == self.$surname.attr('id') && !name && !patronymic) ||
          ($el.attr('id') == self.$name.attr('id') && !surname && !patronymic) ||
          ($el.attr('id') == self.$patronymic.attr('id') && !surname && !name)) {
        return false;
      } else {
        return true;
      }
    }
  };

  var party = {
    clear: function () {
      suggestions.clearField("#client_juridical_address");
      suggestions.clearField("#client_inn");
      suggestions.clearField("#client_kpp");
      suggestions.clearField("#client_ogrn");
    },
    
    show: function (suggestion) {
      var party = suggestion.data;
      var address = party.address.data ? 
          party.address.data.postal_code + ", " + party.address.value :
          party.address.value;
      suggestions.showField("#client_juridical_address", address);
      suggestions.showField("#client_inn", party.inn);
      suggestions.showField("#client_kpp", party.kpp);
      suggestions.showField("#client_ogrn", party.ogrn);
    }
  };
  
  var bank = {
    clear: function () {
      suggestions.clearField("#client_bik");
      suggestions.clearField("#client_correspondent_account");
    },
    
    show: function (suggestion) {
      var bank = suggestion.data;
      suggestions.showField("#client_bik", bank.bic);
      suggestions.showField("#client_correspondent_account", bank.correspondent_account);
    }
  };

  var address = {
    clear: function () {
      suggestions.clearField("#shipping_address_zip");
    },
    
    show: function (suggestion) {
      var address = suggestion.data;
      suggestions.showField("#shipping_address_zip", address.postal_code);
    },
      
    listenCityChange: function (citySelector) {
      var $city = $(citySelector);
      $city.on("change", address.onCityChange);
    },
    
    onCityChange: function () {
      var kladrSelector = "[name='shipping_address[kladr_json]']";
      var kladr_id = null;
      try {
        var kladr = JSON.parse($(kladrSelector).val());
        kladr_id = kladr.kladr_code || kladr.code;
      } catch (e) {
        // do nothing
      }
      address.enforceCity(kladr_id);
    },
    
    enforceCity: function (kladr_id) {
      suggestions.clearField("#shipping_address_address");
      suggestions.clearField("#shipping_address_zip");
      var sgt = $("#shipping_address_address").suggestions();
      if (kladr_id) {
        suggestions.setLocations(sgt, kladr_id);
      } else {
        suggestions.clearLocations(sgt);
      }
    }
  };

  var suggestify = {
    init: function () {
      var initFunc = suggestify.checkVersion();
      initFunc();
    },
  
    checkVersion: function () {
      if ($("#tabs-person").length) {
        return suggestify.initV2;
      } else {
        return suggestify.initV1;
      }
    },
    
    initV1: function() {
      if ($("#client_inn").length) {
        suggestions.init("#client_name", "PARTY", party.show, party.clear);
      } else {
        name.init("#client_name");
      }
      suggestions.init("#client_bank_name", "BANK", bank.show, bank.clear);
      suggestions.init("#shipping_address_address", "ADDRESS", address.show, address.clear);
      suggestions.init("#client_email", "EMAIL", utils.pass, utils.pass, { suggest_local: false });
      suggestions.init("[name='email']", "EMAIL", utils.pass, utils.pass, { suggest_local: false });
      address.listenCityChange("#shipping_address_city");
      address.listenCityChange("#shipping_address_state");    
      address.onCityChange();
    },
    
    initV2: function () {
      suggestions.init("#tabs-organization #client_name", "PARTY", party.show, party.clear);
      name.init("#tabs-person #client_name");
      suggestions.init("#client_bank_name", "BANK", bank.show, bank.clear);
      suggestions.init("#shipping_address_address", "ADDRESS", address.show, address.clear);
      suggestions.init("#client_email", "EMAIL", utils.pass, utils.pass, { suggest_local: false });
      suggestions.init("[name='email']", "EMAIL", utils.pass, utils.pass, { suggest_local: false });
      address.listenCityChange("#shipping_address_full_locality_name");
      address.onCityChange();
    }
  };

  $(function () {
    utils.loadCSS(CSS_PATH);
    utils.loadJS(JS_PATH, function() {
      suggestify.init();
    });
  });

}(window.jQuery, window.DADATA_TOKEN))
