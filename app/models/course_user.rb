# == Schema Information
#
# Table name: course_users
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  course_id  :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class CourseUser < ApplicationRecord
end
