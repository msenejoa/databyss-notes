import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { deleteAuthor } from '../../actions/author'

const AuthorItem = ({
  author: { _id, firstName, lastName, sources, entries },
}) => (
  <div className='post bg-white p-1 my-1'>
    <div>
      <Link to={`/authors/${_id}`}>
        <img className='round-img' alt='' />
        <h4>{lastName + ' ' + firstName}</h4>
      </Link>
    </div>
  </div>
)

export default AuthorItem
