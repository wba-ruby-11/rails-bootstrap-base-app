class CreateProfiles < ActiveRecord::Migration
  def change
    create_table :profiles do |t|
    	t.integer :Linkedinusers_id
    	t.string :country
    	t.integer :postalcode
    	t.integer :age
    	t.string :status
    	t.string :industry
    	t.string :imageurl
      	t.timestamps
    end
  end
end
