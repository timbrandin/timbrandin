(function () {

    Accounts.oauth.registerService('instagram', 2, function(query) {

        var accessToken = getAccessToken(query);

        return {
            serviceData: {
                id: accessToken.user.id,
                accessToken: accessToken.access_token,
                username: accessToken.user.username
            },
            options: {
                profile: {
                    name: accessToken.user.full_name,
                    picture: accessToken.user.profile_picture
                }
            }
        };
    });

    var getAccessToken = function (query) {
        var config = Accounts.loginServiceConfiguration.findOne({service: 'instagram'});
        if (!config)
            throw new Accounts.ConfigError("Service not configured");

        var result = Meteor.http.post(
            "https://api.instagram.com/oauth/access_token", {params: {
                code: query.code,
                client_id: config.clientId,
                client_secret: config.secret,
                redirect_uri: Meteor.absoluteUrl("_oauth/instagram?close=close", {replaceLocalhost: true}),
                //apparently instagram won't send a callback with just ?close, this is why close=close
                grant_type: 'authorization_code'
            }});

        if (result.error) // if the http response was an error
            throw result.error;
        if (typeof result.content === "string")
            result.content = JSON.parse(result.content);
        if (result.content.error) // if the http response was a json object with an error attribute
            throw result.content;
        return result.content;
    };
})();
