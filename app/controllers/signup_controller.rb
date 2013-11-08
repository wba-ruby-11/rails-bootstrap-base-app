class SignupController < ApplicationController
  def index
  end

  def step1

    #creating user in db
    @user1=Linkedinuser.new
    @user1.fname=params[:firstName]
    @user1.lname=params[:lastName]
    @user1.email=params[:email]
    @user1.password=params[:password]

    if @user1.save
          #making user logged in
      #user2=Linkedinuser.new
      #user2=Linkedinuser.find_by_email(user.email)
      @user3=Linkedinuser.new
      @user3=Linkedinuser.find_by_email(@user1.email)
      session[:user_id] = @user3.id
      session[:user_email] =@user1.email
    else
      #email alreading present
      redirect_to :controller => 'signup', :action => 'index'
    end


  end
######################## step1 end #####################
  def step2
     p=Profile.new

     p.id=session[:user_id]
     #p.linkedinuser_id=session[:user_id]
     p.country=params[:country]
     p.postalcode=params[:postalcode]
     p.age=18
     p.status=params[:status]
     p.industry=params[:status]
     p.imageurl=params[:status]

     p.save

     @user=Linkedinuser.new
     @user=Linkedinuser.find_by_email(session[:user_email])

  end

  def step3
  end

  def step4
  end

  def step5
  end

  def step6
  end

  def step7
  end

  def step8
  end
  
end
