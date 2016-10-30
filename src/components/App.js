import React, { Component } from 'react'
import '../styles/screen.sass'
import styles from './styles'

class App extends Component {
  constructor () {
    super()
    this.state = {
      jobs: [],
      currentCardId: '',
      currentCity: '',
      currentKeyWord: ''
    }
  }

  getJobs = () => {
    const city = document.getElementById('city')
    const text = document.getElementById('keyword')
    window.fetch(`http://service.dice.com/api/rest/jobsearch/v1/simple.json?text=${text.value}&city=${city.value}&pgcnt=150`)
    .then(res => res.json())
    .then(json => this.setState({jobs: json.resultItemList}))
  }

  authorize = () => {
    console.log('clicked')
    Trello.authorize({
      interactive: true,
      type: 'popup',
      expiration: 'never',
      name: 'surveyrequest',
      persist: 'true',
      scope: {read: true, write: true}
    })
  }

  makeTrelloCard = (job) => {
    var thisUrl = encodeURI(job.detailUrl)
    let cardId = ''
    const comment = '@toniwarren: Please reach out to me about this position!'
    Trello.post('cards', { name: `${job.company}`, desc: job.jobTitle, idList: '57c09a003c39978d6aaf12e8', urlSource: thisUrl })
    .then(res => this.setState({currentCardId: res.id}, () => {
      cardId = this.state.currentCardId
      Trello.post(`cards/${cardId}/actions/comments`, {text: comment})
    }))
  }

  render () {
    const { jobs } = this.state

    const jobList = jobs.map((job, i) => {
      const subject = 'I Want This Job!!!'
      const body = `Hey Toni! I would really like some help getting this one! Link to my job: ${job.detailUrl}`
      return <ul key={i} style={styles.list}>
        <li>{job.company}</li>
        <li>{job.jobTitle}</li>
        <li>{job.location}</li>
        <li>
          <a
            style={styles.apply}
            href={job.detailUrl}
            target='_blank'>
            Apply
          </a>
          <a
            style={styles.apply}
            href={`mailto:antoinette.warren@gmail.com?subject=${subject}&body=${body}`}>
            Email Toni
          </a>
          <button
            style={styles.cardButton}
            onClick={() => this.makeTrelloCard(job)}>
            Post To Trello
          </button>
        </li>
      </ul>
    })
    return <div>
      <h1 style={{textAlign: 'center'}}>JOBS</h1> <hr />
      <div style={styles.select}>
        <button
          style={styles.authTrelloButton}
          onClick={this.authorize}>
          Authorize Trello
        </button>
        <div style={styles.dropdown}>
          <label>City: </label>
          <select id='city' name='city'>
            <option value='Saint Petersburg, FL'>St.Pete</option>
            <option value='Tampa, FL'>Tampa</option>
            <option value='Clearwater, FL'>Clearwater</option>
            <option value='New York, NY'>New York</option>
          </select>
        </div>
        <div style={styles.dropdown}>
          <label>Keywords: </label>
          <select id='keyword' name='keyword'>
            <option value='Javascript'>Javascript</option>
            <option value='Ruby'>Ruby</option>
            <option value='FrontEnd'>FrontEnd</option>
            <option value='Junior'>Junior</option>
          </select>
        </div>
        <button
          onClick={this.getJobs}
          style={styles.cardButton}>
          GET JOBS
        </button>
      </div>
      <div
        style={styles.listDiv}>
        {jobList}
      </div>
    </div>
  }
}

export default App
