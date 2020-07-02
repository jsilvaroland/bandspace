class AddDefaultStringToLyricsDescriptionCredits < ActiveRecord::Migration[5.2]
  def change
    change_table :albums do |t|
      t.change :description, :text, default: ""
      t.change :credits, :text, default: ""
    end
    change_table :tracks do |t|
      t.change :description, :text, default: ""
      t.change :credits, :text, default: ""
      t.change :lyrics, :text, default: ""
    end
  end
end
