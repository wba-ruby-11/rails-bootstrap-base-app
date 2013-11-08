class CreateEducations < ActiveRecord::Migration
  def change
    create_table :educations do |t|

    	t.integer :Linkedinusers_id

    	t.string :schoolname

    	t.date :datefrom

    	t.date :dateto

    	t.string :degree

    	t.string :majorsubject
      t.timestamps
    end
  end
end
