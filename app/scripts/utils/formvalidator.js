define([
  'underscore'
], function ( _) {


  function valAlphabet( input ){
    var pattern = /^[A-Za-z_][A-Za-z\s]*[A-Za-z_]$/;
    var valid = pattern.test(input) && input.length > 2;
    var msg = !valid ? "Invalid name. Only alphabets with spaces are allowed. Min length is three." : "";
    return {
      valid: valid,
      errorMsg: msg
    };
  }

  function valGender( input ){
    var valid = input == "male" || input == "female";
    var msg = !valid ? "Please select gender." : "";
    return {
      valid: valid,
      errorMsg: msg
    };
  }

  function valDate( input ){
    var valid = true;
    var msg = !valid ? "Invalid birth date. Enter valid birth date." : "";
    return {
      valid: valid,
      errorMsg: msg
    };
  }

  var Validator = {

    validatorsMapping: {
      "alphabet": valAlphabet,
      "gender": valGender,
      "date": valDate
    },

    validate: function( data, validators ){
      for( var i = 0; i < data.length; i++ ){
        var valFn = this.validatorsMapping[validators[data[i].name]];
        if( valFn ){
          data[i].valdata = valFn( data[i].value );
        }
      }

      return data;
    }
  }

  return Validator;

});
