import { setFieldProperty, handleFieldChange } from "egov-ui-kit/redux/form/actions";
import get from "lodash/get";

const tenantId = JSON.parse(localStorage.getItem("user-info")).permanentCity;

const formConfig = {
  name: "complaint",
  idJsonPath: "services[0].serviceRequestId",
  fields: {
    media: {
      id: "media",
      jsonPath: "actionInfo[0].media",
      file: true,
      errorMessage: "CS_FILE_UPLOAD_FAILED",
    },
    complaintType: {
      id: "complaint-type",
      jsonPath: "services[0].serviceCode",
      required: true,
      floatingLabelText: "CS_ADDCOMPLAINT_COMPLAINT_TYPE",
      errorMessage: "CS_ADDCOMPLAINT_COMPLAINT_TYPE_PLACEHOLDER",
      hintText: "CS_ADDCOMPLAINT_COMPLAINT_TYPE_PLACEHOLDER",
    },
    additionalDetails: {
      id: "additional details",
      jsonPath: "services[0].description",
      floatingLabelText: "CS_ADDCOMPLAINT_COMPLAINT_DETAILS",
      hintText: "CS_ADDCOMPLAINT_COMPLAINT_DETAILS_PLACEHOLDER",
      errorMessage: "Landmark should be less than 300 characters",
    },
    latitude: {
      id: "latitude",
      jsonPath: "services[0].addressDetail.latitude",
    },
    longitude: {
      id: "longitude",
      jsonPath: "services[0].addressDetail.longitude",
    },
    address: {
      id: "address",
      jsonPath: "services[0].address",
      floatingLabelText: "CS_ADDCOMPLAINT_LOCATION",
      hintText: "CS_COMPLAINT_DETAILS_LOCATION",
    },
    city: {
      id: "city",
      jsonPath: "services[0].addressDetail.city",
      floatingLabelText: "CORE_COMMON_CITY",
      hintText: "ES_CREATECOMPLAINT_SELECT_PLACEHOLDER",
      errorMessage: "CS_ADDCOMPLAINT_COMPLAINT_TYPE_PLACEHOLDER",
      required: true,
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      errorText: "",
      dropDownData: [],
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        dispatch(setFieldProperty("complaint", "mohalla", "value", ""));
      },
      dataFetchConfig: {
        dependants: [
          {
            fieldKey: "mohalla",
          },
        ],
      },
    },
    mohalla: {
      id: "mohalla",
      required: true,
      jsonPath: "services[0].addressDetail.mohalla",
      floatingLabelText: "CS_CREATECOMPLAINT_MOHALLA",
      hintText: "CS_CREATECOMPLAINT_MOHALLA_PLACEHOLDER",
      errorMessage: "CS_ADDCOMPLAINT_COMPLAINT_TYPE_PLACEHOLDER",
      boundary: true,
      dropDownData: [],
      dataFetchConfig: {
        url: "egov-location/location/v11/boundarys/_search?hierarchyTypeCode=ADMIN&boundaryType=Locality",
        action: "",
        queryParams: [],
        requestBody: {},
        isDependent: true,
      },

      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      errorText: "",
    },
    houseNo: {
      id: "houseNo",
      jsonPath: "services[0].addressDetail.houseNoAndStreetName",
      floatingLabelText: "CS_ADDCOMPLAINT_HOUSE_NO",
      hintText: "CS_ADDCOMPLAINT_HOUSE_NO_PLACEHOLDER",
      errorMessage: "House no should be less than 100 characters",
    },
    landmark: {
      id: "landmark",
      jsonPath: "services[0].addressDetail.landmark",
      // floatingLabelText: "CS_ADDCOMPLAINT_ADDITIONAL_DETAILS",
      // hintText: "CS_ADDCOMPLAINT_ADDITIONAL_DETAILS_PLACEHOLDER",
      floatingLabelText: "CS_ADDCOMPLAINT_LANDMARK",
      hintText: "CS_ADDCOMPLAINT_LANDMARK_PLACEHOLDER",
      errorMessage: "Landmark should be less than 100 characters",
    },
    tenantId: {
      id: "add-complaint-tenantid",
      jsonPath: "services[0].tenantId",
    },
  },
  submit: {
    type: "submit",
    label: "CS_ADDCOMPLAINT_ADDITIONAL_DETAILS_SUBMIT_COMPLAINT",
    id: "addComplaint-submit-complaint",
  },
  afterInitForm: (action, store, dispatch) => {
    try {
      let state = store.getState();
      const { cities, citiesByModule } = state.common;
      const { PGR } = citiesByModule || {};
      if (PGR) {
        const tenants = PGR.tenants;
        const dd = tenants.reduce((dd, tenant) => {
          let selected = cities.find((city) => {
            return city.code === tenant.code;
          });
          dd.push({ label: selected.name, value: selected.code });
          return dd;
        }, []);
        dispatch(setFieldProperty("complaint", "city", "dropDownData", dd));
      }
      let city = get(state, "form.complaint.fields.city.value");
      let mohalla = get(state, "form.complaint.fields.mohalla.value");
      if (!city) {
        dispatch(handleFieldChange("complaint", "city", tenantId));
      } else {
        if (city) {
          dispatch(handleFieldChange("complaint", "city", city));
        }
        if (mohalla) {
          dispatch(handleFieldChange("complaint", "mohalla", mohalla));
        }
      }
      return action;
    } catch (e) {
      console.log(e);
    }
  },
  action: "_create",
  saveUrl: "/rainmaker-pgr/v1/requests/_create",
  redirectionRoute: "/complaint-submitted",
};

export default formConfig;
