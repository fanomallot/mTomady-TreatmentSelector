# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

["Diagnostics","Examinations"].each do |item|
    Category.create(name: item)
end

treatments = [["angiocardiography","angiography","brain scanning","cholecystography","echocardiography","mammography","myelography","prenatal testing","ultrasound","urography"],["auscultation","autopsy","biopsy","bronchoscopy","cardiac catheterization","colposcopy","endoscopy","esophagogastroduodenoscopy","gynecological examination","laparoscopy","mediastinoscopy","nasopharyngolaryngoscopy","palpation","percussion","Rubin’s test"]]


categories = [Category.first,Category.last]

2.times do |i|
    treatments[i].each do |item|
        Treatment.create(name: item , category: categories[i])
    end
end