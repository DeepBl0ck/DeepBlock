export const chartScript = {
  type: 'line',
  data: {
    labels: ["1", "2", "3", "4", "5", "6"],
    datasets: [
      {
        label: "acc",
        data: [0.44, 0.55 , 0.66, 0.77, 0.88, 0.99],
        borderColor: [ 'red' ],
        borderWidth: 1,
      },
      {
        label: "loss",
        data: [0.55, 0.44 , 0.33, 0.22, 0.11, 0.001],
        borderColor: [ 'blue' ],
        borderWidth: 1,
      }
    ],
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  },
};

export default chartScript;
