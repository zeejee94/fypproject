import React, { Component } from 'react';

import { connect } from 'react-redux';

import { getBrochure } from '../../actions/productactions';

import Spinner from '../Spinner';

import BrochureList from './brochureList';
import Filter from '../Filter/Filter';
import './style.scss';

class BrochureDisplay extends Component {
 
  state = {
    isLoading: false
  };

  componentDidMount() {
    this.handleFetchBrochures();
  }

  componentWillReceiveProps(nextProps) {
    const { filters: nextFilters} = nextProps;
    const { filters } = this.props;
    if (nextFilters.length !== filters.length) {
      this.handleFetchBrochures(nextFilters, undefined);
    }

  }

  handleFetchBrochures = (
    filters = this.props.filters,
    
  ) => {
    this.setState({ isLoading: true });
    this.props.getBrochure(filters,() => {
      this.setState({ isLoading: false });
    });
  };

  render() {
    const { brochures } = this.props;
    const { isLoading } = this.state;

    return (
      <React.Fragment>
        <Filter />
        {isLoading && <Spinner />}
        <div className="shelf-container">        
          <BrochureList brochures={brochures} />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  brochures: state.product.brochures,
  filters: state.product.items,
 
});

export default connect(
  mapStateToProps,
  { getBrochure }
)(BrochureDisplay);
