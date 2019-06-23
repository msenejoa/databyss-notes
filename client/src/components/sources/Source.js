import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../layout/Spinner'
import AuthorItem from './../authors/AuthorItem'
import { getSource } from '../../actions/source'
import { getAuthorList } from '../../actions/author'

const Source = ({ match }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getSource(match.params.id))
  }, [])

  const { source, loading } = useSelector(state => state.source)
  const [authorList, setAuthorList] = useState([])
  const [renderedList, setRenderedList] = useState({})

  useEffect(() => {
    if (source) {
      getAuthorList(source.authors).then(a => setAuthorList(a))
    }
  }, [source])

  useEffect(() => {
    setRenderedList({
      author: authorList.map(a => <AuthorItem key={a._id} author={a} />),
    })
  }, [authorList])

  console.log(source)

  return loading || source === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to='/authors' className='btn'>
        Back To Authors (this needs to be dynamic)
      </Link>
      <h1 className='lead text-dark'>Source: placeholder</h1>
      <div className='m-2'>
        <h3>Authors</h3>
        {renderedList.author}
        <div className='profile-grid' />
      </div>
      <div className='m-2'>
        <h3>Entries</h3>
        <div className='profile-grid'>
          <div>
            <img className='round-img' alt='' />
            <p> subject</p>
          </div>
          <div>
            <img className='round-img' alt='' />
            <p> entry content</p>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Source
