jQuery(document).ready(function($){
    
    let count = 0; //Initial count
    const AllCandid = []; //Create an array to store all the candidate
    
    //Detect keyboard 'Enter' key pressed
    $(".candid-wrapper input").on("keydown", function(event) {
        if(event.which == 13)
        {
            $('.enter-button').trigger('click')
        }
    });
    
       //Enter button function
      $('.enter-button').click(function(){
        if(count === 0){
            AllCandid[count] = $(".candid-wrapper input").val();
            count++;
            var result = 'Candidate ' + count + ': ' + $(".candid-wrapper input").val();
            $('.candid-name p').text(result);
            $(".candid-wrapper input").val('');
          }
          
         else if(count > 0){
             //Prevent duplicate candidate, remove if no need
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
    
    //Initial roll count
    let rollTime = 1;
    const ResultItem = []; //Create an array to store all the result
    
    //Roll button click function
    $('.roll-button').click(function(){
        if(AllCandid.length > 1){
            
            //Disable input field and button to prevent more value added when getting result
            $('.candid-input input').attr('disabled','disabled');
            $('.enter-button').addClass('disabled');
            
            //Display the result container
            $('.gacha-bottom').css('display','flex');
            $('.reset-wrapper').css('display','flex');
            
            let totalCandid = AllCandid.length;
            var winnerIndex = Math.floor(Math.random() * totalCandid); //Pick a winner randomly
            var winner = AllCandid[winnerIndex]; 
            $('.roll-time').text('You have rolled ' + rollTime + ' time(s)');
            $('.winner').text(winner);
            ResultItem[rollTime - 1] = winner;
            var item = '<p class="result-item"> 第 ' + rollTime + ' 次抽選結果 ： ' + winner + '</p>'; //Just to show result for each time
            $(item).appendTo('.result-list')
            
            //Prevent too much text appear at once if you need to roll many times to decied
            //5 can change to any number
            //This part can be removed if no needed
            if(rollTime > 5){
                const AllItem = document.querySelectorAll('.result-item');
                $(AllItem[0]).remove();
            }
            rollTime++;
            
            //Show the most frequent winner if roll times more than two times
            if(ResultItem.length>2){
                var finalWinner = GetMost(ResultItem);
                $('.best-result h1').html('出現最多次的選項 ： ' + finalWinner.name  + '\r\n<p>已出現 ： ' + finalWinner.times + '次</p>' + 
                '<p>出現概率 ： ' + finalWinner.rate + '%</p>'); 
                //In English
                //'Most frequent winner : winner name'
                //'Appeared : xx times'
                //'Probability : xx %'
            }
        }
        else{
            alert('At least two candidate needed');
        }
    })

    //Reset all data when reset button click
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

    //Function to get the most frequent winner
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



