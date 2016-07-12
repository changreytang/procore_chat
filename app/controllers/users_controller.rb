class UsersController < ApplicationController
  before_action :logged_in_user, only: [:index]

  def index
    @users = User.all
  end

	def new
		@user = User.new
	end

	def create 
		@user = User.new(user_params)
    if @user.save
      flash[:success] = "User created"
      redirect_to root_url
    else
      render :new
    end
	end

	private

		def user_params
			params.require(:user).permit(:name,
										               :email)
		end
end
