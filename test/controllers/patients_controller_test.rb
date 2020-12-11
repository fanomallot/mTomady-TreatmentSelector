require 'test_helper'

class PatientsControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get patients_create_url
    assert_response :success
  end

end
