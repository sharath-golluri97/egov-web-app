import React from "react";
import MUIDataTable from "mui-datatables";
import get from "lodash/get";
import PropTypes from "prop-types";
import cloneDeep from "lodash/cloneDeep";
import "./index.css";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import AlertDialog from "../../ui-config/screens/specs/tradelicence/searchResource/deactivateEmployee";

class Table extends React.Component {
  state = {
    data: [],
    columns: [],
    customSortOrder: "asc"
  };

  formatData = (data, columns) => {
    return (
      data &&
      [...data].reduce((acc, curr) => {
        let dataRow = [];
        Object.keys(columns).forEach(column => {
          let columnValue = get(curr, `${column}`, "");
          if (get(columns, `${column}.format`, "")) {
            columnValue = columns[column].format(curr);
          }
          dataRow.push(columnValue);
        });
        let updatedAcc = [...acc];
        updatedAcc.push(dataRow);
        return updatedAcc;
      }, [])
    );
  };

  componentWillReceiveProps(nextProps) {
    const { data, columns } = nextProps;
    this.updateTable(data, columns);
  }

  componentDidMount() {
    const { data, columns } = this.props;
    this.updateTable(data, columns);
  }

  updateTable = (data, columns) => {
    const updatedData = this.formatData(data, columns);
    this.setState({
      data: updatedData,
      columns: Object.keys(columns)
    });
  };

  onColumnSortChange = (columnName, i) => {
    let { customSortOrder, data } = this.state;
    const { customSortColumn } = this.props;
    const { column, sortingFn } = customSortColumn;
    if (columnName === column) {
      const updatedData = sortingFn(cloneDeep(data), "", customSortOrder);
      this.setState({
        data: updatedData.data,
        customSortOrder: updatedData.currentOrder
      });
    }
  };

  handleClickOpen = data => {
    this.setState({ open: true, data: data });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { data, columns } = this.state;
    const { options, title } = this.props;
    return (
      <div className="hr-table-container">
        <MUIDataTable
          title={title}
          data={data}
          columns={columns}
          options={{
            ...options,
            onColumnSortChange: (columnName, order) =>
              this.onColumnSortChange(columnName, order),
            filter: false,
            download: false,
            responsive: "stacked",
            selectableRows: true,
            hover: true,
            rowsPerPageOptions: [10, 15, 20],
            filterType: "checkbox",
            customToolbarSelect: (
              selectedRows,
              displayData,
              setSelectableRows
            ) => {
              console.log("========", displayData);
              let selectedData = selectedRows.data.map(item => {
                return displayData[item.dataIndex].data;
              });
              return (
                <Button
                  style={{ color: "#FE7A51" }}
                  onClick={() => this.handleClickOpen(selectedData)}
                >
                  <DeleteIcon style={{ color: "#FE7A51" }} />
                  DEACTIVATE
                </Button>
              );
            }
          }}
        />
        <AlertDialog open={this.state.open} />
      </div>
    );
  }
}

Table.propTypes = {
  columns: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired
};

export default Table;
