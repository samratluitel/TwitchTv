$( document ).ready(function() {
    var streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
    getChannels(streamers);
    function getChannels(streamer){
        //Remember to convert any variable to array even if it is single
        streamer.forEach(function(channel){
            function makeUrl(type,name){
                return `https://wind-bow.glitch.me/twitch-api/${type}/${name}`;
            }
            $.get(makeUrl("streams",channel),function(data){
                var status,game;
                if(data.stream == null){
                    status="offline";
                }else if(data.stream == undefined){
                    status = "offline";
                }else{
                    status="online";
                    game=data.stream.game;
                }
                $.get(makeUrl("channels",channel),function(data){
                    var logo= data.logo;
                    var url= data.url;
                    var showText = (status=="online")?`streaming ${game}`:`offline`;
                    var html =
                    `
                    <div class="streamer-block ${status}">
                    <div class="row">
                        <div class="col-md-2">
                            <div class="logo">
                                <img class="img-logo" src="${logo}" alt="">
                            </div>
                        </div>
                        <div class="col-md-10">
                            <p class="streamer-description">
                                <span class="streamer-link"><a href="${url}">${channel}</a>
                                </span> is currently 
                                <span class="streamer-status">${showText}</span>
                            </p>
                        </div>
                    </div>
                    </div>
                    `;
                    $("#streamer-container").append(html);
                });
            });
        })
    }

    $("#search").keypress(function(e) {
        if(e.which == 13) {
            var array=[$("#search").val()];
            $("#search").val("");
            getChannels(array);
        }
    })
    $(".btn").click(function(){
        $(".btn").removeClass("active");
        $(this).addClass("active");
        var status = $(this).attr('id');
        console.log(status);
        if(status=="all"){
            console.log("called");
            $(".online, .offline").removeClass("hidden");
        }else if(status=="online"){
            $(".online").removeClass("hidden");
            $(".offline").addClass("hidden");
        }else{
            $(".offline").removeClass("hidden");
            $(".online").addClass("hidden");
        }
    })
});