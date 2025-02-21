import express from 'express'
import multer from 'multer'
import { DataSource, EntitySchema } from 'typeorm'
import path from 'path'
import fs from 'fs'

const app = express()

dotenv.config()

const Surprise = new EntitySchema({
    name: 'Surprise',
    tableName: 'surprises',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        secondsMessage: {
            type: 'varchar',
            length: 35
        },
        minutesMessage: {
            type: 'varchar',
            length: 35
        },
        hoursMessage: {
            type: 'varchar',
            length: 35
        },
        daysMessage: {
            type: 'varchar',
            length: 35
        },
        weeksMessage: {
            type: 'varchar',
            length: 35
        },
        monthsMessage: {
            type: 'varchar',
            length: 35
        },
        yearsMessage: {
            type: 'varchar',
            length: 35
        },
        videoId: {
            type: 'char',
            length: 11
        },
        startDate: {
            type: 'date'
        },
        finalMessage: {
            type: 'varchar',
            length: 600,
        }
    }
})

const datasource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    entities: [Surprise]
})

datasource.initialize().then(() => {
    app.use(express.static('public'))

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/')
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname))
        }
    })

    const upload = multer({ storage })

    app.get('/api/surprises/:id', async (req, res) => {
        try {
            const { id } = req.params()

            const surprise = await datasource.manager.findOneBy(Surprise, { id })

            res.send(surprise)
        } catch (error) {
            console.error('error')
        }
    })

    app.post('/api/surprises', upload.fields([{ name: 'images', maxCount: 7 }, { name: 'puzzleImage', maxCount: 1 }]), async (req, res) => {
        try {
            const { imageText, videoId, startDate, finalMessage } = req.body

            const surpriseDTO = {
                secondsMessage: imageText.seconds,
                minutesMessage: imageText.minutes,
                hoursMessage: imageText.hours,
                daysMessage: imageText.days,
                weeksMessage: imageText.weeks,
                monthsMessage: imageText.months,
                yearsMessage: imageText.years,
                videoId,
                startDate,
                finalMessage
            }

            const surprise = datasource.manager.create(Surprise, surpriseDTO)

            const surpriseReturn = await datasource.manager.save(Surprise, surprise)

            const surpriseFolder = join('uploads', String(surpriseReturn.id))

            if (!fs.existsSync(surpriseFolder)) {
                fs.mkdirSync(surpriseFolder, { recursive: true })
            }

            if (req.files['image']) {
                req.files['image'].forEach(file => {
                    const tempPath = path.join('uploads', file.filename)
                    const targetPath = path.join(surpriseFolder, file.filename)
                    fs.renameSync(tempPath, targetPath)
                })
            }

            if (req.files['puzzleImage']) {
                const file = req.files['puzzleImage'][0]
                const tempPath = path.join('uploads', file.filename)
                const targetPath = path.join(surpriseFolder, file.filename)
                fs.renameSync(tempPath, targetPath)
            }

            res.send(surpriseReturn.id)
        } catch (error) {
            console.error(error)
        }
    })

    app.get('*', (_req, res) => {
        res.sendFile('index.html', { root: 'public' })
    })

    app.listen(3000, () => {
        console.log('Server running on port: ' + 3000)
    })
}).catch(error => {
    console.error(error)
})
