import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Shield from '../../errorHandler/shield';
import API from '../../middleware/api';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  TextField,
  Paper,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

import MuiTable from './components/muiTable';

const styles = (theme) => ({
  root: {},
  body: {
    margin: '24px 0px 16px 16px',
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
  },
  formControl: {
    marginLeft: theme.spacing(4),
    minWidth: 220,
  },
  icon: {
    cursor: 'pointer',
  },
  paper: {
    padding: '24px',
  },
  filterContianer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      columns: [
        { title: 'Bank', field: 'bank_name', width: 280 },
        { title: 'IFSC', field: 'ifsc', width: 180 },
        { title: 'Branch', field: 'branch', width: 200 },
        { title: 'Bank ID', field: 'bank_id', width: 150 },
        { title: 'Address', field: 'address' },
      ],
      cachebankData: {},
      bankData: {},
      selectedCity: 'MUMBAI',
      selectedCategory: 'bank_name',
      cityList: [
        {
          label: 'Chennai',
          value: 'CHENNAI',
        },
        {
          label: 'Mumbai',
          value: 'MUMBAI',
        },
        {
          label: 'Kolkatta',
          value: 'KOLKATTA',
        },
        {
          label: 'Hyderabad',
          value: 'HYDERABAD',
        },
        {
          label: 'Goa',
          value: 'GOA',
        },
      ],
      categoryList: [
        {
          label: 'Bank',
          value: 'bank_name',
        },
        {
          label: 'IFSC',
          value: 'ifsc',
        },
        {
          label: 'Branch',
          value: 'branch',
        },
        {
          label: 'Address',
          value: 'address',
        },
      ],
      searchInput: '',
    };
  }

  componentDidMount() {
    this.init();
  }

  init = () => {
    this.setState({ isLoading: true }, this.getBankData);
  };

  getBankData = () => {
    const { selectedCity, cachebankData } = this.state;
    if (!cachebankData[selectedCity]) {
      API.get(`banks?city=${selectedCity}`)
        .then((res) => {
          const { bankData } = this.state;
          bankData[selectedCity] = [...res.data];
          cachebankData[selectedCity] = [...res.data];
          this.setState({ bankData, cachebankData });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => this.setState({ isLoading: false }));
    } else {
      let { bankData } = this.state;
      bankData[selectedCity] = [...(cachebankData[selectedCity] || [])];
      this.setState({ bankData, isLoading: false });
    }
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value, isLoading: true }, this.getBankData);
  };

  debounce = (func, wait) => {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  };

  handleChangeSearch = (value) => {
    this.setState({ searchInput: value }, this.debounce);
  };

  debounce = (value) => {
    if (this.bounce) {
      clearInterval(this.bounce);
    }
    this.bounce = setTimeout(this.searchChange, 500);
  };

  searchChange = () => {
    let value = this.state.searchInput;
    if (value) {
      let {
        selectedCategory,
        selectedCity,
        bankData,
        cachebankData,
      } = this.state;
      let selectedCityData = [...cachebankData[selectedCity]];
      let filteredBankData = selectedCityData.filter((data) =>
        data[selectedCategory]
          .toString()
          .toUpperCase()
          .includes(value.toUpperCase())
      );
      bankData[selectedCity] = [...filteredBankData];
      this.setState({ bankData, isLoading: false });
    } else {
      let { selectedCity, bankData, cachebankData } = this.state;
      bankData[selectedCity] = [...cachebankData[selectedCity]];
      this.setState({ isLoading: false, bankData });
    }
  };
  handleSearchChange = (e) => {
    console.log(e.target.value);
  };

  render() {
    const { classes } = this.props;
    const {
      bankData = {},
      cityList = [],
      categoryList = [],
      selectedCity = '',
      selectedCategory = '',
      isLoading,
      searchInput,
      columns,
    } = this.state;

    return (
      <Shield>
        <div className={classes.body}>
          <Paper className={classes.paper} elevation={0}>
            <div className={classes.filterContianer}>
              <div>
                <Typography variant='h6'>Banks</Typography>
              </div>

              <div>
                <FormControl
                  className={classes.formControl}
                  disabled={isLoading}
                >
                  <InputLabel id='demo-simple-select-label'>
                    Select City
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    name='selectedCity'
                    value={selectedCity}
                    onChange={this.handleChange}
                  >
                    {cityList.map((city) => (
                      <MenuItem value={city.value}>{city.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl
                  className={classes.formControl}
                  disabled={isLoading}
                >
                  <InputLabel id='demo-simple-select-label'>
                    Select Category
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    name='selectedCategory'
                    value={selectedCategory}
                    onChange={this.handleChange}
                  >
                    {categoryList.map((category) => (
                      <MenuItem value={category.value}>
                        {category.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  disabled={isLoading}
                  label='searchInput'
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => this.handleChangeSearch(e.target.value)}
                  className={classes.formControl}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <SearchIcon className={classes.icon} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment
                        position='end'
                        onClick={() => this.handleChangeSearch('')}
                      >
                        <CloseIcon className={classes.icon} />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>
          </Paper>
          <MuiTable
            data={bankData[selectedCity] || []}
            columns={columns}
            isLoading={isLoading || false}
          />
        </div>
      </Shield>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.shape.isRequired,
};

export default withStyles(styles)(Index);
