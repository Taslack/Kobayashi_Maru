function apiGetGuestWifiState(onSuccessCallback){
    $.ajax({
        type: 'GET',
        url: getHost() + '/api/states/switch.lcars_srv_wi_fi_lcars_net_g',
        headers: {
            'Authorization': 'Bearer ' + getToken(),
            'content-type': 'application/json'
        },
        success: function(data){
            if(onSuccessCallback !== undefined){
                onSuccessCallback(data.state)
            }
        }
    })
}

function toggleGuestWifi(){
    $.ajax({
        type: 'POST',
        url: getHost() + '/api/services/switch/toggle',
        data: '{"entity_id": "switch.lcars_srv_wi_fi_lcars_net_g"}',
        headers: {
            'Authorization': 'Bearer ' + getToken(),
            'content-type': 'application/json'
        },
        success: function(data){
            callbackGetGuestWifiSwitchColor(data[0].state)
        }
    });
}

function getGuestWifiState(){
    return apiGetGuestWifiState(callbackGetGuestWifiState);
}

function callbackGetGuestWifiState(state){
    return state;
}

function getGuestWifiSwitchColor(){ 
    apiGetGuestWifiState(callbackGetGuestWifiSwitchColor);
}

function callbackGetGuestWifiSwitchColor(state){
    if(state == "off"){
        $('#guestWifiSwitch').removeClass("bg-orange-5");
        $('#guestWifiSwitch').addClass("bg-orange-4")
    }else{
        $('#guestWifiSwitch').removeClass("bg-orange-4");
        $('#guestWifiSwitch').addClass("bg-orange-5")  
    }
}
