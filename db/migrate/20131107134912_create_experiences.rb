class CreateExperiences < ActiveRecord::Migration
  def change
    create_table :experiences do |t|
    	t.integer :Linkedinusers_id
    	t.integer :companies_id
    	t.date :datefrom
    	t.date :dateto
    	t.string :position
      t.timestamps
    end
  end
end
