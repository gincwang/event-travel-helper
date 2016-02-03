'use strict';

var eventbriteAPI = {
    fetch: function(search){
        search = encodeURIComponent(search);

        let token = 'R5HDI3P2VFYNWBLDOY6Z';
        let url = `https://www.eventbriteapi.com/v3/events/search/?q=${search}&sort_by=best&expand=venue,organizer,ticket_classes`;
        return new Promise(function(resolve, reject){
            $.ajax({
                url: url,
                headers: {Authorization: 'Bearer ' + token},
                success: function(json){
                    console.log('ajax success');
                    resolve(json.events);
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

export default eventbriteAPI;
