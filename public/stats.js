
fetch("/api/workouts/range")
  .then(response => {
    return response.json();
  })
  .then(data => {
    populateChart(data);
  });

API.getWorkoutsInRange()

function generatePalette() {
  const arr = [
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "ffa600",
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "ffa600"
  ]

  return arr;
}

function populateChart(data) {
  let durations = duration(data);
  const pounds = calculateTotalWeight(data);
  let workouts = workoutNames(data);
  const colors = generatePalette();
  //const labels= label(data);
  let line = document.querySelector('#canvas').getContext('2d');
  let bar = document.querySelector('#canvas2').getContext('2d');
  let pie = document.querySelector('#canvas3').getContext('2d');
  let pie2 = document.querySelector('#canvas4').getContext('2d');

  // const labels = data.map(({ day }) => {
  //   const date = new Date(day);

  //   // Use JavaScript's `Intl` object to help format dates
  //   return new Intl.DateTimeFormat('en-US', {
  //     weekday: 'short',
  //     month: 'short',
  //     day: 'numeric',
  //   }).format(date);
  // });

  let lineChart = new Chart(line, {
    type: 'line',
    data: {
      labels: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      datasets: [
        {
          label: 'Workout Duration In Minutes',
          backgroundColor: 'red',
          borderColor: 'red',
          data: durations,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      plugins:{
        title: {
          display: true,
          text: 'Time Spent Working Out (Last 7 days)',
        },
      },
      scales: {
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
            },
          },
        ],
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
            },
          },
        ],
      }
    }
  });

  let barChart = new Chart(bar, {
    type: 'bar',
    data: {
      labels: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      datasets: [
        {
          label: 'Pounds ',
          data: pounds,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins:{
        title: {
          display: true,
          text: 'Pounds Lifted (Last 7 days)',
        },
      },
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
  });


  // get all workout data from back-end

  let pieChart = new Chart(pie, {
    type: "pie",
    data: {
      labels: ["Bench Press", "Running", "Dead Lifts", "Squats", "Rowing"],
      datasets: [
        {
          label: "Excercises Performed",
          backgroundColor: colors,
          data: durations
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Excercises Performed"
      }
    }
  });

  let donutChart = new Chart(pie2, {
    type: "doughnut",
    data: {
      labels: ["Bench Press", "Running", "Dead Lifts", "Squats", "Rowing"],
      datasets: [
        {
          label: "Excercises Performed",
          backgroundColor: colors,
          data: pounds
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Excercises Performed"
      }
    }
  });
}

function duration(data) {
  let durations = [];

  data.forEach(workout => {
    workout.exercises.forEach(exercise => {
      durations.push(exercise.duration);
    });
  });

  return durations;
}

// function benchPress(data) {
// let bench = [];

// data.forEach(workout => {
//   workout.exercises.forEach(exercise => {
//     bench.push(exercise.weight);
//   });
// });

// return bench;
// }

function workoutNames(data) {
  let workouts = [];

  data.forEach(workout => {
    workout.exercises.forEach(exercise => {
      workouts.push(exercise.name);
    });
  });

  return workouts;
}

function calculateTotalWeight(data) {
  const totals = [];

  data.forEach((workout) => {
    const workoutTotal = workout.exercises.reduce((total, { type, weight }) => {
      if (type === 'resistance') {
        return total + weight;
      }
      return total;
    }, 0);

    totals.push(workoutTotal);
  });

  return totals;
}
