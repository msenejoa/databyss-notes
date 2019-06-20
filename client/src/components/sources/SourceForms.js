import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addSource } from '../../actions/source'
import { getAuthors } from '../../actions/author'

const clearForm = {
  resource: '',
  abbreviation: '',
  authors: [],
  date: '',
  city: '',
  publishingCompany: '',
  sourceType: '',
  url: '',
  files: '',
  entries: [],
}

const SourceForm = ({ author, addSource, getAuthors }) => {
  useEffect(() => {
    getAuthors()
  }, [getAuthors])

  const [formData, setFormData] = useState(clearForm)
  console.log(author)
  const {
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
  } = formData

  const authorsList = author.authors.map(a => (
    <option key={a._id} value={a._id} label={a.lastName} />
  ))

  const onChange = e => {
    if (e.target.name === 'authors') {
      let list = authors
      list.push(e.target.value)
      setFormData({ ...formData, authors: list })
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }
  }
  const onSubmit = e => {
    addSource(formData)
    setFormData(clearForm)
  }

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>New Source</h3>
      </div>

      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault()
          onSubmit(e)
          //  setText('')
        }}
      >
        <div className='form-group'>
          <select name='authors' value={authors} onChange={e => onChange(e)}>
            <option value='0'>* Select Author</option>
            {authorsList}
          </select>
          <small className='form-text'>author</small>
        </div>

        <div className='form-group'>
          <textarea
            placeholder='add a new resource'
            cols='30'
            rows='5'
            name='resource'
            value={resource}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>new source</small>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='Abbreviation'
            name='abbreviation'
            value={abbreviation}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>author's first name</small>
        </div>

        {/* this authors drop down menu here */}

        <div className='form-group'>
          <input
            type='text'
            placeholder='Date'
            name='date'
            value={date}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>source's publishing date</small>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='City'
            name='city'
            value={city}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>city published in</small>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='Publishing Company'
            name='publishingCompany'
            value={publishingCompany}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>company that published source</small>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='Source Type'
            name='sourceType'
            value={sourceType}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>what type of source is this?</small>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='URL'
            name='url'
            value={url}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>source web site</small>
        </div>

        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  )
}

SourceForm.propTypes = {
  addSource: PropTypes.func.isRequired,
  getAuthors: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  author: state.author,
})

export default connect(
  mapStateToProps,
  { addSource, getAuthors }
)(SourceForm)
