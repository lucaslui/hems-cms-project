
const pieTariff = {

  data: canvas => {
    return {
      labels: ['Fora de ponta', 'Intermediário', 'Ponta'],
      datasets: [{
        data: [32.73, 32.5, 75.23],
        backgroundColor: ['#FB8545', '#FCA641', '#FCdc4A'],
        hoverBackgroundColor: ['#FB8545', '#FCA641', '#FCdc4A']
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

export default pieTariff
