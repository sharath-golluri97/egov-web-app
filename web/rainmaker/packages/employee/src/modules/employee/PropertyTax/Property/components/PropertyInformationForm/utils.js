import { httpRequest } from "egov-ui-kit/utils/api";
import get from "lodash/get"
import cloneDeep from "lodash/cloneDeep"

const getCreatedTime = (property, defaultTime) => get(property, "auditDetails.createdTime", defaultTime)

const getTargetPropertiesDetails = (propertyDetails) => {
  let targetPropertyDetails = [...propertyDetails]

  targetPropertyDetails
  .sort((property1, property2) => getCreatedTime(property1, 2) - getCreatedTime(property2, 1))
  .splice(1, propertyDetails.length - 1)

  return targetPropertyDetails
}

export const getPropertyFromId = async (tenantId, propertyId) => {
  try {
    let searchPropertyResponse = await httpRequest(
      "pt-services-v2/property/_search",
      "_search",
      [
        {
          key: "tenantId",
          value: tenantId,
        },
        {
          key: "ids",
          value: propertyId,//"PT-107-001278",
        },
      ]
    );
    searchPropertyResponse = {
      ...searchPropertyResponse,
      Properties: [{
        ...searchPropertyResponse.Properties[0],
        propertyDetails: getTargetPropertiesDetails(cloneDeep(searchPropertyResponse.Properties[0].propertyDetails))
      }],
    }
    return searchPropertyResponse
  } catch (e) {
    console.log("property not found", e)
    return {}
  }
}
