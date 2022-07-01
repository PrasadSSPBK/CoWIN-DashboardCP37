import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationCoverage from '../VaccinationCoverage'

import './index.css'

const apiStatusConstants = {
  intial: 'Intial',
  success: 'Success',
  failure: 'Failure',
  loading: 'Loading',
}

class CowinDashboard extends Component {
  state = {
    apiStatus: apiStatusConstants.intial,
    vaccinationByAge: [],
    vaccinationByGender: [],
    vaccinationCoverage: [],
  }

  componentDidMount() {
    this.setState({
      apiStatus: apiStatusConstants.loading,
    })
    this.getData()
  }

  getData = async () => {
    const apiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(apiUrl)

    // console.log(data)

    if (response.ok === true) {
      const data = await response.json()
      this.setState({
        vaccinationCoverage: data.last_7_days_vaccination,
        vaccinationByAge: data.vaccination_by_age,
        vaccinationByGender: data.vaccination_by_gender,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderVaccinationByAge = () => {
    const {vaccinationByAge} = this.state
    return (
      <div className="ageContainer">
        <h1 className="head">Vaccination by age</h1>
        <VaccinationByAge vaccinationByAge={vaccinationByAge} />
      </div>
    )
  }

  renderVaccinationByGender = () => {
    const {vaccinationByGender} = this.state
    return (
      <div className="ageContainer">
        <h1 className="head">Vaccination by gender</h1>
        <VaccinationByGender vaccinationByGender={vaccinationByGender} />
      </div>
    )
  }

  renderVaccinationCoverage = () => {
    const {vaccinationCoverage} = this.state
    return (
      <div className="ageContainer">
        <h1 className="head">Vaccination Coverage</h1>
        <VaccinationCoverage vaccinationCoverage={vaccinationCoverage} />
      </div>
    )
  }

  //   renderSuccessView = () => <div></div>

  renderFailureView = () => (
    <div className="failureContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failureImg"
      />
      <h1 className="failure">Something went wrong</h1>
    </div>
  )

  renderLoaderView = () => (
    <div testid="loader" className="failureContainer">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderSwitchCase = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.loading:
        return this.renderLoaderView()
      case apiStatusConstants.success:
        return (
          <>
            {this.renderVaccinationCoverage()}
            {this.renderVaccinationByGender()}
            {this.renderVaccinationByAge()}
          </>
        )

      default:
        return null
    }
  }

  render() {
    const {apiStatus} = this.state
    console.log(apiStatus)
    return (
      <div className="mainContainer">
        <div className="imContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="websiteLogo"
          />
          <p className="websiteName">Co-WIN</p>
        </div>
        <h1 className="websiteHeading">CoWIN Vaccination in India</h1>
        {this.renderSwitchCase()}
      </div>
    )
  }
}
export default CowinDashboard
