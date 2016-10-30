import React, { Component } from 'react'
import '../styles/screen.sass'

class App extends Component {
  constructor () {
    super()
    this.state = {
      jobs: []
    }
  }

  componentWillMount () {
    window.fetch('http://service.dice.com/api/rest/jobsearch/v1/simple.json?text=javascript&city=Tampa,+FL&pgcnt=150')
    .then(res => res.json())
    .then(json => this.setState({jobs: json.resultItemList}))
  }

  Authorize = () => {
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
    Trello.post('cards', { name: `${job.company}`, desc: job.jobTitle, idList: '57c09a003c39978d6aaf12e8', urlSource: thisUrl })
  }
  render () {
    const { jobs } = this.state
    const styles = {
      apply: {
        textDecoration: 'none',
        backgroundColor: 'blue',
        color: 'white',
        border: '1px solid black',
        borderRadius: '5px',
        padding: '2px',
        marginRight: '5px',
        fontWeight: 'bold'
      },
      listDiv: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center'
      },
      list: {
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
        margin: '15px',
        padding: '10px',
        border: '2px solid black',
        listStyle: 'none'
      }
    }
    const jobList = jobs.map((job, i) => {
      return <ul key={i} style={styles.list}>
        <li>{job.company}</li>
        <li>{job.jobTitle}</li>
        <li>{job.location}</li>
        <li><a style={styles.apply} href={job.detailUrl} target='_blank'>Apply</a><a style={styles.apply} href={`mailto:antoinette.warren@gmail.com?subject=New%20Job&body=${job.detailUrl}`}>Email Toni</a><button onClick={() => this.makeTrelloCard(job)}>Post To Trello</button></li>
      </ul>
    })
    return <div>
      <h1 style={{textAlign: 'center'}}>JOBS</h1> <hr />
      <button style={{margin: '0 auto', backgroundColor: 'blue', color: 'white', fontWeight: 'bold'}} onClick={this.Authorize}>Authorize Trello</button>
      <div style={styles.listDiv}>{jobList}</div>
    </div>
  }
}

export default App
