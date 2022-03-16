
const pieConsumptionGeneration = {
  data: canvas => {
    return {
      labels: ['Consumo', 'Rede'],
      datasets: [{
        data: [30.16225, 5.32275],
        backgroundColor: ['#FB8545', '#f2d300'],
        hoverBackgroundColor: ['#FB8545', '#f2d300']
      }]
    }
  },
  options: {
    maintainAspectRatio: false,
    responsive: true,
    legend: {
      display: true,
      position: 'bottom'
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
    }
  }
}

export default pieConsumptionGeneration
