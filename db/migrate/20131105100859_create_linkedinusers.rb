class CreateLinkedinusers < ActiveRecord::Migration
  def change
    create_table :linkedinusers do |t|
    	t.string :fname
    	t.string :lname
    	t.string :email
    	t.string :password
      	t.timestamps
    end
  end
end
