//when page first loads
$(document).ready(function() {
    //first text field auto focus
    $('#name').focus();

    //hide other-title input
    $('#other-title').css('display', 'none');

    //change option selected in design
    // $('#color option').removeAttr("selected");
    $('#color').prepend('<option selected="selected">Please select a T-shirt Theme</option>');
});

//revealed when 'Other' is selected in job role
$('#title').on('click', function(){
    var userSelected = $('#title option:selected').text();

    if( userSelected === 'Other' ) {
        $('#other-title').css('display', 'block');
    } else {
        $('#other-title').css('display', 'none');
    }
});

//match t-shirt info
$('#design').on('click', function(){
    var userDesign = $('#design option:selected').text();
    var userColorDisplay = $('#color option');
    var iLoveJs = /JS Puns/;
    var iHeartJs = /I ♥ JS/;
    var userColor;
    userColorDisplay.show();

    for( var i = 0; i < userColorDisplay.length; i++ ) {

        if( userDesign === 'Theme - JS Puns' ) {
            userColor = userColorDisplay[i].innerText;
            if( !iLoveJs.test(userColor) ) {
                $(userColorDisplay[i]).hide();
            }
            //remove all previous attr selected 
            $(userColorDisplay[i]).removeAttr("selected");

            //add selected attr
            if( iLoveJs.test(userColor) ) {
                $(userColorDisplay[1]).prop("selected",true);
               
            }

        } else if( userDesign === 'Theme - I ♥ JS'){
            //hide all options except i heart js
            userColor = userColorDisplay[i].innerText;
            if( !iHeartJs.test(userColor) ) {
                $(userColorDisplay[i]).hide();
            }
            //remove all previous attr selected 
            $(userColorDisplay[i]). removeAttr("selected");
            
            //add selected attr
            if( iHeartJs.test(userColor) ) {
                $(userColorDisplay[i]).prop("selected",true);
                break;
            }
            
        } else {
            $(userColorDisplay[0]).prop("selected",true);
        }
        
    }

});

//add total in register activities section
$('.activities').append('<p>Total: <span class="total_price"></span></p>');
$('.activities p').css('display', 'none');

var priceTotal = 0;
$('.activities input').on('change', function(){
    //show prices when clicked
    $('.activities p').css('display', 'block');

    var prices = /\$\d+/;
    var selected = $(this).parent().text();
    var isChecked = $(this).prop('checked');
    var selectedActivity = selected.match(prices);
    var selectedAmount = selectedActivity[0].replace('$', '')

    //calculate when activity is checked
    if ( isChecked ) {
        priceTotal += parseInt(selectedAmount);
       
    } else {
        priceTotal -= parseInt(selectedAmount);
    }

    //remove when all activity is unchecked
    if( $('.activities input:checked').length == 0 ) {
        $('.activities p').css('display', 'none');
    }
    $('.total_price').text('$' + priceTotal);

    //disable same time activities
    if( $('input[name="js-frameworks"]').is(':checked') ) {
        $('input[name="express"]').prop('disabled', true)
    } else {
        $('input[name="express"]').prop('disabled', false);
    }
    
    if( $('input[name="express"]').is(':checked') ) {
        $('input[name="js-frameworks"]').prop('disabled', true)
    } else {
        $('input[name="js-frameworks"]').prop('disabled', false);
    }

    if( $('input[name="js-libs"]').is(':checked') ) {
        $('input[name="node"]').prop('disabled', true)
    } else {
        $('input[name="node"]').prop('disabled', false);
    }
    
    if( $('input[name="node"]').is(':checked') ) {
        $('input[name="js-libs"]').prop('disabled', true)
    } else {
        $('input[name="js-libs"]').prop('disabled', false);
    }


    


});

//payment info selection
$('#payment option[value="select_method"]').remove();
$('#payment option[value="credit card"]').prop('selected', true) ;
$('#paypal').hide();
$('#bitcoin').hide();

//display selected payment method
$('#payment').on('change', function(){
    var userPayment = $(this).val();

    //hide all method before showing selected payment method
    $('#paypal').hide();
    $('#bitcoin').hide();
    $('#credit-card').hide();

    //add '-' in string credit card
    userPayment = userPayment.replace(/\s/, '-');

    $('#' + userPayment).show();

});



//check form validation on submit
$('button:submit').on('click', function(e){
    var isValid = true;

    //check is name or email is empty
    var nameCheck = $('#name');
    var emailCheck = $('#mail');
    var nameAlertPlaceholder = nameCheck.attr('placeholder', 'Please write your name');
    var emailAlertPlaceholder = emailCheck.attr('placeholder', 'Please write your email');

    if( nameCheck.val().length == 0 && emailCheck.val().length == 0 ) {
        $('#name, #mail').css('borderColor', 'red');
        
        isValid = false;
    } else if ( nameCheck.val().length == 0 ){
        nameCheck.css('borderColor', 'red');
        
        isValid = false;
    } else if ( emailCheck.val().length == 0  ) {
        emailCheck.css('borderColor', 'red');
        
        isValid = false;
    }

    nameCheck.on('change paste keyup', function(){
        if (nameCheck.val().length != 0) {
            nameCheck.css('borderColor', '#5e97b0');
        } 
    });
    emailCheck.on('change paste keyup', function(){
        if (emailCheck.val().length != 0) {
            emailCheck.css('borderColor', '#5e97b0');
        }
        
    });

    //check email input
    var mailFormat = /^[^@]+@[^@.]+\.[a-z]+$/i;
    var userEmail = $('#mail').val();
    var mailChecker = mailFormat.test(userEmail);
    if( !mailChecker ) {
        if( $('.email_checker').length <= 0 ) {
            $('#mail').after('<p class="email_checker error_style">Please write valid email address</p>');
        }
    }
    $('#mail').on('paste keyup', function() {
        userEmail = $('#mail').val();
        mailChecker = mailFormat.test(userEmail);
        if( !mailChecker) {
            if( $('.email_checker').length <= 0 ) {
                $('#mail').after('<p class="email_checker error_style">Please write valid email address</p>');
            }
        } else {
            $('.email_checker').remove();
        }
    });

    //check activiites checkbox
    if( !$('.activities input:checked').length ) {
        
        if( !$('.activity_error').length ) {
            $('.activities').append('<p class="activity_error error_style">At least one must be selected</p>')
        }

        $('.activities input').on('change', function(){
            $('.activity_error').remove();
        });
        isValid = false;
    }

    //check credit card user input
    if( $('option[value="credit card"]').is(':selected') ) {


        var cardDigitChecker = /^(\d{13,16})$/;
        if( !cardDigitChecker.test( $('#cc-num').val()) ) {
            $('#cc-num').css('borderColor', 'red');

            //check while user is typing
            $('#cc-num').on('change paste keyup', function(){
                //check credit card length
                if( $('#cc-num').val().length ) {
                    $('#cc-num').css('borderColor', '#5e97b0')
                } else {
                    $('#cc-num').css('borderColor', 'red')
                }

                if( !cardDigitChecker.test( $('#cc-num').val()) ){
                    if( !$('.creditcard_checker').length ) {
                        $('#cc-num').after('<p class="creditcard_checker error_style">Between 13 and 16 digits</p>');
                    }
                } else {
                    $('.creditcard_checker').remove();
                }
            });

            isValid = false;
        }

        //check zip code user input
        var zipCodeChecker = /^(\d{5})$/;
        if( !zipCodeChecker.test( $('#zip').val()) ) {
            $('#zip').css('borderColor', 'red');

            //check while user is typing
            $('#zip').on('change paste keyup', function(){
                //check zip code length
                if( $('#zip').val().length ) {
                    $('#zip').css('borderColor', '#5e97b0');
                } else {
                    $('#zip').css('borderColor', 'red')
                }

                if( !zipCodeChecker.test( $('#zip').val()) ) {
                    if( !$('.zipcode_checker').length ) {
                        $('#zip').after('<p class="zipcode_checker error_style">Max 5 digits</p>');
                    } 
                } else {
                    $('.zipcode_checker').remove();
                    
                }
                
            });

            isValid = false;
        }

        //check cvv user input
        var cvvChecker = /^(\d{3})$/;
        if( !cvvChecker.test( $('#cvv').val()) ) {
            $('#cvv').css('borderColor', 'red');

            //check while user is typing
            $('#cvv').on('change paste keyup', function(){
                //check cvv length
                if( $('#cvv').val().length ) {
                    $('#cvv').css('borderColor', '#5e97b0')
                } else {
                    $('#cvv').css('borderColor', 'red')
                }

                if( !cvvChecker.test( $('#cvv').val()) ) {
                    if( $('.cvv_checker').length <= 0 ) {
                        $('#cvv').after('<p class="cvv_checker error_style">Max 3 digits</p>');
                    }
                } else {
                    $('.cvv_checker').remove();
                }
            });

            isValid = false;
        }
    }


    
    //stop process if form is invalid
    if( !isValid ) {
        e.preventDefault();
    }
});
