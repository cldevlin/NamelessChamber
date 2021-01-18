# frozen_string_literal: true

module Admin
  class PSetAnswersController < ApplicationController
    def show
      unless @current_user_is_admin
        head :unauthorized
        return
      end

      @p_set_answer = PSetAnswer.find(params[:id])

      @user = @p_set_answer.user
      @p_set = @p_set_answer.p_set

      respond_to do |format|
        format.json { render json: @p_set_answer }
        format.html { render }
      end
    end

    def destroy
      @answer = PSetAnswer.find(params[:id])
      @student = User.find(@answer.user_id)
      @answer.destroy!

      redirect_to admin_user_p_set_answers_path(@student)
    end
  end
end
