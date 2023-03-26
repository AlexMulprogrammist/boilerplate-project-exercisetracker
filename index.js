// const express = require('express')
// const app = express()
// const cors = require('cors')
// require('dotenv').config()
// const mongoose = require('mongoose')
// const bodyParser = require('body-parser')

// // mongoose.connect(process.env.MONGO_URI, () => {
// //   console.log("Connected to DB success!")
// // })

// mongoose.connect("mongodb+srv://admin:14774100Cf@cluster0.z0ywyd4.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((error) => {
//     console.log('Error connecting to MongoDB:', error);
//   });

// const ExerciseSchema = mongoose.Schema({
//   userId: {
//     type: String,
//     required: true
//   },
//   description: String,
//   duration: Number,
//   date: Date,
// }, { versionKey: false })

// const UserSchema = mongoose.Schema({
//   username: {
//     type: String
//   }
// }, { versionKey: false })

// const User = mongoose.model("User", UserSchema)
// const Exercise = mongoose.model("Exercise", ExerciseSchema)

// app.use(bodyParser.urlencoded({ extended: false}));
// app.use(bodyParser.json());
// app.use(cors())
// // app.use(express.urlencoded({ extended: true }))
// app.use(express.static('public'))
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/views/index.html')
// });

// // POST to /api/users with form data username to create a new user.
// app.post("/api/users", (req, res) => {
//   const username = req.body.username
  
//   const newUser = new User({
//     username
//   })
//   console.log(newUser)

//   newUser.save()
//   .then((data) => {
//     // success
//     res.json(data)
//   })
//   .catch((err) => {
//     // error
//     res.send("There was an error saving the user")
//     console.log(err)
//   });
  
// })

// app.post("/api/users/:id/exercises", (req, res) => {
//   const id = req.params.id
//   let { description, duration, date } = req.body

//   User.findById(id)
//   .then((data) => {
//     const NewExercise = new Exercise({
//          userId: id,
//          description,
//          duration,
//          date: new Date(date)
//        })

//     NewExercise.save()
//         .then((exerciseData) => {
//           // success
//           const {description, duration, date, _id} = exerciseData;
//           res.json({
//             username: data.username,
//             description,
//             duration,
//             date: date.toDateString(),
//             _id: data.id
//           })
//         })
//         .catch((err) => {
//           // error
//           res.send("There was an error saving the exercise")
//           console.log(err)
//         });
    
//   })
//   .catch((error) => {
//     res.send("Could not find user...")
//     console.error(error);
//   });
// })

// // {
// //   username: "fcc_test",
// //   count: 1,
// //   _id: "5fb5853f734231456ccb3b05",
// //   log: [{
// //     description: "test",
// //     duration: 60,
// //     date: "Mon Jan 01 1990",
// //   }]
// // }

// app.get('/api/users/:id/logs', (req, res) => {

//   let fromParam = req.query.from;
//   let toParam = req.query.to;
//   let limitParam = req.query.limit;  
//   let userId = req.params.id;

//   // If limit param exists set it to an integer
//   limitParam = limitParam ? parseInt(limitParam): limitParam

//   User.findById(userId)
//     .then((userFound) => {
//     console.log(userFound);
    
//       let queryObj = {
//         userId: userId
//       };
//       // If we have a date add date params to the query
//       if (fromParam || toParam){
    
//           queryObj.date = {}
//           if (fromParam){
//             queryObj.date['$gte'] = fromParam;
//           }
//           if (toParam){
//             queryObj.date['$lte'] = toParam;
//           }
//         }

//     Exercise.find(queryObj).limit(limitParam).
//       then((exercises) => {
//       let resObj = 
//         {_id: userFound.id,
//          username: userFound.username
//         }
  
//       exercises = exercises.map((x) => {
//         return {
//           description: x.description,
//           duration: x.duration,
//           date: new Date(x.date).toDateString()
//         }
//       })
//       resObj.log = exercises;
//       resObj.count = exercises.length;
      
//       res.json(resObj);
//     })
//       .catch((error) => {
//     console.error(error);
//   });
    
//   })
//   .catch((error) => {
//     console.error(error);
//   });
// })


// // app.get("/api/users/:id/logs", (req, res) => {
// //   let responseOb
// //   User.findById(req.params.id)
// //   .then((userData) => {
// //     if (userData) {
// //       res.json(userData)
// //     }
// //   })
// //   .catch((error) => {
// //     console.log(error)
// //   })
//   // const { id } = req.params;
//   // const foundUser = await User.findById(id)

//   // if (!foundUser) {
//   //   res.json({ message: 'No user exists for that id '})  
//   // }
//   // let exercises = await Exercise.find({ userId: id })
    
//   // exercises = exercises.map((ex) => {
//   //   return {
//   //     description: ex.description,
//   //     duration: ex.duration,
//   //     date: ex.date.toDateString()
//   //   }
//   // })
  
//   // res.json({
//   //   username: foundUser.username,
//   //   count: exercises.length,
//   //   _id: id,
//   //   log: exercises
//   // })

//   // const { from, to, limit } = req.query;
//   // const { id } = req.params;

//   // User.findById(id)
//   // .then((userData) => {
//   //   let dateObj = {}
//   //   if (from) {
//   //     dateObj["$gte"] = new Date(from)
//   //   }
//   //   if (to) {
//   //     dateObj["$lte"] = new Date(to)
//   //   }
//   //   let filter = {
//   //     userId: id,
//   //   }
//   //   if (from || to) {
//   //     filter.date = dateObj;
//   //   }

//   //   let nonNullLimit = limit ?? 0
//   //   Exercise.find(filter)
//   //     .limit(+nonNullLimit)
//   //     .exec()
//   //       .then((data) => {
//   //         const count = data.length
//   //         const rawLog = data
//   //         const {username, _id} = userData
//   //         const log = rawLog.map((l) => ({
//   //           description: l.description,
//   //           duration: l.duration,
//   //           date: l.date.toDateString()
//   //         }))
//   //         res.json({username, count, _id, log})
//   //       })
//   //     .catch((error) => {
//   //       console.error(error);
//   //       res.json([])
//   //     });
//   // })
//   // .catch((error) => {
//   //   console.error(error);
//   // });
// // })

// app.get("/api/users", (req, res) => {
  
//   User.find({}).exec()
//   .then((data) => {
//     res.json(data)
//   })
//   .catch((error) => {
//     res.send("No users!")
//     console.error(error);
//   });
// })

// const listener = app.listen(process.env.PORT || 3000, () => {
//   console.log('Your app is listening on port ' + listener.address().port)
// })


const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// mongoose.connect(process.env.MONGO_URI, () => {
//   console.log("Connected to DB success!")
// })

mongoose.connect("mongodb+srv://admin:14774100Cf@cluster0.z0ywyd4.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error);
  });
const Schema = mongoose.Schema;

// User
const userSchema = new Schema({
  username: { type: String, required: true }
})
let userModel = mongoose.model("user", userSchema);

// Exercise
const exerciseSchema = new Schema({
  userId: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, default: new Date() }
})
let exerciseModel = mongoose.model("exercise", exerciseSchema);

app.use(cors())
app.use(express.static('public'))
app.use("/", bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.post('/api/users', (req, res) => {
  let username = req.body.username;
  let newUser = new userModel({ username: username });
  newUser.save();
  res.json(newUser);
})

app.get('/api/users', (req, res) => {
  userModel.find({}).then((users) => {
    res.json(users);
  })
})

app.post('/api/users/:_id/exercises', (req, res) => {
  console.log(req.body);


  let userId = req.params._id;
  
  exerciseObj = {
    userId: userId,
    description: req.body.description,
    duration: req.body.duration
  }

  // If there is a date add it to the object
  if (req.body.date != ''){
    exerciseObj.date = req.body.date
  }

  let newExercise = new exerciseModel(exerciseObj);

  userModel.findById(userId, (err, userFound) => {
    if (err) console.log(err);

    newExercise.save();
    res.json({
      _id: userFound._id, username: userFound.username,
      description: newExercise.description, duration: newExercise.duration,
      date: new Date(newExercise.date).toDateString()
    })
  })
})

app.get('/api/users/:_id/logs', (req, res) => {

  let fromParam = req.query.from;
  let toParam = req.query.to;
  let limitParam = req.query.limit;  
  let userId = req.params._id;

  // If limit param exists set it to an integer
  limitParam = limitParam ? parseInt(limitParam): limitParam

  userModel.findById(userId, (err, userFound) => {
    if (err) return console.log(err);
    console.log(userFound);
    
      let queryObj = {
        userId: userId
      };
      // If we have a date add date params to the query
      if (fromParam || toParam){
    
          queryObj.date = {}
          if (fromParam){
            queryObj.date['$gte'] = fromParam;
          }
          if (toParam){
            queryObj.date['$lte'] = toParam;
          }
        }

    
    exerciseModel.find(queryObj).limit(limitParam).exec((err, exercises) => {
      if (err) return console.log(err);
  
      let resObj = 
        {_id: userFound._id,
         username: userFound.username
        }
  
      exercises = exercises.map((x) => {
        return {
          description: x.description,
          duration: x.duration,
          date: new Date(x.date).toDateString()
        }
      })
      resObj.log = exercises;
      resObj.count = exercises.length;
      
      res.json(resObj);
    })
    
  })
})


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})