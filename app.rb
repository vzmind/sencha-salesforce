#!/usr/bin/env ruby -I ../lib -I lib
require 'sinatra'
require "sinatra/content_for"
require 'sinatra/reloader'
require 'sinatra/json'
require "sinatra/jsonp"
require 'haml'
require 'databasedotcom'
require 'yaml'
require 'omniauth'
require 'omniauth-salesforce'


  #enable :sessions
  #set :session_secret, 'super secret'
  use Rack::Session::Cookie

  set :public_folder, File.dirname(__FILE__) + '/assets'

  config = YAML.load_file("config/salesforce.yml") rescue {}
  client_id = config["client_id"]
  client_secret = config["client_secret"]

  
  use OmniAuth::Builder do
    provider :salesforce, config["client_id"], config["client_secret"]
  end

  get '/' do
    haml :intro
  end

  get '/auth/salesforce/callback' do
    token = request.env['omniauth.auth']['credentials']['token']
    session[:token] = token
    config = YAML.load_file("config/salesforce.yml") rescue {}
    @client_id = config["client_id"]
    @client_secret = config["client_secret"]
    dbdc = Databasedotcom::Client.new(:client_id => @client_id, :client_secret => @client_secret)
    dbdc.authenticate :token => session[:token], :instance_url => "http://na14.salesforce.com"
    session['client'] = dbdc
    redirect '/home'
  end

  get '/home' do
    haml :home
  end

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



 
