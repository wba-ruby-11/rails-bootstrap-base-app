class CreateFollowcompanies < ActiveRecord::Migration
  def change
    create_table :followcompanies do |t|

    	t.integer :Linkedinusers_id
    	t.integer :companies_id
      t.timestamps
    end
  end
end
