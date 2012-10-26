#!/usr/bin/env ruby -I ../lib -I lib
# SECTION 1 : load libs and gems
require 'sinatra'
require "sinatra/content_for"
require 'sinatra/json'
require 'haml'
require 'databasedotcom'
require 'yaml'
require 'omniauth'
require 'omniauth-salesforce'

  # SECTION 2: config the app
  use Rack::Session::Cookie
  set :public_folder, File.dirname(__FILE__) + '/assets'
  use OmniAuth::Builder do
    provider :salesforce, config["client_id"], config["client_secret"]
  end

  # SECTION 3: basic routing for / and /home 
  get '/' do
    haml :intro
  end
  get '/home' do
    haml :home
  end

  # SECTION 4: OAuth Callback management
  get '/auth/salesforce/callback' do
     session[:token] = request.env['omniauth.auth']['credentials']['token']
    config = YAML.load_file("config/salesforce.yml") rescue {}
    dbdc = Databasedotcom::Client.new(:client_id => config["client_id"], :client_secret => config["client_secret"])
    dbdc.authenticate :token => session[:token], :instance_url => "http://na14.salesforce.com"
    session['client'] = dbdc
    redirect '/home'
  end

  # SECTION 5: Json Data store for the Sencha app
  get '/leads.json' do
    content_type :json
    session['client'].materialize('Lead')
    leads = Lead.all
    leads.collect! { |obj| {
                        :id    => obj.Id,
                        :name  => obj.LastName,
                        :email => obj.Email}
                      }.to_json
  end
