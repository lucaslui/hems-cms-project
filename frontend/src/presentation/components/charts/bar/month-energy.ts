const chartMonthEnergyConsumption = {
  data: canvas => {
    const ctx = canvas.getContext('2d')

    const gradientStroke = ctx.createLinearGradient(0, 230, 0, 50)

    gradientStroke.addColorStop(1, 'rgba(29,140,248,0.2)')
    gradientStroke.addColorStop(0.4, 'rgba(29,140,248,0.0)')
    gradientStroke.addColorStop(0, 'rgba(29,140,248,0)') // blue colors

    return {
      labels: ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'],
      datasets: [
        {
          label: 'Consumo [kWh]',
          fill: true,
          backgroundColor: gradientStroke,
          hoverBackgroundColor: gradientStroke,
          borderColor: '#1f8ef1',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          data: [53, 20, 10, 80, 100, 45, 23, 23, 54, 21, 67, 85]
        }
      ]
    }
  },
  options: {
    maintainAspectRatio: false,
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
    responsive: true,
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Consumo de Energia [kWh]'
          },

          gridLines: {
            drawBorder: false,
            color: 'rgba(225,78,202,0.1)',
            zeroLineColor: 'transparent'
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 120,
            padding: 20,
            fontColor: '#6c757d'
          }
        }
      ],
      xAxes: [
        {
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
}

const chartMonthEnergyGeneration = {
  data: canvas => {
    const ctx = canvas.getContext('2d')

    const gradientStroke = ctx.createLinearGradient(0, 230, 0, 50)

    gradientStroke.addColorStop(1, 'rgba(66,134,121,0.15)')
    gradientStroke.addColorStop(0.4, 'rgba(66,134,121,0.0)') // green colors
    gradientStroke.addColorStop(0, 'rgba(66,134,121,0)') // green colors

    return {
      labels: ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'],
      datasets: [
        {
          label: 'Consumo [kWh]',
          fill: true,
          backgroundColor: gradientStroke,
          hoverBackgroundColor: gradientStroke,
          borderColor: '#00d6b4',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          data: [2, 38, 1, 24, 15, 3, 19, 41, 11, 22, 6, 26]
        }
      ]
    }
  },
  options: {
    maintainAspectRatio: false,
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
    responsive: true,
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Consumo de Energia [kWh]'
          },

          gridLines: {
            drawBorder: false,
            color: 'rgba(225,78,202,0.1)',
            zeroLineColor: 'transparent'
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 50,
            padding: 20,
            fontColor: '#6c757d'
          }
        }
      ],
      xAxes: [
        {
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
}

export { chartMonthEnergyConsumption, chartMonthEnergyGeneration }
