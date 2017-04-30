class Admin::CoursesController < ApplicationController
  def index
    if user_signed_in?
      @courses = Course
        .joins(:course_users)
        .where(course_users: {user_id: current_user.id})
    else
      redirect_to new_user_session_path
    end
  end

  def show
    @course = Course.where(id: params[:id]).includes(:classrooms).first

    if @course.nil?
      not_found
    end
  end
end