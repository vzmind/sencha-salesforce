require './app'

run Rack::URLMap.new \
  "/"       => Sinatra::Application