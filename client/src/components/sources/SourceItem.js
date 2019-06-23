import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteSource } from '../../actions/source'

const SourceItem = ({
  deleteSource,
  auth,
  source: {
    _id,
    resource,
    abbreviation,
    authors,
    date,
    city,
    publishingCompany,
    sourceType,
    url,
    files,
    entries,
  },
}) => (
  <div className='post bg-white p-1 my-1'>
    <Link to={`/sources/${_id}`}>
      <div>
        <p className='my-1'>{resource}</p>
      </div>
    </Link>

    <div>
      <p className='my-1'>{abbreviation}</p>
    </div>
  </div>
)

SourceItem.defaultProps = {
  //  showActions: true,
}

SourceItem.propTypes = {
  source: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteSource: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(
  mapStateToProps,
  { deleteSource }
)(SourceItem)
