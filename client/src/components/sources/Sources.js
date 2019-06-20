import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
//import AuthorItem from './AuthorItem'
import SourcesForm from './SourcesForms'
import { getSources } from '../../actions/source'

const Sources = ({ getSources, source: { sources, loading } }) => {
  useEffect(() => {
    getSources()
  }, [getSources])

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Authors</h1>
      <p className='lead'>
        <i className='fas fa-user' /> add new author
      </p>
      <SourcesForm />
      {/*
      <div className='posts'>
        {authors.map(author => (
          <AuthorItem key={author._id} author={author} />
        ))}
      </div>
        */}
    </Fragment>
  )
}

Sources.propTypes = {
  getSources: PropTypes.func.isRequired,
  source: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  source: state.source,
})

export default connect(
  mapStateToProps,
  { getSources }
)(Sources)
