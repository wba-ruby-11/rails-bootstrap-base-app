class CreateFollows < ActiveRecord::Migration
  def change
    create_table :follows do |t|


    	t.integer :Linkedinusers_id

    	t.integer :Linkedinusers_id_followed
      t.timestamps
    end
  end
end
