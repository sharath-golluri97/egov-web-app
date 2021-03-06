import React from "react";
import Loadable from "react-loadable";
import LinearProgress from "mihy-ui-framework/ui-atoms/LinearSpinner";

const Loading = () => <LinearProgress />;

const Iframe = Loadable({
  loader: () => import("./iframe"),
  loading: () => <Loading />
});


export {
  Iframe
};
