// fetch("http://localhost:1337/api/athletes?populate[0]=results").then(
//   async (res) => {
//     const data = await res.json();

//     console.log(data.data);
//   }
// );

// fetch(
//   "http://localhost:1337/api/athletes?filters[name][$contains]=Pfeilstöcker"
// ).then(async (res) => {
//   const data = await res.json();

//   console.log(data);
// });

const createAthlete = async (data) => {
  const url = "http://localhost:1337/api/athletes";
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
};

// Create Athletes
// const athletesData = [];
// athletes.forEach((el) => {
//   createAthlete(el).then((res) => {
//     athletesData.push(
//       res.data.id +
//         "|" +
//         el.data.personalInformation.name.lastname +
//         " " +
//         el.data.personalInformation.name.firstname
//     );
//   });
// });

// console.log(athletesData);

const createCompetition = async (data) => {
  const url = "http://localhost:1337/api/competitions";
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
};

// const compData = [];
// competitions.forEach((el) => {
//   createCompetition(el).then((res) => {
//     compData.push(
//       res.data.id + "|" + el.data.date.startDate + "|" + el.data.title.default
//     );
//   });
// });

// console.log(compData);

const success = [];
const error = [];

const createResult = async (data, id) => {
  const url = "http://localhost:1337/api/results";
  try {
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    success.push({ index: id, res: await response.json() });
    return response.json(); // parses JSON response into native JavaScript objects
  } catch (error) {
    error.push(index);
  }
};

// results.slice(3500, 4000).forEach((el, i) => {
//   createResult(el, i);
// });

fetch(
  "http://localhost:1337/api/athletes?populate[0]=personalInformation.name&populate[1]=results&filters[personalInformation][name][lastname]=Kathrein"
).then(async (res) => {
  const data = await res.json();

  console.log(data);
});

// fetch(
//   "http://localhost:1337/api/athletes?pagination[pageSize]=300&populate[0]=personalInformation.name&populate[1]=results"
// ).then(async (res) => {
//   const data = await res.json();
//   document.write("<table>");
//   data.data
//     .sort(
//       (a, b) =>
//         b.attributes.results.data.length - a.attributes.results.data.length
//     )
//     .forEach((el, id) => {
//       const info = el.attributes;

//       document.write(
//         `<tr><td>${id + 1}</td><td>${
//           info.personalInformation.name.lastname
//         }</td><td>${info.results.data.length}</td></tr>`
//       );
//     });
//   document.write("</table>");
// });

// fetch("http://localhost:1337/api/athletes/586", {
//   method: "PUT",
//   headers: { "Content-Type": "aplication/json" },
//   body: JSON.stringify({ data: { fullName: "Test" } }),
// }).then(async (res) => {
//   const data = await res.json();
//   console.log(data);
// });

axios
  .get(
    "http://localhost:1337/api/athletes?pagination[pageSize]=300&populate=personalInformation.name"
  )
  .then((res) => {
    // console.log(res.data.data);
    res.data.data.forEach((el) => {
      const fullName = `${el.attributes.personalInformation.name.lastname}${
        el.attributes.personalInformation.name.firstname
          ? " " + el.attributes.personalInformation.name.firstname
          : ""
      }`;
      const slug = fullName
        .toLowerCase()
        .replaceAll(" ", "-")
        .replaceAll("ö", "oe")
        .replaceAll("ä", "ae")
        .replaceAll("ü", "ue")
        .replaceAll("ß", "ss");
      // console.log(slug, el.attributes.slug);

      // axios.put("http://localhost:1337/api/athletes/" + el.id, {
      //   data: { slug },
      // });
    });
  });

const updateResults = (page, pageSize = 25) => {
  axios
    .get(
      `http://localhost:1337/api/results/?pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate[0]=score.disciplines.attempts`
    )
    .then((res) => {
      console.log(res.data.data);
      res.data.data.forEach((entry) => {
        const result = entry.attributes.score;
        delete result.id;
        result.disciplines.forEach((el) => {
          delete el.id;
          if (!el.attempts || el.attempts.length === 0) delete el.attempts;
          else el.attempts.forEach((attempt) => delete attempt.id);
        });
        console.log(entry.id, result);
        axios
          .put("http://localhost:1337/api/results/" + entry.id, {
            data: { result },
          })
          .catch((err) => console.log(err));
      });
    })
    .catch((err) => console.log(err));
};

// for (let index = 1; index < 160; index++) {
//   updateResults(index);
// }

const getResults = (page = 1) => {
  axios
    .get(
      "http://localhost:1337/api/results?pagination[pageSize]=4000&pagination[page]=" +
        page
    )
    .then((res) => {
      console.log(res.data.data);
      res.data.data.forEach((el) => console.log(el.attributes.result));
    });
};
