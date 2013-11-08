class CreateConnections < ActiveRecord::Migration
  def change
    create_table :connections do |t|

    	t.integer :Linkedinusers_id
    	t.integer :Linkedinusers_id_with
      t.timestamps
    end
  end
end
