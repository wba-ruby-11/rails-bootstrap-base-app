class CreateJoingroups < ActiveRecord::Migration
  def change
    create_table :joingroups do |t|

    	t.integer :Linkedinusers_id
    	t.integer :groups_id

      t.timestamps
    end
  end
end
