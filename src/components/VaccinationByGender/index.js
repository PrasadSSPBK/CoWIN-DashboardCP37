// Write your code here
import {PieChart, Pie, Legend, Cell} from 'recharts'

import './index.css'

const VaccinationByGender = props => {
  const {vaccinationByGender} = props

  console.log(vaccinationByGender)
  return (
    <PieChart width={1000} height={300}>
      <Pie
        cx="50%"
        cy="40%"
        data={vaccinationByGender}
        startAngle={180}
        endAngle={0}
        innerRadius="40%"
        outerRadius="70%"
        dataKey="count"
      >
        <Cell name="Male" fill="#f54394" />
        <Cell name="Female" fill="#5a8dee" />
        <Cell name="Others" fill="#2cc6c6" />
      </Pie>
      <Legend iconType="circle" layout="horizontal" align="center" />
    </PieChart>
  )
}
export default VaccinationByGender
