
    function searchAllMember() {

        $.ajax({
            url : "http://localhost:7070/bank/selectAllMember",
            type : "GET",
            dataType : "jsonp",
            jsonp : "callback",
            timeout : 3000,  // 데이터받는걸 3초까지만 기다림
            success : function (result) {

                $('#memberAll').empty();

                for( var i=0 ; i<result.length; i++) {

                    var tr = $('<tr></tr>');

                    var memberId = $('<td></td>').text(result[i].memberId);
                    var memberName = $('<td></td>').text(result[i].memberName);
                    var memberAccount = $('<td></td>').text(result[i].memberAccount);
                    var memberBalance = $('<td></td>').text(result[i].memberBalance);

                    tr.append(memberId);
                    tr.append(memberName);
                    tr.append(memberAccount);
                    tr.append(memberBalance);

                    $('#memberAll').append(tr);
                }
            },
            error : function () {
                alert("error");
            }
        });
    }

    function searchMember() {
        if(event.keyCode == 13) {

            var id = $('#memberId').val();

            $.ajax({
                url : "http://localhost:7070/bank/searchMember",
                type : "GET",
                dataType : "jsonp",
                jsonp : "callback",
                timeout : 3000,  // 데이터받는걸 3초까지만 기다림
                data : {
                    memberId : id,
                },
                success : function (result) {

                    $('#memberDetail').empty();

                    for( var i=0 ; i<result.length; i++) {

                        var tr = $('<tr></tr>');

                        var memberId = $('<td></td>').text(result[i].memberId);
                        var memberName = $('<td></td>').text(result[i].memberName);
                        var memberAccount = $('<td></td>').text(result[i].memberAccount);
                        var memberBalance = $('<td></td>').text(result[i].memberBalance);

                        tr.append(memberId);
                        tr.append(memberName);
                        tr.append(memberAccount);
                        tr.append(memberBalance);

                        $('#memberDetail').append(tr);
                    }
                },
                error : function () {
                    alert("error");
                }
            });
        }
    }

    function inputBalance() {

        var id = $('#depositMemberId').val();
        var money = $('#depositMemberBalance').val();

        $.ajax({
            url : "http://localhost:7070/bank/deposit",
            type : "GET",
            dataType : "jsonp",
            jsonp : "callback",
            timeout : 3000,  // 데이터받는걸 3초까지만 기다림
            data : {
                memberId : id,
                memberBalance : money
            },
            success : function (result) {
                if(result){
                    alert("입금성공");
                    $('#depositMemberId').val("");
                    $('#depositMemberBalance').val("");
                }
            },
            error : function () {
                alert("error");
            }
        });
    }

    function withdrawBalance() {

        var id = $('#withdrawMemberId').val();
        var money = $('#withdrawMemberBalance').val();

        $.ajax({
            url : "http://localhost:7070/bank/withdraw",
            type : "GET",
            dataType : "jsonp",
            jsonp : "callback",
            timeout : 3000,  // 데이터받는걸 3초까지만 기다림
            data : {
                memberId : id,
                memberBalance : money
            },
            success : function (result) {
                if(result){
                    alert("출금성공");
                    $('#withdrawMemberId').val("");
                    $('#withdrawMemberBalance').val("");
                } else {
                    alert("잔액이 부족하여 출금할 수 없습니다.");
                }
            },
            error : function () {
                alert("error");
            }
        });
    }

    function transferBalance() {

        var sendId = $('#sendMemberId').val();
        var receiveId = $('#receiveMemberId').val();
        var money = $('#transferBalance').val();

        $.ajax({
            url : "http://localhost:7070/bank/transfer",
            type : "GET",
            dataType : "jsonp",
            jsonp : "callback",
            timeout : 3000,  // 데이터받는걸 3초까지만 기다림
            data : {
                sendId : sendId,
                receiveId : receiveId,
                memberBalance : money
            },
            success : function (result) {
                if(result){
                    alert("이체성공");
                    $('#sendMemberId').val("");
                    $('#receiveMemberId').val("");
                    $('#transferBalance').val("");
                } else {
                    alert("잔액이 부족하여 출금할 수 없습니다.");
                }
            },
            error : function () {
                alert("error");
            }
        });
    }

    function checkMember() {

        var id = $('#checkMemberId').val();

        $.ajax({
            url : "http://localhost:7070/bank/checkMember",
            type : "GET",
            dataType : "jsonp",
            jsonp : "callback",
            timeout : 3000,  // 데이터받는걸 3초까지만 기다림
            data : {
                id : id
            },
            success : function (result) {

                $('#accountAll').empty();

                result.sort(SortByDate);

                for( var i=0 ; i<result.length; i++) {

                    var tr = $('<tr></tr>');

                    var state = $('<td></td>').text(result[i].state);
                    var sendid = $('<td></td>').text(result[i].sendid);
                    var receiveid = $('<td></td>').text(result[i].receiveid);
                    var money = $('<td></td>').text(result[i].money);
                    var date = $('<td></td>').text(result[i].date);

                    tr.append(state);
                    tr.append(sendid);
                    tr.append(receiveid);
                    tr.append(money);
                    tr.append(date);

                    $('#accountAll').append(tr);
                }

                $('#checkMemberId').val("");
            },
            error : function () {
                alert("error");
            }
        });
    }

    function SortByDate(a, b){
        var aDate = a.date.toLowerCase();
        var bDate = b.date.toLowerCase();
        return ((aDate < bDate) ? 1 : ((aDate > bDate) ? -1 : 0));
    }
