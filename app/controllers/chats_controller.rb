require 'net/http'

class ChatsController < ApplicationController
    before_action :logged_in_user

    def home
        identity = current_user.id
        token = Twilio::Util::AccessToken.new "AC6e8a6ac0cde02b70cf13757258df57fc",
            "SK900b984c5d76c02721eed8bbf2a98fc6",
            "BCOR2EW40sDQQv9N3N5caVNM1tve1ebM", 3600, identity

        local_sid = "IS63900aeb7f6a40478fada67771a95dc9"
        heroku_sid = "IS179e2a15beac4a23aeb19d8bcbfad6ef"

        # Create IP Messaging grant for our token
        grant = Twilio::Util::AccessToken::IpMessagingGrant.new
        grant.service_sid = heroku_sid
        grant.endpoint_id = "procore_chat:#{identity}:browser"
        token.add_grant grant

        @token = token.to_jwt
        @users = User.all

        cmd = "curl -X POST https://ip-messaging.twilio.com/v1/Services/#{heroku_sid} \
               -d 'ReachabilityEnabled=true' \
               -u 'AC6e8a6ac0cde02b70cf13757258df57fc:4cd11afae4208bf3beead39b6c23a389'"

        puts cmd

        wasGood = system( cmd )

        puts wasGood

    end

end
