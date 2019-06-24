import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteEntry } from '../../actions/entry'

const EntryItem = ({
  entry: { _id, entry, source, author, pageTo, pageFrom },
}) => (
  <div className='post bg-white p-1 my-1'>
    <div>
      <Link to={`/entries/${_id}`}>
        <h4>{entry}</h4>
      </Link>
    </div>
    <div>
      <p className='my-1'>authors: {author.length}</p>
      <p className='my-1'>
        Page(s): {pageFrom}
        {pageTo && '-' + pageTo}
      </p>
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
