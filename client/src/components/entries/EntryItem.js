import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteEntry } from '../../actions/entry'

const EntryItem = ({
  deleteEntry,
  auth,
  entry: { _id, entry, source, author, pageTo, pageFrom },
}) => (
  <div className='post bg-white p-1 my-1'>
    <div>
      <Link to={`/entries/${_id}`}>
        <h4>{source.resource}</h4>
      </Link>
    </div>
    <div>
      <p className='my-1'>
        {author.lastName}, {author.firstName}
      </p>
      <p className='my-1'>{pageTo}</p>
      <p className='my-1'>{pageFrom}</p>
      <p className='my-1'>{entry}</p>
    </div>
  </div>
)

EntryItem.defaultProps = {
  //  showActions: true,
}

EntryItem.propTypes = {
  entry: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteEntry: PropTypes.func.isRequired,
  //  showActions: PropTypes.bool,
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(
  mapStateToProps,
  { deleteEntry }
)(EntryItem)
