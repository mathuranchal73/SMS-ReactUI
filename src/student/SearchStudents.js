import React, { Component } from 'react';

class SearchStudents extends Component {
  render() {
    return (
      <div className="search-appointments row justify-content-center my-4">
        <div className="col-md-6">
          <div className="input-group">
            <input
              id="SearchStudents"
              type="text"
              className="form-control"
              aria-label="Search Students"
              onChange={e => this.props.searchStudents(e.target.value)}
            />
            <div className="input-group-append">
              <button
                type="button"
                className="btn btn-primary dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Sort by: <span className="caret" />
              </button>

              <div className="sort-menu dropdown-menu dropdown-menu-right">
                <button
                  className={
                    'sort-by dropdown-item ' +
                    (this.props.orderBy === 'firstName' ? 'active' : '')
                  }
                  onClick={e =>
                    this.props.changeOrder('firstName', this.props.orderDir)
                  }
                  href="#"
                >
                  Pet Name
                </button>
                <button
                  className={
                    'sort-by dropdown-item ' +
                    (this.props.orderBy === 'doa' ? 'active' : '')
                  }
                  onClick={e =>
                    this.props.changeOrder('doa', this.props.orderDir)
                  }
                  href="#"
                >
                  Date
                </button>
                <button
                  className={
                    'sort-by dropdown-item ' +
                    (this.props.orderBy === 'lastName' ? 'active' : '')
                  }
                  onClick={e =>
                    this.props.changeOrder('lastName', this.props.orderDir)
                  }
                  href="#"
                >
                  Owner
                </button>
                <div role="separator" className="dropdown-divider" />
                <button
                  className={
                    'sort-by dropdown-item ' +
                    (this.props.orderDir === 'asc' ? 'active' : '')
                  }
                  onClick={e =>
                    this.props.changeOrder(this.props.orderBy, 'asc')
                  }
                  href="#"
                >
                  Asc
                </button>
                <button
                  className={
                    'sort-by dropdown-item ' +
                    (this.props.orderDir === 'desc' ? 'active' : '')
                  }
                  onClick={e =>
                    this.props.changeOrder(this.props.orderBy, 'desc')
                  }
                  href="#"
                >
                  Desc
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchStudents;
