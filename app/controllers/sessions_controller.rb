class SessionsController < ApplicationController
  before_action :not_logged_in_user, only: [:new, :create]

	def new
	end

  def create
    user = User.find_by(email: params[:session][:email].downcase)
    if user 
      log_in user
      redirect_to users_path
    else
      flash.now[:danger] = "Invalid user"
      render :new
    end
  end

  def destroy
    log_out if logged_in?
    redirect_to root_url
  end
end
