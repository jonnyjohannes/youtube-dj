module WelcomeHelper

  def embed_html(video)
    embed_html = <<-eos
      <iframe 
      id=\"#{video_id(video)}\" 
      type=\"text/html\" 
      width=\"100%\" 
      height=\"350\" 
      src=\"#{video.embed_url}&enablejsapi=1\" 
      frameborder=\"0\">
      </iframe>\n
    eos
  end

  def video_id(video)
    video.video_id.gsub(/^.*video:/, '')
  end

end
