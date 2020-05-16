import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, fade } from '@material-ui/core/styles';

import Shield from '../../errorHandler/shield';
import API from '../../middleware/api';
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
  Input,
  Paper,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

import MuiTable from './components/muiTable';

const styles = (theme) => ({
  root: {},
  body: {
    margin: '24px 0px 8px 8px',
    boxShadow:
      '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
  },
  formControl: {
    marginLeft: theme.spacing(4),
    minWidth: 170,
  },
  icon: {
    cursor: 'pointer',
  },
  paper: {
    padding: '24px',
  },
});

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
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
    const { selectedCity } = this.state;
    API.get(`banks?city=${selectedCity}`)
      .then((res) => {
        const { bankData, cachebankData } = this.state;
        bankData[selectedCity] = [...res.data];
        cachebankData[selectedCity] = [...res.data];
        this.setState({ bankData, cachebankData });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value, isLoading: true }, this.getBankData);
  };

  debounce = (func, wait) => {
    let timeout;
    return function(...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  };

  handleChangeSearch = (value) => {
    this.setState({ isLoading: true, searchInput: value });
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
      let {
        selectedCategory,
        selectedCity,
        bankData,
        cachebankData,
      } = this.state;
      bankData[selectedCity] = [...cachebankData[selectedCity]];
      this.setState({ isLoading: false, bankData });
    }

    // let bounce;
    // if (bounce) {
    //   clearInterval(this.bounce);
    // }
    // bounce = setTimeout(() => {
    // const { name, value } = event.target;
    // this.setState({ [name]: value });
    // }, 1000);
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
    } = this.state;

    return (
      <React.Fragment>
        <div className={classes.body}>
          <Paper className={classes.paper} elevation={0}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={3} lg={5} md={5}>
                <Typography variant='h6'>Banks</Typography>
              </Grid>
              <Grid item xs={12} sm={9} lg={7} md={7}>
                <FormControl className={classes.formControl}>
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
                <FormControl className={classes.formControl}>
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
              </Grid>
            </Grid>
          </Paper>
          <MuiTable
            data={bankData[selectedCity] || []}
            isLoading={isLoading || false}
          />
        </div>
      </React.Fragment>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.shape.isRequired,
};

export default withStyles(styles)(Index);
