import express from 'express'
import multer from 'multer'
import { DataSource, EntitySchema } from 'typeorm'
import { MercadoPagoConfig, Preference } from 'mercadopago'
import path from 'path'
import fs from 'fs'
import cors from 'cors'
import dotenv from 'dotenv'

const app = express()

dotenv.config()

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN })

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
        },
        paymentStatus: {
            type: 'varchar',
            length: 20,
            default: 'pending'
        },
        preferenceId: {
            type: 'varchar',
            length: 20
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

const moveFiles = async (files, folder) => {
    return Promise.all(files.map(file => {
        const tempPath = path.join('uploads', file.filename)
        const targetPath = path.join(folder, file.filename)
        return fs.promises.rename(tempPath, targetPath)
    }))
}

datasource.initialize().then(() => {
    app.use(express.static('dist'))
    app.use(cors())

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

            if (!imageText || !videoId || !startDate || !finalMessage) {
                return res.status(400).json({ message: 'Campos obrigatórios ausentes.' })
            }

            const preferenceClient = new Preference(client)

            const preference = await preferenceClient.create({
                body: {
                    items: [
                        {
                            title: 'Surpresa - Dicoracao',
                            quantity: 1,
                            unit_price: 19.90,
                        },
                    ],
                    auto_return: "all",
                    back_urls: {
                        success: "http://localhost:5173",
                        failure: "http://localhost:5173",
                        pending: "http://localhost:5173"
                    }
                },
            })

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
                finalMessage,
                paymentStatus: 'pending',
                preferenceId: preference.id
            }

            const surprise = datasource.manager.create(Surprise, surpriseDTO)
            const surpriseReturn = await datasource.manager.save(Surprise, surprise)

            const surpriseFolder = join('uploads', String(surpriseReturn.id))

            if (!fs.existsSync(surpriseFolder)) {
                fs.mkdirSync(surpriseFolder, { recursive: true })
            }

            if (req.files['images']) {
                await moveFiles(req.files['images'], surpriseFolder)
            }

            if (req.files['puzzleImage']) {
                await moveFiles(req.files['puzzleImage'], surpriseFolder)
            }

            res.json(preference)
        } catch (error) {
            console.error(error)
            res.status(500).json({ message: 'Erro ao criar surpresa.' })
        }
    })

    app.post('/api/payment', async (req, res) => {
        
    })

    app.get('*', (_req, res) => {
        res.sendFile('index.html', { root: 'dist' })
    })

    app.listen(3000, () => {
        console.log('Server running on port: ' + 3000)
    })
}).catch(error => {
    console.error(error)
})
