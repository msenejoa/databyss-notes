import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../layout/Spinner'
import SourceItem from './../sources/SourceItem'
import { getEntry } from '../../actions/entry'
import { getSource } from '../../actions/source'

import { getAuthorList } from '../../actions/author'

const Entry = ({ match }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getEntry(match.params.id))
  }, [])

  const { entry } = useSelector(state => state.entry)

  const { source } = useSelector(state => state.source)

  useEffect(() => {
    if (entry) {
      dispatch(getSource(entry.source))
    }
  }, [entry])
  /*
  const { entry, loading } = useSelector(state => state.entry)
  const [entryList, setEntryList] = useState([])
  const [renderedList, setRenderedList] = useState({})

  */

  /*
  useEffect(() => {
    if (entry) {
      getEntryList(source.authors).then(a => setAuthorList(a))
    }
  }, [source])

  useEffect(() => {
    setRenderedList({
      author: authorList.map(a => <AuthorItem key={a._id} author={a} />),
    })
  }, [authorList])

  console.log(source)
*/
  return (
    <Fragment>
      <Link to='/authors' className='btn'>
        Back To Authors (this needs to be dynamic)
      </Link>
      <h1 className='lead text-dark'>Entry: </h1>
      <div className='post bg-white p-1 my-1'>
        <p>{entry && entry.entry}</p>
      </div>
      <div className='m-2'>
        <h3>Authors</h3>
        PLACEHOLDER
        <div className='profile-grid' />
      </div>
      <div className='m-2'>
        <h3>Source</h3>
        <div className='profile-grid'>
          {source && <SourceItem source={source} />}
        </div>
      </div>
    </Fragment>
  )
}

export default Entry

/*loading || source === null ? (
    <Spinner />
  ) : */
