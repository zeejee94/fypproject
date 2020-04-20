import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { updateFilters } from '../../actions/productactions';
import Checkbox from './CheckBox';


import './style.scss';

const company = ['TESCO', 'ECONSAVE'];

class Filter extends Component {


  componentDidMount() {
    this.selectedCheckboxes = new Set();
  }

  toggleCheckbox = label => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }

    this.props.updateFilters(Array.from(this.selectedCheckboxes));
  };

  createCheckbox = label => (
    <Checkbox
      classes="filters-available-size"
      label={label}
      handleCheckboxChange={this.toggleCheckbox}
      key={label}
    />
  );

  createCheckboxes = () => company.map(this.createCheckbox);

  render() {
    return (
      <div className="filters">
        <h4 className="title">Company:</h4>
        {this.createCheckboxes()}
        
      </div>
    );
  }
}

export default connect(
  null,
  { updateFilters }
)(Filter);
