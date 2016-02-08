'use strict';

var expediaAPI = {
    fetchAirport: function(location){
        location = encodeURIComponent(location);
        console.log('expediaAPI: ' + location);
        let token = 'sPu7kEE2Xdb1R7lrKLmxT5OpxsJkDttL';
        let url = `http://terminal2.expedia.com/x/suggestions/regions?query=${location}`;
        return new Promise(function(resolve, reject){
            $.ajax({
                url: url,
                headers: {Authorization: 'expedia-apikey key=' + token},
                success: function(json){
                    console.log('ajax success');
                    console.log(json);
                    resolve(json.sr);
                },
                error: function(err){
                    console.log('ajax error');
                    console.log(err);
                    resolve([]);
                }
            });
        });

    }
};

export default expediaAPI;
