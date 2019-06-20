import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addEntry } from '../../actions/entry'
import { getAuthors } from '../../actions/author'
import { getSources } from '../../actions/source'

const clearForm = {
  author: '',
  source: '',
  pageFrom: 0,
  pageTo: 0,
  files: [],
  entry: '',
  index: 0,
  document: '',
}

const EntryForm = ({
  addEntry,
  getAuthors,
  author: { authors, loading },
  getSources,
  source: { sources },
}) => {
  useEffect(() => {
    getAuthors()
    getSources()
  }, [getAuthors, getSources])

  const [formData, setFormData] = useState(clearForm)

  const {
    author,
    source,
    pageFrom,
    pageTo,
    files,
    entry,
    index,
    document,
  } = formData

  const authorsList = authors.map(a => (
    <option key={a._id} value={a._id} label={a.lastName} />
  ))

  let newSources = sources
  if (author.length > 0) {
    newSources = sources.filter(s => {
      const result = s.authors.includes(author)
      return result
    })
  }
  console.log(newSources)

  const sourcesList = newSources.map(s => (
    <option key={s._id} value={s._id} label={s.resource} />
  ))

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = e => {
    formData.document = formData.entry
    e.preventDefault()
    addEntry(formData)
    setFormData(clearForm)
  }

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>New Entry</h3>
      </div>

      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault()
          onSubmit(e)
        }}
      >
        <div className='form-group'>
          <select name='author' value={author} onChange={e => onChange(e)}>
            <option value='0'>* Select Author</option>
            {authorsList}
          </select>
          <small className='form-text'>author</small>
        </div>

        <div className='form-group'>
          <select name='source' value={source} onChange={e => onChange(e)}>
            <option value='0'>* Select Source</option>
            {sourcesList}
          </select>
          <small className='form-text'>source</small>
        </div>

        {/*
        <div className='form-group'>
          <input
            type='text'
            placeholder='Author'
            name='author'
            value={author}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>author of new entry</small>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='Source'
            name='source'
            value={source}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>source of new entry</small>
        </div>
      */}
        <div className='form-group'>
          <input
            type='text'
            placeholder='Page From'
            name='pageFrom'
            value={pageFrom}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>What page is this source from</small>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='Page To'
            name='pageTo'
            value={pageTo}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>if more than one page</small>
        </div>

        <div className='form-group'>
          <textarea
            placeholder='add a new entry'
            cols='30'
            rows='5'
            name='entry'
            value={entry}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>new entry</small>
        </div>

        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  )
}

EntryForm.propTypes = {
  addEntry: PropTypes.func.isRequired,
  getAuthors: PropTypes.func.isRequired,
  getSources: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  author: state.author,
  source: state.source,
})

export default connect(
  mapStateToProps,
  { addEntry, getAuthors, getSources }
)(EntryForm)
