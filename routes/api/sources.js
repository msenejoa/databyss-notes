const express = require('express')
const router = express.Router()
const Source = require('../../models/Source')
const auth = require('../../middleware/auth')

// @route    POST api/sources
// @desc     Add Source
// @access   Private
router.post('/', auth, async (req, res) => {
  try {
    /*
      INSERT ERROR HANDLER HERE
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
*/
    const {
      title,
      authors,
      year,
      city,
      publishingCompany,
      sourceType,
      url,
      files,
      entries,
      date,
      resource,
    } = req.body

    // Do parsing here
    const sources = new Source({
      title,
      authors,
      year,
      city,
      publishingCompany,
      sourceType,
      url,
      files,
      entries,
      date,
      resource,
      user: req.user.id,
    })

    const post = await sources.save()
    res.json(post)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

// @route    GET api/sources
// @desc     Get source by id
// @access   Private
router.get('/:id', auth, async (req, res) => {
  try {
    /*
      INSERT ERROR HANDLER HERE
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
  
*/

    const sources = await Source.findOne({
      _id: req.params.id,
    })

    if (!sources) {
      return res.status(400).json({ msg: 'There is no source for this id' })
    }

    res.json(sources)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

// @route    GET api/sources/
// @desc     Get all sources
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    /*
      INSERT ERROR HANDLER HERE
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
*/
    const source = await Source.find()
    if (!source) {
      return res.status(400).json({ msg: 'There are no sources' })
    }
    if (!source) {
      return res.status(400).json({ msg: 'There is no sources' })
    }

    res.json(source)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})
// @route    GET api/sources/
// @desc     Get all sources
// @access   public
router.get('/', async (req, res) => {
  try {
    const source = await Source.find()
    if (!source) {
      return res.status(400).json({ msg: 'There are no sources' })
    }

    res.json(source)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
