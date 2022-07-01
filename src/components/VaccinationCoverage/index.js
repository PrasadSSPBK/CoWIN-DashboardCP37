import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import './index.css'

const VaccinationCoverage = props => {
  const {vaccinationCoverage} = props
  const vaccinationList = vaccinationCoverage.map(eachItem => ({
    vaccineDate: eachItem.vaccine_date,
    dose1: eachItem.dose_1,
    dose2: eachItem.dose_2,
  }))

  const dataFormatter = num => {
    if (num > 1000) {
      return `${(num / 1000).toString()}k`
    }
    return `${num.toString()}k`
  }

  return (
    <ResponsiveContainer width={900} height={300}>
      <BarChart data={vaccinationList} margin={{top: 10}}>
        <XAxis dataKey="vaccineDate" tick={{stroke: 'gray', strokeWidth: 1}} />
        <YAxis
          tickFormatter={dataFormatter}
          tick={{stroke: 'gray', strokeWidth: 1}}
        />
        <Legend iconType="rect" layout="horizontal" align="center" />
        <Bar dataKey="dose1" name="Dose 1" fill="#2d87bb" barSize="20%" />
        <Bar dataKey="dose2" name="Dose 2" fill="#f54394" barSize="20%" />
      </BarChart>
    </ResponsiveContainer>
  )
}
export default VaccinationCoverage
