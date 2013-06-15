# encoding: utf-8

require 'cgi'
require 'json'
require 'typhoeus'

terms = [
  'chicken pakora',
  'Chana Chat',
  'pho ga',
  'Com Xào Chay'
]

terms.each do |term|
  term = CGI.escape term
  url = "http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=e85aff8ce1c2fc44b92bccff30f92f7d&text=#{term}&sort=relevance&format=json&nojsoncallback=1&per_page=1&media=photos"
  resp = Typhoeus.get url
  json = JSON.parse resp.body
  photo = json['photos']['photo'].first
  `open http://farm#{photo['farm']}.staticflickr.com/#{photo['server']}/#{photo['id']}_#{photo['secret']}.jpg`
end
