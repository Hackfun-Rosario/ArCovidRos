#!/usr/bin/env ruby

require 'net/https'
require 'uri'
require 'json'


class CovidAPI
  null = nil
  
  def initialize url="https://covidapi.hackfunrosario.com/api/", admin_key=nil
    @url = url
    @page = 0

    @token = ''

    @admin_key = ENV["ADMINKEY"] or admin_key
  end


  def get path, params=nil, headers=nil
    @page = 0 # reset page
    
    uri = URI(@url + URI.encode(path))
    req = Net::HTTP::Get.new(uri)

    # append headers
    headers.each do |k, v|
      req[k.to_s] = v
    end if headers and headers.any

    Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == 'https') do |http|
      null = nil
      eval http.request(req).body.force_encoding('utf-8')
    end
  end

  def post path, params=nil, headers=nil
    @page = 0 # reset page

    uri = URI(@url + URI.encode(path))
    req = Net::HTTP::Post.new(uri)

    # append headers
    headers.each do |k, v|
      req[k.to_s] = v
    end if headers and headers.any

    Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == 'https') do |http|
      null = nil
      eval http.request(req, URI.encode_www_form(params)).body.force_encoding('utf-8')
    end
  end

  def page n
    @page = n.to_i.abs
    self
  end


  def registerUser usr, pwd, email, uname, admin=false
    body = {
      username: usr,
      password: pwd,
      email: email,
      name: uname,
      admin: !!admin
    }
    
    res = self.post('auth/registerUser', body, { "admin-key" => @admin_key })
    puts res

    self
  end


  def signIn usr, pwd
    res = self.post('auth/signIn', { username: usr, password: pwd })
    @token = res[:token]
    puts @token
    
    self
  end

  def signOut
    @token = ''
    self
  end


  def stats body=nil
    puts "stats, page: #{@page}"
    if body
      res = self.post("stats", body, { 'Authorization' => "Bearer #{@token}" })
    else
      res = self.get("stats/#{@page}")
    end

    if block_given?
      yield res
      return self
    end

    res
  end

  def getStatByProvincia province
    puts "province: #{province}, page: #{@page}"
    res = self.get("getStatByProvincia/#{province}/#{@page}")

    if block_given?
      yield res
      return self
    end

    res
  end

  def getStatByFecha date
    puts "date: #{date}, page: #{@page}"
    res = self.get("getStatByFecha/#{date}/#{@page}")

    if block_given?
      yield res
      return self
    end

    res
  end
end