jQuery(document).ready(function($){
    let count = 0;
    const AllCandid = [];
    $(".candid-wrapper input").on("keydown", function(event) {
        if(event.which == 13)
        {
            $('.enter-button').trigger('click')
        }
    });

      $('.enter-button').click(function(){
        if(count === 0){
            AllCandid[count] = $(".candid-wrapper input").val();
            count++;
            var result = 'Candidate ' + count + ': ' + $(".candid-wrapper input").val();
            $('.candid-name p').text(result);
            $(".candid-wrapper input").val('');
          }
          else if(count > 0){
            if(AllCandid.indexOf($(".candid-wrapper input").val()) !== -1){
                alert('Candidate Exists')
            }
            else{
                AllCandid[count] = $(".candid-wrapper input").val();
                count++;
                var currentText = $('.candid-name p').text();
                var result = currentText + '\r\n' + 'Candidate ' + count + ': ' + $(".candid-wrapper input").val();
                $('.candid-name p').text(result);
                $(".candid-wrapper input").val('');
            }
          }
      })

    let rollTime = 1;
    const ResultItem = [];
    $('.roll-button').click(function(){
        if(AllCandid.length > 1){
            $('.candid-input input').attr('disabled','disabled');
            $('.gacha-bottom').css('display','flex');
            $('.reset-wrapper').css('display','flex');
            $('.enter-button').addClass('disabled');
            let totalCandid = AllCandid.length;
            var winnerIndex = Math.floor(Math.random() * totalCandid);
            var winner = AllCandid[winnerIndex];
            $('.roll-time').text('You have rolled ' + rollTime + ' time(s)');
            $('.winner').text(winner);
            ResultItem[rollTime - 1] = winner;
            var item = '<p class="result-item"> 第 ' + rollTime + ' 次抽選結果 ： ' + winner + '</p>';
            $(item).appendTo('.result-list')
            if(rollTime > 5){
                const AllItem = document.querySelectorAll('.result-item');
                $(AllItem[0]).remove();
            }
            rollTime++;
            if(ResultItem.length>2){
                var finalWinner = GetMost(ResultItem);
                $('.best-result h1').html('出現最多次的選項 ： ' + finalWinner.name  + '\r\n<p>已出現 ： ' + finalWinner.times + '次</p>' + 
                '<p>出現概率 ： ' + finalWinner.rate + '%</p>');
            }
        }
        else{
            alert('At least two candidate needed');
        }
    })

    $('.reset-btn').click(function(){
        $('.candid-name p').text('');
        $('.roll-time').text('');
        $('.winner').text('');
        $('.best-result h1').html('');
        $('.result-item').remove();
        $('.candid-input input').removeAttr('disabled');
        $('.gacha-bottom').css('display','');
        $('.reset-wrapper').css('display','');
        $('.enter-button').removeClass('disabled');
        ResultItem.length = 0;
        AllCandid.length = 0;
        count = 0;
        rollTime = 1;
    })

    function GetMost(arr){
        let compare = "";
        let mostFreq = "";
    
        arr.reduce((acc, val) => {
         if(val in acc){               // if key already exists
         acc[val]++;                // then increment it by 1
        }else{
         acc[val] = 1;      // or else create a key with value 1
        }
        if(acc[val] > compare){   // if value of that key is greater
                                // than the compare value.
         compare = acc[val];    // than make it a new compare value.
         mostFreq = val;        // also make that key most frequent.
      }
        return acc;
        }, {})
        let rate = compare / arr.length * 100;
        rate = (Math.round(rate * 100) / 100).toFixed(2);
        return {
            times : compare,
            name : mostFreq,
            rate : rate
        }
    }
});



