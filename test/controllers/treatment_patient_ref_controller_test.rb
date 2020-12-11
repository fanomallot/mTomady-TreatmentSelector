require 'test_helper'

class TreatmentPatientRefControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get treatment_patient_ref_create_url
    assert_response :success
  end

end
