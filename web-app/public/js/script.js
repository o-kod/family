$(document).ready(function() {
    if (!Math.trunc) {
        Math.trunc = function(v) {
            v = +v;
            if (!isFinite(v)) return v;

            return (v - v % 1)   ||   (v < 0 ? -0 : v === 0 ? v : 0);
        };
    }
    $('input[name="is_child_disabled"]').attr('disabled', true);
    $('#married :input[type="checkbox"]').on('click', function () {
        if ( $(this).is(':checked') ) {
            $('#partner-payment')
                .addClass('d-flex')
                .css({
                    'display' : ''
                })
        } else {
            $('#partner-payment')
                .removeClass('d-flex')
                .css({
                    'display': 'none'
                })

        }
    })

    $('#is-children :input[type="checkbox"]').on('click', function () {
        if ( $(this).is(':checked') ) {
            $('input[name="is_child_disabled"]').attr('disabled', false);
            $('.children-count')
                .css({
                    'display': ''
                })
            childrenCheck();
            let childrenCount = $('input[name="children-radio"]:checked').val();
            for (let i = 0; i<childrenCount; i++) {
                childrenCheckAge($('input[type=radio][name="children-age' + i + '"]:checked'), i);
            }

        } else {
            $('#children').html('');
            if ($('input[name="is_child_disabled"]').is(':checked')) {
                $('input[name="is_child_disabled"]').prop('checked', false);
                $('input[name="is_child_disabled"]').click();
            };
            $('input[name="is_child_disabled"]').attr('disabled', true);
            $('.children-count')
                .css({
                    'display': 'none'
                })
        }
    })

    $('.payment').on('change', function() {
        this.value = this.value.replace(/\s/g, '');
        this.value = this.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    })

    $('.children-count').on('change', function() {
        $('#children').html('');
        let childrenCount = $('input[name="children-radio"]:checked').val();
        for (let i = 0; i<childrenCount; i++) {
            $('#children').append(
                '<div class="d-flex citizen-info-element-children align-items-center">'
                +    '<div class="col-1">' + (i + 1) + '-й ребенок</div>'
                +    '<div class="col-7 btn-group btn-group-toggle child-age" data-toggle="buttons">'
                +        '<label class="btn btn-outline-primary white-background active col-2">'
                +            '<input type="radio" name="children-age' + i + '" id="age0" autocomplete="off" checked value="0"/>0 - 1.5'
                +        '</label>'
                +        '<label class="btn btn-outline-primary white-background col-2">'
                +            '<input type="radio" name="children-age' + i + '" id="age1" autocomplete="off" value="1">1,5 - 3'
                +        '</label>'
                +        '<label class="btn btn-outline-primary white-background col-2">'
                +            '<input type="radio" name="children-age' + i + '" id="age2" autocomplete="off" value="2">3 - 7'
                +        '</label>'
                +        '<label class="btn btn-outline-primary white-background col-2">'
                +            '<input type="radio" name="children-age' + i + '" id="age3" autocomplete="off" value="3">7 - 16'
                +        '</label>'
                +        '<label class="btn btn-outline-primary white-background col-2">'
                +            '<input type="radio" name="children-age' + i + '" id="age4" autocomplete="off" value="4">16 - 18'
                +        '</label>'
                +        '<label class="btn btn-outline-primary white-background col-2">'
                +            '<input type="radio" name="children-age' + i + '" id="age5" autocomplete="off" value="5">18+'
                +        '</label>'
                +    '</div>'
                +    '<div class="col-4 btn-group btn-group-toggle child-activity" data-toggle="buttons"">'
                +    '</div>'
            +'</div>'
            );
            childrenCheckAge($('input[type=radio][name="children-age' + i + '"]:checked'), i);

            $('#children').on('change', 'input[type=radio][name="children-age' + i + '"]', function() {
                let that = this;
                $(that).parent().parent().parent().find('.child-activity').html('');
                switch (that.value) {
                    case '0':
                        $(that).parent().parent().parent().find('.child-activity').removeAttr('data-toggle');
                        $(that).parent().parent().parent().find('.child-activity').append(
                            '<div class="justify-content-center align-items-center row d-flex col-6">'
                            +    '<div class="col-8"><span>Родился в 2020</span></div>'
                            +    '<div class="col-4 current-year-child-birthday custom-control custom-checkbox custom-checkbox-green">'
                            +        '<input type="checkbox" class="custom-control-input custom-control-input-green" id="customCheckIsTwin'+ i +'">'
                            +        '<label class="custom-control-label" for="customCheckIsTwin'+ i +'"></label>'
                            +    '</div>'
                            +'</div>'
                            +'<div class="col-6 twins-wrapper">'
                            +   '<div class="twins justify-content-center align-items-center row d-flex">'
                            +       '<div class="col-8"><span>Близнец</span></div>'
                            +       '<div class="col-4 custom-control custom-checkbox custom-checkbox-green">'
                            +           '<input type="checkbox" class="custom-control-input custom-control-input-green" id="checkbox-twins' + i + '">'
                            +           '<label class="custom-control-label" for="checkbox-twins' + i + '"></label>'
                            +       '</div>'
                            +   '</div>'
                            +'</div>'
                        );
                        break;
                    case '1':
                        $(that).parent().parent().parent().find('.child-activity').attr('data-toggle', 'buttons');
                        $(that).parent().parent().parent().find('.child-activity').append(
                            '<label class="btn btn-outline-primary white-background active col-6" style="white-space:normal;">'
                            +    '<input type="radio" name="child-activity' + i + '" autocomplete="off" checked value="0"/>нет'
                            +'</label>'
                            +'<label class="btn btn-outline-primary white-background col-6" style="white-space:normal;">'
                            +    '<input type="radio" name="child-activity' + i + '" autocomplete="off" value="1"/>дет. сад'
                            +'</label>'
                        );
                        break;
                    case '2':
                        $(that).parent().parent().parent().find('.child-activity').attr('data-toggle', 'buttons');
                        $(that).parent().parent().parent().find('.child-activity').append(
                            '<label class="btn btn-outline-primary white-background active col-6" style="white-space:normal;">'
                            +    '<input type="radio" name="child-activity' + i + '" autocomplete="off" checked value="0"/>нет'
                            +'</label>'
                            +'<label class="btn btn-outline-primary white-background col-6" style="white-space:normal;">'
                            +    '<input type="radio" name="child-activity' + i + '" autocomplete="off" value="1"/>дет. сад'
                            +'</label>'
                        );
                        break;
                    case '3':
                        $(that).parent().parent().parent().find('.child-activity').attr('data-toggle', 'buttons');
                        $(that).parent().parent().parent().find('.child-activity').append(
                            '<label class="btn btn-outline-primary white-background active col-6" style="white-space:normal;">'
                            +    '<input type="radio" name="child-activity' + i + '" autocomplete="off" checked value="2"/>школа'
                            +'</label>'
                            +'<label class="btn btn-outline-primary white-background col-6" style="white-space:normal;">'
                            +    '<input type="radio" name="child-activity' + i + '" autocomplete="off" value="3"/>суз/вуз'
                            +'</label>'
                        );
                        break;
                    case '4':
                        $(that).parent().parent().parent().find('.child-activity').attr('data-toggle', 'buttons');
                        $(that).parent().parent().parent().find('.child-activity').append(
                            '<label class="btn btn-outline-primary white-background active col-6" style="white-space:normal;">'
                            +    '<input type="radio" name="child-activity' + i + '" autocomplete="off" checked value="2"/>школа'
                            +'</label>'
                            +'<label class="btn btn-outline-primary white-background col-6" style="white-space:normal;">'
                            +    '<input type="radio" name="child-activity' + i + '" autocomplete="off" value="4"/>суз/вуз'
                            +'</label>'
                        );
                        break;
                    case '5':
                        $(that).parent().parent().parent().find('.child-activity').attr('data-toggle', 'buttons');
                        $(that).parent().parent().parent().find('.child-activity').append(
                            '<label class="btn btn-outline-primary white-background active col-6" style="white-space:normal;">'
                            +    '<input type="radio" name="child-activity' + i + '" autocomplete="off" checked value="0"/>нет'
                            +'</label>'
                            +'<label class="btn btn-outline-primary white-background col-6" style="white-space:normal;">'
                            +    '<input type="radio" name="child-activity' + i + '" autocomplete="off" value="4"/>суз/вуз'
                            +'</label>'
                        );
                        break;
                    default:
                        break;
                }
                $('.twins-wrapper').hide();
            });

        }
    })

    var childrenCheck = function() {
        $('#children').html('');
        let childrenCount = $('input[name="children-radio"]:checked').val();
        for (let i = 0; i<childrenCount; i++) {
            $('#children').append(
                '<div class="d-flex citizen-info-element-children align-items-center">'
                    +'<div class="col-1">' + (i + 1) + '-й ребенок</div>'
                    +'<div class="col-7 btn-group btn-group-toggle child-age" data-toggle="buttons">'
                    +    '<label class="btn btn-outline-primary white-background active col-2">'
                    +        '<input type="radio" name="children-age' + i + '" id="age0" autocomplete="off" checked value="0"/>0 - 1.5'
                    +    '</label>'
                    +    '<label class="btn btn-outline-primary white-background col-2">'
                    +        '<input type="radio" name="children-age' + i + '" id="age1" autocomplete="off" value="1">1,5 - 3'
                    +    '</label>'
                    +    '<label class="btn btn-outline-primary white-background col-2">'
                    +        '<input type="radio" name="children-age' + i + '" id="age2" autocomplete="off" value="2">3 - 7'
                    +    '</label>'
                    +    '<label class="btn btn-outline-primary white-background col-2">'
                    +        '<input type="radio" name="children-age' + i + '" id="age3" autocomplete="off" value="3">7 - 16'
                    +    '</label>'
                    +    '<label class="btn btn-outline-primary white-background col-2">'
                    +        '<input type="radio" name="children-age' + i + '" id="age4" autocomplete="off" value="4">16 - 18'
                    +    '</label>'
                    +    '<label class="btn btn-outline-primary white-background col-2">'
                    +        '<input type="radio" name="children-age' + i + '" id="age5" autocomplete="off" value="5">18+'
                    +    '</label>'
                    +'</div>'
                    
                    +'<div class="col-4 btn-group btn-group-toggle child-activity" data-toggle="buttons"">'
                    +'</div>'
                +'</div>'
            );

            $('#children').on('change', 'input[type=radio][name="children-age' + i + '"]', function() {
                let that = this;
                $(that).parent().parent().parent().find('.child-activity').html('');
                switch (that.value) {
                    case '0':
                        $(that).parent().parent().parent().find('.child-activity').removeAttr('data-toggle');
                        $(that).parent().parent().parent().find('.child-activity').append(
                            '<div class="justify-content-center align-items-center row d-flex col-6">'
                            +    '<div class="col-8"><span>Родился в 2020</span></div>'
                            +    '<div class="col-4 current-year-child-birthday custom-control custom-checkbox custom-checkbox-green">'
                            +        '<input type="checkbox" class="custom-control-input custom-control-input-green" id="customCheckIsTwin'+ i +'">'
                            +        '<label class="custom-control-label" for="customCheckIsTwin'+ i +'"></label>'
                            +    '</div>'
                            +'</div>'
                            +'<div class="col-6 twins-wrapper">'
                            +   '<div class="twins justify-content-center align-items-center row d-flex">'
                            +       '<div class="col-8"><span>Близнец</span></div>'
                            +       '<div class="col-4 custom-control custom-checkbox custom-checkbox-green">'
                            +           '<input type="checkbox" class="custom-control-input custom-control-input-green" id="checkbox-twins' + i + '">'
                            +           '<label class="custom-control-label" for="checkbox-twins' + i + '"></label>'
                            +       '</div>'
                            +   '</div>'
                            +'</div>'
                        );
                        break;
                    case '1':
                        $(that).parent().parent().parent().find('.child-activity').attr('data-toggle', 'buttons');
                        $(that).parent().parent().parent().find('.child-activity').append(
                            '<label class="btn btn-outline-primary white-background active col-6" style="white-space:normal;">'
                            +    '<input type="radio" name="child-activity' + i + '" autocomplete="off" checked value="0"/>нет'
                            +'</label>'
                            +'<label class="btn btn-outline-primary white-background col-6" style="white-space:normal;">'
                            +    '<input type="radio" name="child-activity' + i + '" autocomplete="off" value="1"/>дет. сад'
                            +'</label>'
                        );
                        break;
                    case '2':
                        $(that).parent().parent().parent().find('.child-activity').attr('data-toggle', 'buttons');
                        $(that).parent().parent().parent().find('.child-activity').append(
                            '<label class="btn btn-outline-primary white-background active col-6" style="white-space:normal;">'
                            +   '<input type="radio" name="child-activity' + i + '" autocomplete="off" checked value="0"/>нет'
                            +   '</label>'
                            +   '<label class="btn btn-outline-primary white-background col-6" style="white-space:normal;">'
                            +   '<input type="radio" name="child-activity' + i + '" autocomplete="off" value="1"/>дет. сад'
                            +'</label>'
                    );
                        break;
                    case '3':
                        $(that).parent().parent().parent().find('.child-activity').attr('data-toggle', 'buttons');
                        $(that).parent().parent().parent().find('.child-activity').append(
                            '<label class="btn btn-outline-primary white-background active col-6" style="white-space:normal;">'
                            +    '<input type="radio" name="child-activity' + i + '" autocomplete="off" checked value="2"/>школа'
                            +'</label>'
                            +'<label class="btn btn-outline-primary white-background col-6" style="white-space:normal;">'
                            +    '<input type="radio" name="child-activity' + i + '" autocomplete="off" value="3"/>суз/вуз'
                            +'</label>'
                        );
                        break;
                    case '4':
                        $(that).parent().parent().parent().find('.child-activity').attr('data-toggle', 'buttons');
                        $(that).parent().parent().parent().find('.child-activity').append(
                            '<label class="btn btn-outline-primary white-background active col-6" style="white-space:normal;">'
                            +    '<input type="radio" name="child-activity' + i + '" autocomplete="off" checked value="2"/>школа'
                            +'</label>'
                            +'<label class="btn btn-outline-primary white-background col-6" style="white-space:normal;">'
                            +    '<input type="radio" name="child-activity' + i + '" autocomplete="off" value="4"/>суз/вуз'
                            +'</label>'
                        );
                        break;
                    case '5':
                        $(that).parent().parent().parent().find('.child-activity').attr('data-toggle', 'buttons');
                        $(that).parent().parent().parent().find('.child-activity').append(
                            '<label class="btn btn-outline-primary white-background active col-6" style="white-space:normal;">'
                            +    '<input type="radio" name="child-activity' + i + '" autocomplete="off" checked value="0"/>нет'
                            +'</label>'
                            +'<label class="btn btn-outline-primary white-background col-6" style="white-space:normal;">'
                            +    '<input type="radio" name="child-activity' + i + '" autocomplete="off" value="4"/>суз/вуз'
                            +'</label>'
                        );
                        break;
                    default:
                        break;

                }
                $('.twins-wrapper').hide();
            });
        }
    }

    var childrenCheckAge = function(that, i) {
        $(that).parent().parent().parent().find('.child-activity').html('');
        switch (that.val()) {
            case '0':
                $(that).parent().parent().parent().find('.child-activity').removeAttr('data-toggle');
                $(that).parent().parent().parent().find('.child-activity').append(
                    '<div class="justify-content-center align-items-center row d-flex col-6">'
                    +    '<div class="col-8"><span>Родился в 2020</span></div>'
                    +    '<div class="col-4 current-year-child-birthday custom-control custom-checkbox custom-checkbox-green">'
                    +        '<input type="checkbox" class="custom-control-input custom-control-input-green" id="customCheckIsTwin'+ i +'">'
                    +        '<label class="custom-control-label" for="customCheckIsTwin'+ i +'"></label>'
                    +    '</div>'
                    +'</div>'
                    +'<div class="col-6 twins-wrapper">'
                    +   '<div class="twins justify-content-center align-items-center row d-flex">'
                    +       '<div class="col-8"><span>Близнец</span></div>'
                    +       '<div class="col-4 custom-control custom-checkbox custom-checkbox-green">'
                    +           '<input type="checkbox" class="custom-control-input custom-control-input-green" id="checkbox-twins' + i + '">'
                    +           '<label class="custom-control-label" for="checkbox-twins' + i + '"></label>'
                    +       '</div>'
                    +   '</div>'
                    +'</div>'
                );
                break;
            case '1':
                $(that).parent().parent().parent().find('.child-activity').attr('data-toggle', 'buttons');
                $(that).parent().parent().parent().find('.child-activity').append(
                    '<label class="btn btn-outline-primary white-background active col-6" style="white-space:normal;">'
                    +    '<input type="radio" name="child-activity' + i + '" autocomplete="off" checked value="0"/>нет'
                    +'</label>'
                    +'<label class="btn btn-outline-primary white-background col-6" style="white-space:normal;">'
                    +    '<input type="radio" name="child-activity' + i + '" autocomplete="off" value="1"/>дет. сад'
                    +'</label>'
                );
                break;
            case '2':
                $(that).parent().parent().parent().find('.child-activity').attr('data-toggle', 'buttons');
                $(that).parent().parent().parent().find('.child-activity').append(
                    '<label class="btn btn-outline-primary white-background active col-6" style="white-space:normal;">'
                    +   '<input type="radio" name="child-activity' + i + '" autocomplete="off" checked value="0"/>нет'
                    +   '</label>'
                    +   '<label class="btn btn-outline-primary white-background col-6" style="white-space:normal;">'
                    +   '<input type="radio" name="child-activity' + i + '" autocomplete="off" value="1"/>дет. сад'
                    +'</label>'
            );
                break;
            case '3':
                $(that).parent().parent().parent().find('.child-activity').attr('data-toggle', 'buttons');
                $(that).parent().parent().parent().find('.child-activity').append(
                    '<label class="btn btn-outline-primary white-background active col-6" style="white-space:normal;">'
                    +    '<input type="radio" name="child-activity' + i + '" autocomplete="off" checked value="2"/>школа'
                    +'</label>'
                    +'<label class="btn btn-outline-primary white-background col-6" style="white-space:normal;">'
                    +    '<input type="radio" name="child-activity' + i + '" autocomplete="off" value="3"/>суз/вуз'
                    +'</label>'
                );
                break;
            case '4':
                $(that).parent().parent().parent().find('.child-activity').attr('data-toggle', 'buttons');
                $(that).parent().parent().parent().find('.child-activity').append(
                    '<label class="btn btn-outline-primary white-background active col-6" style="white-space:normal;">'
                    +    '<input type="radio" name="child-activity' + i + '" autocomplete="off" checked value="2"/>школа'
                    +'</label>'
                    +'<label class="btn btn-outline-primary white-background col-6" style="white-space:normal;">'
                    +    '<input type="radio" name="child-activity' + i + '" autocomplete="off" value="4"/>суз/вуз'
                    +'</label>'
                );
                break;
            case '5':
                $(that).parent().parent().parent().find('.child-activity').attr('data-toggle', 'buttons');
                $(that).parent().parent().parent().find('.child-activity').append(
                    '<label class="btn btn-outline-primary white-background active col-6" style="white-space:normal;">'
                    +    '<input type="radio" name="child-activity' + i + '" autocomplete="off" checked value="0"/>нет'
                    +'</label>'
                    +'<label class="btn btn-outline-primary white-background col-6" style="white-space:normal;">'
                    +    '<input type="radio" name="child-activity' + i + '" autocomplete="off" value="4"/>суз/вуз'
                    +'</label>'
                );
                break;
            default:
                break;

        }
        $('.twins-wrapper').hide();
    }

    let hideZeroes = function() {
        for (let i = 0; i < $('.payment_value').length; i++)
        {
            if (parseInt($('.payment_value').eq(i).text()) == 0) {
                $('.payment_value').eq(i).parent().parent().hide();
            } else {
                $('.payment_value').eq(i).parent().parent().show();
            }
        }

        for (let i = 0; i < $('.payment_value_header').length; i++) {
            if (parseInt($('.payment_value_header').eq(i).text()) == 0) {
                $('.payment_value_header').eq(i).hide();
                $('.payment_value_month_header').eq(i).hide();
                $('.payment_value_header').eq(i).parent().parent().find('.arm-s-h-2').hide();
            } else {
                $('.payment_value_header').eq(i).show();
                $('.payment_value_month_header').eq(i).show();
                $('.payment_value_header').eq(i).parent().parent().find('.arm-s-h-2').show();
            }

        }
    }

    let getFormData = function() {
        let citizen = {
            salary: $('#citizen-payment input.payment').val(),
            is_student: $('#citizen-payment .is_student input').is(':checked') ? 1 : 0,
            not_working: $('#citizen-payment .not_working input').is(':checked') ? 1 : 0,
            is_lost_covid: $('#citizen-payment .is_lost_covid input').is(':checked') ? 1 : 0,
        }
        let childrenOutput = [];
        let childrenCount = $('input[name="children-radio"]:checked').val();
        if (childrenCount > 0) {
            let children = $('#children .citizen-info-element-children');
            for (let i = 0; i<children.length; i++) {
                let activity = 0;
                if ($(children[i]).find('input[type=radio][name="child-activity' + i + '"]:checked').val() != undefined) {
                    activity = $(children[i]).find('input[type=radio][name="child-activity' + i + '"]:checked').val();
                }
                let currentYearBirthday = 0;
                if($(children[i]).find('.current-year-child-birthday input') != undefined) {
                    currentYearBirthday = $(children[i]).find('.current-year-child-birthday input').is(':checked') ? 1 : 0;
                }

                childrenOutput.push(
                    {
                        age: $(children[i]).find('input[type=radio][name="children-age' + i + '"]:checked').val(),
                        activity: activity,
                        current_year_birthday: currentYearBirthday,
                    }
                )
            }
        }
        let formData = {
            citizen: citizen,
            children: childrenOutput,
            is_student: $('#family-category input[name="is_student"]').is(':checked') ? 1 : 0,
            is_so_veteran: $('#family-category input[name="is_so_veteran"]').is(':checked') ? 1 : 0,
            is_disabled: $('#family-category input[name="is_disabled"]').is(':checked') ? 1 : 0,
            is_child_disabled: $('#family-category input[name="is_child_disabled"]').is(':checked') ? 1 :0,
            is_veteran: $('#family-category input[name="is_veteran"]').is(':checked') ? 1 : 0,
            is_war_veteran: $('#family-category input[name="is_war_veteran"]').is(':checked') ? 1: 0,
            is_retired: $('#family-category input[name="is_retired"]').is(':checked') ? 1 : 0,
            tax_estate: $('#estate-tax input').val(),
            car_power: $('#car-power input').val(),
            twins: $('.twins input:checked').length,
        }

        if ($('#married input').is(':checked')) {
            formData.partner  = {
                salary: $('#partner-payment input.payment').val(),
                is_student: $('#partner-payment .is_student input').is(':checked') ? 1 : 0,
                not_working: $('#partner-payment .not_working input').is(':checked') ? 1 : 0,
                is_lost_covid: $('#partner-payment .is_lost_covid input').is(':checked') ? 1 : 0,
            }
        }
        console.log('formData: ');
        console.log(formData);
        $.ajax({
            type: 'POST',
            url: '/calculate',
            data: formData,
            dataType: 'JSON',
            success: function(data) {
                fd = data;

                $('#monthly_children_payment_year .payment_value').text(data['monthly_children_payment_year']);
                $('#monthly_children_payment_year .payment_value_month').text(data['monthly_children_payment_year_month']);

                $('#maternity_leave .payment_value').text(data['maternity_leave']);
                $('#maternity_leave .payment_value_month').text(data['maternity_leave_month']);

                $('#monthly_children_birth_payment_year .payment_value').text(data['monthly_children_birth_payment_year']);
                $('#monthly_children_birth_payment_year .payment_value_month').text(data['monthly_children_birth_payment_year_month']);

                $('#children_inactivity .payment_value').text(data['children_inactivity']);
                $('#children_inactivity .payment_value_month').text(data['children_inactivity_month']);

                $('#children_activity .payment_value').text(data['children_activity']);
                $('#children_activity .payment_value_month').text(data['children_activity_month']);

                $('#children_nutrition .payment_value').text(data['children_nutrition']);
                $('#children_nutrition .payment_value_month').text(data['children_nutrition_month']);

                $('#children_monthly .payment_value').text(data['children_monthly']);
                $('#children_monthly .payment_value_month').text(data['children_monthly_month']);

                $('#children_hc .payment_value').text(data['children_hc']);
                $('#children_hc .payment_value_month').text(data['children_hc_month']);

                $('#children_social_month .payment_value').text(data['children_social_month']);
                $('#children_social_month .payment_value_month').text(data['children_social_month_month']);

                const childrenPaymentsMonth = data['monthly_children_payment_year_month'] + data['maternity_leave_month'] + data['monthly_children_birth_payment_year_month']
                                                + data['children_inactivity_month'] + data['children_activity_month'] + data['children_nutrition_month']
                                                + data['children_monthly_month'] + data['children_hc_month'] + data['children_social_month_month'];
                const childrenPayments = data['monthly_children_payment_year'] + data['maternity_leave'] + data['monthly_children_birth_payment_year']
                                        + data['children_inactivity'] + data['children_activity'] + data['children_nutrition']
                                        + data['children_monthly'] + data['children_hc'] + data['children_social_month'];

                $('#children_payments .payment_value_header').text(childrenPayments);
                $('#children_payments .payment_value_month_header').text(childrenPaymentsMonth);

                $('#child_birth .payment_value').text(data['child_birth']);
                $('#child_birth_mother_price .payment_value').text(data['child_birth_mother_price']);
                $('#child_birth_regional .payment_value').text(data['child_birth_regional']);
                $('#covid .payment_value').text(data['covid']);
                $('#child_payment_beginning_school_year .payment_value').text(data['child_payment_beginning_school_year']);
                $('#child_easter .payment_value').text(data['child_easter']);
                $('#children_social_contract .payment_value').text(data['children_social_contract']);
                $('#child_twins_two .payment_value').text(data['child_twins_two']);
                $('#child_twins_three .payment_value').text(data['child_twins_three']);

                const childrenPaymentsOnce = data['child_birth'] + data['child_birth_mother_price'] + data['child_birth_regional']
                    + data['covid'] + data['child_payment_beginning_school_year'] + data['child_easter']
                    + data['children_social_contract'] + data['child_twins_two'] + data['child_twins_three'];
                $('#children_payments_once .payment_value_header').text(childrenPaymentsOnce);


                $('#family_student_payment .payment_value').text(data['family_student_payment']);
                $('#family_student_payment .payment_value_month').text(data['family_student_payment_month']);

                $('#family_disabled_child_payment_pension_benefit .payment_value').text(data['family_disabled_child_payment_pension_benefit']);
                $('#family_disabled_child_payment_pension_benefit .payment_value_month').text(data['family_disabled_child_payment_pension_benefit_month']);

                $('#family_disabled_child_payment_hc .payment_value').text(data['family_disabled_child_payment_hc']);
                $('#family_disabled_child_payment_hc .payment_value_month').text(data['family_disabled_child_payment_hc_month']);

                $('#family_disabled_child_payment_status .payment_value').text(data['family_disabled_child_payment_status']);
                $('#family_disabled_child_payment_status .payment_value_month').text(data['family_disabled_child_payment_status_month']);
                $('#family_disabled_child_payment_care .payment_value').text(data['family_disabled_child_payment_care']);
                $('#family_disabled_child_payment_care .payment_value_month').text(data['family_disabled_child_payment_care_month']);
                $('#family_disabled_child_payment_month .payment_value').text(data['family_disabled_child_payment_month']);
                $('#family_disabled_child_payment_month .payment_value_month').text(data['family_disabled_child_payment_month_month']);

                $('#family_disabled_payment_pension_benefit .payment_value').text(data['family_disabled_payment_pension_benefit']);
                $('#family_disabled_payment_pension_benefit .payment_value_month').text(data['family_disabled_payment_pension_benefit_month']);
                $('#family_disabled_payment_hc .payment_value').text(data['family_disabled_payment_hc']);
                $('#family_disabled_payment_hc .payment_value_month').text(data['family_disabled_payment_hc_month']);
                $('#family_disabled_payment_status .payment_value').text(data['family_disabled_payment_status']);
                $('#family_disabled_payment_status .payment_value_month').text(data['family_disabled_payment_status_month']);

                $('#family_veteran_payment_pension_benefit .payment_value').text(data['family_veteran_payment_pension_benefit']);
                $('#family_veteran_payment_pension_benefit .payment_value_month').text(data['family_veteran_payment_pension_benefit_month']);
                $('#family_veteran_payment_status .payment_value').text(data['family_veteran_payment_status']);
                $('#family_veteran_payment_status .payment_value_month').text(data['family_veteran_payment_status_month']);
                $('#family_veteran_payment_hc .payment_value').text(data['family_veteran_payment_hc']);
                $('#family_veteran_payment_hc .payment_value_month').text(data['family_veteran_payment_hc_month']);

                $('#family_war_veteran_payment_pension_benefit .payment_value').text(data['family_war_veteran_payment_pension_benefit']);
                $('#family_war_veteran_payment_pension_benefit .payment_value_month').text(data['family_war_veteran_payment_pension_benefit_month']);
                $('#family_war_veteran_payment_status .payment_value').text(data['family_war_veteran_payment_status']);
                $('#family_war_veteran_payment_status .payment_value_month').text(data['family_war_veteran_payment_status_month']);
                $('#family_war_veteran_payment_disabled .payment_value').text(data['family_war_veteran_payment_disabled']);
                $('#family_war_veteran_payment_disabled .payment_value_month').text(data['family_war_veteran_payment_disabled_month']);
                $('#family_war_veteran_payment_plus .payment_value').text(data['family_war_veteran_payment_plus']);
                $('#family_war_veteran_payment_plus .payment_value_month').text(data['family_war_veteran_payment_plus_month']);
                $('#family_war_veteran_payment_hc .payment_value').text(data['family_war_veteran_payment_hc']);
                $('#family_war_veteran_payment_hc .payment_value_month').text(data['family_war_veteran_payment_hc_month']);

                $('#family_so_veteran_payment_pension_benefit .payment_value').text(data['family_so_veteran_payment_pension_benefit']);
                $('#family_so_veteran_payment_pension_benefit .payment_value_month').text(data['family_so_veteran_payment_pension_benefit_month']);
                $('#family_so_veteran_payment_status .payment_value').text(data['family_so_veteran_payment_status']);
                $('#family_so_veteran_payment_status .payment_value_month').text(data['family_so_veteran_payment_status_month']);

                $('#family_retired_payment_pension_benefit .payment_value').text(data['family_retired_payment_pension_benefit']);
                $('#family_retired_payment_pension_benefit .payment_value_month').text(data['family_retired_payment_pension_benefit_month']);
                $('#family_retired_payment_travel .payment_value').text(data['family_retired_payment_travel']);
                $('#family_retired_payment_travel .payment_value_month').text(data['family_retired_payment_travel_month']);

                const socPaymentsOption = data['family_student_payment'] + data['family_disabled_child_payment_pension_benefit'] + data['family_disabled_child_payment_hc']
                                            + data['family_disabled_child_payment_status'] + data['family_disabled_child_payment_care'] + data['family_disabled_child_payment_month']
                                            + data['family_disabled_payment_pension_benefit'] + data['family_disabled_payment_hc'] + data['family_disabled_payment_status']
                                            + data['family_veteran_payment_pension_benefit'] + data['family_veteran_payment_status'] + data['family_veteran_payment_hc']
                                            + data['family_war_veteran_payment_pension_benefit'] + data['family_war_veteran_payment_status'] + data['family_war_veteran_payment_disabled']
                                            + data['family_war_veteran_payment_plus'] + data['family_war_veteran_payment_hc'] + data['family_so_veteran_payment_pension_benefit']
                                            + data['family_so_veteran_payment_status'] + data['family_retired_payment_pension_benefit'] + data['family_retired_payment_travel'];

                const socPaymentsOptionMonth = data['family_student_payment_month'] + data['family_disabled_child_payment_pension_benefit_month'] + data['family_disabled_child_payment_hc_month']
                                            + data['family_disabled_child_payment_status_month'] + data['family_disabled_child_payment_care_month'] + data['family_disabled_child_payment_month_month']
                                            + data['family_disabled_payment_pension_benefit_month'] + data['family_disabled_payment_hc_month'] + data['family_disabled_payment_status_month']
                                            + data['family_veteran_payment_pension_benefit_month'] + data['family_veteran_payment_status_month'] + data['family_veteran_payment_hc_month']
                                            + data['family_war_veteran_payment_pension_benefit_month'] + data['family_war_veteran_payment_status_month'] + data['family_war_veteran_payment_disabled_month']
                                            + data['family_war_veteran_payment_plus_month'] + data['family_war_veteran_payment_hc_month'] + data['family_so_veteran_payment_pension_benefit_month']
                                            + data['family_so_veteran_payment_status_month'] + data['family_retired_payment_pension_benefit_month'] + data['family_retired_payment_travel_month'];

                $('#soc_payments_option .payment_value_header').text(socPaymentsOption);
                $('#soc_payments_option .payment_value_month_header').text(socPaymentsOptionMonth);


                $('#healthcare .payment_value').text(data['healthcare']);
                $('#healthcare_all .payment_value_header').text(data['healthcare']);


                $('#education_kindergarden .payment_value').text(data['education_kindergarden']);
                $('#education_school .payment_value').text(data['education_school']);
                $('#education_ptu .payment_value').text(data['education_ptu']);
                $('#education_vuz .payment_value').text(data['education_vuz']);


                $('#unemployment .payment_value').text(data['unemployment']);
                $('#unemployment .payment_value_month').text(data['unemployment_month']);

                $('#unemployment_children_payment .payment_value').text(data['unemployment_children_payment']);
                $('#unemployment_children_payment .payment_value_month').text(data['unemployment_children_payment_month']);

                const educationPayments = data['education_school'] + data['education_kindergarden'] + data['education_ptu'] + data['education_vuz'];
                $('#education_payments .payment_value_header').text(educationPayments);
                hideZeroes();


                let socOverallValue = data['monthly_children_payment_year'] + data['monthly_children_birth_payment_year'] + data['children_inactivity'] + data['children_activity']
                                    + data['children_nutrition'] + data['maternity_leave'] + data['children_hc']
                                    + data['child_birth'] + data['child_birth_mother_price'] + data['child_birth_regional'] + data['covid'] + data['child_payment_beginning_school_year']
                                    + data['child_easter'] + data['children_social_month'] + data['child_twins_two'] + data['child_twins_three']
                                    + data['family_student_payment'] + data['family_disabled_child_payment'] + data['family_disabled_payment']
                                    + data['family_veteran_payment'] + data['family_war_veteran_payment'] + data['family_so_veteran_payment'] + data['family_retired_payment']
                                    + data['unemployment'] + data['children_social_contract'] + data['unemployment_children_payment'];

                $('.arm-soc-elements .overall_value_area').text(socOverallValue);

                let healthOverallValue = data['healthcare'];
                $('.arm-health-elements .overall_value_area').text(healthOverallValue);

                let eduOverallValue = data['education_kindergarden'] + data['education_school'] + data['education_ptu'] + data['education_vuz'];
                $('.arm-edu-elements .overall_value_area').text(eduOverallValue);

                let taxes = parseInt(data['tax_car']) + parseInt(data['tax_estate']) + parseInt(data['tax_salary']) + parseInt(data['tax_insurance']);
                $('.arm-result-value-tax').text(taxes);

                let overallValue = socOverallValue + healthOverallValue + eduOverallValue;
                $('.arm-result-value-overall').text(overallValue);

                createChart(getChartData({
                    soc: socOverallValue,
                    edi: eduOverallValue,
                    health: healthOverallValue,
                    tax_salary: data['tax_salary'],
                    tax_car: data['tax_car'],
                    tax_estate: data['tax_estate'],
                    tax_insurance: data['tax_insurance'],
                    taxes: taxes,
                }));
                return data;
            }
        });
        return '';
    }


    let getChartData = function(formData) {
        fd = formData;
        let formResult = {
            labels: [],
            datasets: [],
        };
        let datasetData = [];
        let backgroundColorData = [];
        if (formData.soc > 0) {
            formResult.labels.push('Социальная сфера')
            datasetData.push(Math.trunc(formData.soc));
            backgroundColorData.push('#F6705D');
        }

        if (formData.edu > 0) {
            formResult.labels.push('Образование')
            datasetData.push(Math.trunc(formData.edu));
            backgroundColorData.push('#F6705D');
        }

        if (formData.health > 0) {
            formResult.labels.push('Здравоохранение')
            datasetData.push(Math.trunc(formData.health));
            backgroundColorData.push('#F6705D');
        }

        if (datasetData.length > 0) {
            formResult.datasets.push({
                data: datasetData,
                backgroundColor: backgroundColorData,
                borderColor: '#F6705D',
                borderWidth: 1,
                pointBackgroundColor: '#F6705D'
            })
        }
        return formResult;
    }


    let createChart = function(chartData) {
        $('.modal-content-chart').html(
            '<div class="container">'
            +    '<div class="row">'
            +        '<div class="col-12">'
            +            '<div class="card">'
            +                '<div class="card-body" style="height: 200px !important;">'
            +                    '<canvas id="chLine"></canvas>'
            +                '</div>'
            +            '</div>'
            +        '</div>'
            +    '</div>'
            +'</div>'
        );
        var chLine = document.getElementById("chLine");
        if (chLine) {
            chart = new Chart(chLine, {
                type: 'horizontalBar',
                data: chartData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: false
                            }
                        }]
                    },
                    legend: {
                        display: false
                    }
                }
            });
        }
    }

    $('.arm-calculate').on('click', function() {
        $('.error').text('');
        let twins = $('.twins input:checked');
        for (let i = 0; i < twins.length; i++) {
            if (twins.length == 1) {
                $('.error').text('Необходимо выбрать хотя бы двух близнецов');
                return false;
            }
        }

        for (let i = 0; i < $('.sport input[type="checkbox"]').length; i++) {
            let sportCheckbox = $('.sport input[type="checkbox"]').eq(i);
            if ($(sportCheckbox).is(':checked')) {
                $(sportCheckbox).prop('checked', false);
                $(sportCheckbox).click();
                $(sportCheckbox).click();
                $('.arm-cult-elements .overall_value_area').text(0);
            }
        }

        $('.arm-open-wrap').hide();
        $('.arm-show-hide').removeClass('arm-open');
        $('.arm-s-h-2').removeClass('open-arm')
        $('.arm-soc').click();
        let formData = getFormData();
        $('.arm-input-data-wrapper').hide();
        $('.arm-output-data-wrapper').show();

    });

    $('.arm-input').on('click', function() {
        $('.arm-input-data-wrapper').show();
        $('.arm-output-data-wrapper').hide();
    });


    // $('#content-form').on('submit', function(e) {
    $('.citizen-info-element-calculate').on('click', function(e) {
        // e.preventDefault();
        $('.error').text('');
        let twins = $('.twins input:checked');
        for (let i = 0; i < twins.length; i++) {
            if (twins.length == 1) {
                $('.error').text('Необходимо выбрать хотя бы двух близнецов');
                return false;
            }
        }

        for (let i = 0; i < $('.sport input[type="checkbox"]').length; i++) {
            let sportCheckbox = $('.sport input[type="checkbox"]').eq(i);
            if ($(sportCheckbox).is(':checked')) {
                $(sportCheckbox).prop('checked', false);
                $(sportCheckbox).click();
                $(sportCheckbox).click();
                $('.arm-cult-elements .overall_value_area').text(0);
            }
        }

        $('.arm-open-wrap').hide();
        $('.arm-show-hide').removeClass('arm-open');
        $('.arm-s-h-2').removeClass('open-arm')
        $('.arm-soc').click();
        let formData = getFormData();
        $('.arm-input-data-wrapper').hide();
        $('.arm-output-data-wrapper').show();
    });

    $('#modal-soc').on('click', function() {
        $('.modal-content-header').text('Выплаты в социальной сфере');
    });
    $('#modal-health').on('click', function() {
        $('.modal-content-header').text('Выплаты в сфере здравоохранения');
    });
    $('#modal-edu').on('click', function() {
        $('.modal-content-header').text('Выплаты в сфере образования');
    });
    $('#modal-culture').on('click', function() {
        $('.modal-content-header').text('Выплаты в сфере культуры и спорта');
    });


    $('.arm-show-hide').on('click', function() {
        if ($(this).hasClass('arm-open')) {
            $(this).removeClass('arm-open');
            const name = $(this).attr('name');
            $('.arm-open-wrap[name=' + name + ']').hide();
        } else {
            $(this).addClass('arm-open');
            const name = $(this).attr('name');
            $('.arm-open-wrap[name=' + name + ']').show();
        }
    })

    $('.arm-s-h-2').on('click', function() {
        if ($(this).hasClass('open-arm')) {
            $(this).removeClass('open-arm');
            const name = $(this).attr('name');
            $('.arm-open-wrap[name=' + name + ']').hide();
        } else {
            $(this).addClass('open-arm');
            const name = $(this).attr('name');
            $('.arm-open-wrap[name=' + name + ']').show();
        }
    })

    let setNavigation = function(that) {
        if (!$(that).hasClass('arm-active')) {
            $('.arm-navigation').removeClass('arm-active');
            $(that).addClass('arm-active');
        }
    }
    $('.arm-navigation').on('click', function() {
        setNavigation(this);
    })

    $('.arm-soc').on('click', function() {
        $('.arm-element').hide();
        $('.arm-soc-elements').show();
    })
    $('.arm-helth').on('click', function() {
        $('.arm-element').hide();
        $('.arm-health-elements').show();
    })
    $('.arm-edu').on('click', function() {
        $('.arm-element').hide();
        $('.arm-edu-elements').show();
    })
    $('.arm-cult').on('click', function() {
        $('.arm-element').hide();
        $('.arm-cult-elements').show();
    })


    $('#children').on('change', '.current-year-child-birthday input[type=checkbox]', function() {
        th = this;
        if ($(this).is(':checked')) {
            $(this).parent().parent().parent().find('.twins-wrapper').show();
        } else {
            $(this).parent().parent().parent().find('.twins-wrapper').hide();
            $(this).parent().parent().parent().find('.twins-wrapper input').prop('checked', false);
        }

    })

    $('.sport :input[type="checkbox"]').on('click', function(){
        if ($(this).is(':checked')) {
            sportPayments = this;
            updateChartAdd('Спорт', Math.trunc($(this).parent().parent().find('.payment_value').text()));
        } else {
            updateChartRemove('Спорт', Math.trunc($(this).parent().parent().find('.payment_value').text()));
        }
    })


    let updateChartRemove = function(label, value) {
        let i = 0;
        for (let i = 0; i < chart.data.labels.length; i++) {
            if (chart.data.labels[i] == label) {
                if ((chart.data.datasets[0].data[i] - value) <= 0) {
                    chart.data.labels.splice(i, 1);
                    chart.data.datasets[0].data.splice(i, 1);
                    chart.data.datasets[0].backgroundColor.splice(i, 1);
                    $('.arm-cult-elements .overall_value_area').text(0);
                    $('.arm-result-value-overall').text(parseInt($('.arm-result-value-overall').text()) - parseInt(value));
                    chart.update();
                    break;
                } else {
                    chart.data.datasets[0].data[i] -= value;
                    $('.arm-cult-elements .overall_value_area').text(chart.data.datasets[0].data[i]);
                    $('.arm-result-value-overall').text(parseInt($('.arm-result-value-overall').text()) - parseInt(value));
                    chart.update();
                }
            }
        }
    }

    let updateChartAdd = function(label, value) {
        let i = 0;
        let flag = true;
        for (let i = 0; i < chart.data.labels.length; i++) {
            if (chart.data.labels[i] == label) {
                chart.data.datasets[0].data[i] += value;
                $('.arm-cult-elements .overall_value_area').text(chart.data.datasets[0].data[i]);
                $('.arm-result-value-overall').text(parseInt($('.arm-result-value-overall').text()) + parseInt(value));
                chart.update();
                flag = false;
                break;
            }
        }
        if (flag) {
            chart.data.labels.push(label);
            chart.data.datasets[0].data.push(Math.trunc(value));
            $('.arm-cult-elements .overall_value_area').text(Math.trunc(value));
            $('.arm-result-value-overall').text(parseInt($('.arm-result-value-overall').text()) + parseInt(value));
            chart.data.datasets[0].backgroundColor.push("#F6705D");
            chart.update();
        }
    }

})

function isNumberKey(evt)
{
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31
        && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

