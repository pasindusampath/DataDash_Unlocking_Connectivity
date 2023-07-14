class Main {
    mobile = '0787149579';
    pushId = 'fd4CkQQrTKSOC0Rh5rps-A%3AAPA91bEBRjwH9Vnhdjn62B44ZBk5KkeDyka90-MrhUxOMzeKyRvB4qfrAK7AazxJYzxb94qxFBKbFQRZ0J_blI9o1H0bZP11hDAIM1M8UELtN7SulyZ_-WiD7abGnK3glAt1EeVxsN_g'
    constructor() {
        localStorage.setItem('key', '64b043b1956013.46105348')
        this.getDetails()
        $('#getOtp').click(this.getOtp.bind(this));
        $('#submitOtp').click(this.submitOtp.bind(this));
        $('#getData').click(this.getData.bind(this));
        $('#btn600').click(this.request1.bind(this));
    }

    getOtp() {
        $('#getOtp').prop('disabled', true);
        let mn = $('#mobileNo').val();
        if (!(this.validateMobile())) {
            alert("Wrong Number Enter Correct Number");
            $('#getOtp').prop('disabled', false);
            return;
        }
        this.mobile = mn
        this.request(mn);
    }

    submitOtp() {
        let pass = $('#password').val();
        if (!this.validatePassword()) {
            alert('Check Again');
        }
        this.subOtp(pass);
    }

    validatePassword() {
        return (/^\d{5}$/).test($('#password').val())
    }

    validateMobile() {
        let mn = $('#mobileNo').val();
        let s = /^(?:0|94|\+94|0094)?(?:78\d|72\d)\d{6}$/;
        return s.test(mn)
    }

    subOtp(pass) {
        var settings = {
            "url": "https://oneapp.hutch.lk/hutch_2_0/index.php?r=scapp/connection/registerConfirmPin",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
            "data": "appType=android&appVersion=3.0.8&deviceModel=SM-G988N&deviceRef=ad13e41df99ff787&" +
                "deviceVersion=7.1.2&platformName=android&platformVersion=7.1.2&deviceToken=&operator=" +
                "&lob=&conn=" + this.mobile + "&primaryConn=" + this.mobile + "&prePostType=&language=en&pushI" +
                "d=fd4CkQQrTKSOC0Rh5rps-A%3AAPA91bEBRjwH9Vnhdjn62B44ZBk5KkeDyka90-MrhUxOMzeKyRvB4qfrAK" +
                "7AazxJYzxb94qxFBKbFQRZ0J_blI9o1H0bZP11hDAIM1M8UELtN7SulyZ_-WiD7abGnK3glAt1EeVxsN_g&prov" +
                "ider=gms&cosMerge=&pin=" + pass + "&promoCode=",
        };
        $.ajax(settings).done(function (response) {
            console.log(response);
            if (((JSON.parse(response)).success) === true) {
                console.log('OK');
                localStorage.setItem('key', ((JSON.parse(response)).data).deviceToken)
                ob.getDetails()
                $('.mainSection').removeClass('view');
                $('#getDataSection').addClass('view2');
                $('#myDetails').css({"display":"block"});

            }

        });
    }

    request(mn) {
        var settings = {
            "url": "https://oneapp.hutch.lk/hutch_2_0/index.php?r=scapp/connection/registerPinSend",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
            "data": "appType=android&appVersion=3.0.8&deviceModel=SM-G988N&deviceRef=ad13e41df99ff787&deviceVersion=7.1.2&platformName=android&platformVersion=7.1.2&deviceToken=&operator=&lob=&conn=" + mn + "&primaryConn=" + mn + "&prePostType=&language=en&pushId=fd4CkQQrTKSOC0Rh5rps-A%3AAPA91bEBRjwH9Vnhdjn62B44ZBk5KkeDyka90-MrhUxOMzeKyRvB4qfrAK7AazxJYzxb94qxFBKbFQRZ0J_blI9o1H0bZP11hDAIM1M8UELtN7SulyZ_-WiD7abGnK3glAt1EeVxsN_g&provider=gms&cosMerge=&promoCode=",
        };
        $.ajax(settings).done(function (response) {
            let parse = JSON.parse(response);
            console.log(parse.success)
            if (parse.success === true) {
                $('.mainSection').removeClass('view');
                $('#confirmOtp').addClass('view');
            }
        }).fail((a, b, c) => {
            $('#getOtp').prop('disabled', false);
        })
    }

    getData() {
        this.btnTimeout('#getData');
        let item = localStorage.getItem('key');
        let sent = "appType=android&appVersion=3.0.8&deviceModel=SM-G988N&deviceRef=ad13e41df99ff787&deviceVersion=7.1.2&platformName=android&platformVersion=7.1.2&deviceToken=" + item + "&operator=HUTCH&lob=mobile&conn=" + this.mobile.slice(1) + "&primaryConn=" + this.mobile.slice(1) + "&prePostType=pre&language=en&pushId=fd4CkQQrTKSOC0Rh5rps-A%3AAPA91bEBRjwH9Vnhdjn62B44ZBk5KkeDyka90-MrhUxOMzeKyRvB4qfrAK7AazxJYzxb94qxFBKbFQRZ0J_blI9o1H0bZP11hDAIM1M8UELtN7SulyZ_-WiD7abGnK3glAt1EeVxsN_g&provider=gms&cosMerge=ID&id=3580&category=Selfcare&offerType=stv&price=0.0&name=25MB%20Data";
        var settings = {
            "url": "https://oneapp.hutch.lk/hutch_2_0/index.php?r=scapp/flyTextOffers/activateLoyaltyOffers",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "Content-Length": sent.length,
                "Host": "oneapp.hutch.lk",
            },
            "data": sent,
        };
        $.ajax(settings).done(function (response) {
            ob.getDetails()
        });
    }

    request1() {
        this.btnTimeout('#btn600');
        let data = localStorage.getItem('key');
        var settings = {
            "url": "https://oneapp.hutch.lk/hutch_2_0/index.php?r=scapp/flyTextOffers/activateLoyaltyOffers",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "Accept": "application/json",
                "Accept-Encoding": "gzip",
            },
            "data": "appType=android&appVersion=3.0.8&deviceModel=SM-G988N&deviceRef=ad13e41df99ff787&deviceVersion=7.1.2&platformName=android&platformVersion=7.1.2&deviceToken=" + data + "&operator=HUTCH&lob=mobile&conn=" + this.mobile.slice(1) + "&primaryConn=" + this.mobile.slice(1) + "&prePostType=pre&language=en&pushId=fd4CkQQrTKSOC0Rh5rps-A%3AAPA91bEBRjwH9Vnhdjn62B44ZBk5KkeDyka90-MrhUxOMzeKyRvB4qfrAK7AazxJYzxb94qxFBKbFQRZ0J_blI9o1H0bZP11hDAIM1M8UELtN7SulyZ_-WiD7abGnK3glAt1EeVxsN_g&provider=gms&cosMerge=ID&id=3741&category=Selfcare&offerType=stv&price=0.0&name=FREE%20600MB%20Offer",
        };

        $.ajax(settings).done(function (response) {
            ob.getDetails()
        });
    }

    btnTimeout(btn) {
        $(btn).prop('disabled', true);
        setTimeout(function () {
            $(btn).prop('disabled', false);
        }, 10000);
    }

    getDetails() {
        let data = localStorage.getItem('key');
        var settings = {
            "url": "https://oneapp.hutch.lk/hutch_2_0/index.php?r=scapp/dashboard/readDashboardData",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "Accept": "application/json",
                "Accept-Encoding": "gzip",
            },
            "data": "appType=android&appVersion=3.0.8&deviceModel=SM-G988N&deviceRef=ad13e41df99ff787&deviceVersion=7.1.2&platformName=android&platformVersion=7.1.2&deviceToken=" + data + "&operator=HUTCH&lob=mobile&conn=" + this.mobile.slice(1) + "&primaryConn=" + this.mobile.slice(1) + "&prePostType=pre&language=en&pushId="+this.pushId+"&provider=gms&cosMerge=ID",
        };

        $.ajax(settings).done(function (response) {
            let parse = JSON.parse(response);
            let allPb = parse.data.all_pb;
            let profileDetails = parse.data.profileDetails;
            let mno =`<p>MOBILE NO : ${profileDetails.mobile_number}</p><p>&nbsp;</p>`;
            let pkgn =`<p>PACKAGE NAME : ${profileDetails.package_name}</p><p>&nbsp;</p>`;
            let pkgt =`<p>PACKAGE TYPE : ${profileDetails.package_type}</p><p>&nbsp;</p>`;
            let mt =`<p>MEMBER TYPE : ${profileDetails.member_type}</p><p>&nbsp;</p>`;
            let st =`<p>STATUS : ${profileDetails.status}</p><p>&nbsp;</p>`;
            let puk =`<p>PUK Number : ${profileDetails.puk}</p><p>&nbsp;</p>`;
            $('.connection-details .mycontainer').append($(mno))
            $('.connection-details .mycontainer').append($(pkgn))
            $('.connection-details .mycontainer').append($(pkgt))
            $('.connection-details .mycontainer').append($(mt))
            $('.connection-details .mycontainer').append($(st))
            $('.connection-details .mycontainer').append($(puk))


            let currentBal = parse.data.currBal;
            let main =`<p>MAIN BALANCE : ${currentBal.main}</p><p>&nbsp;</p>`;
            let loan =`<p>LOAN :  ${currentBal.loan}</p><p>&nbsp;</p>`;
            $('.package-details .mycontainer').eq(0).append($(main))
            $('.package-details .mycontainer').eq(0).append($(loan))
            $.each(allPb, (i, e) => {
                console.log(e)
                let newVar = `<div><p></p></div>`;
                let prog =`<div class="pkg-prograss"><a>MIN</a><div class="progress-loader"></div><a>MAX</a></div>`;
                let pro =`<div class="progress"></div>`;
                let jq = $(newVar);
                let jqprog = $(prog);
                let jqpro = $(pro);
                jq.append(jqprog)
                let formated = `${e.title.padEnd(20, "")} : ${e.remain_val_st}`;
                jq.children('p').eq(0).text(formated);
                jqprog.children('div').eq(0).append(jqpro)
                jqpro.css({'width':e.precentage+'%'})

                $('.package-details .mycontainer').eq(0).append(jq)
            });
            $('.package-details>div').eq(0).css({'overflow': 'scroll'})
            $('.package-details>div::-webkit-scrollbar').eq(0).css({'width': '0'})


        });
    }
}

let ob = new Main();