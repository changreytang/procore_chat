# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
User.create!([{ name: "James Vaughan", email: "jamesvaughan@gmail.com"}, { name: "Vivek Patel", email: "vivekpatel@gmail.com"},
				{ name: "Rey Tang", email: "reytang@gmail.com"}, { name: "Sam Lee", email: "samlee@gmail.com"},
				{ name: "Rose Chang", email: "rosechang@gmail.com"}, { name: "Wes Han", email: "weshan@gmail.com"}])
