import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteAuthor } from '../../actions/author'

const AuthorItem = ({
  deleteAuthor,
  auth,
  author: { _id, firstName, lastName, sources, entries },
}) => (
  <div className='post bg-white p-1 my-1'>
    <div>
      <p className='my-1'>
        {lastName}, {firstName}
      </p>
    </div>
  </div>
)

AuthorItem.defaultProps = {
  //  showActions: true,
}

AuthorItem.propTypes = {
  author: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteAuthor: PropTypes.func.isRequired,
  //  showActions: PropTypes.bool,
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(
  mapStateToProps,
  { deleteAuthor }
)(AuthorItem)
