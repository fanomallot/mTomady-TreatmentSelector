class ApplicationController < ActionController::Base
    before_action :authorized
  def encode_token(payload)
    JWT.encode(payload, 'runbnb2020')
  end


  def auth_header
    # { Authorization: 'Bearer <token>' }
    request.headers['Authorization']
  end

  def decoded_token
    if auth_header
      token = auth_header.split(' ')[1]
      # header: { 'Authorization': 'Bearer <token>' }
      begin
        JWT.decode(token, 'runbnb2020', true, algorithm: 'HS256')
      rescue JWT::DecodeError
        nil
      end
    end
  end

  def current_user
    if decoded_token
        admin_id = decoded_token[0]['admin_id']
      @user = Admin.find_by(id: admin_id)
    end
  end

  def logged_in?
    !!current_user
  end

  def authorized
    render json: { message: 'Please log in' }, status: :unauthorized unless logged_in?
  end
end
