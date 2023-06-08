import express from 'express'
import dotenv from 'dotenv'
import router from './routes/router.js'
import authRouter from './routes/auth.js'
import sequelize from './db/db.js'
import cors from 'cors'
import passport from 'passport'
import session from 'express-session'

const app = express()
dotenv.config()
const { APP_LOCALHOST: hostname, APP_PORT: port, APP_SECRET: secret} = process.env

app.use(express.json())

app.use(cors({
  origin: 'http://localhost:3000', // A remplacer par le nom de domaine du client
  credentials: true
}))
app.use(session({
  name: 'fc-authentication',
  secret: secret,
  resave: false,
  saveUninitialized:false,
  cookie: {maxAge: 60 * 60 * 60 * 1000}
}))

app.use(passport.initialize())
app.use(passport.session())

app.listen(port, async () => {
  console.log(`Serveur démarré sur http://${hostname}:${port}`);
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync(
      {force: false}
    )
  } catch (error) {
    console.error('Unable to connect to the database', error)
  }
})

app.use('/', router)
app.use('/', authRouter);
