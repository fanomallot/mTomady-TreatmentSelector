class PageController < ApplicationController
  before_action :authorized, only: [:auto_login]

  def index
  end
end
