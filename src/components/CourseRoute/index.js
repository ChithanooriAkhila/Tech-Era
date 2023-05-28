import {Component} from 'react'
import './index.css'

import Loader from 'react-loader-spinner'
import FailureView from '../FailureView'

const apiFetchConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CourseRoute extends Component {
  state = {status: apiFetchConstants.initial, courseDetails: []}

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    this.setState({status: apiFetchConstants.inProgress})
    // console.log(this.props)
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const response = await fetch(`https://apis.ccbp.in/te/courses/${id}`)
    // console.log(response)

    if (response.ok) {
      let course = await response.json()
      course = course.course_details
      console.log(course)
      const data = {
        id: course.id,
        name: course.name,
        imageUrl: course.image_url,
        description: course.description,
      }
      this.setState({courseDetails: data, status: apiFetchConstants.success})
    } else {
      this.setState({status: apiFetchConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#00BFFF" height={100} width={100} />
    </div>
  )

  renderSuccessView = () => {
    const {courseDetails} = this.state
    const {name, imageUrl, description} = courseDetails
    return (
      <div className="course-card">
        <img src={imageUrl} alt={name} className="course-image" />
        <div className="course-text-container">
          <h1>{name}</h1>
          <p className="course-description">{description}</p>
        </div>
      </div>
    )
  }

  renderFailureView = () => <FailureView retryAgain={this.getCourseDetails} />

  renderCoursePage = () => {
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
    return this.renderCoursePage()
  }
}

export default CourseRoute
