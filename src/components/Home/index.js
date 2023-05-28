import {Component} from 'react'
import './index.css'

import Loader from 'react-loader-spinner'
import Course from '../Course'
import FailureView from '../FailureView'

const apiFetchConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {status: apiFetchConstants.initial, courses: []}

  componentDidMount() {
    this.getCourses()
  }

  getCourses = async () => {
    this.setState({status: apiFetchConstants.inProgress})
    const response = await fetch('https://apis.ccbp.in/te/courses')
    console.log(response)
    if (response.ok) {
      const {courses} = await response.json()
      const data = courses.map(course => ({
        id: course.id,
        name: course.name,
        logoUrl: course.logo_url,
      }))
      this.setState({courses: data, status: apiFetchConstants.success})
    } else {
      this.setState({status: apiFetchConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {courses} = this.state
    return (
      <div className="home-container">
        <h1>Courses</h1>
        <ul className="courses-container">
          {courses.map(course => (
            <Course courseDetails={course} key={course.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => <FailureView retryAgain={this.getCourses} />

  renderHomePage = () => {
    const {status} = this.state
    switch (status) {
      case apiFetchConstants.inProgress:
        return this.renderLoadingView()
      case apiFetchConstants.success:
        return this.renderSuccessView()
      case apiFetchConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return this.renderHomePage()
  }
}

export default Home
