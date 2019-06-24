import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import Spinner from '../layout/Spinner'
import AuthorItem from './../authors/AuthorItem'
import EntryItem from './../entries/EntryItem'

import { getSource } from '../../actions/source'

const Source = ({ match }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getSource(match.params.id))
  }, [dispatch, match.params.id])

  const { source, loading } = useSelector(state => state.source)
  const [authorList, setAuthorList] = useState([])

  const [entryList, setEntryList] = useState([])

  useEffect(() => {
    if (source) {
      const authorsList = source.authors.map(async id => {
        const res = await axios.get(`/api/authors/${id}`)
        return res.data
      })
      Promise.all(authorsList).then(list => setAuthorList(list))
    }
  }, [source])

  useEffect(() => {
    if (source) {
      const entriesList = source.entries.map(async id => {
        const res = await axios.get(`/api/entries/${id}`)
        return res.data
      })
      Promise.all(entriesList).then(list => setEntryList(list))
    }
  }, [source])

  const [renderedList, setRenderedList] = useState({})

  useEffect(() => {
    setRenderedList(r => ({
      ...r,
      authors: authorList.map(a => <AuthorItem key={a._id} author={a} />),
    }))
  }, [authorList])

  useEffect(() => {
    setRenderedList(r => ({
      ...r,
      entries: entryList.map(e => <EntryItem key={e._id} entry={e} />),
    }))
  }, [entryList])

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
        {renderedList.authors}
        <div className='profile-grid' />
      </div>
      <div className='m-2'>
        <h3>Entries</h3>
        {renderedList.entries}
      </div>
    </Fragment>
  )
}

export default Source
