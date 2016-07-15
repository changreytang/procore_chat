class ChatsController < ApplicationController
  before_action :logged_in_user

	def home
    identity = current_user.name
    token = Twilio::Util::AccessToken.new "AC6e8a6ac0cde02b70cf13757258df57fc",
        "SK900b984c5d76c02721eed8bbf2a98fc6",
        "BCOR2EW40sDQQv9N3N5caVNM1tve1ebM", 3600, identity

    # Create IP Messaging grant for our token
    grant = Twilio::Util::AccessToken::IpMessagingGrant.new
    grant.service_sid = "IS06c3efca34a849cdaf9ee31cfa99b816"
    grant.endpoint_id = "procore_chat:#{identity}:browser"
    token.add_grant grant

    @token = token.to_jwt
    @users = User.all
  end

end
