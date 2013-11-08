class SigninController < ApplicationController
  def index

  	@user1=Linkedinuser.new
  	@user1.email=params[:session_key]
  	@user1.password=params[:session_password]

  	@result=Linkedinuser.new
  	@result=Linkedinuser.where(:email=>@user1.email).where(:password=>@user1.password)



  	if @result.length==1

  		@user2=Linkedinuser.new
  		@user2=Linkedinuser.find_by_email(@user1.email)
  		session[:user_id] = @user2.id
  		redirect_to :controller => 'signin', :action => 'welcome', :id => @user2.id

  	end	
  
  end #end of index

  def welcome
  		if(session[:user_id])
  			@user3=Linkedinuser.new
  			@user3=Linkedinuser.find_by_id(params[:id])
  		else
  			redirect_to :controller => 'signup', :action => 'index'
  		end
  	end

  def logout
  		if(session[:user_id])
  			session[:user_id]=nil
        session[:user_email]=nil
  		else
  			#you are not logged in
  			redirect_to :controller => 'signup', :action => 'index'
  		end
  end	
end
