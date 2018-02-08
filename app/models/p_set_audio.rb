# == Schema Information
#
# Table name: p_set_audios
#
#  id         :integer          not null, primary key
#  audio      :string
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class PSetAudio < ApplicationRecord
  mount_uploader :audio, PSetAudioUploader
  has_many :p_set_to_audio
  has_many :p_sets, :through => :p_set_to_audio

  def self.find_or_create_by_file(params)
    filename = PSetAudioUploader.filename(params[:audio])
    p_set_audio = PSetAudio.where(audio: filename).first

    if p_set_audio.nil?
      p_set_audio = PSetAudio.create(params)
    end

    p_set_audio
  end
end