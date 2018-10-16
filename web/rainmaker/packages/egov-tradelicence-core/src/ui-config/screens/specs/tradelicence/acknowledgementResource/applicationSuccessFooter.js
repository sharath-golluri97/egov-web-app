import { getLabel } from "mihy-ui-framework/ui-config/screens/specs/utils";
import html2canvas from "html2canvas";
import pdfMake from "pdfmake/build/pdfmake";
import { getBaseURL, getBill } from "../../utils";
import { getQueryArg } from "mihy-ui-framework/ui-utils/commons";
import { httpRequest } from "mihy-ui-framework/ui-utils/api";
import get from "lodash/get";

const getCommonApplyFooter = children => {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      className: "apply-wizard-footer"
    },
    children
  };
};

const callPGService = async (state, dispatch) => {
  const tenantId = getQueryArg(window.location.href, "tenantId");
  let callbackUrl = `${
    window.origin
  }/mihy-ui-framework/tradelicense-citizen/PaymentRedirectPage`;
  try {
    const queryObj = [
      {
        key: "tenantId",
        value: tenantId
      },
      {
        key: "consumerCode",
        value: getQueryArg(window.location.href, "applicationNumber")
      },
      {
        key: "businessService",
        value: "TL"
      }
    ];
    const billPayload = await getBill(queryObj);
    try {
      const requestBody = {
        Transaction: {
          tenantId,
          txnAmount: get(billPayload, "Bill[0].billDetails[0].totalAmount"),
          module: "TL",
          billId: get(billPayload, "Bill[0].id"),
          moduleId: get(billPayload, "Bill[0].billDetails[0].consumerCode"),
          productInfo: "Trade License Payment",
          gateway: "AXIS",
          callbackUrl
        }
      };
      const goToPaymentGateway = await httpRequest(
        "post",
        "pg-service/transaction/v1/_create",
        "_create",
        [],
        requestBody
      );
      const redirectionUrl = get(goToPaymentGateway, "Transaction.redirectUrl");
      window.location = redirectionUrl;
    } catch (e) {
      console.log(e);
    }
  } catch (e) {
    console.log(e);
  }
};

const generatePdfAndDownload = (action, applicationNumber, tenant) => {
  var iframe = document.createElement("iframe");
  iframe.src =
    window.origin +
    `/mihy-ui-framework/tradelicence/search-preview?applicationNumber=${applicationNumber}&tenantId=${tenant}`;
  iframe.onload = function(e) {
    // note: this assumes html2canvas v5+
    let target = iframe.contentDocument.querySelector(
      "#material-ui-tradeReviewDetails"
    );
    html2canvas(target).then(function(canvas) {
      document.querySelector("#custom-atoms-iframeForPdf").removeChild(iframe);
      var data = canvas.toDataURL();
      var docDefinition = {
        content: [
          {
            image: data,
            width: 500
          }
        ]
      };
      if (action === "download") {
        pdfMake.createPdf(docDefinition).download("application_summary.pdf");
      } else if (action === "print") {
        pdfMake.createPdf(docDefinition).print();
      }
    });
  };
  // To hide the iframe
  iframe.style.cssText =
    "position: absolute; opacity:0; z-index: -9999; width: 900px; height: 100%";
  document.querySelector("#custom-atoms-iframeForPdf").appendChild(iframe);

  // let iframe = document.querySelector("#custom-containers-local-iframe");
  // let target = iframe.contentDocument.querySelector(
  //   "#material-ui-tradeReviewDetails"
  // );
  // html2canvas(target, {
  //   onclone: function(clonedDoc) {
  //     clonedDoc.getElementById(
  //       "material-ui-tradeReviewDetails"
  //     ).style.display = "block";
  //   }
  // }).then(canvas => {
  //   var data = canvas.toDataURL();
  //   var docDefinition = {
  //     content: [
  //       {
  //         image: data,
  //         width: 500
  //       }
  //     ]
  //   };
  //   if (action === "download") {
  //     pdfMake.createPdf(docDefinition).download("application_summary.pdf");
  //   } else if (action === "print") {
  //     pdfMake.createPdf(docDefinition).print();
  //   }
  // });
};

export const applicationSuccessFooter = (applicationNumber, tenant) => {
  const baseURL = getBaseURL();
  return getCommonApplyFooter({
    gotoHome: {
      componentPath: "Button",
      props: {
        variant: "outlined",
        color: "primary",
        style: {
          width: "200px",
          height: "48px",
          marginRight: "16px"
        }
      },
      children: {
        downloadReceiptButtonLabel: getLabel({
          labelName: "GO TO HOME",
          labelKey: "TL_COMMON_BUTTON_HOME"
        })
      },
      onClickDefination: {
        action: "page_change",
        path: `/mihy-ui-framework/tradelicence/search`
      }
    },
    downloadFormButton: {
      componentPath: "Button",
      props: {
        variant: "outlined",
        color: "primary",
        style: {
          width: "290px",
          height: "48px",
          marginRight: "16px"
        }
      },
      children: {
        downloadFormButtonLabel: getLabel({
          labelName: "DOWNLOAD CONFIRMATION FORM",
          labelKey: "TL_APPLICATION_BUTTON_DOWN_CONF"
        })
      },
      onClickDefination: {
        action: "condition",
        callBack: () => {
          generatePdfAndDownload("download", applicationNumber, tenant);
        }
      }
    },
    printFormButton: {
      componentPath: "Button",
      props: {
        variant: "outlined",
        color: "primary",
        style: {
          width: "250px",
          height: "48px",
          marginRight: "16px"
        }
      },
      children: {
        printFormButtonLabel: getLabel({
          labelName: "PRINT CONFIRMATION FORM",
          labelKey: "TL_APPLICATION_BUTTON_PRINT_CONF"
        })
      },
      onClickDefination: {
        action: "condition",
        callBack: () => {
          generatePdfAndDownload("print", applicationNumber, tenant);
        }
      }
    },
    collectPaymentButton: {
      componentPath: "Button",
      props: {
        variant: "contained",
        color: "primary",
        style: {
          width: "200px",
          height: "48px",
          marginRight: "40px"
        }
      },
      children: {
        collectPaymentButtonLabel: getLabel({
          labelName: "COLLECT PAYMENT",
          labelKey: "TL_COLLECT_PAYMENT"
        })
      },
      onClickDefination: {
        action: "page_change",
        path: `/mihy-ui-framework/tradelicence/pay?applicationNumber=${applicationNumber}&tenantId=${tenant}&businessService=TL`
      },
      roleDefination: {
        rolePath: "user-info.roles",
        roles: ["EMPLOYEE"]
      }
    },
    proceedToPay: {
      componentPath: "Button",
      props: {
        variant: "contained",
        color: "primary",
        style: {
          width: "200px",
          height: "48px",
          marginRight: "40px"
        }
      },
      children: {
        collectPaymentButtonLabel: getLabel({
          labelName: "PROCEED TO PAYMENT",
          labelKey: "TL_PROCEED_PAYMENT"
        })
      },
      onClickDefination: {
        action: "condition",
        callBack: callPGService
      },
      roleDefination: {
        rolePath: "user-info.roles",
        roles: ["CITIZEN"]
      }
    }
  });
};
