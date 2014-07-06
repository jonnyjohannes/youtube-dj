class WelcomeController < ApplicationController

  def index
  end

  def search
    @client = YouTubeIt::Client.new(:dev_key => ENV['YOUTUBE_API_KEY'])
    @videos = @client.videos_by(query: params[:query], per_page: 10, page: 1)

    respond_to do |format|
      format.js 
    end
  end

end
