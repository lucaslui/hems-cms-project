const chartOptions = {
  maintainAspectRatio: false,
  responsive: true,
  legend: {
    display: false
  },
  tooltips: {
    backgroundColor: '#f5f5f5',
    titleFontColor: '#333',
    bodyFontColor: '#666',
    bodySpacing: 4,
    xPadding: 12,
    mode: 'nearest',
    intersect: 0,
    position: 'nearest'
  },
  scales: {
    yAxes: [
      {
        scaleLabel: {
          display: true,
          fontColor: '#6c757d',
          labelString: 'Geração de Energia [kWh]'
        },
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: 'rgba(225,78,202,0.1)',
          zeroLineColor: 'transparent'
        },
        ticks: {
          suggestedMin: 20,
          suggestedMax: 125,
          padding: 20,
          fontColor: '#6c757d'
        }
      }
    ],
    xAxes: [
      {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: 'rgba(225,78,202,0.1)',
          zeroLineColor: 'transparent'
        },
        ticks: {
          padding: 20,
          fontColor: '#6c757d'
        }
      }
    ]
  }
}

const DailyGeneration = {
  data1: canvas => {
    const ctx = canvas.getContext('2d')

    const gradientStroke = ctx.createLinearGradient(0, 230, 0, 50)

    gradientStroke.addColorStop(1, 'rgba(66,134,121,0.15)')
    gradientStroke.addColorStop(0.4, 'rgba(66,134,121,0.0)') // green colors
    gradientStroke.addColorStop(0, 'rgba(66,134,121,0)') // green colors

    return {
      labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00',
        '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
        '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
      datasets: [
        {
          label: 'Geração [kWh]',
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: '#00d6b4',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#00d6b4',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#00d6b4',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: [17, 14, 5, 9, 10, 2, 34, 3, 43, 48, 6, 35,
            40, 18, 24, 12, 38, 42, 31, 41, 27, 44, 33, 39]
        }
      ]
    }
  },
  data2: canvas => {
    const ctx = canvas.getContext('2d')

    const gradientStroke = ctx.createLinearGradient(0, 230, 0, 50)

    gradientStroke.addColorStop(1, 'rgba(29,140,248,0.2)')
    gradientStroke.addColorStop(0.4, 'rgba(29,140,248,0.0)')
    gradientStroke.addColorStop(0, 'rgba(29,140,248,0)') // blue colors

    return {
      labels: ['00:00', '00:30',
        '01:00', '01:30',
        '02:00', '02:30',
        '03:00', '03:30',
        '04:00', '04:30',
        '05:00', '05:30',
        '06:00', '06:30',
        '07:00', '07:30',
        '08:00', '08:30',
        '09:00', '09:30',
        '10:00', '10:30',
        '11:00', '11:30',
        '12:00', '12:30',
        '13:00', '13:30',
        '14:00', '14:30',
        '15:00', '15:30',
        '16:00', '16:30',
        '17:00', '17:30',
        '18:00', '18:30',
        '19:00', '19:30',
        '20:00', '20:30',
        '21:00', '21:30',
        '22:00', '22:30',
        '23:00', '23:30'],
      datasets: [
        {
          label: 'Geração [kWh]',
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: '#00d6b4',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#00d6b4',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#00d6b4',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: [17, 14, 5, 9, 10, 2, 34, 3, 43, 48, 6, 35,
            17, 14, 5, 9, 10, 2, 34, 3, 43, 48, 6, 35,
            40, 18, 24, 12, 38, 42, 31, 41, 27, 44, 33, 39,
            40, 18, 24, 12, 38, 42, 31, 41, 27, 44, 33, 39]
        }
      ]
    }
  },
  data3: canvas => {
    const ctx = canvas.getContext('2d')

    const gradientStroke = ctx.createLinearGradient(0, 230, 0, 50)

    gradientStroke.addColorStop(1, 'rgba(29,255,248,0.6)')
    gradientStroke.addColorStop(0.4, 'rgba(29,255,248,0.2)')
    gradientStroke.addColorStop(0, 'rgba(29,255,248,0)')

    return {
      labels: ['00:00', '00:15', '00:30', '00:45',
        '01:00', '01:15', '01:30', '01:45',
        '02:00', '02:15', '02:30', '02:45',
        '03:00', '03:15', '03:30', '03:45',
        '04:00', '04:15', '04:30', '04:45',
        '05:00', '05:15', '05:30', '05:45',
        '06:00', '06:15', '06:30', '06:45',
        '07:00', '07:15', '07:30', '07:45',
        '08:00', '08:15', '08:30', '08:45',
        '09:00', '09:15', '09:30', '09:45',
        '10:00', '10:15', '10:30', '10:45',
        '11:00', '11:15', '11:30', '11:45',
        '12:00', '12:15', '12:30', '12:45',
        '13:00', '13:15', '13:30', '13:45',
        '14:00', '14:15', '14:30', '14:45',
        '15:00', '15:15', '15:30', '15:45',
        '16:00', '15:15', '16:30', '16:45',
        '17:00', '17:15', '17:30', '17:45',
        '18:00', '18:15', '18:30', '18:45',
        '19:00', '19:15', '19:30', '19:45',
        '20:00', '20:15', '20:30', '20:45',
        '21:00', '21:15', '21:30', '21:45',
        '22:00', '22:15', '22:30', '22:45',
        '23:00', '23:15', '23:30', '23:45'],
      datasets: [
        {
          label: 'Geração [kWh]',
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: '#00d6b4',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#00d6b4',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#00d6b4',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: [17, 14, 5, 9, 10, 2, 34, 3, 43, 48, 6, 35,
            17, 14, 5, 9, 10, 2, 34, 3, 43, 48, 6, 35,
            40, 18, 24, 12, 38, 42, 31, 41, 27, 44, 33, 39,
            40, 18, 24, 12, 38, 42, 31, 41, 27, 44, 33, 39,
            17, 14, 5, 9, 10, 2, 34, 3, 43, 48, 6, 35,
            17, 14, 5, 9, 10, 2, 34, 3, 43, 48, 6, 35,
            40, 18, 24, 12, 38, 42, 31, 41, 27, 44, 33, 39,
            40, 18, 24, 12, 38, 42, 31, 41, 27, 44, 33, 39]
        }
      ]
    }
  },
  options: chartOptions
}

export default DailyGeneration
