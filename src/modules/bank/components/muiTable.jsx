import React from 'react';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: 'orange',
  },
}));

export default function MuiTable({
  columns = [],
  data = [],
  isLoading = false,
}) {
  const classes = useStyles();

  return (
    <MaterialTable
      elevation={0}
      title='Banks'
      columns={columns}
      isLoading={isLoading}
      onSearchChange={(searchKey) => console.log(searchKey)}
      data={data}
      options={{
        paging: true,
        tableLayout: 'auto',
        debounceInterval: 500,
        toolbar: true,
      }}
      components={{
        Toolbar: (props) => <></>,
        Container: (props) => <Paper {...props} elevation={0} />,
      }}
      localization={{
        pagination: {
          labelRowsSelect: 'Rows per page',
        },
      }}
      detailPanel={[
        {
          icon: 'star_outline',
          iconProps: { className: classes.icon },
          render: (rowData) => {
            return (
              <div
                style={{
                  fontSize: 100,
                  textAlign: 'center',
                  color: 'red',
                  backgroundColor: 'red',
                }}
              >
                {rowData.surname}
              </div>
            );
          },
        },
      ]}
    />
  );
}
