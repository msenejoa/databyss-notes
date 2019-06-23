import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getAuthor } from '../../actions/author'

const Author = ({ match }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAuthor(match.params.id))
  }, [])

  const { author, loading } = useSelector(state => state.author)

  return loading || author === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to='/authors' className='btn'>
        Back To Authors
      </Link>
      <h1 className='lead text-dark'>
        Author: {author.lastName + ', ' + author.firstName}
      </h1>
      <div className='m-2'>
        <h3>Entries</h3>
        <div className='post bg-white p-1'>
          <div>
            <img className='round-img' alt='' />
            <h4> subject</h4>
          </div>
          <div>
            <img className='round-img' alt='' />
            <h4> entry content</h4>
          </div>
        </div>
      </div>
      <div className='m-2'>
        <h3>Sources</h3>
        <div className='post bg-white p-1'>
          <div>
            <img className='round-img' alt='' />
            <h4> source abbreviation</h4>
          </div>
          <div>
            <img className='round-img' alt='' />
            <h4> resource name</h4>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Author
