import React from 'react';
import MaterialTable, { MTableToolbar } from 'material-table';
import { makeStyles, fade } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  InputBase,
  InputAdornment,
  TextField,
  Grid,
  Paper,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  formControl: {
    marginRight: theme.spacing(2),
    minWidth: 170,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  icon: {
    color: 'orange',
  },
  filterContent: {
    padding: '24px',
  },
}));

export default function MuiTable({ data, isLoading }) {
  const classes = useStyles();
  const [name, setName] = React.useState('');
  const [state, setState] = React.useState({
    columns: [
      { title: 'Bank', field: 'bank_name', width: 280 },
      { title: 'IFSC', field: 'ifsc', width: 180 },
      { title: 'Branch', field: 'branch', width: 200 },
      { title: 'Bank ID', field: 'bank_id', width: 150 },
      { title: 'Address', field: 'address' },
    ],
    data,
  });

  return (
    <MaterialTable
      elevation={0}
      title='Banks'
      columns={state.columns}
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
